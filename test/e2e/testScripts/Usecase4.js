import { test, Selector } from "testcafe";
import { baseUrl } from "../helpers/configuration";
import LoginPage from "../pages/logInPage";
import dashBoardPage from "../pages/dashBoardPage";
import networkSetupPage from "../pages/networkSetupPage";
import journeysPage from "../pages/journeysPage";
import trafficManagerPage from "../pages/trafficManagerPage";
import axios from "axios";
import fs from 'fs';
import * as TestCafeTestingLibrary from '@testing-library/testcafe';

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var sourcePNID = repo.testData.sourcePNIDUC4
var destinationPNID = repo.testData.destinationPNIDUC4
var senderName = repo.testData.memberUC4
var receiverName = repo.testData.memberReceiverUC4
var memberReceiverUC4 = repo.testData.memberReceiverUC4
var memberUC4 = repo.testData.memberUC4
const dashboardNav = Selector('a').withText('Dashboard');

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
        subDestination: "",// Placeholder for subSource
        messageType: "",// Placeholder for messageType
        messageSubType: "",// Placeholder for messageSubType
        subSource: "",        // Placeholder for subSource
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
fixture`TC_E2E_UC4_001 - Creating send to send journey and posting message`
    .page(baseUrl)
    .beforeEach(async t => {
        await LoginPage.logInSuccessful();
    });

