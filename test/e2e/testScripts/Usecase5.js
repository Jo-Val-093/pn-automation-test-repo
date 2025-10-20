import {test, Selector, t} from "testcafe";
import { baseUrl } from "../helpers/configuration";
import LoginPage from "../pages/logInPage";
import dashBoardPage from "../pages/dashBoardPage";
import trafficManagerPage from "../pages/trafficManagerPage";
import axios from "axios";
import fs from 'fs';

const path = require('path');
const repo = require(path.resolve('./test/e2e/data/index.js'));
const member = repo.testData.member;
const sourcePNID = repo.testData.sourcePNID;
const destinationPNID = repo.testData.destinationPNID;
const subSource = repo.testData.subSource;
const subDestination = repo.testData.subDestination;
const messageSubType = repo.testData.messageSubType;
const receiverAsMember = repo.testData.receiverAsMember;
const senderName = repo.testData.senderName;
const receiverName = repo.testData.receiverName;

// Function to read the payload from an external file
function getPayloadFromFile(filePath) {
    return fs.readFileSync(filePath, 'utf-8');
}

// Read the payload from the external file
const payload = getPayloadFromFile(__dirname + '/_uploads_/payload.xml');

const requestBody = {
    metadata: {
        source: sourcePNID,
        destination: destinationPNID,
        subSource: "",        // Placeholder for subSource
        subDestination: "",// Placeholder for subSource
        messageType: "",// Placeholder for messageType
        messageSubType: "",// Placeholder for messageSubType
        businessId: "BUSINESS_ID",
        processId: "PROCESS_ID",
        parentId: "PARENT_ID",
        messageuniqueid: "", // Placeholder for messageuniqueid
    },
    payload:payload
};

const ENV_NAME = process.env.ENV_NAME;

const ENV_CONFIG = {
    'dev': {
        url: 'https://network-core-dev-eks-2.aga.eu-west-1.proagrica.telus.ag/test-utils/api/pn-mock-on-ramp/in',
        apiKey: 'm4sba8cn93df39lvyzlsxztug7r2xxro',
        participant: 'OffRamp_participant',
        endpoint: 'Endpoint_success_Queue',
        endpointFailure: 'Endpoint_fail_Queue',
    },
    'test': {
        url: 'https://network-core-test-eks-2.aga.eu-west-1.proagrica.telus.ag/test-utils/api/pn-mock-on-ramp/in',
        apiKey: '14g4s2a8cn34df39gvyzlsgztjg7r2x4he',
        participant: 'OffRamp_participant',
        endpoint: 'Endpoint_success_Queue',
        endpointFailure: 'Endpoint_fail_Queue',
    },
    'pre': {
        url: 'https://network-core-pre-eks-03-eu.agv.eu-west-1.proagrica.telus.ag/test-utils/api/pn-mock-on-ramp/in',
        apiKey: '95pjhsti69s0jswv7pqz7q61lqefhzqo',
        participant: 'TEST_EU_PARTICIPANT',
        endpoint: 'Success_Solace_EndPoint_EU',
        endpointFailure: 'Failure_Solace_EndPoint_EU',
    },
    'pre-us': {
        url: 'https://network-core-pre-eks-04-us.agv.us-east-1.proagrica.telus.ag/test-utils/api/pn-mock-on-ramp/in',
        apiKey: '95pjhsti69s0jswv7pqz7q61lqefhzqo',
        participant: 'TEST_US_PARTICIPANT',
        endpoint: 'Success_Solace_EndPoint_US',
        endpointFailure: 'Failure_Solace_EndPoint_US',

    },
    'pre-eu': {
        url: 'https://network-core-pre-eks-03-eu.agv.eu-west-1.proagrica.telus.ag/test-utils/api/pn-mock-on-ramp/in',
        apiKey: '95pjhsti69s0jswv7pqz7q61lqefhzqo',
        participant: 'TEST_EU_PARTICIPANT',
        endpoint: 'Success_Solace_EndPoint_EU',
        endpointFailure: 'Failure_Solace_EndPoint_EU',
    },
    //endpoit-participant not created yet in production
    'prod': {
        url: 'https://network-core-prod-eks-04-us.agv.us-east-1.proagrica.telus.ag/test-utils/api/pn-mock-on-ramp/in',
        apiKey: 'pbwa0say7zay5b65guhaforz05ly4tk3',
        participant: 'ProdUS_participant',
        endpoint: 'Success_Solace_EndPoint',
        endpointFailure: 'Failure_Solace_EndPoint_US',
    },
    'prod-us': {
        url: 'https://network-core-prod-eks-04-us.agv.us-east-1.proagrica.telus.ag/test-utils/api/pn-mock-on-ramp/in',
        apiKey: 'pbwa0say7zay5b65guhaforz05ly4tk3',
        participant: 'ProdUS_participant',
        endpoint: 'Success_Solace_EndPoint',
        endpointFailure: 'Failure_Solace_EndPoint_US',
    },
    'prod-eu': {
        url: 'https://network-core-prod-eks-03-eu.agv.eu-west-1.proagrica.telus.ag/test-utils/api/pn-mock-on-ramp/in',
        apiKey: 'pbwa0say7zay5b65guhaforz05ly4tk3',
        participant: 'ProdEU_participant',
        endpoint: 'Success_Solace_EndPoint',
        endpointFailure: 'Failure_Solace_EndPoint_EU',
    },
};

