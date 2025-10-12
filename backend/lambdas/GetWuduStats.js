import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  ScanCommand,
  PutCommand,
  GetCommand,
  DeleteCommand,
} from "@aws-sdk/lib-dynamodb";
import { IoTDataPlaneClient, PublishCommand } from "@aws-sdk/client-iot-data-plane";

const REGION = "eu-north-1";
const TABLE_NAME = "wudu_stats";

const client = new DynamoDBClient({ region: REGION });
const dynamo = DynamoDBDocumentClient.from(client);

const iotClient = new IoTDataPlaneClient({
  region: REGION,
  endpoint: "https://a1hcllh7g2iqu6-ats.iot.eu-north-1.amazonaws.com"
});

//here we return a HTTP response consisting of statssus code, headers, and JSON hbody
export const handler = async (event, context) => {
  let body;
  let statusCode = 200;

  //set CORS... headers for api gateway res
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,POST,GET,PUT,DELETE"
  };

  try {
    //..event.routKey used for teelling whcih HTTPM method and route is called
    //is it get etc
    switch (event.routeKey) {
      //deleting by id
      case "DELETE /items/{id}":
        await dynamo.send(
          new DeleteCommand({
            TableName: TABLE_NAME,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = `Deleted item ${event.pathParameters.id}`;
        break;

      //getting item by id
      case "GET /items/{id}":
        const getRes = await dynamo.send(
          new GetCommand({
            TableName: TABLE_NAME,
            Key: {
              id: event.pathParameters.id,
            },
          })
        );
        body = getRes.Item; // return the retrieved item
        break;

      //getting all items
      case "GET /items":
        body = await dynamo.send(
          new ScanCommand({ TableName: TABLE_NAME })
        );
        body = body.Items; // extract items array from scan result
        break;

      //creating or updating
      case "PUT /items":
        let requestJSON = JSON.parse(event.body);
        await dynamo.send(
          new PutCommand({
            TableName: TABLE_NAME,
            Item: {
              id: requestJSON.id,
              price: requestJSON.price,
              name: requestJSON.name,
            },
          })
        );
        body = `Put item ${requestJSON.id}`;
        break;

      //can filter based on mosque
      case "GET /stats":
        const mosque = event.queryStringParameters?.mosque;

        //getting all items from db
        const params = { TableName: TABLE_NAME };
        if (mosque) {
          //optional filter if query param "mosque" is provided
          params.FilterExpression = "mosque_id = :m";
          params.ExpressionAttributeValues = { ":m": mosque };
        }

        const data = await dynamo.send(new ScanCommand(params));

        //by mosque and date
        const dailyData = {};

        for (const item of data.Items) {
          //make sure use string
          const tsString = item.ts ? String(item.ts) : "unknown";
          //extract date portion from timestamp
          const date = tsString.includes("T") ? tsString.split("T")[0] : tsString;
          const key = `${item.mosque_id}_${date}`;

          //initialize daily entry if not yet present
          if (!dailyData[key]) {
            dailyData[key] = {
              mosque: item.mosque_id,
              date: date,
              sessions: 0,
              totalDuration: 0
            };
          }

          //increment counts
          dailyData[key].sessions += 1;
          dailyData[key].totalDuration += item.usage_duration || 0;
        }

        //grouped to list....converting dictionary to objects array
        body = Object.values(dailyData).map(d => ({
          mosque: d.mosque,
          date: d.date,
          sessions: d.sessions,
          avgDuration: (d.totalDuration / d.sessions).toFixed(1)
        }));
        break;

      //summary endpoint — aggregated overuse data
      case "GET /summary":
        console.log("GET /summary"); // helpful for debugging which route was hit

        //scaning summary table
        const summaryResult = await dynamo.send(
          new ScanCommand({ TableName: "wudu_overuse_summary" })
        );

        //converting tresults into cleaner version
        body = summaryResult.Items.map((item) => ({
          date: item.date,
          overuse_count: item.overuse_count, //total overuse events
        }));
        break;

      //sending a pause command through MQTT
      case "POST /commands/pause":
        //parsing command from request
        const commandBody = JSON.parse(event.body);

        //mqtt command...
        const command = {
          action: "pause_tap",
          tap: commandBody.tap,
          mosque: commandBody.mosque,
          duration: commandBody.duration,
          message: commandBody.message,
        };

        //publishing to MQTT topic (will be received by IoT devices)
        await iotClient.send(
          new PublishCommand({
            topic: "wudu/commands",
            payload: Buffer.from(JSON.stringify(command)),
            qos: 0,
          })
        );

        body = `Sent pause command for tap ${command.tap} in mosque ${command.mosque}`;
        break;

      //default case if routeKey is unknown
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }

  } catch (err) {
    //if any error occurs, respond with 400 and error message
    statusCode = 400;
    body = err.message;
  } finally {
    //ensure body is stringified before returning
    body = JSON.stringify(body);
  }

  //returning the final API Gateway response
  return {
    statusCode,
    body,
    headers,
  };
};