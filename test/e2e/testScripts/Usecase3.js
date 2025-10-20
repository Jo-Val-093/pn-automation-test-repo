import { test, Selector } from "testcafe";
import { baseUrl } from "../helpers/configuration";
import LoginPage from "../pages/logInPage";
import dashBoardPage from "../pages/dashBoardPage";
import adminPage from "../pages/adminPage";
import companiesPage from "../pages/companiesPage";
import networkSetupPage from "../pages/networkSetupPage";
import journeysPage from "../pages/journeysPage";
import trafficManagerPage from "../pages/trafficManagerPage";
import axios from "axios";
import fs from 'fs';

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var member = repo.testData.member
var sourcePNID = repo.testData.sourcePNID
var destinationPNID = repo.testData.destinationPNID
var subSource = repo.testData.subSource
var subDestination = repo.testData.subDestination
var messageSubType = repo.testData.messageSubType
var receiverAsMember = repo.testData.receiverAsMember
var senderName = repo.testData.senderName
var receiverName = repo.testData.receiverName

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
    subDestination: subDestination,
    messageType: "financial",
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

fixture`TC_E2E_UC3_001 - Validating transl, transl_id2 and transl_id3 service type`
  .page(baseUrl)
  .beforeEach(async (t) => {
    await LoginPage.logInSuccessful();
  });
test //TC_E2E_UC3_001-part1
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC3_001-part1: Validate user is able to create a Journey, send to receive",
  async (t) => {
    // send to receive journey
    await dashBoardPage.selectMember(member);
    await dashBoardPage.navigateToNetworkSetupPage();
    await networkSetupPage.navigateToJourneysPage();
    await journeysPage.setJourneyFieldsSaveAndAssert({
      // Define the fields object with the values you want to create the journey for
      journeyName: "send-receive-journey",
      senderDivisionOperator: "Equals",
      receiverOperator: "Equals",
      receiverName: "Test456",
      receiverDivisionOperator: "Equals",
      receiverDivision: "RD",
      messageStandard: "F4FXml v5",
      messageType: "financial",
      nextDirection: "Receive",
    });
  }
);
test //TC_E2E_UC3_001-part2
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC3_001-part2: Validate user is able to create a Journey, receive to OffRampEndpoint (JMS.SOLACE.SuccessQueue)",
    async (t) => {
          const { participant, endpoint } = ENV_CONFIG[ENV_NAME];
    // receive to offramp endpoint (JMS.SOLACE.SuccessQueue) journey
    await dashBoardPage.selectMember(receiverAsMember);
    await dashBoardPage.navigateToNetworkSetupPage();
    await networkSetupPage.navigateToJourneysPage();
    await journeysPage.setJourneyFieldsSaveAndAssert({
        // Define the fields object with the values you want to create the journey for
        journeyName: "receive-OffRampEndpoint-JQ-journey",
        direction: "Receive",
        senderOperator: "Equals",
        senderName: "Test123",
        senderDivisionOperator: "Equals",
        senderDivision: "SD",
        receiverDivisionOperator: "Equals",
        receiverDivision: "RD",
        messageStandard: "F4FXml v5",
        messageType: "financial",
        nextDestination: "Connector",
        participant: participant,
        endpoint: endpoint
      });

    await journeysPage.clickOnEditButton();
    await journeysPage.addCodeMatcherStageToJourney();
    await journeysPage.saveJourney();
  }
);
test //TC_E2E_UC3_001-part3
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC3_001-part3: Posting message using send to receive & receive OffRampEndpoint(JMS.SOLACE.SuccessQueue) journey",
    async (t) => {
      try {
        // Update the subSource and messageuniqueid in requestBody
          requestBody.metadata.messageuniqueid = "sendToReceiveToJMSSuccessQ_testcafe_" + Date.now();
          requestBody.metadata.subSource = t.fixtureCtx.updatedSenderDivision;

        // send request
        const sendCompletedMessagRequest = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
        await t.expect(sendCompletedMessagRequest.status).eql(200); // Asserting response code
        // Save messageuniqueid to fixture context
        const messageuniqueid = requestBody.metadata.messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;
        await dashBoardPage.selectMember(member);
        await trafficManagerPage.navigateToTrafficManagerPage();
        await t.click(Selector(trafficManagerPage.tabSearchById));
        await t.typeText(Selector(trafficManagerPage.messageIdInput),messageuniqueid);
        await t.click(Selector(trafficManagerPage.searchButton));
        await trafficManagerPage.verifyMessageStatus("Completed");
        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Completed");
      } catch (error) {
        console.error('Test failed with error:', error);
        throw error; // Ensure the test fails and provides feedback
      }
      await trafficManagerPage.assertMessageInfo({
        businessID: requestBody.metadata.businessId,
        processID:  requestBody.metadata.processId,
        messageType: t.fixtureCtx.updatedMessageType,
        messageID: t.fixtureCtx.messageuniqueid,
        receiver:receiverName,
        receiverDivision: requestBody.metadata.subDestination,
        sender:senderName,
        senderDivision:requestBody.metadata.subSource
    })
    
    await trafficManagerPage.validateMessageDetails();
    await trafficManagerPage.validateMessageJourney();
    await trafficManagerPage.validateMessageEvents();
    await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();
  }
);