test
.meta({ e2e: 'regression', type1: 'usecaseE2E' })(
    "TC_E2E_UC4_001: Validate user is able to create a Journey, Channel - Send, Next Channel - Send, Operators - RD(Any)",
    async t => {

        const journeyNamePrefix = `send-send-journeyUC4`;

        // Navigate to Journeys Page before deletion
        await dashBoardPage.selectMember(memberUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

        // Delete existing journeys with same prefixes
        await journeysPage.deleteJourneysByPrefixes(t, [
            'send-send',
            'send-receive',
            'receive-receive',
            'receive-offrampfailure',
            'receive-offrampsuccess'
        ]);
        await t.wait(2000);

        // Retry journey creation until success
        const createJourneyFn = async () => {
            await dashBoardPage.navigateToNetworkSetupPage();
            await networkSetupPage.navigateToJourneysPage();

            // Fill journey fields and save
            await journeysPage.setJourneyFieldsSaveAndAssert({
                journeyName: journeyNamePrefix,
                senderDivisionOperator: "Equals",
                senderDivisionNew: "NK1",
                receiverOperator: "Equals",
                receiverName: "NK2",
                receiverDivisionOperator: "Any",
                messageStandard: "F4FXml v4.2",
                messageType: "F4FShipmentNote",
                messageSubTypeOperator: "Equals",
                messageSubType: "Goods Issued Note",
                nextDirection: "Send",
            });
        };

        await journeysPage.retryUntilSuccess(t, createJourneyFn, journeyNamePrefix, 3, 2000);

        // Post message using this journey
        await dashBoardPage.selectMember(memberUC4);
        const reqBody = JSON.parse(JSON.stringify(requestBody));
        reqBody.metadata.messageuniqueid = `sendTosend_TC_E2E_UC4_001_${Date.now()}`;
        const messageuniqueid = reqBody.metadata.messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;

        reqBody.metadata.subSource = "NK1";
        reqBody.metadata.subDestination = "NK2";
        reqBody.metadata.messageType = "F4FShipmentNote";
        reqBody.metadata.messageSubType = "Goods Issued Note";

        const sendCompletedMessageRequest = await axios.post(messageURL, reqBody, { headers: { 'Api-Key': apiKey } });
        await t.expect(sendCompletedMessageRequest.status).eql(200);

        // Validate message in Traffic Manager
        await trafficManagerPage.navigateToTrafficManagerPage();
        await t.click(Selector(trafficManagerPage.tabSearchById));
        await t.typeText(Selector(trafficManagerPage.messageIdInput), messageuniqueid);
        await t.click(Selector(trafficManagerPage.searchButton));
        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Error");
        await trafficManagerPage.assertMessageInfo({
            businessID: reqBody.metadata.businessId,
            processID: reqBody.metadata.processId,
            messageID: messageuniqueid,
            sender: "NK1",
            receiver: "NK2",
            senderDivision: reqBody.metadata.subSource,
            receiverDivision: reqBody.metadata.subDestination,
            messageType: reqBody.metadata.messageType,
            messageSubType: reqBody.metadata.messageSubType,
        });

        await trafficManagerPage.validateMessageDetails();
        await trafficManagerPage.validateMessageJourney();
        await trafficManagerPage.validateMessageEvents();
        await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();
    }
);

fixture`TC_E2E_UC4_002 - Creating send to receive, receive to offRampEndpoint Success journey and posting message`
    .page(baseUrl)
    .beforeEach(async t => {
        await LoginPage.logInSuccessful();
    });

test
.meta({ e2e: 'regression', type1: 'usecaseE2E' })(
    "TC_E2E_UC4_002: Validate Send→Receive journey and Receive→OffRampEndpoint success",
    async t => {
        const { participant, endpoint } = ENV_CONFIG[ENV_NAME];

        // -------- Journey 1: Send → Receive --------
        const sendReceiveJourneyName = `send-receive-journeyS2UC4`;
        await dashBoardPage.selectMember(memberUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

        // Delete conflicting journeys
        await journeysPage.deleteJourneysByPrefixes(t, [
            'send-send',
            'send-receive',
            'receive-receive',
            'receive-offrampfailure',
            'receive-offrampsuccess'
        ]);
        await t.wait(2000);

        const createSendReceiveJourney = async () => {
            await dashBoardPage.navigateToNetworkSetupPage();
            await networkSetupPage.navigateToJourneysPage();

            await journeysPage.setJourneyFieldsSaveAndAssert({
                journeyName: sendReceiveJourneyName,
                senderDivisionOperator: "Not starts with",
                senderDivisionNew: "sub",
                receiverOperator: "Equals",
                receiverName: "NK2",
                receiverDivisionOperator: "Equals",
                receiverDivision: "sub_destination",
                messageStandard: "Agro CloSer XML",
                messageType: "Order",
                messageSubTypeOperator: "Equals",
                messageSubType: "112",
                nextDirection: "Receive",
            });

            await t
                .wait(1000)
                .click(journeysPage.journeysBreadCrumbs)
                .expect(journeysPage.isJourneyPresent(sendReceiveJourneyName))
                .ok('Send-Receive journey not created', { timeout: 10000 });
        };

        await journeysPage.retryUntilSuccess(t, createSendReceiveJourney, sendReceiveJourneyName, 3, 2000);

        // -------- Journey 2: Receive → OffRampEndpoint --------
        const receiveOffRampJourneyName = `receive-offrampsuccess-journeyS2UC4`;
        await t.wait(2000);
        await dashBoardPage.selectMember(memberReceiverUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

        // Delete conflicting journeys again
        await journeysPage.deleteJourneysByPrefixes(t, [
            'send-send',
            'send-receive',
            'receive-receive',
            'receive-offrampfailure',
            'receive-offrampsuccess'
        ]);
        await t.wait(2000);

        const createReceiveOffRampJourney = async () => {
            await dashBoardPage.navigateToNetworkSetupPage();
            await networkSetupPage.navigateToJourneysPage();

            await journeysPage.setJourneyFieldsSaveAndAssert({
                journeyName: receiveOffRampJourneyName,
                direction: "Receive",
                senderDivisionOperator: "Equals",
                senderDivisionNew: "source",
                senderOperator: "Equals",
                senderName: "NK1",
                receiverDivision: "sub_destination",
                messageStandard: "Agro CloSer XML",
                messageType: "Order",
                messageSubTypeOperator: "Equals",
                messageSubType: "112",
                nextDestination: "Connector",
                participant: participant,
                endpoint: endpoint
            });

            await t
                .wait(1000)
                .click(journeysPage.journeysBreadCrumbs)
                .expect(journeysPage.isJourneyPresent(receiveOffRampJourneyName))
                .ok('Receive-OffRamp journey not created', { timeout: 10000 });
        };

        await journeysPage.retryUntilSuccess(t, createReceiveOffRampJourney, receiveOffRampJourneyName, 3, 2000);

        // -------- Post Message --------
        await dashBoardPage.selectMember(memberUC4);

        const reqBody = JSON.parse(JSON.stringify(requestBody));
        reqBody.metadata.messageuniqueid = `sendToreceive_TC_E2E_UC4_002_${Date.now()}`;
        const messageuniqueid = reqBody.metadata.messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;

        reqBody.metadata.subSource = "source";
        reqBody.metadata.subDestination = "sub_destination";
        reqBody.metadata.messageType = "Order";
        reqBody.metadata.messageSubType = "112";

        const sendCompletedMessageRequest = await axios.post(messageURL, reqBody, { headers: { 'Api-Key': apiKey } });
        await t.expect(sendCompletedMessageRequest.status).eql(200);

        // Validate message in Traffic Manager
        await trafficManagerPage.navigateToTrafficManagerPage();
        await t.click(Selector(trafficManagerPage.tabSearchById));
        await t.typeText(Selector(trafficManagerPage.messageIdInput), messageuniqueid);
        await t.click(Selector(trafficManagerPage.searchButton));
        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Completed");
        await trafficManagerPage.assertMessageInfo({
            businessID: reqBody.metadata.businessId,
            processID: reqBody.metadata.processId,
            messageID: messageuniqueid,
            sender: "NK1",
            receiver: receiverName,
            senderDivision: reqBody.metadata.subSource,
            receiverDivision: reqBody.metadata.subDestination,
            messageType: reqBody.metadata.messageType,
            messageSubType: reqBody.metadata.messageSubType,
        });

        await trafficManagerPage.validateMessageDetails();
        await trafficManagerPage.validateMessageJourney();
        await trafficManagerPage.validateMessageEvents();
        await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();
    }
);

fixture`TC_E2E_UC4_003 - Creating send to receive, receive to offRampEndpoint Fail/Error and posting message`
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
    });

test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })(
    "TC_E2E_UC4_003J1: Validate Send → Receive (Fail/Error), TC_E2E_UC4_003J2: Validate Receive → OffRampFailure",
    async t => {
        const { participant, endpointFailure } = ENV_CONFIG[ENV_NAME];

        // -------- Journey 1: Send → Receive --------
        const sendReceiveJourneyName = `send-receive-journeyS3UC4`;
        await dashBoardPage.selectMember(memberUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();
        await journeysPage.deleteJourneysByPrefixes(t, [
            'send-send', 'send-receive', 'receive-receive', 'receive-offrampfailure', 'receive-offrampsuccess'
        ]);
        await t.wait(2000);

        const createSendReceiveJourney = async () => {
            await journeysPage.setJourneyFieldsSaveAndAssert({
                journeyName: sendReceiveJourneyName,
                senderDivisionOperator: "Contains",
                senderDivisionNew: "South",
                receiverOperator: "Equals",
                receiverName: "NK2",
                receiverDivisionOperator: "Equals",
                receiverDivision: "Receiverhub",
                messageStandard: "F4FXml v5",
                messageSubTypeOperator: "Not equals",
                messageType: "financial",
                messageSubType: "Return Invoice",
                nextDirection: "Receive",
            });
        };

        await journeysPage.retryUntilSuccess(t, createSendReceiveJourney, sendReceiveJourneyName, 3, 2000);

        // -------- Journey 2: Receive → OffRampFailure --------
        const receiveOffRampJourneyName = `receive-offrampfailure-journeyS3UC4`;
        await t.wait(2000);
        await dashBoardPage.selectMember(memberReceiverUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();
        await journeysPage.deleteJourneysByPrefixes(t, [
            'send-send', 'send-receive', 'receive-receive', 'receive-offrampfailure', 'receive-offrampsuccess'
        ]);
        await t.wait(2000);

        const createReceiveOffRampJourney = async () => {
            await journeysPage.setJourneyFieldsSaveAndAssert({
                journeyName: receiveOffRampJourneyName,
                direction: "Receive",
                senderOperator: "Not equals",
                senderName: "NK1",
                senderDivisionOperator: "Equals",
                senderDivisionNew: "SouthComp",
                receiverDivisionOperator: "Not equals",
                receiverDivision: "DestReceiver",
                messageStandard: "F4FXml v5",
                messageSubTypeOperator: "Equals",
                messageType: "financial",
                messageSubType: "Dispute",
                nextDestination: "Connector",
                participant: participant,
                endpoint: endpointFailure
            });

            // Add transform stage only for OffRamp journey
            await journeysPage.clickOnEditButton();
            await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
            await journeysPage.saveJourney();
        };

        await journeysPage.retryUntilSuccess(t, createReceiveOffRampJourney, receiveOffRampJourneyName, 3, 2000);

        // -------- Post Message --------
        await dashBoardPage.selectMember(memberUC4);
        requestBody.metadata.messageuniqueid = "sendToreceive_TC_E2E_UC4_003_" + Date.now();
        const messageuniqueid = requestBody.metadata.messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;

        requestBody.metadata.subSource = "sds";
        requestBody.metadata.subDestination = "Receiverhub";
        requestBody.metadata.messageType = "financial";
        requestBody.metadata.messageSubType = "Dispute";

        const sendCompletedMessageRequest = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } });
        await t.expect(sendCompletedMessageRequest.status).eql(200);

        // -------- Validate in Traffic Manager --------
        await trafficManagerPage.navigateToTrafficManagerPage();
        await t.click(Selector(trafficManagerPage.tabSearchById));
        await t.typeText(Selector(trafficManagerPage.messageIdInput), messageuniqueid);
        await t.click(Selector(trafficManagerPage.searchButton));
        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Error");
        await trafficManagerPage.assertMessageInfo({
            businessID: requestBody.metadata.businessId,
            processID: requestBody.metadata.processId,
            messageType: requestBody.metadata.messageType,
            messageSubType: requestBody.metadata.messageSubType,
            messageID: messageuniqueid,
            receiver: receiverName,
            sender: senderName,
            receiverDivision: requestBody.metadata.subDestination,
            senderDivision: requestBody.metadata.subSource
        });

        await trafficManagerPage.validateMessageDetails();
        await trafficManagerPage.validateMessageJourney();
        await trafficManagerPage.validateMessageEvents();
        await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();
    }
);
fixture`TC_E2E_UC4_007 - Creating send to receive journey and posting message`
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
    });