if (!ENV_CONFIG[ENV_NAME]) {
    throw new Error(`Unknown environment: ${ENV_NAME}`);
}
const { url: messageURL, apiKey } = ENV_CONFIG[ENV_NAME];

fixture`TC_E2E_UC5_025 and 026 - Validating XML to JSON Transform `
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
    });
//Journey id 14119  and 26267, Test123 and Test456
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_025: Posting message using pre existing journey send -> receive -> OfframpSuccess, positive scenario",  async (t) => {

        // Create a deep copy of the requestBody
        const requestBodyFor025 = JSON.parse(JSON.stringify(requestBody));
        // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
        requestBodyFor025.metadata.messageuniqueid = "XMLtoJSONTransformUC5_025" + Date.now();
        requestBodyFor025.metadata.subSource = "SD1737621227995"
        requestBodyFor025.metadata.subDestination = "RD25"
        requestBodyFor025.metadata.messageType = "F4FShipmentNote";
        requestBodyFor025.metadata.messageSubType = "Goods Received Note";
        // Send request
        const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor025, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
        await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
        // Save messageuniqueid to fixture context
        const messageuniqueid = requestBodyFor025.metadata.messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;
        await trafficManagerPage.navigateToTrafficManagerPage();
        await trafficManagerPage.searchByPNMessageId(messageuniqueid);
        await trafficManagerPage.verifyMessageStatus("Completed");
        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Completed");
        await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor025.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor025.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor025.metadata.subSource });
        await trafficManagerPage.validateMessageDetails();
        await trafficManagerPage.validateMessageJourney();
        await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM","RECEIVE","OFF_RAMP","COMPLETE"]);
        await trafficManagerPage.validateMessageEvents();
        await trafficManagerPage.assertMetaDataBaseOnTrackingPointValuesSkipTransform();
        await trafficManagerPage.verifyTransformPayloadFormat({mappingKey: 'mappingJson'});
        await trafficManagerPage.downloadPayload();
        await trafficManagerPage.exceptionValidation();
        await trafficManagerPage.clickMessagePayloadCloseIcon();
    }
);

