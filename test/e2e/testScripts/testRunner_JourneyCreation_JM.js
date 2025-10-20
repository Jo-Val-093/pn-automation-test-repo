import { test, Selector } from "testcafe";
import { baseUrl } from "../helpers/configuration";
import LoginPage from "../pages/logInPage";
import dashBoardPage from "../pages/dashBoardPage";
import networkSetupPage from "../pages/networkSetupPage";
import journeysPage from "../pages/journeysPage";
import companiesPage from "../pages/companiesPage";
import { ENFILE } from "constants";
const ENV_NAME = process.env.ENV_NAME ;

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var member = repo.testData.member

//WIP for Pre environment,  some fail queue tests will not work in pre as queue not exist
const getEnvironmentConfig = () => {
  switch (process.env.ENV_NAME) {
    case 'dev':
      return {
        participant: 'OffRamp_participant',
        endpoint: 'Endpoint_success_Queue',
        endpointFailure: 'Endpoint_fail_Queue'
      };
    case 'test':
      return {
        participant: 'OffRamp_participant',
        endpoint: 'Endpoint_success_Queue',
        endpointFailure: 'Endpoint_fail_Queue'
      };
    case 'pre':
      return {
        participant: 'TEST_EU_PARTICIPANT',
        endpoint: 'Success_Solace_EndPoint_EU',
        endpointFailure: 'Failure_Solace_EndPoint_EU'
      };
    default:
      console.error("Unrecognized NODE_ENV: " + process.env.ENV_NAME);
      process.exit(1);
  }
};

const messageOptions = [
  { 
    messageStandard: "F4FXml v4.2", 
    messageType: "F4FOrder", 
    messageSubTypes: [
      "Standalone Order", "Call-Off", "Provisional Standalone", "Provisional Call-Off", 
      "Consignment Stock Resupply Order", "Consignment Stock Purchase Order", 
      "Consignment Stock Withdrawal Order", "Consignment Stock Transfer Order", 
      "Consignment Stock Adjustment Issue", "Consignment Stock Adjustment Return", 
      "Consignment Stock Sales Order", "Amended", "Confirmed", "Rejected", "Conference Order"
    ] 
  },
  { 
    messageStandard: "F4FXml v4.2", 
    messageType: "F4FShipmentNote", 
    messageSubTypes: ["Shipment Intention", "Shipment Instruction", "Goods Issued Note", "Goods Received Note"] 
  },
  { 
    messageStandard: "F4FXml v4.2", 
    messageType: "F4FInvoice", 
    messageSubTypes: ["Invoice", "Credit", "Debit", "Recharge", "Self Bill Credit", "Self Bill Debit", "Tax Invoice"] 
  },
  { 
    messageStandard: "F4FXml v5", 
    messageType: "contract", 
    messageSubTypes: [
      "Purchase Contract", "Import Contract", "Sales Contract", "Contract Status", 
      "Contract Confirmation", "Scheduling Agreement"
    ] 
  },
  { 
    messageStandard: "F4FXml v5", 
    messageType: "execution", 
    messageSubTypes: [
      "Purchase Order", "Contract Call Off", "Notice Of Appropriation", "Notice Of Execution", 
      "Notification of Sale", "Sales Contract", "Order Receipt", "Confirmation Of Acceptance With Change", 
      "Confirmation Of Acceptance Without Change", "Rejection", "Order Free Of Charge", "Transport Order", 
      "Transport Order Confirmation", "Goods Return Order", "Order Change Request", "Process Order", 
      "Consignment Stock Resupply Order", "Consignment Stock Purchase Order", 
      "Consignment Stock Withdrawal Order", "Consignment Stock Transfer Order", 
      "Consignment Stock Adjustment Issue", "Consignment Stock Adjustment Return"
    ] 
  },
  { 
    messageStandard: "F4FXml v5", 
    messageType: "ownership", 
    messageSubTypes: ["Bill Of Lading", "Delivery Order", "Inventory Level", "Product Movement"] 
  },
  { 
    messageStandard: "F4FXml v5", 
    messageType: "movement", 
    messageSubTypes: ["Shipment Intention", "Shipment Instruction", "Goods Issued Note", "Goods Received Note", "Goods Returned Note", "Weighbridge Ticket"] 
  },
  { 
    messageStandard: "F4FXml v5", 
    messageType: "financial", 
    messageSubTypes: [
      "Credit", "Debit", "Tax Invoice", "Self Bill Credit", "Self Bill Debit", 
      "Remittance Advice", "Statement", "Credit Application", "Dispute", "Factored Invoice", 
      "Return Credit", "Payment Certificate", "Return Invoice"
    ] 
  },
  { 
    messageStandard: "F4FXml v5", 
    messageType: "quality", 
    messageSubTypes: [
      "Laboratory Report", "Certificate Of Analysis", "Visual Quality Check", "Samples Listing", "Analysis Request"
    ] 
  },
  { 
    messageStandard: "Agro CloSer XML", 
    messageType: "Order", 
    messageSubTypes: ["101", "103", "104", "105", "107", "108", "110", "111", "112"] 
  },
  { 
    messageStandard: "Agro CloSer XML", 
    messageType: "DespatchAdvice", 
    messageSubTypes: ["102", "115"] 
  },
  { 
    messageStandard: "Agro CloSer XML", 
    messageType: "Invoice", 
    messageSubTypes: ["106"] 
  },
  { 
    messageStandard: "Agro CloSer XML", 
    messageType: "MasterdataProductUnit", 
    messageSubTypes: ["109"] 
  },
  { 
    messageStandard: "Agro CloSer XML", 
    messageType: "Stock", 
    messageSubTypes: ["113"] 
  },
  { 
    messageStandard: "Agro CloSer XML", 
    messageType: "StockTransfer", 
    messageSubTypes: ["115"] 
  }
];