test
.meta({ e2e: 'regression', type1: 'usecaseE2E' })(
    "TC_E2E_UC4_007: Validate user is able to create a Journey, Channel - Send, Next Channel - Receive, Operators - SD(Any)",
    async t => {

        const journeyNamePrefix = 'send-receive-journeyS7UC4';

        // Navigate to Journeys Page before deletion
        await dashBoardPage.selectMember(memberUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

        // Delete existing journeys with same prefixes
        await journeysPage.deleteJourneysByPrefixes(t, [
            'send-send',
            'send-receive',
            'receive-receive',
            'receive-offrampfailure',
            'receive-offrampsuccess'
        ]);
        await t.wait(2000);

        // Retry journey creation until success
        const createJourneyFn = async () => {
            await dashBoardPage.navigateToNetworkSetupPage();
            await networkSetupPage.navigateToJourneysPage();

            // Fill journey fields and save
            await journeysPage.setJourneyFieldsSaveAndAssert({
                journeyName: journeyNamePrefix,
                senderDivisionOperator: "Any",
                receiverOperator: "Equals",
                receiverName: "NK2",
                receiverDivisionOperator: "Equals",
                receiverDivision: "RouteDivision",
                messageStandard: "F4FXml v5",
                messageType: "contract",
                messageSubTypeOperator: "Equals",
                messageSubType: "Import Contract",
                nextDirection: "Receive",
            });

            // Add transform stage and save
            await journeysPage.clickOnEditButton();
            await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
            await journeysPage.saveJourney();
        };

        await journeysPage.retryUntilSuccess(t, createJourneyFn, journeyNamePrefix, 3, 2000);

        // Post message using this journey
        await dashBoardPage.selectMember(memberUC4);
        requestBody.metadata.messageuniqueid = `sendToreceive_TC_E2E_UC4_007_${Date.now()}`;
        const messageuniqueid = requestBody.metadata.messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;

        requestBody.metadata.subSource = "sds";
        requestBody.metadata.subDestination = "RouteDivision";
        requestBody.metadata.messageType = "contract";
        requestBody.metadata.messageSubType = "Import Contract";

        const sendCompletedMessageRequest = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } });
        await t.expect(sendCompletedMessageRequest.status).eql(200);

        // Validate message in Traffic Manager
        await trafficManagerPage.navigateToTrafficManagerPage();
        await t.click(Selector(trafficManagerPage.tabSearchById));
        await t.typeText(Selector(trafficManagerPage.messageIdInput), messageuniqueid);
        await t.click(Selector(trafficManagerPage.searchButton));
        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Error");
        await trafficManagerPage.assertMessageInfo({
            businessID: requestBody.metadata.businessId,
            processID: requestBody.metadata.processId,
            messageID: messageuniqueid,
            sender: senderName,
            receiver: receiverName,
            senderDivision: requestBody.metadata.subSource,
            receiverDivision: requestBody.metadata.subDestination,
            messageType: requestBody.metadata.messageType,
            messageSubType: requestBody.metadata.messageSubType,
        });

        await trafficManagerPage.validateMessageDetails();
        await trafficManagerPage.validateMessageJourney();
        await trafficManagerPage.validateMessageEvents();
        await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();
    }
);


fixture`TC_E2E_UC4_011- Creating send to receive, receive to offRampEndpoint Success and posting message`
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
    });