fixture`TC_E2E_UC3_002 - Validating transl_full service type`
  .page(baseUrl)
  .beforeEach(async (t) => {
    await LoginPage.logInSuccessful();
  });
test //TC_E2E_UC3_002-part1
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC3_002-part1: Validate user is able to create a Journey, send to receive",
  async (t) => {
    // send to receive journey
    await dashBoardPage.selectMember(member);
    await dashBoardPage.navigateToNetworkSetupPage();
    await networkSetupPage.navigateToJourneysPage();
    await journeysPage.setJourneyFieldsSaveAndAssert({
      // Define the fields object with the values you want to create the journey for
      journeyName: "send-receive-journey",
      senderDivisionOperator: "Equals",
      receiverOperator: "Equals",
      receiverName: "Test456",
      receiverDivisionOperator: "Equals",
      receiverDivision: "RD",
      messageStandard: "F4FXml v5",
      messageType: "movement",
      nextDirection: "Receive",
    });
  }
);
test //TC_E2E_UC3_002-part2
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC3_002-part2: Validate user is able to create a Journey, receive to OffRampEndpoint (JMS.SOLACE.SuccessQueue)",
    async (t) => {
          const { participant, endpoint } = ENV_CONFIG[ENV_NAME];
    // receive to offramp endpoint (JMS.SOLACE.SuccessQueue) journey
    await dashBoardPage.selectMember(receiverAsMember);
    await dashBoardPage.navigateToNetworkSetupPage();
    await networkSetupPage.navigateToJourneysPage();
    await journeysPage.setJourneyFieldsSaveAndAssert({
        // Define the fields object with the values you want to create the journey for
        journeyName: "receive-OffRampEndpoint-JQ-journey",
        direction: "Receive",
        senderOperator: "Equals",
        senderName: "Test123",
        senderDivisionOperator: "Equals",
        senderDivision: "SD",
        receiverDivisionOperator: "Equals",
        receiverDivision: "RD",
        messageStandard: "F4FXml v5",
        messageType: "movement",
        nextDestination: "Connector",
        participant: participant,
        endpoint: endpoint
      });

    await journeysPage.clickOnEditButton();
    await journeysPage.addCodeMatcherStageToJourney();
    await journeysPage.saveJourney();
  }
);
test //TC_E2E_UC3_002-part3
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC3_002-part3: Posting message using send to receive & receive OffRampEndpoint(JMS.SOLACE.SuccessQueue) journey",
    async (t) => {
        // Create a deep copy of the requestBody
        const requestBodyFor002P3 = JSON.parse(JSON.stringify(requestBody));
        // Update the subSource, messageuniqueid and message type in requestBody
        requestBodyFor002P3.metadata.messageuniqueid = "sendToReceiveToJMSSuccessQ_testcafe_" + Date.now();
        requestBodyFor002P3.metadata.subSource = t.fixtureCtx.updatedSenderDivision;
        requestBodyFor002P3.metadata.messageType = "movement";        
        // send request
        const sendCompletedMessagRequest = await axios.post(messageURL, requestBodyFor002P3, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
        await t.expect(sendCompletedMessagRequest.status).eql(200); // Asserting response code
        // Save messageuniqueid to fixture context
        const messageuniqueid = requestBodyFor002P3.metadata.messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;
        await dashBoardPage.selectMember(member);
        await trafficManagerPage.navigateToTrafficManagerPage();
        await t.click(Selector(trafficManagerPage.tabSearchById));
        await t.typeText(Selector(trafficManagerPage.messageIdInput),messageuniqueid);
        await t.click(Selector(trafficManagerPage.searchButton));
        await trafficManagerPage.verifyMessageStatus("Completed");
        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Completed");
        await trafficManagerPage.assertMessageInfo({
        businessID: requestBody.metadata.businessId,
        processID:  requestBody.metadata.processId,
        messageType: t.fixtureCtx.updatedMessageType,
        messageID: t.fixtureCtx.messageuniqueid,
        receiver:receiverName,
        receiverDivision: requestBody.metadata.subDestination,
        sender:senderName,
        senderDivision:requestBodyFor002P3.metadata.subSource
    })
    
    await trafficManagerPage.validateMessageDetails();
    await trafficManagerPage.validateMessageJourney();
    await trafficManagerPage.validateMessageEvents();
    await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();
  }
);

