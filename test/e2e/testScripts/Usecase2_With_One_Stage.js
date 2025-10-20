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

// const axiosInstance = axios.create({
//   maxBodyLength: Infinity, // or set a specific value like 50 * 1024 * 1024 for 50MB
// });
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
    //subSource: subSource,
    subDestination: subDestination,
    messageType: "F4FInvoice",
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

fixture`TC_E2E_UC2_010 - Creating send to send journey and posting message - With one stage`
  .page(baseUrl)
  .beforeEach(async (t) => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
  });

  test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("TC_E2E_UC2_010-part1  Validating user is able to add the Journey successfully, Direction = SEND and Next direction = SEND", async (t) => {
    await dashBoardPage.navigateToNetworkSetupPage();
    await networkSetupPage.navigateToJourneysPage();
    await journeysPage.setJourneyFieldsSaveAndAssert({
      // Define the fields object with the values you want to create the journey for
      journeyName: "send-send-journey",
      senderDivisionOperator: "Equals",
      receiverOperator: "Equals",
      receiverName: "Test456",
      receiverDivisionOperator: "Equals",
      receiverDivision: "RD",
      messageStandard: "F4FXml v4.2",
      messageType: "F4FInvoice",
      nextDirection: "Send",
    });
    await journeysPage.clickOnEditButton();
    await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL')
    await journeysPage.saveJourney();
  });

  test
  .meta({ e2e: 'regression', type1: 'usecaseE2E' })
  ("TC_E2E_UC2_010-part2: Posting message using send to send journey",  async (t) => {
    // Update the subSource and messageuniqueid in requestBody
    requestBody.metadata.messageuniqueid = "sendTosend_testcafe_" + Date.now();
    requestBody.metadata.subSource = t.fixtureCtx.updatedSenderDivision;
    
    // Send request
    const sendCompletedMessagRequest = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
    await t.expect(sendCompletedMessagRequest.status).eql(200); // Asserting response code
    // Save messageuniqueid to fixture context
    const messageuniqueid = requestBody.metadata.messageuniqueid;
    t.fixtureCtx.messageuniqueid = messageuniqueid;

    await trafficManagerPage.navigateToTrafficManagerPage();
    await t.click(Selector(trafficManagerPage.tabSearchById));
    await t.typeText(Selector(trafficManagerPage.messageIdInput),messageuniqueid);
    await t.click(Selector(trafficManagerPage.searchButton));
    await trafficManagerPage.verifyMessageStatus("Error");
    await trafficManagerPage.viewMessage();
    await trafficManagerPage.verifyMessageStatus("Error");
    await trafficManagerPage.assertMessageInfo({
        businessID: requestBody.metadata.businessId,
        processID:  requestBody.metadata.processId,
        messageType: t.fixtureCtx.updatedMessageType,
        messageID: messageuniqueid,
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
  fixture`TC_E2E_UC2_011 - Creating send to receive and receive to offRampEndpoint (JMS.SOLACE.SuccessQueue) journey and posting message - With One stages`
  .page(baseUrl)
  .beforeEach(async (t) => {
    await LoginPage.logInSuccessful();
  });
  test //part1
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC2_011-part1: Validate user is able to create a Journey, send to receive",
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
      messageStandard: "F4FXml v4.2",
      messageType: "F4FInvoice",
      nextDirection: "Receive",
    });
    await journeysPage.clickOnEditButton();
    await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL')
    await journeysPage.saveJourney();
  }
);
  test //part2
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC2_011-part2: Validate user is able to create a Journey, receive to OffRampEndpoint (JMS.SOLACE.SuccessQueue)",
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
        messageStandard: "F4FXml v4.2",
        messageType: "F4FInvoice",
        nextDestination: "Connector",
        participant: participant,
        endpoint: endpoint
    });
    await journeysPage.clickOnEditButton();
    await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL','offRamp')
    await journeysPage.saveJourney();
  }
);
  test //part3
  .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC2_011-part3: Posting message using SEND -> RECEIVE, RECEIVE -> OffRamp (JMS.SOLACE.SuccessQueue)",
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