//Journey id 14119  and 26267, Test123 and Test456
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_026: Posting message using pre existing journey send -> receive -> OfframpSuccess, negative scenario",  async (t) => {
        const nonXMLFile = getPayloadFromFile(__dirname + '/_uploads_/nonXMLFile.txt');
        // Create a deep copy of the requestBody
        const requestBodyFor026 = JSON.parse(JSON.stringify(requestBody));
        // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
        requestBodyFor026.metadata.messageuniqueid = "XMLtoJSONTransformUC5_026" + Date.now();
        requestBodyFor026.metadata.subSource = "SD1737621227995"
        requestBodyFor026.metadata.subDestination = "RD25"
        requestBodyFor026.metadata.messageType = "F4FShipmentNote";
        requestBodyFor026.metadata.messageSubType = "Goods Received Note";
        requestBodyFor026.payload = nonXMLFile
        // Send request
        const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor026, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
        await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
        // Save messageuniqueid to fixture context
        const messageuniqueid = requestBodyFor026.metadata.messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;
        await trafficManagerPage.navigateToTrafficManagerPage();
        await trafficManagerPage.searchByPNMessageId(messageuniqueid);
        await trafficManagerPage.verifyMessageStatus("Error");
        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Error");
        await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor026.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor026.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor026.metadata.subSource });
        await trafficManagerPage.validateMessageDetails();
        await trafficManagerPage.validateMessageJourney();
        await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP", "SEND", "TRANSFORM"]);
        await trafficManagerPage.validateMessageEvents();
        //await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();
        await trafficManagerPage.verifyTransformPayloadFormat({ errorMappingKey: 'errorMappingXML' });
        await trafficManagerPage.downloadPayload();
        await trafficManagerPage.exceptionValidation();
        await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );

fixture`TC_E2E_UC5_027 and 028 - Validating Value metadata Transform `
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
    });
//Journey id 26282  and 26283, Test123 and Test456
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_027 and 028: Posting message using pre existing journey send -> receive -> OfframpSuccess, positive and negative scenario",  async (t) => {
        // Create a deep copy of the requestBody
        const requestBodyFor027 = JSON.parse(JSON.stringify(requestBody));
        // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
        requestBodyFor027.metadata.messageuniqueid = "ValueMetadataTransformUC5_027" + Date.now();
        requestBodyFor027.metadata.subSource = "SD-Value-Metadata"
        requestBodyFor027.metadata.subDestination = "RD-Value-Metadata"
        requestBodyFor027.metadata.messageType = "ownership";
        requestBodyFor027.metadata.messageSubType = "Delivery Order";
        // Send request
        const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor027, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
        await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
        // Save messageuniqueid to fixture context
        const messageuniqueid = requestBodyFor027.metadata.messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;
        await trafficManagerPage.navigateToTrafficManagerPage();
        await trafficManagerPage.searchByPNMessageId(messageuniqueid);
        await trafficManagerPage.verifyMessageStatus("Completed");
        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Completed");
        await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor027.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor027.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor027.metadata.subSource });
        await trafficManagerPage.validateMessageDetails();
        await trafficManagerPage.validateMessageJourney();
        await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM","RECEIVE","OFF_RAMP","COMPLETE"]);
        await trafficManagerPage.validateMessageEvents();
        await trafficManagerPage.assertMetaDataBaseOnTrackingPointValuesSkipTransform();
        await trafficManagerPage.verifyTransformPayloadFormat({mappingKey: 'mappingOriginalPayloadXML'});
        await trafficManagerPage.downloadPayload();
        await trafficManagerPage.exceptionValidation();
        await trafficManagerPage.assertMetadataKeyValue('TestedBy', 'QA Team') // positive scenario, keys/value exist
        await trafficManagerPage.assertMetadataKeyValue('KeyNotPresent', 'ValueNotPresent', false); // Negative scenario, keys/value not exist
        await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );

fixture`TC_E2E_UC5_023 and 024 - Validating JSON to XML Transform `
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
    });