//The transl_addmissing service type will only add the source code to the catalogue if it's missing. However, due to the lack of a match between the sender and receiver code types, the message will consistently be placed in a "Held" status.

fixture`TC_E2E_UC3_003 - Verifying Held Message Status When No Match Exists Between Source and Receiver Code Types with transl_addmissing Service type`
  .page(baseUrl)
  .beforeEach(async (t) => {
    await LoginPage.logInSuccessful();
  });
test //TC_E2E_UC3_003-part1
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC3_003-part1: Validate user is able to create a Journey, send to receive",
  async (t) => {
    // send to receive journey
    await dashBoardPage.selectMember(member);
    await dashBoardPage.navigateToNetworkSetupPage();
    await networkSetupPage.navigateToJourneysPage();
    await journeysPage.setJourneyFieldsSaveAndAssert({
      // Define the fields object with the values you want to create the journey for
      journeyName: "send-receive-journey",
      senderDivisionOperator: "Equals",
      receiverOperator: "Equals",
      receiverName: "Test456",
      receiverDivisionOperator: "Equals",
      receiverDivision: "RD",
      messageStandard: "F4FXml v5",
      messageType: "execution",
      nextDirection: "Receive",
    });
  }
);
test //TC_E2E_UC3_003-part2
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC3_003-part2: Validate user is able to create a Journey, receive to OffRampEndpoint (JMS.SOLACE.SuccessQueue)",
    async (t) => {
          const { participant, endpoint } = ENV_CONFIG[ENV_NAME];
    // receive to offramp endpoint (JMS.SOLACE.SuccessQueue) journey
    await dashBoardPage.selectMember(receiverAsMember);
    await dashBoardPage.navigateToNetworkSetupPage();
    await networkSetupPage.navigateToJourneysPage();
    await journeysPage.setJourneyFieldsSaveAndAssert({
        // Define the fields object with the values you want to create the journey for
        journeyName: "receive-OffRampEndpoint-JQ-journey",
        direction: "Receive",
        senderOperator: "Equals",
        senderName: "Test123",
        senderDivisionOperator: "Equals",
        senderDivision: "SD",
        receiverDivisionOperator: "Equals",
        receiverDivision: "RD",
        messageStandard: "F4FXml v5",
        messageType: "execution",
        nextDestination: "Connector",
        participant: participant,
        endpoint: endpoint
      });

    await journeysPage.clickOnEditButton();
    await journeysPage.addCodeMatcherStageToJourney();
    await journeysPage.saveJourney();
  }
);
test//TC_E2E_UC3_003-part3
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC3_003-part3: Posting message using send to receive & receive OffRampEndpoint(JMS.SOLACE.SuccessQueue) journey",
    async (t) => {
        // Create a deep copy of the requestBody
        const requestBodyFor003P3 = JSON.parse(JSON.stringify(requestBody));
        // Update the subSource, messageuniqueid and message type in requestBody
        requestBodyFor003P3.metadata.messageuniqueid = "sendToReceiveToJMSSuccessQ_testcafe_" + Date.now();
        requestBodyFor003P3.metadata.subSource = t.fixtureCtx.updatedSenderDivision;
        requestBodyFor003P3.metadata.messageType = "execution";        
        // send request
        const sendCompletedMessagRequest = await axios.post(messageURL, requestBodyFor003P3, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
        await t.expect(sendCompletedMessagRequest.status).eql(200); // Asserting response code
        // Save messageuniqueid to fixture context
        const messageuniqueid = requestBodyFor003P3.metadata.messageuniqueid;
        t.fixtureCtx.messageuniqueid = messageuniqueid;
        await dashBoardPage.selectMember(member);
        await trafficManagerPage.navigateToTrafficManagerPage();
        await t.click(Selector(trafficManagerPage.tabSearchById));
        await t.typeText(Selector(trafficManagerPage.messageIdInput),messageuniqueid);
        await t.click(Selector(trafficManagerPage.searchButton));
        await trafficManagerPage.verifyMessageStatus("Held");
        await trafficManagerPage.viewMessage();
        await trafficManagerPage.verifyMessageStatus("Held");
        await trafficManagerPage.assertMessageInfo({
        businessID: requestBody.metadata.businessId,
        processID:  requestBody.metadata.processId,
        messageType: t.fixtureCtx.updatedMessageType,
        messageID: t.fixtureCtx.messageuniqueid,
        receiver:receiverName,
        receiverDivision: requestBody.metadata.subDestination,
        sender:senderName,
        senderDivision:requestBodyFor003P3.metadata.subSource
    })
    
    await trafficManagerPage.validateMessageDetails();
    await trafficManagerPage.validateMessageJourney();
    await trafficManagerPage.validateMessageEvents();
    await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();
  }
);