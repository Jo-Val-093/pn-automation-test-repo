import axios from 'axios';
import fs from 'fs';

// this script is only used to post messages using task schedular, it will not run with normal regression script. AT

// Function to read the payload from an external file
function getPayloadFromFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

// Read the payload from the external file
const payload = getPayloadFromFile(__dirname + '/_uploads_/payload.xml');

// API Keys for different environments
const apiKeys = {
    dev: 'm4sba8cn93df39lvyzlsxztug7r2xxro',
    test: '14g4s2a8cn34df39gvyzlsgztjg7r2x4he',
    pre: '95pjhsti69s0jswv7pqz7q61lqefhzqo'
};

// Headers for different environments
const headers = {
    dev: { 'Api-Key': apiKeys.dev },
    test: { 'Api-Key': apiKeys.test },
    pre: { 'Api-Key': apiKeys.pre }
};

// Test utils URLs for different environments
const devURL = "https://network-core-dev-eks-2.aga.eu-west-1.proagrica.telus.ag/test-utils/api/pn-mock-on-ramp/in";
const testURL = "https://network-core-test-eks-2.aga.eu-west-1.proagrica.telus.ag/test-utils/api/pn-mock-on-ramp/in";
const pre_EU_URL = "https://network-core-pre-eks-03-eu.agv.eu-west-1.proagrica.telus.ag/test-utils/api/pn-mock-on-ramp/in";

// Reusable function to send POST request
async function postingMessageRequest(url, body, headers) {
    return await axios.post(url, body, { headers });
}

fixture("AutoScheduleMessage");
test
    .meta({ type19: 'Task Scheduler' })

    ('posting 5 Complete messages in Dev, Test, and Pre environments via test utils', async (t) => {
        for (let i = 0; i < 5; i++) {
            console.log(`\nIteration ${i + 1}`);

            const timestamp = Date.now();

            // DEV environment, journey id 18022 and 18023
            const requestBodyDev = {
                metadata: {
                    source: "PN0000001000",
                    subSource: "SD123456",
                    destination: "PN0000009100",
                    subDestination: "RD123456",
                    messageType: "movement",
                    messageSubType: "Shipment Instruction",
                    messageStandard: "F4FXml v5",
                    parentId: "parent_id_1",
                    messageuniqueid: `testcafe_Complete_Message_Autoschedule_Dev_${timestamp}`,
                    businessId: "business_id_1",
                    processId: "process_id_1"
                },
                payload
            };

            // TEST environment, journey id 145 and 146
            const requestBodyTest = {
                metadata: {
                    source: "PN0000001000",
                    subSource: "SubSource1705385348231",
                    destination: "PN0000001149",
                    subDestination: "sub_dest",
                    messageType: "movement",
                    messageSubType: "Shipment Instruction",
                    messageStandard: "F4FXml v5",
                    parentId: "parent_id_1",
                    messageuniqueid: `testcafe_Complete_Message_Autoschedule_Test_${timestamp}`,
                    businessId: "business_id_1",
                    processId: "process_id_1"
                },
                payload
            };

            // PRE environment, journey id 434 and 435
            const requestBodyPre = {
                metadata: {
                    source: "PN0000001000",
                    subSource: "SD123456",
                    destination: "PN0000009100",
                    subDestination: "RD123456",
                    messageType: "movement",
                    messageSubType: "Shipment Instruction",
                    messageStandard: "F4FXml v5",
                    parentId: "parent_id_1",
                    messageuniqueid: `testcafe_Complete_Message_Autoschedule_Pre_${timestamp}`,
                    businessId: "business_id_1",
                    processId: "process_id_1"
                },
                payload
            };

            try {
                const devRes = await postingMessageRequest(devURL, requestBodyDev, headers.dev);
                console.log("Dev Response Status:", devRes.status);
                await t.expect(devRes.status).eql(200);
            } catch (err) {
                console.error("Error posting to Dev:", err.message);
            }

            try {
                const testRes = await postingMessageRequest(testURL, requestBodyTest, headers.test);
                console.log("Test Response Status:", testRes.status);
                await t.expect(testRes.status).eql(200);
            } catch (err) {
                console.error("Error posting to Test:", err.message);
            }

            try {
                const preRes = await postingMessageRequest(pre_EU_URL, requestBodyPre, headers.pre);
                console.log("Pre Response Status:", preRes.status);
                await t.expect(preRes.status).eql(200);
            } catch (err) {
                console.error("Error posting to Pre:", err.message);
            }
        }
    });