//Journey id 26393  and 26394, Test123 and Test456
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_023: Posting message using pre existing journey send -> receive -> OfframpSuccess, positive scenario",  async (t) => {
            const JsonInput = getPayloadFromFile(__dirname + '/_uploads_/jsonInput.json');
            // Create a deep copy of the requestBody
            const requestBodyFor023 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor023.metadata.messageuniqueid = "JSONtoXMLTransformUC5_023" + Date.now();
            requestBodyFor023.metadata.subSource = "SD-JsonToXml"
            requestBodyFor023.metadata.subDestination = "RD-JsonToXml"
            requestBodyFor023.metadata.messageType = "ownership";
            requestBodyFor023.metadata.messageSubType = "Delivery Order";
            requestBodyFor023.payload = JsonInput
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor023, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor023.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor023.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor023.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor023.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM","RECEIVE","OFF_RAMP","COMPLETE"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            //await trafficManagerPage.assertMetaDataBaseOnTrackingPointValuesSkipTransform();
            await trafficManagerPage.verifyTransformPayloadFormat({mappingKey: 'mappingJsonToXml'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_024: Posting message using pre existing journey send -> receive -> OfframpSuccess, negative scenario",  async (t) => {
            const nonJsonFile = getPayloadFromFile(__dirname + '/_uploads_/nonJsonFile.txt');
            // Create a deep copy of the requestBody
            const requestBodyFor024 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor024.metadata.messageuniqueid = "JSONtoXMLTransformUC5_024" + Date.now();
            requestBodyFor024.metadata.subSource = "SD-JsonToXml"
            requestBodyFor024.metadata.subDestination = "RD-JsonToXml"
            requestBodyFor024.metadata.messageType = "ownership";
            requestBodyFor024.metadata.messageSubType = "Delivery Order";
            requestBodyFor024.payload = nonJsonFile
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor024, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor024.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Error");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Error");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor024.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor024.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor024.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP", "SEND", "TRANSFORM"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            //await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();
            await trafficManagerPage.verifyTransformPayloadFormat({ errorMappingKey: 'errorMappingJson' });
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );

fixture`TC_E2E_UC5_017 and 018 - Validating Find and replace Transform `
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
    });
//Journey id 26397  and 26398, Test123 and Test456
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_017: Posting message using pre existing journey send -> receive -> OfframpSuccess, positive scenario",  async (t) => {

            // Create a deep copy of the requestBody
            const requestBodyFor017 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor017.metadata.messageuniqueid = "FindAndReplaceTransformUC5_017" + Date.now();
            requestBodyFor017.metadata.subSource = "SD-FindAndReplace"
            requestBodyFor017.metadata.subDestination = "RD-FindAndReplace"
            requestBodyFor017.metadata.messageType = "ownership";
            requestBodyFor017.metadata.messageSubType = "Product Movement";
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor017, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor017.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor017.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor017.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor017.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM","RECEIVE","OFF_RAMP","COMPLETE"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.assertMetaDataBaseOnTrackingPointValuesSkipTransform();
            await trafficManagerPage.verifyTransformPayloadFormat({mappingKey: 'mappingFindAndReplaceOutputXML'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );

fixture`TC_E2E_UC5_015 and 016 - Validating  XML to EDIFACT Transform `
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
    });
