const mqtt = require("mqtt")
const dayjs = require("dayjs")

//connecting to broker url 
const BROKER_URL = "mqtt://broker.mqtt.cool:1883"

//connect to broker
//const client = mqtt.connect(BROKER_URL, {clientId: "wudu_sim87654677"})
const awsIot = require("aws-iot-device-sdk")

//craeting a device object with certs
const device = awsIot.device({
    keyPath: "./certs/df07e8f24137ec6b39219c85d35d0d356da0e67d025e7812b0658902d9cf66fd-private.pem.key",
    certPath: "./certs/df07e8f24137ec6b39219c85d35d0d356da0e67d025e7812b0658902d9cf66fd-certificate.pem.crt",
    caPath: "./certs/AmazonRootCA1.pem",
    clientId: "wudu_sim123654w3",
    host: "a1hcllh7g2iqu6-ats.iot.eu-north-1.amazonaws.com"
})

const SITES = 100 //number of mosques/schools
const TAPS = 5 //tasps per site
const NUM_DAYS = 31
const AVG_PER_DAY = 15 //15 wudu sessions per fay per tap

//////----------------helper functions-----------------/////
//tap name id name generator
function tapName(i)
{
    return "tap" +String(i).padStart(4, "0")
}
///for crweayting a sit name
function siteName(i)
{
    return "masjid" + (i+1)
}

//for storing sim data in
let simData = [];

device.on("connect", () => {
    console.log("connected to AWS IoT CORE")

    //subscribing to control channel
    device.subscribe("wudu/commands")
    //for generating the events from the mosque, tap, day amd session
    for (let d = 0; d < NUM_DAYS; d++) {
        const day = dayjs().subtract(d, "day");
        for (let i = 0; i < AVG_PER_DAY; i++) {
            for (let m = 0; m < SITES; m++) {
                const mosque = siteName(m);
                for (let t = 0; t < TAPS; t++) {
                    const tap = tapName(t);
                    const simTime = day
                        .hour(Math.floor(Math.random() * 24))
                        .minute(Math.floor(Math.random() * 60))
                        .second(Math.floor(Math.random() * 60))
                    //picking a random wudu duration for each between 8 and 38 seconds
                    const duration = 8 + Math.floor(Math.random()  * 30)
                    // converting sim time into Unix timestamp
                    const ts = Math.floor(simTime.valueOf() / 1000)

                    //pushes wudu status updates to MQTT
                    simData.push({
                        topic: "wudu/status",
                        payload: Math.random() < 0.5 ? "invalid" : "valid",
                    })

                    simData.push({
                        topic: "wudu/stats",
                        payload: {
                            event: "wudu_complete",
                            duration: duration, 
                            mosque, 
                            ts, 
                            tap,
                        },
                    })

                    //for sometimes sending overuse alert
                    if(Math.random() < 0.1)
                    {
                        simData.push({
                            topic: "wudu/stats",
                            payload: {
                                event: "tap_overuse",
                                duration: duration + 4, 
                                ts, 
                                mosque, 
                                tap,
                            },
                        })
                    }

                    //marking a session as complete
                    simData.push({
                        topic: "wudu/status",
                        payload: "complete",
                    })
                }
            }
        }
    } 
    /////////-----------PUBLISHIGN EVENTS---------//////////
    let i = 0;

    function publishNext(){
        //stop when all events are sent
        if(i >= simData.length)
        {
            console.log("publised all the events")
            process.exit(0)
        }

        const data = simData[i];

        //converting payloader into string
        const payloadStr = 
            typeof data.payload === "string" ? data.payload : JSON.stringify(data.payload)

        //publishing to broker
        device.publish(data.topic, payloadStr, {qos: 0})
        
        i++;
        setTimeout(publishNext, 100) //publish data repeatedly and adding delay
    }
    publishNext();
})
//handling commands from lambda
device.on("message", (topic, payload) => {
    console.log("received commadn", topic, payload.toString());

    let command
    try{
        command = JSON.parse(payload.toString())
    }
    catch (e){
        console.log("couldnt parse JSSON")
        return
    }

    //checking if commadn saying to pause
    if(command.action === "pause_tap")
    {
        console.log("tap pausing now")
        console.log("LED SCREEN: ", command.message)

        //simulating switching off the tap
        console.log("TAP OFFF")
        let pauseTime = command.duration

        setTimeout(() => {
            console.log("TAP ON")
            console.log("Not Paused")
        }, pauseTime)
    }
})