test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })(
    "TC_E2E_UC4_011J1: Validate user is able to create a Journey, Channel - Send, Next Channel - Receive , Operators - Receiver(Not equals),MessageSubType(Not equals),RD(Not equals,C_E2E_UC4_011J2: Validate user is able to create a Journey, Channel - Receive, Next Channel - OffRampSuccess)",
   async t => {
        
        const { participant, endpoint } = ENV_CONFIG[ENV_NAME];

        // -------- Journey 1: Send → Receive Journey --------
        await dashBoardPage.selectMember(memberUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

        await journeysPage.deleteJourneysByPrefixes(t, [
        'send-send',
        'send-receive',
        'receive-receive',
        'receive-offrampfailure',
        'receive-offrampsuccess'
        ]);
        await t.wait(2000);
        await journeysPage.retryUntilSuccess(async () => {
        await journeysPage.setJourneyFieldsSaveAndAssert({
            journeyName: "send-receive-journeyS11UC4",
            receiverOperator: "Not equals",
            receiverName: "PA11",
            senderDivisionOperator: "Equals",
            senderDivisionNew: "Division_Sender",
            receiverDivisionOperator: "Not equals",
            receiverDivision: "receiverD",
            messageStandard: "F4FXml v4.2",
            messageSubTypeOperator: "Not equals",
            messageType: "F4FInvoice",
            messageSubType: "Tax Invoice",
            nextDirection: "Receive",
        });

        await t
            .wait(1000)
            .click(journeysPage.journeysBreadCrumbs)
            .expect(journeysPage.isJourneyPresent('journeyS11UC4'))
            .ok('Send-Receive journey not created', { timeout: 10000 });
        }, 3); // up to 3 attempts
        
        // -------- Journey 2: Receive → OffRampSuccess Journey --------
        const receiveOffRampJourneyName = `receive-offrampsuccess-journeyS11UC4`;
        await t.wait(2000)
        await dashBoardPage.selectMember(memberReceiverUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

         await journeysPage.deleteJourneysByPrefixes(t, [
        'send-send',
        'send-receive',
        'receive-receive',
        'receive-offrampfailure',
        'receive-offrampsuccess'
        ]);
        await t.wait(2000);
        await journeysPage.retryUntilSuccess(async () => {
        await journeysPage.setJourneyFieldsSaveAndAssert({
            journeyName: receiveOffRampJourneyName,
            direction: "Receive",
            senderOperator: "Equals",
            senderName: "NK1",
            senderDivisionOperator: "Equals",
            senderDivisionNew: "Division_Sender",
            receiverDivisionOperator: "Equals",
            receiverDivision: "Division_Receiver",
            messageStandard: "F4FXml v4.2",
            messageSubTypeOperator: "Equals",
            messageType: "F4FInvoice",
            messageSubType: "Self Bill Credit",
            nextDestination: "Connector",
            participant: participant,
            endpoint: endpoint
        });

        await journeysPage.clickOnEditButton();
        await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
        await journeysPage.saveJourney();

        await t
            .wait(1000)
            .click(journeysPage.journeysBreadCrumbs)
            .expect(journeysPage.isJourneyPresent(receiveOffRampJourneyName))
            .ok('Receive-OffRamp journey not created', { timeout: 10000 });
}, 3); // up to 3 attempts
        // -------- Post Message Using Send → Receive Journey --------
        await dashBoardPage.selectMember(memberUC4);

        const messageuniqueid = `sendToreceive_TC_E2E_UC4_011`;
        requestBody.metadata.messageuniqueid = messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;

        requestBody.metadata.subSource = "Division_Sender";
        requestBody.metadata.subDestination = "Division_Receiver";
        requestBody.metadata.messageType = "F4FInvoice";
        requestBody.metadata.messageSubType = "Self Bill Credit";

        const response = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } });
        await t.expect(response.status).eql(200);

        await trafficManagerPage.navigateToTrafficManagerPage();
        await t.click(Selector(trafficManagerPage.tabSearchById));
        await t.typeText(Selector(trafficManagerPage.messageIdInput), messageuniqueid);
        await t.click(Selector(trafficManagerPage.searchButton));
        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Completed");
        await trafficManagerPage.assertMessageInfo({
            businessID: requestBody.metadata.businessId,
            processID: requestBody.metadata.processId,
            messageType: requestBody.metadata.messageType,
            messageSubType: requestBody.metadata.messageSubType,
            messageID: messageuniqueid,
            receiver: receiverName,
            sender: senderName,
            receiverDivision: requestBody.metadata.subDestination,
            senderDivision: requestBody.metadata.subSource
        });

        await trafficManagerPage.validateMessageDetails();
        await trafficManagerPage.validateMessageJourney();
        await trafficManagerPage.validateMessageEvents();
        await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();

    });

    fixture`TC_E2E_UC4_011 - Creating send to receive, receive to offRampEndpoint Success and posting message`
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
    });

test
.meta({ e2e: 'regression', type1: 'usecaseE2E' })(
    "TC_E2E_UC4_011J1: Validate user is able to create a Journey, Channel - Send, Next Channel - Receive , Operators - Receiver(Not equals), MessageSubType(Not equals), RD(Not equals), TC_E2E_UC4_011J2: Validate user is able to create a Journey, Channel - Receive, Next Channel - OffRampSuccess",
    async t => {
        
        const { participant, endpoint } = ENV_CONFIG[ENV_NAME];

        // -------- Journey 1: Send → Receive Journey --------
        const sendReceiveJourneyName = "send-receive-journeyS11UC4";

        await dashBoardPage.selectMember(memberUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

        await journeysPage.deleteJourneysByPrefixes(t, [
            'send-send',
            'send-receive',
            'receive-receive',
            'receive-offrampfailure',
            'receive-offrampsuccess'
        ]);
        await t.wait(2000);

        await journeysPage.retryUntilSuccess(async () => {
            await journeysPage.setJourneyFieldsSaveAndAssert({
                journeyName: sendReceiveJourneyName,
                receiverOperator: "Not equals",
                receiverName: "PA11",
                senderDivisionOperator: "Equals",
                senderDivisionNew: "Division_Sender",
                receiverDivisionOperator: "Not equals",
                receiverDivision: "receiverD",
                messageStandard: "F4FXml v4.2",
                messageSubTypeOperator: "Not equals",
                messageType: "F4FInvoice",
                messageSubType: "Tax Invoice",
                nextDirection: "Receive",
            });

            await t
                .wait(1000)
                .click(journeysPage.journeysBreadCrumbs)
                .expect(journeysPage.isJourneyPresent(sendReceiveJourneyName))
                .ok('Send-Receive journey not created', { timeout: 10000 });
        }, 3); // up to 3 attempts
        
        // -------- Journey 2: Receive → OffRampSuccess Journey --------
        const receiveOffRampJourneyName = "receive-offrampsuccess-journeyS11UC4";

        await t.wait(2000)
        await dashBoardPage.selectMember(memberReceiverUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

        await journeysPage.deleteJourneysByPrefixes(t, [
            'send-send',
            'send-receive',
            'receive-receive',
            'receive-offrampfailure',
            'receive-offrampsuccess'
        ]);
        await t.wait(2000);

        await journeysPage.retryUntilSuccess(async () => {
            await journeysPage.setJourneyFieldsSaveAndAssert({
                journeyName: receiveOffRampJourneyName,
                direction: "Receive",
                senderOperator: "Equals",
                senderName: "NK1",
                senderDivisionOperator: "Equals",
                senderDivisionNew: "Division_Sender",
                receiverDivisionOperator: "Equals",
                receiverDivision: "Division_Receiver",
                messageStandard: "F4FXml v4.2",
                messageSubTypeOperator: "Equals",
                messageType: "F4FInvoice",
                messageSubType: "Self Bill Credit",
                nextDestination: "Connector",
                participant: participant,
                endpoint: endpoint
            });

            await journeysPage.clickOnEditButton();
            await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
            await journeysPage.saveJourney();

            await t
                .wait(1000)
                .click(journeysPage.journeysBreadCrumbs)
                .expect(journeysPage.isJourneyPresent(receiveOffRampJourneyName))
                .ok('Receive-OffRamp journey not created', { timeout: 10000 });
        }, 3); // up to 3 attempts

        // -------- Post Message Using Send → Receive Journey --------
        await dashBoardPage.selectMember(memberUC4);

        const messageuniqueid = `sendToreceive_TC_E2E_UC4_011_${Date.now()}`;
        requestBody.metadata.messageuniqueid = messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;

        requestBody.metadata.subSource = "Division_Sender";
        requestBody.metadata.subDestination = "Division_Receiver";
        requestBody.metadata.messageType = "F4FInvoice";
        requestBody.metadata.messageSubType = "Self Bill Credit";

        const response = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } });
        await t.expect(response.status).eql(200);

        await trafficManagerPage.navigateToTrafficManagerPage();
        await t.click(Selector(trafficManagerPage.tabSearchById));
        await t.typeText(Selector(trafficManagerPage.messageIdInput), messageuniqueid);
        await t.click(Selector(trafficManagerPage.searchButton));
        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Completed");
        await trafficManagerPage.assertMessageInfo({
            businessID: requestBody.metadata.businessId,
            processID: requestBody.metadata.processId,
            messageType: requestBody.metadata.messageType,
            messageSubType: requestBody.metadata.messageSubType,
            messageID: messageuniqueid,
            receiver: receiverName,
            sender: senderName,
            receiverDivision: requestBody.metadata.subDestination,
            senderDivision: requestBody.metadata.subSource
        });

        await trafficManagerPage.validateMessageDetails();
        await trafficManagerPage.validateMessageJourney();
        await trafficManagerPage.validateMessageEvents();
        await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();

    }
);