function getRandomMessage() {
  const randomOption = messageOptions[Math.floor(Math.random() * messageOptions.length)]; // pick a random message type
  const randomSubType = randomOption.messageSubTypes[Math.floor(Math.random() * randomOption.messageSubTypes.length)]; // to pick a random subtype from the subtypes of that message type.
  return { 
    messageStandard: randomOption.messageStandard, 
    messageType: randomOption.messageType, 
    messageSubType: randomSubType 
  }; // return an object with the chosen message standard, type, and subtype
}

// Journey 001
export const journey001Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-receive-journey",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Equals",
    receiverName: "Test456",
    nextDirection: "Receive",
  });
  await journeysPage.deleteJourney();
};

// Journey 002
export const journey002Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-receive-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Any",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.deleteJourney();
};

// Journey 003
export const journey003Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-send-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    receiverOperator: "Equals",
    receiverName: "Test456",
    nextDirection: "Send",
  });
  await journeysPage.deleteJourney();
};

// Journey 004
export const journey004Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-send-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Any",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Send",
  });
  await journeysPage.deleteJourney();
};

// Journey 005
export const journey005Test = async (t) => {
  const { participant, endpoint } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Equals",
    senderName: "Test456",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpoint
  });
  await journeysPage.deleteJourney();
};

// Journey 006
export const journey006Test = async (t) => {
  const { participant, endpoint } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Any",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpoint
  });

  await journeysPage.deleteJourney();
};

// Journey 007
export const journey007Test = async (t) => {
  const { participant, endpointFailure } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Equals",
    senderName: "Test456",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpointFailure,
  });
  await journeysPage.deleteJourney();
};

// Journey 008
export const journey008Test = async (t) => {
  const { participant, endpointFailure } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Any",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpointFailure
  });
  await journeysPage.deleteJourney();
};

// Journey 009
export const journey009Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-receive-journey",
    direction: "Receive",
    senderOperator: "Equals",
    senderName: "Test456",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.deleteJourney();
};

// Journey 010
export const journey010Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-receive-journey",
    direction: "Receive",
    senderOperator: "Any",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.deleteJourney();
};

// Journey 011
export const journey011Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-receive-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Equals",
    receiverName: "Test456",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
    await journeysPage.clickOnEditButton();
    await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL')
    await journeysPage.saveJourney();
    await journeysPage.deleteJourney();
};
// Journey 012
export const journey012Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-receive-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Any",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