test
    .meta({ type19: 'Task Scheduler' })

    ('posting 5 Failed messages in Dev, Test, and Pre environments via test utils', async (t) => {
        for (let i = 0; i < 5; i++) {
            console.log(`\nIteration ${i + 1}`);

            const timestamp = Date.now();

            // DEV environment, journey id 14166 and 14167
            const requestBodyDev = {
                metadata: {
                    source: "PN0000001000",
                    subSource: "SD1737724959418",
                    destination: "PN0000009100",
                    subDestination: "RD",
                    messageType: "F4FInvoice",
                    messageSubType: "Invoice",
                    messageStandard: "F4FXml v4.2",
                    parentId: "parent_id_1",
                    messageuniqueid: `testcafe_Failed_Message_Autoschedule_Dev_${timestamp}`,
                    businessId: "business_id_1",
                    processId: "process_id_1"
                },
                payload
            };

            // TEST environment, journey id 30 and 4657
            const requestBodyTest = {
                metadata: {
                    source: "PN0000001000",
                    subSource: "SD1728569005305",
                    destination: "PN0000001149",
                    subDestination: "sub_dest",
                    messageType: "F4FInvoice",
                    messageSubType: "Invoice",
                    messageStandard: "F4FXml v4.2",
                    parentId: "parent_id_1",
                    messageuniqueid: `testcafe_Failed_Message_Autoschedule_Test_${timestamp}`,
                    businessId: "business_id_1",
                    processId: "process_id_1"
                },
                payload
            };

             // PRE environment, journey id 731 and 732
            const requestBodyPre = {
                metadata: {
                    source: "PN0000001000",
                    subSource: "SD1745839917985",
                    destination: "PN0000009100",
                    subDestination: "RD",
                    messageType: "F4FInvoice",
                    messageSubType: "Invoice",
                    messageStandard: "F4FXml v4.2",
                    parentId: "parent_id_1",
                    messageuniqueid: `testcafe_Failed_Message_Autoschedule_Pre_${timestamp}`,
                    businessId: "business_id_1",
                    processId: "process_id_1"
                },
                payload
            };

            try {
                const devRes = await postingMessageRequest(devURL, requestBodyDev, headers.dev);
                console.log("Dev Response Status:", devRes.status);
                await t.expect(devRes.status).eql(200);
            } catch (err) {
                console.error("Error posting to Dev:", err.message);
            }

            try {
                const testRes = await postingMessageRequest(testURL, requestBodyTest, headers.test);
                console.log("Test Response Status:", testRes.status);
                await t.expect(testRes.status).eql(200);
            } catch (err) {
                console.error("Error posting to Test:", err.message);
            }

            try {
                const preRes = await postingMessageRequest(pre_EU_URL, requestBodyPre, headers.pre);
                console.log("Pre Response Status:", preRes.status);
                await t.expect(preRes.status).eql(200);
            } catch (err) {
                console.error("Error posting to Pre:", err.message);
            }
        }
    });

test
    .meta({ type19: 'Task Scheduler' })

    ('posting 5 In Progress messages in Dev, Test, and Pre environments via test utils', async (t) => {
        for (let i = 0; i < 5; i++) {
            console.log(`\nIteration ${i + 1}`);

            const timestamp = Date.now();

            // DEV environment, journey id 14091 and 25905 (using us queue so message go on in progress)
            const requestBodyDev = {
                metadata: {
                    source: "PN0000001000",
                    subSource: "SD1737567711623",
                    destination: "PN0000009100",
                    subDestination: "RD",
                    messageType: "F4FInvoice",
                    messageSubType: "Invoice",
                    messageStandard: "F4FXml v4.2",
                    parentId: "parent_id_1",
                    messageuniqueid: `testcafe_InProgress_Message_Autoschedule_Dev_${timestamp}`,
                    businessId: "business_id_1",
                    processId: "process_id_1"
                },
                payload
            };

            // TEST environment, journey id 59 and 2635 (using us queue so message go on in progress)
            const requestBodyTest = {
                metadata: {
                    source: "PN0000001000",
                    subSource: "SD1728999770709",
                    destination: "PN0000001149",
                    subDestination: "RD",
                    messageType: "F4FInvoice",
                    messageSubType: "Invoice",
                    messageStandard: "F4FXml v4.2",
                    parentId: "parent_id_1",
                    messageuniqueid: `testcafe_InProgress_Message_Autoschedule_Test_${timestamp}`,
                    businessId: "business_id_1",
                    processId: "process_id_1"
                },
                payload
            };

            // PRE environment, journey id 443 and 444 (using us queue so message go on in progress)
            const requestBodyPre = {
                metadata: {
                    source: "PN0000001000",
                    subSource: "SD1742467387809",
                    destination: "PN0000009100",
                    subDestination: "RD",
                    messageType: "movement",
                    messageSubType: "Goods Issued Note",
                    messageStandard: "F4FXml v5",
                    parentId: "parent_id_1",
                    messageuniqueid: `testcafe_InProgress_Message_Autoschedule_Pre_${timestamp}`,
                    businessId: "business_id_1",
                    processId: "process_id_1"
                },
                payload
            };

            try {
                const devRes = await postingMessageRequest(devURL, requestBodyDev, headers.dev);
                console.log("Dev Response Status:", devRes.status);
                await t.expect(devRes.status).eql(200);
            } catch (err) {
                console.error("Error posting to Dev:", err.message);
                await t.expect(false).ok(`Posting to Dev failed: ${err.message}`); // Explicitly fail the test and show the error message if the dev request throws an error
            }

            try {
                const testRes = await postingMessageRequest(testURL, requestBodyTest, headers.test);
                console.log("Test Response Status:", testRes.status);
                await t.expect(testRes.status).eql(200);
            } catch (err) {
                console.error("Error posting to Test:", err.message);
                await t.expect(false).ok(`Posting to Test failed: ${err.message}`); // Explicitly fail the test and show the error message if the test request throws an error
            }

            try {
                const preRes = await postingMessageRequest(pre_EU_URL, requestBodyPre, headers.pre);
                console.log("Pre Response Status:", preRes.status);
                await t.expect(preRes.status).eql(200);
            } catch (err) {
                console.error("Error posting to Pre:", err.message);
                await t.expect(false).ok(`Posting to Pre failed: ${err.message}`); // Explicitly fail the test and show the error message if the Pre request throws an error
            }
        }
    });