fixture`TC_E2E_UC4_018- Creating send to receive, receive to offRampEndpoint Failure and posting message`
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
    });

test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })(
    "TC_E2E_UC4_018: Validate user can create journeys (Send→Receive, Receive→OffRampFailure) and post a message",
    async (t) => {
        const { participant, endpointFailure } = ENV_CONFIG[ENV_NAME];

        // -------- Journey 1: Send → Receive --------
        await dashBoardPage.selectMember(memberUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

        await journeysPage.deleteJourneysByPrefixes(t, [
            'send-send',
            'send-receive',
            'receive-receive',
            'receive-offrampfailure',
            'receive-offrampsuccess'
        ]);
        await t.wait(2000);

        const sendReceiveJourneyName = "send-receive-journeyS18UC4";

        await journeysPage.retryUntilSuccess(async () => {
            await journeysPage.setJourneyFieldsSaveAndAssert({
                journeyName: sendReceiveJourneyName,
                receiverOperator: "Equals",
                receiverName: "NK2",
                senderDivisionOperator: "Not contains",
                senderDivisionNew: "test1",
                receiverDivisionOperator: "Equals",
                receiverDivision: "test2",
                messageStandard: "F4FXml v4.2",
                messageSubTypeOperator: "Any",
                messageType: "F4FInvoice",
                nextDirection: "Receive",
            });

            await t
                .wait(1000)
                .click(journeysPage.journeysBreadCrumbs)
                .expect(journeysPage.isJourneyPresent(sendReceiveJourneyName))
                .ok('Send-Receive journey not created', { timeout: 10000 });
        }, 3);

        // -------- Journey 2: Receive → OffRampFailure --------
        await dashBoardPage.selectMember(memberReceiverUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

        await journeysPage.deleteJourneysByPrefixes(t, [
            'send-send',
            'send-receive',
            'receive-receive',
            'receive-offrampfailure',
            'receive-offrampsuccess'
        ]);
        await t.wait(2000);

        const receiveOffRampJourneyName = "receive-offrampfailure-journeyS18UC4";

        await journeysPage.retryUntilSuccess(async () => {
            await journeysPage.setJourneyFieldsSaveAndAssert({
                journeyName: receiveOffRampJourneyName,
                direction: "Receive",
                senderOperator: "Equals",
                senderName: "NK1",
                senderDivisionOperator: "Not Starts with",
                senderDivisionNew: "test",
                receiverDivisionOperator: "Equals",
                receiverDivision: "test2",
                messageStandard: "F4FXml v4.2",
                messageSubTypeOperator: "Equals",
                messageType: "F4FInvoice",
                messageSubType: "Recharge",
                nextDestination: "Connector",
                participant: participant,
                endpoint: endpointFailure
            });

            await journeysPage.clickOnEditButton();
            await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL','offRamp');
            await journeysPage.saveJourney();

            await t
                .wait(1000)
                .click(journeysPage.journeysBreadCrumbs)
                .expect(journeysPage.isJourneyPresent(receiveOffRampJourneyName))
                .ok('Receive-OffRampFailure journey not created', { timeout: 10000 });
        }, 3);

        // -------- Post Message --------
        await dashBoardPage.selectMember(memberUC4);

        const messageuniqueid = `sendToreceive_TC_E2E_UC4_018_${Date.now()}`;
        requestBody.metadata.messageuniqueid = messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;

        requestBody.metadata.subSource = "source1";
        requestBody.metadata.subDestination = "test2";
        requestBody.metadata.messageType = "F4FInvoice";
        requestBody.metadata.messageSubType = "Recharge";

        const response = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } });
        await t.expect(response.status).eql(200);

        await trafficManagerPage.navigateToTrafficManagerPage();
        await t.click(Selector(trafficManagerPage.tabSearchById));
        await t.typeText(Selector(trafficManagerPage.messageIdInput), messageuniqueid);
        await t.click(Selector(trafficManagerPage.searchButton));
        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Error");
        await trafficManagerPage.assertMessageInfo({
            businessID: requestBody.metadata.businessId,
            processID: requestBody.metadata.processId,
            messageType: requestBody.metadata.messageType,
            messageSubType: requestBody.metadata.messageSubType,
            messageID: messageuniqueid,
            receiver: receiverName,
            sender: senderName,
            receiverDivision: requestBody.metadata.subDestination,
            senderDivision: requestBody.metadata.subSource
        });

        await trafficManagerPage.validateMessageDetails();
        await trafficManagerPage.validateMessageJourney();
        await trafficManagerPage.validateMessageEvents();
        await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();

   });