// Journey 013
export const journey013Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-send-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Equals",
    receiverName: "Test456",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Send",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

// Journey 014
export const journey014Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-send-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Any",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Send",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

// Journey 015
export const journey015Test = async (t) => {
  const { participant, endpoint } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Equals",
    senderName: "Test456",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpoint
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

// Journey 016
export const journey016Test = async (t) => {
  const { participant, endpoint } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Any",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpoint
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

// Journey 017
export const journey017Test = async (t) => {
  const { participant, endpointFailure } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Equals",
    senderName: "Test456",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpointFailure
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

// Journey 018
export const journey018Test = async (t) => {
  const { participant, endpointFailure } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Any",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpointFailure
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.saveJourney();
    await journeysPage.deleteJourney();
  
};

// Journey 019
export const journey019Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-receive-journey",
    direction: "Receive",
    senderOperator: "Equals",
    senderName: "Test456",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

// Journey 020
export const journey020Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-receive-journey",
    direction: "Receive",
    senderOperator: "Any",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

//Journey 021
export const journey021Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-receive-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Equals",
    receiverName: "Test456",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

//Journey 022
export const journey022Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-receive-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Any",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

//Journey 023
export const journey023Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-send-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Equals",
    receiverName: "Test456",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Send",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey024Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-send-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Any",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Send",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey025Test = async (t) => {
  const { participant, endpoint } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Equals",
    senderName: "Test456",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpoint
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey026Test = async (t) => {
  const { participant, endpoint } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Any",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpoint
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey027Test = async (t) => {
  const { participant, endpointFailure } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Equals",
    senderName: "Test456",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpointFailure
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey028Test = async (t) => {
  const { participant, endpointFailure } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Any",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpointFailure
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey029Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-receive-journey",
    direction: "Receive",
    senderOperator: "Equals",
    senderName: "Test456",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey030Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-receive-journey",
    direction: "Receive",
    senderOperator: "Any",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey031Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-receive-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Equals",
    receiverName: "Test456",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey032Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-receive-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Any",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey033Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-send-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Equals",
    receiverName: "Test456",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Send",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.saveJourney();
    await journeysPage.deleteJourney();
  
};

export const journey034Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-send-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Any",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Send",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey035Test = async (t) => {
  const { participant, endpoint } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Equals",
    senderName: "Test456",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpoint
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL', 'offRamp');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL', 'offRamp');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey036Test = async (t) => {
  const { participant, endpoint } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Any",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpoint
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL', 'offRamp');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL', 'offRamp');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey037Test = async (t) => {
  const { participant, endpointFailure } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Equals",
    senderName: "Test456",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpointFailure
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL', 'offRamp');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL', 'offRamp');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey038Test = async (t) => {
  const { participant, endpointFailure } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Any",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpointFailure
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL', 'offRamp');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL', 'offRamp');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey039Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-receive-journey",
    direction: "Receive",
    senderOperator: "Equals",
    senderName: "Test456",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey040Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-receive-journey",
    direction: "Receive",
    senderOperator: "Any",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey041Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-receive-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Equals",
    receiverName: "Test456",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey042Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-receive-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Any",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey043Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-send-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Equals",
    receiverName: "Test456",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Send",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey044Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "send-send-journey",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    receiverOperator: "Any",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Send",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey045Test = async (t) => {
  const { participant, endpoint } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Equals",
    senderName: "Test456",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpoint
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL', 'offRamp');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey046Test = async (t) => {
  const { participant, endpoint } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Any",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpoint
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL', 'offRamp');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey047Test = async (t) => {
  const { participant, endpointFailure } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Equals",
    senderName: "Test456",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpointFailure
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL', 'offRamp');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey048Test = async (t) => {
  const { participant, endpointFailure } = getEnvironmentConfig();
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-OffRampEndpoint-SJQ-journey",
    direction: "Receive",
    senderOperator: "Any",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDestination: "Connector",
    participant: participant,
    endpoint: endpointFailure
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL', 'offRamp');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL', 'offRamp');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey049Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-receive-journey",
    direction: "Receive",
    senderOperator: "Equals",
    senderName: "Test456",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    nextDirection: "Receive",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

export const journey050Test = async (t) => {
  const { messageStandard, messageType, messageSubType } = getRandomMessage();
  await journeysPage.setJourneyFieldsSaveAndAssert({
    journeyName: "receive-receive-journey",
    direction: "Receive",
    senderOperator: "Any",
    senderDivisionOperator: "Equals",
    receiverDivisionOperator: "Equals",
    receiverDivision: "RD",
    messageStandard: messageStandard,
    messageType: messageType,
    messageSubTypeOperator: "Equals",
    messageSubType: messageSubType,
    nextDirection: "Receive",
  });
  await journeysPage.clickOnEditButton();
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL');
  await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL');
  await journeysPage.saveJourney();
  await journeysPage.deleteJourney();
  
};

fixture`Various Journeys Creation with No Stage`
.page(baseUrl)
.beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await dashBoardPage.navigateToNetworkSetupPage();
    await networkSetupPage.navigateToJourneysPage();
})

// Journey 001
test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_001 Validating user is able to add the Journey successfully for Direction = SEND and Next direction = RECEIVE", journey001Test);

// Journey 002
test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_002 Validating user is able to add the Journey successfully for Direction = SEND and Next direction = RECEIVE, DestinationOperator = WILDCARD", journey002Test);

// Journey 003
test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_003 Validating user is able to add the Journey successfully, Direction = SEND and Next direction = SEND", journey003Test);

// Journey 004
test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_004 Validating user is able to add the Journey successfully for Direction = SEND, Next direction = SEND and DestinationOperator = WILDCARD", journey004Test);

// Journey 005
test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_005 Validating user is able to add the Journey successfully, Direction = RECEIVE, Next destination = OffRamp Endpoint - SOLACE_JMS_QUEUE_SUCCESS", journey005Test);

// Journey 006
test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_006 Validating user is able to add the Journey successfully for Direction = RECEIVE, Next destination = OffRamp Endpoint - SOLACE_JMS_QUEUE_SUCCESS and SourceOperator = WILDCARD", journey006Test);

// Journey 007
test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_007 Validating user is able to add the Journey successfully for Direction = RECEIVE, Next destination = OffRamp Endpoint - SOLACE_JMS_QUEUE_FAILURE", journey007Test);

// Journey 008
test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_008 Validating user is able to add the Journey successfully for Direction = RECEIVE, Next destination = OffRamp Endpoint - SOLACE_JMS_QUEUE_FAILURE and SourceOperator = WILDCARD", journey008Test);

// Journey 009
test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_009 Validating user is able to add the Journey successfully for Direction = RECEIVE and Next direction = RECEIVE", journey009Test);

// Journey 010
test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_010 Validating user is able to add the Journey successfully for Direction = RECEIVE and Next direction = RECEIVE and SourceOperator = WILDCARD", journey010Test);

fixture`Various Journeys Creation with One Stage`
.page(baseUrl)
.beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await dashBoardPage.navigateToNetworkSetupPage();
    await networkSetupPage.navigateToJourneysPage();
})
test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_011  Validating user is able to add the Journey successfully, Direction = SEND and Next direction = RECEIVE with 1 Saxon XSL Transform stage", journey011Test);

test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_012 Validating user is able to add the Journey successfully for Direction = SEND and Next direction = RECEIVE, DestinationOperator = WILDCARD, with 1 Saxon XSL Transform stage", journey012Test);

test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_013 Validating user is able to add the Journey successfully, Direction = SEND and Next direction = SEND, with 1 Saxon XSL Transform stage", journey013Test);

test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_014 Validating user is able to add the Journey successfully, Direction = SEND, Next direction = SEND and DestinationOperator = WILDCARD, with 1 Saxon XSL Transform stage", journey014Test);

test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_015 Validating user is able to add the Journey successfully, Direction = RECEIVE, Next destination = OffRamp Endpoint - SOLACE_JMS_QUEUE_SUCCESS, with 1 Saxon XSL Transform stage", journey015Test);

test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_016 Validating user is able to add the Journey successfully, Direction = RECEIVE, Next destination = OffRamp Endpoint - SOLACE_JMS_QUEUE_SUCCESS and SourceOperator = WILDCARD, with 1 Saxon XSL Transform stage", journey016Test);

test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_017 Validating user is able to add the Journey successfully, Direction = RECEIVE, Next destination = OffRamp Endpoint - SOLACE_JMS_QUEUE_FAILURE, with 1 Saxon XSL Transform stage", journey017Test);

test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_018 Validating user is able to add the Journey successfully, Direction = RECEIVE, Next destination = OffRamp Endpoint - SOLACE_JMS_QUEUE_FAILURE and SourceOperator = WILDCARD, with 1 Saxon XSL Transform stage", journey018Test);

test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_019 Validating user is able to add the Journey successfully, Direction = RECEIVE and Next direction = RECEIVE, with 1 Saxon XSL Transform stage", journey019Test);

test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_020 Validating user is able to add the Journey successfully, Direction = RECEIVE and Next direction = RECEIVE and SourceOperator = WILDCARD, with 1 Saxon XSL Transform stage", journey020Test);

fixture`Various Journeys Creation with two Transform Stages with Valid URL`
  .page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await dashBoardPage.navigateToNetworkSetupPage();
    await networkSetupPage.navigateToJourneysPage();
});

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_021 Validating user is able to add the Journey successfully for Direction = SEND and Next direction = RECEIVE with 2 Saxon XSL Transform stages", journey021Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_022 Validating user is able to add the Journey successfully for Direction = SEND and Next direction = RECEIVE, DestinationOperator = WILDCARD with 2 Saxon XSL Transform stages", journey022Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_023 Validating user is able to add the Journey successfully for Direction = SEND and Next direction = SEND with 2 Saxon XSL Transform stages", journey023Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_024 Validating user is able to add the Journey successfully for Direction = SEND and Next direction = SEND, DestinationOperator = WILDCARD with 2 Saxon XSL Transform stages", journey024Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_025 Validating user is able to add the Journey successfully for Direction = RECEIVE, Next destination = Off-ramp Participant with Endpoint = Endpoint_success_Queue and 2 Saxon XSL Transform stages", journey025Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_026 Validating user is able to add the Journey successfully for Direction = RECEIVE, Next destination = Off-ramp Participant, SourceOperator = WILDCARD with Endpoint = Endpoint_success_Queue and 2 Saxon XSL Transform stages", journey026Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_027 Validating user is able to add the Journey successfully for Direction = RECEIVE, Next destination = Off-ramp Participant with Endpoint = Endpoint_fail_Queue and 2 Saxon XSL Transform stages", journey027Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_028 Validating user is able to add the Journey successfully for Direction = RECEIVE, Next destination = Off-ramp Participant, SourceOperator = WILDCARD with Endpoint = Endpoint_fail_Queue and 2 Saxon XSL Transform stages", journey028Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_029 Validating user is able to add the Journey successfully for Direction = RECEIVE and Next direction = RECEIVE with 2 Saxon XSL Transform stages", journey029Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_030 Validating user is able to add the Journey successfully for Direction = RECEIVE and Next direction = RECEIVE, SourceOperator = WILDCARD with 2 Saxon XSL Transform stages", journey030Test);