//Journey id 26399  and 26400, Test123 and Test456
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_015: Posting message using pre existing journey send -> receive -> OfframpSuccess, positive scenario",  async (t) => {
            const XMLToEDIFACTInput = getPayloadFromFile(__dirname + '/_uploads_/XMLToEDIFACTInput.xml');
            // Create a deep copy of the requestBody
            const requestBodyFor015 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor015.metadata.messageuniqueid = "XmlToEdifactTransformUC5_015" + Date.now();
            requestBodyFor015.metadata.subSource = "SD-XmlToEdifact"
            requestBodyFor015.metadata.subDestination = "RD-XmlToEdifact"
            requestBodyFor015.metadata.messageType = "ownership";
            requestBodyFor015.metadata.messageSubType = "Product Movement";
            requestBodyFor015.payload = XMLToEDIFACTInput
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor015, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor015.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor015.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor015.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor015.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM","RECEIVE","OFF_RAMP","COMPLETE"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({mappingKey: 'mappingXmlToEdifactOutput'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_016: Posting message using pre existing journey send -> receive -> OfframpSuccess, negative scenario",  async (t) => {
            const nonXMLFile = getPayloadFromFile(__dirname + '/_uploads_/nonXMLFile.txt');
            // Create a deep copy of the requestBody
            const requestBodyFor016 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor016.metadata.messageuniqueid = "XmlToEdifactTransformUC5_016" + Date.now();
            requestBodyFor016.metadata.subSource = "SD-XmlToEdifact"
            requestBodyFor016.metadata.subDestination = "RD-XmlToEdifact"
            requestBodyFor016.metadata.messageType = "ownership";
            requestBodyFor016.metadata.messageSubType = "Product Movement";
            requestBodyFor016.payload = nonXMLFile
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor016, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor016.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Error");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Error");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor016.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor016.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor016.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({errorMappingKey: 'errorMappingXML'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );

fixture`TC_E2E_UC5_013 and 014 - Validating  XML to EDI ANSI X12 Transform `
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
    });
//Journey id 26402  and 26403, Test123 and Test456
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_013: Posting message using pre existing journey send -> receive -> OfframpSuccess, positive scenario",  async (t) => {
            const XMLToEDIANSIx12Input = getPayloadFromFile(__dirname + '/_uploads_/XMLToEdiANSIIx12Input.xml');
            // Create a deep copy of the requestBody
            const requestBodyFor013 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor013.metadata.messageuniqueid = "XmlToEdiAnsiX12TransformUC5_013" + Date.now();
            requestBodyFor013.metadata.subSource = "SD-XmlToEdiAnsiX12"
            requestBodyFor013.metadata.subDestination = "RD-XmlToEdiAnsiX12"
            requestBodyFor013.metadata.messageType = "ownership";
            requestBodyFor013.metadata.messageSubType = "Bill Of Lading";
            requestBodyFor013.payload = XMLToEDIANSIx12Input
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor013, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor013.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor013.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor013.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor013.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM","RECEIVE","OFF_RAMP","COMPLETE"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({mappingKey: 'mappingXmlToEdiANSIx12Output'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_014: Posting message using pre existing journey send -> receive -> OfframpSuccess, negative scenario",  async (t) => {
            const nonXMLFile = getPayloadFromFile(__dirname + '/_uploads_/nonXMLFile.txt');
            // Create a deep copy of the requestBody
            const requestBodyFor014 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor014.metadata.messageuniqueid = "XmlToEdiAnsiX12TransformUC5_014" + Date.now();
            requestBodyFor014.metadata.subSource = "SD-XmlToEdiAnsiX12"
            requestBodyFor014.metadata.subDestination = "RD-XmlToEdiAnsiX12"
            requestBodyFor014.metadata.messageType = "ownership";
            requestBodyFor014.metadata.messageSubType = "Bill Of Lading";
            requestBodyFor014.payload = nonXMLFile
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor014, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor014.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Error");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Error");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor014.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor014.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor014.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({errorMappingKey: 'errorMappingXML'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );

fixture`TC_E2E_UC5_009 and 010 - Validating Schematron XSL Transform `
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
    });