fixture`TC_E2E_UC4_019 - Creating send to receive, receive to receive and posting message`
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
    });

test
.meta({ e2e: 'regression', type1: 'usecaseE2E' })(
    "TC_E2E_UC4_019J1: Validate user is able to create a Journey, Channel - Send, Next Channel - Receive , Operators - RD(Not Starts with), TC_E2E_UC4_019J2: Validate user is able to create a Journey, Channel - Receive, Next Channel - OffRampFailure, Operators - RD(Any)",
    async t => {
        const { participant, endpointFailure } = ENV_CONFIG[ENV_NAME];

        // -------- Journey 1: Send → Receive Journey --------
        const sendReceiveJourneyName = "send-receive-journeyS19UC4";

        await dashBoardPage.selectMember(memberUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

        await journeysPage.deleteJourneysByPrefixes(t, [
            'send-send',
            'send-receive',
            'receive-receive',
            'receive-offrampfailure',
            'receive-offrampsuccess'
        ]);
        await t.wait(2000);

        await journeysPage.retryUntilSuccess(async () => {
            await journeysPage.setJourneyFieldsSaveAndAssert({
                journeyName: sendReceiveJourneyName,
                receiverOperator: "Equals",
                receiverName: "NK2",
                senderDivisionOperator: "Equals",
                senderDivisionNew: "agri Source",
                receiverDivisionOperator: "Not starts with",
                receiverDivision: "dest",
                messageStandard: "F4FXml v5",
                messageSubTypeOperator: "Equals",
                messageType: "financial",
                messageSubType: "Return Credit",
                nextDirection: "Receive",
            });

            await journeysPage.clickOnEditButton();
            await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
            await journeysPage.saveJourney();

            await t
                .wait(1000)
                .click(journeysPage.journeysBreadCrumbs)
                .expect(journeysPage.isJourneyPresent(sendReceiveJourneyName))
                .ok('Send-Receive journey not created', { timeout: 10000 });
        }, 3); // up to 3 attempts

        // -------- Journey 2: Receive → OffRampFailure Journey --------
        const receiveOffRampJourneyName = "receive-offrampfailure-journeyS19UC4";

        await t.wait(2000)
        await dashBoardPage.selectMember(memberReceiverUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

        await journeysPage.deleteJourneysByPrefixes(t, [
            'send-send',
            'send-receive',
            'receive-receive',
            'receive-offrampfailure',
            'receive-offrampsuccess'
        ]);
        await t.wait(2000);

        await journeysPage.retryUntilSuccess(async () => {
            await journeysPage.setJourneyFieldsSaveAndAssert({
                journeyName: receiveOffRampJourneyName,
                direction: "Receive",
                senderOperator: "Equals",
                senderName: "NK1",
                senderDivisionOperator: "Equals",
                senderDivisionNew: "agri Source",
                receiverDivisionOperator: "Any",
                messageStandard: "F4FXml v5",
                messageSubTypeOperator: "Equals",
                messageType: "financial",
                messageSubType: "Return Credit",
                nextDestination: "Connector",
                participant: participant,
                endpoint: endpointFailure
            });

            await journeysPage.clickOnEditButton();
            await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
            await journeysPage.saveJourney();

            await t
                .wait(1000)
                .click(journeysPage.journeysBreadCrumbs)
                .expect(journeysPage.isJourneyPresent(receiveOffRampJourneyName))
                .ok('Receive-OffRampFailure journey not created', { timeout: 10000 });
        }, 3); // up to 3 attempts

        // -------- Post Message Using Send → Receive Journey --------
        await dashBoardPage.selectMember(memberUC4);

        const messageuniqueid = `sendToreceive_TC_E2E_UC4_019_${Date.now()}`;
        requestBody.metadata.messageuniqueid = messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;

        requestBody.metadata.subSource = "agri Source";
        requestBody.metadata.subDestination = "test2";
        requestBody.metadata.messageType = "financial";
        requestBody.metadata.messageSubType = "seed";

        const response = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } });
        await t.expect(response.status).eql(200);

        await trafficManagerPage.navigateToTrafficManagerPage();
        await t.click(Selector(trafficManagerPage.tabSearchById));
        await t.typeText(Selector(trafficManagerPage.messageIdInput), messageuniqueid);
        await t.click(Selector(trafficManagerPage.searchButton));
        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Error");
        await trafficManagerPage.assertMessageInfo({
            businessID: requestBody.metadata.businessId,
            processID: requestBody.metadata.processId,
            messageType: requestBody.metadata.messageType,
            messageSubType: requestBody.metadata.messageSubType,
            messageID: messageuniqueid,
            receiver: receiverName,
            sender: senderName,
            receiverDivision: requestBody.metadata.subDestination,
            senderDivision: requestBody.metadata.subSource
        });

        await trafficManagerPage.validateMessageDetails();
        await trafficManagerPage.validateMessageJourney();
        await trafficManagerPage.validateMessageEvents();
        await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();
    }
);

fixture`TC_E2E_UC4_022- Creating send to send journey and posting message`
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
    });