fixture`Various Journeys Creation with two Transform Stages with Invalid URL`
  .page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await dashBoardPage.navigateToNetworkSetupPage();
    await networkSetupPage.navigateToJourneysPage();
});

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_031 Validating user is able to add the Journey successfully for Direction = SEND and Next direction = RECEIVE with 2 invalid Saxon XSL Transform stages", journey031Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_032 Validating user is able to add the Journey successfully for Direction = SEND, Next direction = RECEIVE and DestinationOperator = WILDCARD with 2 invalid Saxon XSL Transform stages", journey032Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_033 Validating user is able to add the Journey successfully for Direction = SEND and Next direction = SEND with 2 invalid Saxon XSL Transform stages", journey033Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_034 Validating user is able to add the Journey successfully for Direction = SEND, Next direction = SEND and DestinationOperator = WILDCARD with 2 invalid Saxon XSL Transform stages", journey034Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_035 Validating user is able to add the Journey successfully for Direction = RECEIVE, Next destination = Off-ramp Participant with Endpoint = Endpoint_success_Queue and 2 invalid Saxon XSL Transform stages", journey035Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_036 Validating user is able to add the Journey successfully for Direction = RECEIVE, Next destination = Off-ramp Participant, SourceOperator = WILDCARD with Endpoint = Endpoint_success_Queue and 2 invalid Saxon XSL Transform stages", journey036Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_037 Validating user is able to add the Journey successfully for Direction = RECEIVE, Next destination = Off-ramp Participant with Endpoint = Endpoint_fail_Queue and 2 invalid Saxon XSL Transform stages", journey037Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_038 Validating user is able to add the Journey successfully for Direction = RECEIVE, Next destination = Off-ramp Participant, SourceOperator = WILDCARD with Endpoint = Endpoint_fail_Queue and 2 invalid Saxon XSL Transform stages", journey038Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_039 Validating user is able to add the Journey successfully for Direction = RECEIVE and Next direction = RECEIVE with 2 invalid Saxon XSL Transform stages", journey039Test);

