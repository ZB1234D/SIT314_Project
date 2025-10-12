import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { IoTDataPlaneClient, PublishCommand } from "@aws-sdk/client-iot-data-plane";

const REGION = "eu-north-1";
const TABLE_NAME = "wudu_stats";
const IOT_ENDPOINT = "https://a1hcllh7g2iqu6-ats.iot.eu-north-1.amazonaws.com";

//for dynamodb client
const ddbClient = new DynamoDBClient({ region: REGION });
const docClient = DynamoDBDocumentClient.from(ddbClient);

const iotClient = new IoTDataPlaneClient({ endpoint: IOT_ENDPOINT });

export const handler = async (event) => {
    console.log("event incomign...: ", JSON.stringify(event));

    let wuduEvent;
    try {
        const payload = event.message ? event.message : event;
        wuduEvent = typeof payload === "string" ? JSON.parse(payload) : payload;
    } 
    catch (e) {
        console.error("cant parse wuduEvent :", e);
        return { statusCode: 400, body: "bad wuduEvent" };
    }

    const { tap, mosque, ts, duration, event: status } = wuduEvent;
    if (!tap || !mosque || !ts) {
      console.error("missing fields:", wuduEvent);
      return { statusCode: 400, body: "Missing required data" };
    }

    const usageDuration = wuduEvent.duration;
    const record = {
        ultrasonic_id: tap,
        mosque_id: mosque,
        ts,
        usage_duration: duration,
        overuse_flag: status === "tap_overuse",
        status,
    };

    //storing in DynamoDB
    try {
        await docClient.send(new PutCommand({ TableName: TABLE_NAME, Item: record }));
        console.log("event stoored dynamo db:", record);
    } catch (err) {
        console.error("there was an error storing event:", err);
    }

    //pause command when overused... increment summary table
    if (record.overuse_flag) {
        const dateStr = new Date(record.ts * 1000).toISOString().split("T")[0];

        //increment overuse count
        await docClient.send(new UpdateCommand({
            TableName: "wudu_overuse_summary",
            Key: {
                date: dateStr,
            },
            UpdateExpression: "ADD overuse_count :val",
            ExpressionAttributeValues: {
                ":val": 1
            },
            ReturnValues: "UPDATED_NEW"
        }))
        console.log("overuse count incremented for:", dateStr);
        const command = {
            action: "pause_tap",
            tap: record.ultrasonic_id,
            mosque: record.mosque_id,
            duration: 10000,
            message: "Too much water used... tap paused",
        };

        try {
            await iotClient.send(new PublishCommand({
                topic: "wudu/commands",
                payload: JSON.stringify(command),
                qos: 0
            }));
            console.log("pause command sent:", command);
        } catch (err) {
            console.error("could not publish command:", err);
        }
    } else {
        console.log("no action needed: ", record.status);
    }

    return { statusCode: 200, body: "ok" };
};