test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })(
    "TC_E2E_UC4_022: Validate user is able to create a Journey, Channel - Send, Next Channel - Send, Operators - RD(Any)",
    async (t) => {

        // -------- Create send-send journey --------
        await dashBoardPage.selectMember(memberUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

        // Clean up old journeys
        await journeysPage.deleteJourneysByPrefixes(t, [
            'send-send',
            'send-receive',
            'receive-receive',
            'receive-offrampfailure',
            'receive-offrampsuccess'
        ]);
        await t.wait(2000);

        const journeyName = "send-send-journeyS22UC4";

        await journeysPage.retryUntilSuccess(async () => {
            await journeysPage.setJourneyFieldsSaveAndAssert({
                journeyName: journeyName,
                senderDivisionOperator: "Equals",
                senderDivisionNew: "ss_source",
                receiverOperator: "Equals",
                receiverName: "NK2",
                receiverDivisionOperator: "Any",
                messageStandard: "F4FXml v5",
                messageType: "movement",
                messageSubType: "Weighbridge Ticket",
                messageSubTypeOperator: "Equals",
                nextDirection: "Send",
            });

            await journeysPage.clickOnEditButton();
            await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
            await journeysPage.saveJourney();

            await t
                .wait(1000)
                .click(journeysPage.journeysBreadCrumbs)
                .expect(journeysPage.isJourneyPresent(journeyName))
                .ok('Send-send journey not created', { timeout: 10000 });
        }, 3); // up to 3 attempts

        // -------- Post message --------
        await dashBoardPage.selectMember(memberUC4);

        const messageuniqueid = `sendTosend_TC_E2E_UC4_022_${Date.now()}`;
        requestBody.metadata.messageuniqueid = messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;

        requestBody.metadata.subSource = "ss_source";
        requestBody.metadata.subDestination = "ss";
        requestBody.metadata.messageType = "movement";
        requestBody.metadata.messageSubType = "Weighbridge Ticket";

        const response = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } });
        await t.expect(response.status).eql(200);

        await trafficManagerPage.navigateToTrafficManagerPage();
        await t.click(Selector(trafficManagerPage.tabSearchById));
        await t.typeText(Selector(trafficManagerPage.messageIdInput), messageuniqueid);
        await t.click(Selector(trafficManagerPage.searchButton));
        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Error");
        await trafficManagerPage.assertMessageInfo({
            businessID: requestBody.metadata.businessId,
            processID: requestBody.metadata.processId,
            messageID: messageuniqueid,
            sender: senderName,
            receiver: receiverName,
            senderDivision: requestBody.metadata.subSource,
            receiverDivision: requestBody.metadata.subDestination,
            messageType: requestBody.metadata.messageType,
            messageSubType: requestBody.metadata.messageSubType,
        });

        await trafficManagerPage.validateMessageDetails();
        await trafficManagerPage.validateMessageJourney();
        await trafficManagerPage.validateMessageEvents();
        await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();
    });

    fixture`TC_E2E_UC4_024- Creating send to receive, receive to offRampEndpoint Failure and posting message`
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
    });

test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })(
    "TC_E2E_UC4_024J1: Validate user is able to create a Journey, Channel - Send, Next Channel - Receive , Operators - RD(Contains),MessageType(Not equals) ,TC_E2E_UC4_024J2: Validate user is able to create a Journey, Channel - Receive, Next Channel - OffRampFailiure, Operators - SD(Not contains),MessageType(Any)",
    async (t) => {

        // -------- Create Send -> Receive Journey --------
        const sendReceiveJourneyName = `send-receive-journeyS24UC4`;
        await dashBoardPage.selectMember(memberUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

        await journeysPage.deleteJourneysByPrefixes(t, [
            'send-send',
            'send-receive',
            'receive-receive',
            'receive-offrampfailure',
            'receive-offrampsuccess'
        ]);
        await t.wait(2000);

        await journeysPage.retryUntilSuccess(async () => {
            await journeysPage.setJourneyFieldsSaveAndAssert({
                journeyName: sendReceiveJourneyName,
                receiverOperator: "Equals",
                receiverName: "NK2",
                senderDivisionOperator: "Equals",
                senderDivisionNew: "ss",
                receiverDivisionOperator: "Contains",
                receiverDivision: "source",
                messageStandard: "F4FXml v4.2",
                messageSubTypeOperator: "Not equals",
                messageSubType: "Invoice",
                messageType: "F4FInvoice",
                nextDirection: "Receive",
            });

            await journeysPage.clickOnEditButton();
            await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
            await journeysPage.saveJourney();

            await t
                .wait(1000)
                .click(journeysPage.journeysBreadCrumbs)
                .expect(journeysPage.isJourneyPresent(sendReceiveJourneyName))
                .ok('Send-Receive journey not created', { timeout: 10000 });
        }, 3);

        // -------- Create Receive -> OffRampFailure Journey --------
        const { participant, endpointFailure } = ENV_CONFIG[ENV_NAME];
        const receiveOfframpJourneyName = `receive-offrampfailure-journeyS24UC4`;

        await t.wait(2000);
        await dashBoardPage.selectMember(memberReceiverUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

        await journeysPage.deleteJourneysByPrefixes(t, [
            'send-send',
            'send-receive',
            'receive-receive',
            'receive-offrampfailure',
            'receive-offrampsuccess'
        ]);
        await t.wait(2000);

        await journeysPage.retryUntilSuccess(async () => {
            await journeysPage.setJourneyFieldsSaveAndAssert({
                journeyName: receiveOfframpJourneyName,
                direction: "Receive",
                senderOperator: "Equals",
                senderName: "NK1",
                senderDivisionOperator: "Not contains",
                senderDivisionNew: "test",
                receiverDivisionOperator: "Equals",
                receiverDivision: "source_sub",
                messageStandard: "F4FXml v4.2",
                messageSubTypeOperator: "Any",
                messageType: "F4FInvoice",
                nextDestination: "Connector",
                participant: participant,
                endpoint: endpointFailure
            });

            await journeysPage.clickOnEditButton();
            await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
            await journeysPage.saveJourney();

            await t
                .wait(1000)
                .click(journeysPage.journeysBreadCrumbs)
                .expect(journeysPage.isJourneyPresent(receiveOfframpJourneyName))
                .ok('Receive-OffRampFailure journey not created', { timeout: 10000 });
        }, 3);

        // -------- Post Message using Send -> Receive Journey --------
        await dashBoardPage.selectMember(memberUC4);

        const messageuniqueid = `sendToreceive_TC_E2E_UC4_024_${Date.now()}`;
        requestBody.metadata.messageuniqueid = messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;

        requestBody.metadata.subSource = "ss";
        requestBody.metadata.subDestination = "source_sub";
        requestBody.metadata.messageType = "F4FInvoice";
        requestBody.metadata.messageSubType = "Invoice";

        const response = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } });
        await t.expect(response.status).eql(200);

        // -------- Validate in Traffic Manager --------
        await trafficManagerPage.navigateToTrafficManagerPage();
        await t.click(Selector(trafficManagerPage.tabSearchById));
        await t.typeText(Selector(trafficManagerPage.messageIdInput), messageuniqueid);
        await t.click(Selector(trafficManagerPage.searchButton));

        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Error");

        await trafficManagerPage.assertMessageInfo({
            businessID: requestBody.metadata.businessId,
            processID: requestBody.metadata.processId,
            messageID: messageuniqueid,
            receiver: receiverName,
            sender: senderName,
            receiverDivision: requestBody.metadata.subDestination,
            senderDivision: requestBody.metadata.subSource,
            messageType: requestBody.metadata.messageType,
            messageSubType: requestBody.metadata.messageSubType
        });

        await trafficManagerPage.validateMessageDetails();
        await trafficManagerPage.validateMessageJourney();
        await trafficManagerPage.validateMessageEvents();
        await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();
    });