test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_040 Validating user is able to add the Journey successfully for Direction = RECEIVE, Next direction = RECEIVE and SourceOperator = WILDCARD with invalid Saxon XSL Transform stages", journey040Test);

fixture`Various Journeys Creation with two Transform Stages with valid and invalid URL`
  .page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await dashBoardPage.navigateToNetworkSetupPage();
    await networkSetupPage.navigateToJourneysPage();
});

// Journey 041
test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_041 Validating user is able to add the Journey successfully, Direction = SEND and Next direction = RECEIVE with 2 Saxon XSL Transform stage", journey041Test);

// Journey 042
test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_042 Validating user is able to add the Journey successfully for Direction = SEND and Next direction = RECEIVE, DestinationOperator = WILDCARD, with 2 Saxon XSL Transform stage", journey042Test);

// Journey 043
test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_043 Validating user is able to add the Journey successfully for Direction = SEND and Next direction = SEND, with 2 Saxon XSL Transform stage", journey043Test);

// Journey 044
test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_044 Validating user is able to add the Journey successfully for Direction = SEND and Next direction = SEND, DestinationOperator = WILDCARD, with 2 Saxon XSL Transform stage", journey044Test);

// Journey 045
test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_045 Validating user is able to add the Journey successfully for Direction = RECEIVE and Next direction = Off-ramp Participant with Endpoint = Endpoint_success_Queue, with 2 Saxon XSL Transform stage", journey045Test);

// Journey 046
test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_046 Validating user is able to add the Journey successfully for Direction = RECEIVE, Next destination = Off-ramp Participant, SourceOperator = WILDCARD with Endpoint = Endpoint_success_Queue and 2  Saxon XSL Transform stage", journey046Test);

// Journey 047
test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_047 Validating user is able to add the Journey successfully for Direction = RECEIVE, Next destination = Off-ramp Participant with Endpoint = Endpoint_fail_Queue and 2 Saxon XSL Transform stages", journey047Test);

// Journey 048
test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_048 Validating user is able to add the Journey successfully for Direction = RECEIVE, Next destination = Off-ramp Participant, SourceOperator = WILDCARD with Endpoint = Endpoint_fail_Queue and 2 Saxon XSL Transform stages", journey048Test);

// Journey 049
test
.meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
("Journey_049 Validating user is able to add the Journey successfully for Direction = RECEIVE and Next direction = RECEIVE  with 2 Saxon XSL Transform stages", journey049Test);

// Journey 050
test
  .meta({ e2e: 'regression', type1: 'usecaseE2E', type7: 'journeypage' })
  ("Journey_050 Validating user is able to add the Journey successfully for Direction = RECEIVE and Next direction = RECEIVE, SourceOperator = WILDCARD  with 2 Saxon XSL Transform stages", journey050Test);