//Journey id 26404  and 26405, Test123 and Test456
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_009: Posting message using pre existing journey send -> receive -> OfframpSuccess, positive scenario",  async (t) => {
            const SchematronInput = getPayloadFromFile(__dirname + '/_uploads_/SchematronInput.xml');
            // Create a deep copy of the requestBody
            const requestBodyFor009 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor009.metadata.messageuniqueid = "SchematronValidationTransformUC5_009" + Date.now();
            requestBodyFor009.metadata.subSource = "SD-Schematron"
            requestBodyFor009.metadata.subDestination = "RD-Schematron"
            requestBodyFor009.metadata.messageType = "ownership";
            requestBodyFor009.metadata.messageSubType = "Inventory Level";
            requestBodyFor009.payload = SchematronInput
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor009, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor009.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor009.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor009.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor009.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM","RECEIVE","OFF_RAMP","COMPLETE"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({mappingKey: 'mappingSchematronOutput'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_010: Posting message using pre existing journey send -> receive -> OfframpSuccess, negative scenario",  async (t) => {
            const SchematronInvalidInput = getPayloadFromFile(__dirname + '/_uploads_/SchematronInvalidInput.xml');
            // Create a deep copy of the requestBody
            const requestBodyFor010 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor010.metadata.messageuniqueid = "SchematronValidationTransformUC5_010" + Date.now();
            requestBodyFor010.metadata.subSource = "SD-Schematron"
            requestBodyFor010.metadata.subDestination = "RD-Schematron"
            requestBodyFor010.metadata.messageType = "ownership";
            requestBodyFor010.metadata.messageSubType = "Inventory Level";
            requestBodyFor010.payload = SchematronInvalidInput
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor010, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor010.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Error");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Error");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor010.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor010.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor010.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({errorMappingKey: 'errorMappingSchematronOutput'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );

fixture`TC_E2E_UC5_007 and 008 - Validating Basic XML validation Transform `
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
    });
//Journey id 26627  and 26628, Test123 and Test456
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_007: Posting message using pre existing journey send -> receive -> OfframpSuccess, positive scenario",  async (t) => {
             // Create a deep copy of the requestBody
            const requestBodyFor007 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor007.metadata.messageuniqueid = "BasicXMLValidationTransformUC5_007" + Date.now();
            requestBodyFor007.metadata.subSource = "SD-BasicXMLValidation"
            requestBodyFor007.metadata.subDestination = "RD-BasicXMLValidation"
            requestBodyFor007.metadata.messageType = "ownership";
            requestBodyFor007.metadata.messageSubType = "Inventory Level";
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor007, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor007.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor007.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor007.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor007.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM","RECEIVE","OFF_RAMP","COMPLETE"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({mappingKey: 'mappingOriginalPayloadXML'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_008: Posting message using pre existing journey send -> receive -> OfframpSuccess, negative scenario",  async (t) => {
            const payloadMissingEndTag = getPayloadFromFile(__dirname + '/_uploads_/payloadMissingEndTag.xml');
            // Create a deep copy of the requestBody
            const requestBodyFor008 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor008.metadata.messageuniqueid = "BasicXMLValidationTransformUC5_008" + Date.now();
            requestBodyFor008.metadata.subSource = "SD-BasicXMLValidation"
            requestBodyFor008.metadata.subDestination = "RD-BasicXMLValidation"
            requestBodyFor008.metadata.messageType = "ownership";
            requestBodyFor008.metadata.messageSubType = "Inventory Level";
            requestBodyFor008.payload = payloadMissingEndTag
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor008, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor008.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Error");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Error");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor008.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor008.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor008.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({errorMappingKey: 'payloadMissingEndTag'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );

fixture`TC_E2E_UC5_005 and 006 - Validating XSD validation Transform `
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
    });