fixture`TC_E2E_UC4_027- Creating receive to receive journey and posting message`
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
    });

test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })(
    "TTC_E2E_UC4_027: Validate user is able to create a Journey, Channel - receive, Next Channel - receive , Operators - RD(Any)",
      async t => {
        // -------- Create Receive -> Receive Journey --------
        const receiveReceiveJourneyName = `receive-receive-journeyS27UC4`;
        await t.wait(2000)
        await dashBoardPage.selectMember(memberReceiverUC4);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();

        // Optional: delete previous journeys with same prefix
        await journeysPage.deleteJourneysByPrefixes(t, [
        'send-send',
        'send-receive',
        'receive-receive',
        'receive-offrampfailure',
        'receive-offrampsuccess'
        ]);
        await t.wait(2000);
        await journeysPage.retryUntilSuccess(async () => {
        await journeysPage.setJourneyFieldsSaveAndAssert({
            journeyName: "receive-receive-journeyS27UC4",
            direction: "Receive",
            senderOperator: "Equals",
            senderName: "NK1",
            senderDivisionOperator: "Equals",
            senderDivisionNew: "ss",
            receiverDivisionOperator: "Any",
            messageStandard: "F4FXml v4.2",
            messageType: "F4FShipmentNote",
            messageSubType: "Shipment Intention",
            messageSubTypeOperator: "Equals"
        });

        // Add valid transform first
        await journeysPage.clickOnEditButton();
        await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
        await journeysPage.saveJourney();

        // Add invalid transform next
        await journeysPage.clickOnEditButton();
        await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
        await journeysPage.saveJourney();

        await t
            .wait(1000)
            .click(journeysPage.journeysBreadCrumbs)
            .expect(journeysPage.isJourneyPresent(receiveReceiveJourneyName))
            .ok('Receive->Receive journey not created', { timeout: 10000 });
 }, 3); // up to 3 attempts
        // -------- Post Message using Receive->Receive Journey --------
        await dashBoardPage.selectMember(memberUC4);
        const messageuniqueid = `receiveToreceive_TC_E2E_UC4_027`;
        requestBody.metadata.messageuniqueid = messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;

        requestBody.metadata.subSource = "source";
        requestBody.metadata.subDestination = "sd";
        requestBody.metadata.messageType = "movement";
        requestBody.metadata.messageSubType = "Shipment Intention";

        const response = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } });
        await t.expect(response.status).eql(200);

        // -------- Validate in Traffic Manager --------
        await trafficManagerPage.navigateToTrafficManagerPage();
        await t.click(Selector(trafficManagerPage.tabSearchById));
        await t.typeText(Selector(trafficManagerPage.messageIdInput), messageuniqueid);
        await t.click(Selector(trafficManagerPage.searchButton));

        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Error");
        await trafficManagerPage.assertMessageInfo({
            businessID: requestBody.metadata.businessId,
            processID: requestBody.metadata.processId,
            messageID: messageuniqueid,
            sender: senderName,
            receiver: receiverName,
            senderDivision: requestBody.metadata.subSource,
            receiverDivision: requestBody.metadata.subDestination,
            messageType: requestBody.metadata.messageType,
            messageSubType: requestBody.metadata.messageSubType
        });

        await trafficManagerPage.validateMessageDetails();
        await trafficManagerPage.validateMessageJourney();
        await trafficManagerPage.validateMessageEvents();
        await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();
   
    });

fixture`TC_E2E_UC4_028 - Validating Xpath Metadata Transform `
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(memberUC4);
    });
//Journey id 27327  and 27328, NK1 and NK2 (dev)
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC4_028: Posting message using pre existing journey send -> receive -> OfframpSuccess, positive scenario",  async (t) => {
             // Create a deep copy of the requestBody
            const requestBodyFor028 = JSON.parse(JSON.stringify(requestBody));
            // Update messageuniqueid,subSource,subDestination,messageType and messageSubType in requestBody 
            requestBodyFor028.metadata.messageuniqueid = "XpathMetadataTransformUC4_028" + Date.now();
            requestBodyFor028.metadata.subSource = "SD-XpathMetadata"
            requestBodyFor028.metadata.subDestination = "RD-XpathMetadata"
            requestBodyFor028.metadata.messageType = "ownership";
            requestBodyFor028.metadata.messageSubType = "Inventory Level";
            // Send request
            const sendCompletedMessageRequest = await axios.post(messageURL, requestBodyFor028, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
            await t.expect(sendCompletedMessageRequest.status).eql(200); // Asserting response code
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBodyFor028.metadata.messageuniqueid;
            t.fixtureCtx.messageuniqueid = messageuniqueid;
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.searchByPNMessageId(messageuniqueid);
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.viewMessage();
            await trafficManagerPage.verifyMessageStatus("Completed");
            await trafficManagerPage.assertMessageInfo({ businessID: requestBody.metadata.businessId, processID: requestBody.metadata.processId, messageType: requestBodyFor028.metadata.messageType, messageID: messageuniqueid, receiver: receiverName, receiverDivision: requestBodyFor028.metadata.subDestination, sender: senderName, senderDivision: requestBodyFor028.metadata.subSource });
            await trafficManagerPage.validateMessageDetails();
            await trafficManagerPage.validateMessageJourney();
            await trafficManagerPage.verifyOrderOfTrackingPoints(["ON_RAMP","SEND","TRANSFORM","RECEIVE","OFF_RAMP","COMPLETE"]);
            await trafficManagerPage.assertAllTimestampsInTimeOrderOnly();
            await trafficManagerPage.validateMessageEvents();
            await trafficManagerPage.verifyTransformPayloadFormat({mappingKey: 'mappingOriginalPayloadXML'});
            await trafficManagerPage.downloadPayload();
            await trafficManagerPage.exceptionValidation();
            await trafficManagerPage.assertMetadataKeyValue('manualTestMetadata', '40374171860') 
            await trafficManagerPage.clickMessagePayloadCloseIcon();
        }
    );
module.exports = {ENV_CONFIG,payload,requestBody};