fixture`TC_E2E_UC2_012 - Creating send to receive and receive to offRampEndpoint (JMS.SOLACE.FailureQueue) journey and posting message - With One stages`
  .page(baseUrl)
  .beforeEach(async (t) => {
    await LoginPage.logInSuccessful();
  });
  test //part1
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC2_012-part1: Validate user is able to create a Journey, send to receive",
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
      messageStandard: "F4FXml v4.2",
      messageType: "F4FInvoice",
      nextDirection: "Receive",
    });
    await journeysPage.clickOnEditButton();
    await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL')
    await journeysPage.saveJourney();
  }
);
  test //part2
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC2_012-part2: Validate user is able to create a Journey, receive to OffRampEndpoint (JMS.SOLACE.FailureQueue)",
    async (t) => {
      const { participant, endpointFailure } = ENV_CONFIG[ENV_NAME];
    // receive to offramp endpoint (JMS.SOLACE.FailureQueue) journey
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
        messageStandard: "F4FXml v4.2",
        messageType: "F4FInvoice",
        nextDestination: "Connector",
        participant: participant,
        endpoint: endpointFailure
    });
    await journeysPage.clickOnEditButton();
    await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL','offRamp')
    await journeysPage.saveJourney();
  }
);
  test //part3
  .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC2_012-part3: Posting message using SEND -> RECEIVE, RECEIVE -> OffRamp (JMS.SOLACE.FailureQueue)",
      async (t) => {
        try {
          // Update the subSource and messageuniqueid in requestBody
            requestBody.metadata.messageuniqueid = "sendToReceiveToJMSFailureQ_testcafe_" + Date.now();
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
          await trafficManagerPage.verifyMessageStatus("Error");
          await trafficManagerPage.viewMessage();
          await trafficManagerPage.verifyMessageStatus("Error");
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
  
fixture`TC_E2E_UC2_013 - Creating send to receive and receive to receive journey and posting message - With one stages`
  .page(baseUrl)
  .beforeEach(async (t) => {
    await LoginPage.logInSuccessful();
  });
  test //part1
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC2_013-part1: Validate user is able to create a Journey, send to receive",
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
      messageStandard: "F4FXml v4.2",
      messageType: "F4FInvoice",
      nextDirection: "Receive",
    });
    await journeysPage.clickOnEditButton();
    await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL')
    await journeysPage.saveJourney();
  }
);
  test //part2
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC2_013-part2: Validate user is able to create a Journey, receive to receive",
  async (t) => {
    // receive to receive journey
    await dashBoardPage.selectMember(receiverAsMember);
    await dashBoardPage.navigateToNetworkSetupPage();
    await networkSetupPage.navigateToJourneysPage();
    await journeysPage.setJourneyFieldsSaveAndAssert({
      // Define the fields object with the values you want to create the journey for
      journeyName: "receive-receive-journey",
      direction: "Receive",
      senderOperator: "Equals",
      senderName: "Test123",
      senderDivisionOperator: "Equals",
      senderDivision: "SD",
      receiverDivisionOperator: "Equals",
      receiverDivision: "RD",
      messageStandard: "F4FXml v4.2",
      messageType: "F4FInvoice",
      nextDirection: "Receive",
    });
    await journeysPage.clickOnEditButton();
    await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL')
    await journeysPage.saveJourney();
  }
);

  test //part3
  .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC2_013-part3: Posting message using SEND -> RECEIVE, RECEIVE -> RECEIVE",
      async (t) => {
        // Update the subSource and messageuniqueid in requestBody
        requestBody.metadata.messageuniqueid = "sendToReceiveToReceive_testcafe_" + Date.now();
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
       await trafficManagerPage.verifyMessageStatus("Error");
       await trafficManagerPage.viewMessage();
       await trafficManagerPage.verifyMessageStatus("Error");
       await trafficManagerPage.assertMessageInfo({
         businessID: requestBody.metadata.businessId,
         processID:  requestBody.metadata.processId,
         messageType: t.fixtureCtx.updatedMessageType,
         messageID: messageuniqueid,
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
  
fixture`TC_E2E_UC2_014 - Creating only send to receive journey and posting message - With one stages`
  .page(baseUrl)
  .beforeEach(async (t) => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
  });
  test //part1
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC2_014-part1: Validate user is able to create a Journey, send to receive",
  async (t) => {
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
      messageStandard: "F4FXml v4.2",
      messageType: "F4FInvoice",
      nextDirection: "Receive",
    });
    await journeysPage.clickOnEditButton();
    await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL')
    await journeysPage.saveJourney();
  }
);
  test //part2
  .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC2_014-part2: Posting message using SEND -> RECEIVE",
      async (t) => {
        // Update the subSource and messageuniqueid in requestBody
         requestBody.metadata.messageuniqueid = "sendToreceive_testcafe_" + Date.now();
         requestBody.metadata.subSource = t.fixtureCtx.updatedSenderDivision;
         
         // Send request
         const sendCompletedMessagRequest = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
         await t.expect(sendCompletedMessagRequest.status).eql(200); // Asserting response code
         // Save messageuniqueid to fixture context
         const messageuniqueid = requestBody.metadata.messageuniqueid;
         t.fixtureCtx.messageuniqueid = messageuniqueid;
     
         await trafficManagerPage.navigateToTrafficManagerPage();
         await t.click(Selector(trafficManagerPage.tabSearchById));
         await t.typeText(Selector(trafficManagerPage.messageIdInput),messageuniqueid);
         await t.click(Selector(trafficManagerPage.searchButton));
         await trafficManagerPage.verifyMessageStatus("Error");
         await trafficManagerPage.viewMessage();
         await trafficManagerPage.verifyMessageStatus("Error");
         await trafficManagerPage.assertMessageInfo({
           businessID: requestBody.metadata.businessId,
           processID:  requestBody.metadata.processId,
           messageType: t.fixtureCtx.updatedMessageType,
           messageID: messageuniqueid,
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
   
fixture`TC_E2E_UC2_015 - Creating receive to receive journey and posting message - With one stages`
  .page(baseUrl)
  .beforeEach(async (t) => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(receiverAsMember);
  });
  test //part1
  .meta({  e2e: 'regression', type1: 'usecaseE2E' })(
  "TC_E2E_UC2_015-part1: Validate user is able to create a Journey, receive to receive",
  async (t) => {
    await dashBoardPage.navigateToNetworkSetupPage();
    await networkSetupPage.navigateToJourneysPage();
    await journeysPage.setJourneyFieldsSaveAndAssert({
      // Define the fields object with the values you want to create the journey for
      journeyName: "receive-receive-journey",
      direction: "Receive",
      senderOperator: "Equals",
      senderName: "Test123",
      senderDivisionOperator: "Equals",
      receiverDivisionOperator: "Equals",
      receiverDivision: "RD",
      messageStandard: "Agro CloSer XML",
      messageType: "DespatchAdvice",
      nextDirection: "Receive",
    });
    await journeysPage.clickOnEditButton();
    await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL')
    await journeysPage.saveJourney();
  }
);
  test //part2
  .meta({ e2e: 'regression', type1: 'usecaseE2E' })
    ("TC_E2E_UC2_015-part2: Posting message using RECEIVE -> RECEIVE",
      async (t) => {
        // Create a deep copy of the requestBody
     const requestBodyFor015 = JSON.parse(JSON.stringify(requestBody));
        // Update the subSource, messageuniqueid and message type in requestBody
    requestBodyFor015.metadata.messageuniqueid = "receiveToreceive_testcafe_" + Date.now();
    requestBodyFor015.metadata.subSource = t.fixtureCtx.updatedSenderDivision;
    requestBodyFor015.metadata.messageType = "DespatchAdvice";
     
     // Send request
     const sendCompletedMessagRequest = await axios.post(messageURL, requestBodyFor015, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
     await t.expect(sendCompletedMessagRequest.status).eql(200); // Asserting response code
     // Save messageuniqueid to fixture context
     const messageuniqueid = requestBodyFor015.metadata.messageuniqueid;
     t.fixtureCtx.messageuniqueid = messageuniqueid;
 
     await trafficManagerPage.navigateToTrafficManagerPage();
     await t.click(Selector(trafficManagerPage.tabSearchById));
     await t.typeText(Selector(trafficManagerPage.messageIdInput),messageuniqueid);
     await t.click(Selector(trafficManagerPage.searchButton));
     await trafficManagerPage.verifyMessageStatus("Error");
     await trafficManagerPage.viewMessage();
     await trafficManagerPage.verifyMessageStatus("Error");
     await trafficManagerPage.assertMessageInfo({
       businessID: requestBody.metadata.businessId,
       processID:  requestBody.metadata.processId,
       messageType: t.fixtureCtx.updatedMessageType,
       messageID: messageuniqueid,
       receiver:receiverName,
       receiverDivision: requestBody.metadata.subDestination,
       sender:senderName,
       senderDivision:requestBodyFor015.metadata.subSource
   })
   
   await trafficManagerPage.validateMessageDetails();
   await trafficManagerPage.validateMessageJourney();
   await trafficManagerPage.validateMessageEvents();
   await trafficManagerPage.assertMetaDataBaseOnTrackingPointValues();
   }
 ); 
  