//Journey id 26629  and 26630, Test123 and Test456
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_005: Posting message using pre existing journey send -> receive -> OfframpSuccess, positive scenario",  async (t) => {
            const XSDCompliantPayload = getPayloadFromFile(__dirname + '/_uploads_/XSDCompliantPayload.xml');
            // Create a deep copy of the requestBody
            const requestBodyFor005 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor005.metadata.messageuniqueid = "XSDValidationTransformUC5_005" + Date.now();
            requestBodyFor005.metadata.subSource = "SD-XSDValidation"
            requestBodyFor005.metadata.subDestination = "RD-XSDValidation"
            requestBodyFor005.metadata.messageType = "ownership";
            requestBodyFor005.metadata.messageSubType = "Inventory Level";
            requestBodyFor005.payload = XSDCompliantPayload
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor005, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor005.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor005.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor005.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor005.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM","RECEIVE","OFF_RAMP","COMPLETE"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({mappingKey: 'XSDCompliantPayload'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_006 Posting message using pre existing journey send -> receive -> OfframpSuccess, negative scenario",  async (t) => {
            const XSDNonCompliantPayload = getPayloadFromFile(__dirname + '/_uploads_/XSDNonCompliantPayload.xml');
            // Create a deep copy of the requestBody
            const requestBodyFor006 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor006.metadata.messageuniqueid = "XSDValidationTransformUC5_006" + Date.now();
            requestBodyFor006.metadata.subSource = "SD-XSDValidation"
            requestBodyFor006.metadata.subDestination = "RD-XSDValidation"
            requestBodyFor006.metadata.messageType = "ownership";
            requestBodyFor006.metadata.messageSubType = "Inventory Level";
            requestBodyFor006.payload = XSDNonCompliantPayload
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor006, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor006.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Error");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Error");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor006.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor006.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor006.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({errorMappingKey: 'XSDNonCompliantPayload'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );

fixture`TC_E2E_UC5_003 and 004- Validating Flat file transform `
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
    });
//Journey id 26631  and 26632, Test123 and Test456
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_003: Posting message using pre existing journey send -> receive -> OfframpSuccess, positive scenario",  async (t) => {
            const FlatFileInput = getPayloadFromFile(__dirname + '/_uploads_/FlatFileInput.csv');
            // Create a deep copy of the requestBody
            const requestBodyFor003 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor003.metadata.messageuniqueid = "FlatFileTransformUC5_003" + Date.now();
            requestBodyFor003.metadata.subSource = "SD-FlatFile"
            requestBodyFor003.metadata.subDestination = "RD-FlatFile"
            requestBodyFor003.metadata.messageType = "ownership";
            requestBodyFor003.metadata.messageSubType = "Delivery Order";
            requestBodyFor003.payload = FlatFileInput
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor003, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor003.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor003.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor003.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor003.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM","RECEIVE","OFF_RAMP","COMPLETE"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({mappingKey: 'FlatFileOutput'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );

fixture`TC_E2E_UC5_011 and 012- Validating EDIFACT to XML Transform `
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
    });
//Journey id 26633  and 26634, Test123 and Test456
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_011: Posting message using pre existing journey send -> receive -> OfframpSuccess, positive scenario",  async (t) => {
            const EDIFACTInput = getPayloadFromFile(__dirname + '/_uploads_/EDIFACTInput.txt');
            // Create a deep copy of the requestBody
            const requestBodyFor011 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor011.metadata.messageuniqueid = "EDIFACTtoXMLTransformUC5_011" + Date.now();
            requestBodyFor011.metadata.subSource = "SD-EDIFACTToXML"
            requestBodyFor011.metadata.subDestination = "RD-EDIFACTToXML"
            requestBodyFor011.metadata.messageType = "ownership";
            requestBodyFor011.metadata.messageSubType = "Delivery Order";
            requestBodyFor011.payload = EDIFACTInput
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor011, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor011.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor011.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor011.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor011.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM","RECEIVE","OFF_RAMP","COMPLETE"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({mappingKey: 'EDIFACTOutput'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );

test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_012 Posting message using pre existing journey send -> receive -> OfframpSuccess, negative scenario",  async (t) => {
            const EDIFACTInvalidInput = getPayloadFromFile(__dirname + '/_uploads_/EDIFACTInvalidInput.txt');
            // Create a deep copy of the requestBody
            const requestBodyFor012 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor012.metadata.messageuniqueid = "EDIFACTtoXMLTransformUC5_012" + Date.now();
            requestBodyFor012.metadata.subSource = "SD-EDIFACTToXML"
            requestBodyFor012.metadata.subDestination = "RD-EDIFACTToXML"
            requestBodyFor012.metadata.messageType = "ownership";
            requestBodyFor012.metadata.messageSubType = "Delivery Order";
            requestBodyFor012.payload = EDIFACTInvalidInput
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor012, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor012.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Error");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Error");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor012.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor012.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor012.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({errorMappingKey: 'EDIFACTInvalidInput'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );
fixture`TC_E2E_UC5_011A- Validating EDI ANSI X12 to XML Transform `
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
    });
//Journey id 26635  and 26636, Test123 and Test456
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_011A: Posting message using pre existing journey send -> receive -> OfframpSuccess, positive scenario",  async (t) => {
            const EDI_ANSIx12Input = getPayloadFromFile(__dirname + '/_uploads_/EDI_ANSIx12Input.txt');
            // Create a deep copy of the requestBody
            const requestBodyFor011A = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor011A.metadata.messageuniqueid = "EDI_ANSIx12toXMLTransformUC5_011A" + Date.now();
            requestBodyFor011A.metadata.subSource = "SD-EDIAnsiX12ToXML"
            requestBodyFor011A.metadata.subDestination = "RD-EDIAnsiX12ToXML"
            requestBodyFor011A.metadata.messageType = "ownership";
            requestBodyFor011A.metadata.messageSubType = "Delivery Order";
            requestBodyFor011A.payload = EDI_ANSIx12Input
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor011A, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor011A.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor011A.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor011A.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor011A.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM","RECEIVE","OFF_RAMP","COMPLETE"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({mappingKey: 'EDI_ANSIx12Output'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );
fixture`TC_E2E_UC5_001 and 002- Validating Xalan Transform `
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
    });
//Journey id 26638 and 26639, Test123 and Test456
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_001: Posting message using pre existing journey send -> receive -> OfframpSuccess, positive scenario",  async (t) => {
            const xalanInput = getPayloadFromFile(__dirname + '/_uploads_/payload.xml');
            // Create a deep copy of the requestBody
            const requestBodyFor001 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor001.metadata.messageuniqueid = "XalanTransformUC5_01" + Date.now();
            requestBodyFor001.metadata.subSource = "SD-Xalan"
            requestBodyFor001.metadata.subDestination = "RD-Xalan"
            requestBodyFor001.metadata.messageType = "ownership";
            requestBodyFor001.metadata.messageSubType = "Bill Of Lading";
            requestBodyFor001.payload = xalanInput
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor001, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor001.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor001.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor001.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor001.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM","RECEIVE","OFF_RAMP","COMPLETE"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({mappingKey: 'XalanOutput'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );

fixture`TC_E2E_UC5_019 and 020- Validating Change character encoding Transform `
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
    });
//Journey id 26640 and 26641, Test123 and Test456
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC5_019: Posting message using pre existing journey send -> receive -> OfframpSuccess, UTF-8 to ISO-8859-1 safe characters",  async (t) => {
            const UTFInputSafe = getPayloadFromFile(__dirname + '/_uploads_/UTFInputSafe.xml');
            // Create a deep copy of the requestBody
            const requestBodyFor019 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody
            requestBodyFor019.metadata.messageuniqueid = "CCE_UTF_To_ISO_Safe_TransformUC5_019" + Date.now();
            requestBodyFor019.metadata.subSource = "SD-CCE"
            requestBodyFor019.metadata.subDestination = "RD-CCE"
            requestBodyFor019.metadata.messageType = "ownership";
            requestBodyFor019.metadata.messageSubType = "Product Movement";
            requestBodyFor019.payload = UTFInputSafe
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor019, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor019.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor019.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor019.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor019.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM","RECEIVE","OFF_RAMP","COMPLETE"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({mappingKey: 'ISOOutput'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );
