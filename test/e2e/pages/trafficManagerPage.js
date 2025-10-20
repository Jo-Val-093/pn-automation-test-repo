import { Selector, t } from 'testcafe';
import fs from 'fs';
import os from 'os';
import pathDir from 'path';
import { ok } from 'assert';
import * as TestCafeTestingLibrary from '@testing-library/testcafe'; 
import xml2js from 'xml2js';
import util from 'util';
const readFile = util.promisify(fs.readFile);
const ENV_NAME = process.env.ENV_NAME;
var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var businessId = repo.testData.businessId;
var messageId = repo.testData.messageId;
var businessId = repo.testData.businessId;
var processId = repo.testData.processId;
var messageType = repo.testData.messageType;
var receiver = repo.testData.receiver;
var sender = repo.testData.sender;
var failedMessageId = repo.testData.failedMessageId;
var inProgressMessageId = repo.testData.inProgressMessageId
var manuallyCompletedMessageId = repo.testData.manuallyCompletedMessageId
var heldMessageId = repo.testData.heldMessageId
const dropdownValuesMessageType = [];
const dropdownValuesMessageSubType = [];

class trafficManagerPage {

  constructor() {
    this.viewCard = TestCafeTestingLibrary.getAllByRole('button', { name: 'View' }).nth(0);
    this.viewCardCm = Selector('#root span').withText('View').nth(1);
    this.viewCardMp = Selector('#root span').withText('View').nth(2);
    this.trafficManagerText = Selector('h2.MuiTypography-root');
    // this.tabFilter = Selector('button').withText('Filter');   // currently this click filter not work due to bug, hence we created below
    this.tabFilter = Selector('[data-testid="button"] [data-testid="expand-more"]')   // using v  expanding filter
    this.tabSearchById = Selector('button').withText('Search by ID');
    this.messageIdInput = Selector('[name="messageId"]');
    this.businessIdInput = Selector('[name="businessId"]');
    this.processIdInput = Selector('[name="processId"]');
    this.searchButton = Selector('span').withText('Search');
    this.resetFilter = Selector('span').withText('Reset');
    this.eyeIcon = Selector('button').withAttribute('data-testid', 'popover-button');
    this.messageId = Selector('h6.MuiTypography-root.MuiTypography-subtitle1').withText('Message ID');
    this.messageStatusesDropdown = Selector('select').withAttribute('name', 'messageStatus');
    this.showFiltersButton = Selector('button').withAttribute('data-testid', 'button');
    this.messageSenderDropdown = Selector('select').withAttribute('name', 'source');
    this.messageReceiverDropdown = Selector('select').withAttribute('name', 'destination');
    this.messageDateDropdown = Selector('select').withAttribute('name', 'Message date');
    this.downloadButton = Selector('[data-testid="download-button"]');
    this.completeStatus = Selector('#messages-table > tbody > tr:nth-child(1) > td:nth-child(6) > h6 > span > svg')
    this.inProgressStatus = Selector('#messages-table > tbody > tr:nth-child(1) > td:nth-child(6) > h6 > span')
    this.journeyStoppedStatus = Selector('#messages-table > tbody > tr:nth-child(1) > td:nth-child(6) > h6 > span')
    this.alertMessage = Selector('[data-testid="alerts"] div').withText('Unable to find any message for selected filters.').nth(1);
    this.date = Selector('[data-testid="date-picker"] [class^="MuiInputBase-input MuiOutlinedInput-input MuiInput"]');
    this.dateRangeToday = Selector('li').withText('Today')
    this.dateRangeSinceYesterday = Selector('li').withText('Since yesterday')
    this.dateRangeThisWeek = Selector('li').withText('This week')
    this.dateRangeThisMonth = Selector('li').withText('This month')
    this.dateRangeAll = Selector('li').withText('All')
    this.dateRangeSinceLast7Days = Selector('li').withText('Since last 7 days')
    this.dateRangeSinceLast30Days = Selector('li').withText('Since last 30 days')
    this.dateRangeCustom = Selector('li').withText('Custom')
    this.messageStatus = TestCafeTestingLibrary.getAllByRole('combobox').nth(4)
    this.messageStatusAll = TestCafeTestingLibrary.getByRole('option',{name :'All'})
    this.messageStatusComplete = TestCafeTestingLibrary.getByRole('option',{name :'Completed'})
    this.messageStatusFailed = TestCafeTestingLibrary.getByRole('option',{name :'Failed'})
    this.messageStatusHeld = TestCafeTestingLibrary.getByRole('option',{name :'Held'})
    this.messageStausReceived = Selector('li').withText('Received')
    this.messageStatusInProgress = TestCafeTestingLibrary.getByRole('option',{name :'In progress'})
    this.messageStatusManuallyCompleted = TestCafeTestingLibrary.getByRole('option',{name :'Manually completed'})
    this.pagination = Selector('root div').withText('1-1 of 1')
    this.fromDate = Selector('[name="fromDate"]')
    this.toDate = Selector('[name="toDate"]')
    this.viewBox = Selector('#root > div.jss7 > div.MuiContainer-root.jss3.MuiContainer-maxWidthXl > div.MuiGrid-root.MuiGrid-container.MuiGrid-spacing-xs-1 > div:nth-child(3) > div > div.jss152 > button > span > svg')
    this.viewDetails = Selector('span').withText('View')
    this.messageDetails = Selector('#root span')
    this.messageJourneyDetails = Selector('#root button').withText('View');
    this.messagePayload = Selector('#tabpanel-0 p');
    this.downloadPage = Selector('button').withText('Download')
    this.downloadButtonPayload = TestCafeTestingLibrary.getByRole('link', { name: 'Download' });
    this.metadataScreen = Selector('button').withText('Metadata')
    this.messageUniqueId = TestCafeTestingLibrary.getByText('messageuniqueid').parent('tr').find('td');
    this.failedMessageView = Selector('[data-testid="action-button-0"] button').withText('View')
    this.failedMessageView04thLink = Selector('[data-testid="action-button-3"] button').withText('View')
    this.exceptionTab = TestCafeTestingLibrary.queryByRole('tab', { name: 'Exception' });
    this.exceptionTabSearchBox = TestCafeTestingLibrary.queryByPlaceholderText('Search')
    this.columnView = Selector('[data-testid="VisibilityIcon"]')
    this.messagetableColumns = Selector('[class^="MuiTableCell-root MuiTableCell-head MuiTableCell-s"] h6')
    this.preparingFiles = Selector('p').withText('Preparing file...');
    this.downloadBar = Selector('[data-testid="download-bar"] div div');
    this.completedMessageStatus = Selector('[class^="jss"][data-testid="COMPLETED"]');
    this.failedMessageStatus = Selector('[class^="jss"][data-testid="ERROR"]');
    this.inProgressMessageStatus = Selector('[aria-label="In progress"][data-testid="IN_PROGRESS"]');
    this.manuallyCompletedMessageStatus = Selector('[class^="jss"][data-testid="MANUALLY_COMPLETED"]');
    this.heldMessageStatus = Selector('[class^="jss"][data-testid="HELD"]');
    this.relatedMessagesButton = Selector('button').withText('Related messages');

    this.tableRowSelector = Selector('[data-testid^="table-row-"]'); // base selector for the table rows
    this.nextPageButton = Selector('[data-testid="handleNextClick-button"]');
    this.messageInfoBusinessID = Selector('[data-testid="message-info"] div').nth(22);
    this.messageInfoProcessID = Selector('[data-testid="message-info"] div').nth(24);
    this.messageInfoMessageType = Selector('[data-testid="message-info"] div').nth(17);
    this.messageInfoMessageID = Selector('[data-testid="message-info"] div').nth(17);
    this.messageInfoSender = Selector('[data-testid="message-info"] div').nth(6);
    this.messageInfoReceiver = Selector('[data-testid="message-info"] div').nth(11);
    this.messageInfoSenderDivision = Selector('[data-testid="message-info"] div').nth(9);
    this.messageInfoReceiverDivision = Selector('[data-testid="message-info"] div').nth(14);
    this.exportConfirmationText = Selector('div').withText('Export results now?').nth(5);
    this.exportConfirmButton = Selector('span').withText('Confirm');

    this.sequenceNumberEventsColumn = Selector('[data-testid="events-table"] span').withText('Sequence number');
    this.sourceAdapterEventsColumn = Selector('[data-testid="events-table"] span').withText('Source adapter');
    this.eventIdEventsColumn = Selector('[data-testid="events-table"] span').withText('Event ID');
    this.eventNameEventsColumn = Selector('[data-testid="events-table"] span').withText('Event name');
    this.eventDateEventsColumn = Selector('[data-testid="events-table"] span').withText('Event date');
    this.statusEventsColumn = Selector('[data-testid="events-table"] span').withText('Status');

    this.journeyStageJourneyTableColumn = Selector('[data-testid="message-journey-table"] span').withText('Journey stage');
    this.stageStatusJourneyTableColumn = Selector('[data-testid="message-journey-table"] span').withText('Stage status');
    this.startDateJourneyTableColumn = Selector('[data-testid="message-journey-table"] span').withText('Start');
    this.endDateJourneyTableColumn = Selector('[data-testid="message-journey-table"] span').withText('End');
    this.durationJourneyTableColumn = Selector('[data-testid="message-journey-table"] span').withText('Duration');
    
    // this.trackingPointJourneyTableColumn = Selector('[data-testid="message-journey-table"] span').withText('Tracking Point');
    // this.senderJourneyTableColumn = Selector('[data-testid="message-journey-table"] span').withText('Sender');
    // this.receiverJourneyTableColumn = Selector('[data-testid="message-journey-table"] span').withText('Receiver');
    // this.messageSubTypeJourneyTableColumn = Selector('[data-testid="message-journey-table"] span').withText('Type [Sub Type]');
    // this.insertDateJourneyTableColumn = Selector('[data-testid="message-journey-table"] span').withText('Insert Date;')
    this.messageJourneyTableColumn = Selector('[data-testid="message-journey-table"] span').withText('Message');
    this.messagePayloadCrossIcon = Selector('[class^="bg-neutral-gradient-3 text-white font-semibold pl-"] svg');
    this.downloadTabMessageIDValue = Selector('[data-testid="vertical-table"] td').nth(0);
    this.downloadFileText = Selector('h5').withText('Download file');
    this.downloadTabMessageIDText = Selector('[data-testid="vertical-table"] th').withText('Message ID');
    this.downloadTabContentTypeText = Selector('[data-testid="vertical-table"] th').withText('Content type');

    this.senderDropdown = Selector('[data-testid="ArrowDropDownIcon"]').nth(0)
    this.senderDivisionDropdown = Selector('[data-testid="ArrowDropDownIcon"]').nth(1)
    this.messageTypeDropdown = Selector('[data-testid="ArrowDropDownIcon"]').nth(2)
    this.messageStatusDropdown = Selector('[data-testid="ArrowDropDownIcon"]').nth(3)
    this.receiverDropdown = Selector('[data-testid="ArrowDropDownIcon"]').nth(4)
    this.receiverDivisionDropdown = Selector('[data-testid="ArrowDropDownIcon"]').nth(5)
    this.messageSubTypeDropdown = Selector('[data-testid="ArrowDropDownIcon"]').nth(6)
    this.messagesDateDropdown = Selector('[data-testid="ArrowDropDownIcon"]').nth(7)

    this.replayButton = Selector('[data-testid="replay-button"]')
    this.failedToReplay = Selector('div').withText('Message replayed. Message status is now Failed.').nth(7)
    this.sentForReplay = Selector('div').withText('Message sent for replay').nth(7)
    this.warningReplay = Selector('div').withText('Warning: This action could result in multiple mess').nth(2)
    this.okReplayButton = Selector('button').withText('OK')
    this.longerDurationMessage = Selector('div').withText('Replayed message is taking longer than expected to').nth(7)
    this.messageReplayed = Selector('div').withText('Message replayed. Message status is now Completed.')
    this.failedMessageReplayed = Selector('div').withText('Message replayed. Message status is now Failed.')
    this.heldMessageReplayed = Selector('div').withText('Message replayed. Message status is now Held.')
    this.completedMessageReplayed = Selector('div').withText('Message replayed. Message status is now Completed.')
    this.manuallyCompletedMessageReplayed = Selector('div').withText('Message replayed. Message status is now Failed.')
    this.manuallyCompleteButton = Selector('[data-testid="manually-complete-button"]')
    this.sentForManualComplete = Selector('div').withText('Message sent for manual completion')
    this.messageManuallyComplete = Selector('div').withText('Message has been manually completed')
    this.backToTrafficManagerPage = Selector('a').withText('Traffic Manager /') 
    
    this.rowPerPageDropdown =  Selector('[class^="MuiSelect-select MuiTablePagination-select MuiSele"]');
    this.row100PerPage = Selector('li[role="option"]').withText('100'); 
  }
  async navigateToTrafficManagerPage() {
    await t.click(this.viewCard)
  }
  async selectFilter() {
    await t
      .click(Selector(this.viewCard));
    await t
      .click(Selector(this.tabFilter))
  }
  async verifyMessageStatus(a) {
    if (a == 'Completed') {
      await t.expect(this.completedMessageStatus.visible).ok({ timeout: 20000 });
      let completedMessageStatusTitleValue = await this.completedMessageStatus.getAttribute('aria-label')
      await t.expect(completedMessageStatusTitleValue).eql('Complete');

    }
    else if (a == 'Error') {

      await t.expect(this.failedMessageStatus.visible).ok({ timeout: 10000 });
      let failedMessageStatusTitleValue = await this.failedMessageStatus.getAttribute('aria-label')
      await t.expect(failedMessageStatusTitleValue).eql('Failed');

    }
    else if (a == 'In progress') {

      await t.expect(this.inProgressMessageStatus.visible).ok({ timeout: 10000 });
      let inProgressMessageStatusTitleValue = await this.inProgressMessageStatus.getAttribute('aria-label')
      await t.expect(inProgressMessageStatusTitleValue).eql('In progress');
    }
    else if (a == 'Manually completed') {

      await t.expect(this.manuallyCompletedMessageStatus.visible).ok({ timeout: 10000 });
      let manuallyCompletedMessageStatusTitleValue = await this.manuallyCompletedMessageStatus.getAttribute('aria-label')
      await t.expect(manuallyCompletedMessageStatusTitleValue).eql('Manually completed');
    }
    else if (a == 'Held') {

      await t.expect(this.heldMessageStatus.visible).ok({ timeout: 10000 });
      let heldMessageStatusTitleValue = await this.heldMessageStatus.getAttribute('aria-label')
      await t.expect(heldMessageStatusTitleValue).eql('Held');
    }
  }

  async enableView() {
    await t
      .click(this.viewBox)
  }  

  /** Searches for and downloads messages based on a specified date range.*/
  
async downloadMessages(dateRange) {
  await this.selectFilter();
  await this.searchByDate(dateRange);
  await t.click(this.searchButton);

  // Check if the "no messages found" alert is visible
  if (await this.alertMessage.exists && await this.alertMessage.visible) {
    console.log(`No messages found for date range: ${dateRange}. Verifying alert.`);
    await t
      .expect(this.alertMessage.innerText)
      .contains("Unable to find any message for selected filters.");
  } else {
    // If Messages were found, initiate the download
    console.log(`Messages found for date range: ${dateRange}. Initiating download.`);
    await t.click(this.downloadButton);

    // Handling the case when export confirmation pop-up not appears
    if (await this.exportConfirmationText.with({ timeout: 5000 }).exists) {
      console.log("Confirmation pop-up appear. Confirming export.");
      await t
        .expect(this.exportConfirmationText.visible).ok('Export confirmation pop-up should be visible')
        .click(this.exportConfirmButton);
    } else {
      // If the pop-up doesn't appear after 5 seconds, log it and continue
      console.log("No confirmation pop-up appear; assuming download started directly.");
    }
    await t.wait(15000);
  }
}

  async searchById(a) {
    await t
      .click(Selector(this.tabSearchById))
    if (a == 'messageId') {
      await t
        .typeText(Selector(this.messageIdInput), messageId)
    }
    else if (a == 'businessId') {
      await t
        .typeText(Selector(this.businessIdInput), businessId)
    }
    else if (a == 'processId') {
      await t
        .typeText(Selector(this.processIdInput), processId)
    }
    else if (a == 'failedMessageId') {
      await t
        .typeText(Selector(this.messageIdInput), failedMessageId)
    }
    else if (a == 'inProgressMessageId') {
      await t
        .typeText(Selector(this.messageIdInput), inProgressMessageId)
    }
    else if (a == 'manuallyCompletedMessageId') {
      await t
        .typeText(Selector(this.messageIdInput), manuallyCompletedMessageId)
    }
    else if (a == 'heldMessageId') {
      await t
        .typeText(Selector(this.messageIdInput), heldMessageId)
    }
    await t
      .click(Selector(this.searchButton))
      .wait(3000)
    if (await (this.alertMessage).exists) {
      await t.expect((this.alertMessage).innerText).contains("Unable to find any message for selected filters.");
    }
    else {

    }
  }
  async searchByDate(b) {
    await t.click(Selector(this.date))
    if (b == 'Custom') {
      await t
        .click(Selector(this.dateRangeCustom))
        .expect(Selector(this.fromDate).visible).eql(true)
    }
    else if (b == 'dateRangeAll') {
      await t
        .click(Selector(this.dateRangeAll))
    }
    else if (b == 'dateRangeSinceLast30Days') {
      await t
        .click(Selector(this.dateRangeSinceLast30Days))
        .pressKey('up')
      await t
        .pressKey('enter')
    }
    else if (b == 'dateRangeSinceLast7Days') {
      await t
        .click(Selector(this.dateRangeSinceLast7Days))
        .pressKey('up')
      await t
        .pressKey('enter')
    }
    else if (b == 'dateRangeSinceYesterday') {
      await t
        .click(Selector(this.dateRangeSinceYesterday))
        .pressKey('up')
      await t
        .pressKey('enter')
    }
    else if (b == 'dateRangeThisMonth') {
      await t
        .click(Selector(this.dateRangeThisMonth))
        .pressKey('up')
      await t
        .pressKey('enter')
    }
    else if (b == 'dateRangeThisWeek') {
      await t
        .click(Selector(this.dateRangeThisWeek))
        .pressKey('up')
      await t
        .pressKey('enter')
    }
    else if (b == 'dateRangeToday') {
      await t
        .pressKey('up')
      if ((Selector('li').withText('Today').exists)) {
        await t
          .click(Selector('li').withText('Today'))
      }
      else {
        await t
          .pressKey('down')
        if ((Selector('li').withText('Today').exists)) {
          await t
            .click(Selector('li').withText('Today'))
        }
      }
      await t.click(Selector(this.searchButton))
      await t.wait(5000)
      if (await (this.alertMessage).exists) {
        await t.expect((this.alertMessage).innerText).contains("Unable to find any message for selected filters.");
      }
      else {
      }

    }
  }


  async resetFiltersApplied() {
    await t
      .click(Selector(this.resetFilter))
  }

  async searchByMessageStaus(b) {
    await t.click(Selector(this.messageStatus))
    if (b == 'All') {
      await t
        .click(Selector(this.messageStatusAll))
    }
    else if (b == 'messageStatusComplete') {
      await t
        .click(Selector(this.messageStatusComplete))
    }
    else if (b == 'messageStatusFailed') {
      await t
        .click(Selector(this.messageStatusFailed))
    }
    else if (b == 'messageStatusHeld') {
      await t
        .click(Selector(this.messageStatusHeld))
    }
    else if (b == 'messageStausReceived') {
      await t
        .click(Selector(this.messageStausReceived))
    }
    else if (b == 'messageStatusInProgress') {
      await t
        .click(Selector(this.messageStatusInProgress))
    }
    else if (b == 'messageStatusManuallyCompleted') {
      await t
        .click(Selector(this.messageStatusManuallyCompleted))
    }
    await t.click(Selector(this.searchButton))
    await t.wait(5000)
    if (await (this.alertMessage).exists) {
      await t
        .expect((this.alertMessage).innerText).contains("Unable to find any message for selected filters.");
    }
    else {
    }
  }
  async dateRangeAllA() {
    await t.click(Selector(this.messageStatus))
    await t
      .click(Selector(this.dateRangeAll))
  }

  async viewMessage() {
    await t.click(Selector(this.viewDetails))
  }
  async validateMessageDetails() {
    await t
      .expect(this.messageDetails.withText('Business ID').visible).eql(true)
      .expect(this.messageDetails.withText('Message type').visible).eql(true)
      .expect(this.messageDetails.withText('Receiver').visible).eql(true)
      .expect(this.messageDetails.withText('Sender').visible).eql(true)
      .expect(this.messageDetails.withText('Process ID').visible).eql(true)
     // .expect(this.messageDetails.withText('Message ID').visible).eql(true)
     .expect(this.messageDetails.withText('Message subtype').visible).eql(true)
      .expect(this.messageDetails.withText('Message status').visible).eql(true)
      .expect(this.messageDetails.withText('Total duration').visible).eql(true)
      .expect(this.messageDetails.withText('Receiver division').visible).eql(true)
      .expect(this.messageDetails.withText('Sender division').visible).eql(true)
  }
  async validateMessageJourney() {
    await t
      .expect(this.journeyStageJourneyTableColumn.visible).ok()
      .expect(this.stageStatusJourneyTableColumn.visible).ok()
      .expect(this.startDateJourneyTableColumn.visible).ok()
      .expect(this.endDateJourneyTableColumn.visible).ok()
      .expect(this.durationJourneyTableColumn.visible).ok()
      .expect(this.messageJourneyTableColumn.visible).ok()
}
  async validateMessageEvents() {
    await t
      .expect(this.sequenceNumberEventsColumn.visible).ok()
      .expect(this.sourceAdapterEventsColumn.visible).ok()
      .expect(this.eventIdEventsColumn.visible).ok()
      .expect(this.eventNameEventsColumn.visible).ok()
      .expect(this.eventDateEventsColumn.visible).ok()
      .expect(this.statusEventsColumn.visible).ok()

  }
  async viewJourneyDetails() {
    await t.wait(5000)
    await t.click(this.messageJourneyDetails)

  }

  // Not using this method as payload verified dynamically now
  // async getPayloadData(filePath) {
  //   const xmlData = await readFile(filePath, 'utf8');// reads the file at filePath as a string with UTF-8 encoding
  //   const parser = new xml2js.Parser(); // create a parser object.
  //   const result = await parser.parseStringPromise(xmlData); // parses the xmlData string into a JavaScript object
  //   return result.Envelope; // returns the  property from the parsed XML object.
  // }

  // async validatePayload(xmlData,expectedValues) {
  //
  //   //const filePath = 'C:/Workspace/proagrica-test-automation-framework/test/e2e/testScripts/_uploads_/payload.xml';
  //   //const xmlData = fs.readFileSync(filePath, 'utf-8');
  //
  //   const parsedXml = await new xml2js.Parser().parseStringPromise(xmlData);
  //    // Convert entire parsed XML to a JSON string for easy searching
  //   const xmlString = JSON.stringify(parsedXml);
  //
  //   // Validate each expected values in XML
  //   for (const value of expectedValues){
  //     await t.expect(xmlString.includes(value)).ok(`Expected value: "${value}" not found.`)
  //   }
  // }

  async validatePayload(data, expectedValues) {
    let parsedData;
    let dataString = '';

    // Trim whitespace to safely inspect the first character
    const trimmedData = data.trim();

    try {
      if (trimmedData.startsWith('<')) {
        // XML case
        const parser = new xml2js.Parser({ explicitArray: false });
        parsedData = await parser.parseStringPromise(data);
      } else if (trimmedData.startsWith('{') || trimmedData.startsWith('[')) {
        // JSON case
        parsedData = JSON.parse(trimmedData);
      } else {
        // Plain text or unknown structured format
        parsedData = trimmedData;
      }

      // Convert parsed object or text into a string for basic search
      dataString = typeof parsedData === 'object'
          ? JSON.stringify(parsedData)
          : String(parsedData);

    } catch (err) {
      throw new Error(`Failed to parse input data. Reason: ${err.message}`);
    }

    // Validate each expected value
    for (const value of expectedValues) {
      await t.expect(dataString.includes(value)).ok(`Expected value: "${value}" not found.`);
    }
  }

  async downloadPayload() {
    const fileNametxt = this.downloadTabMessageIDValue.innerText + '.txt'
    const homeDirectory = os.homedir();
    const downloadLocation = pathDir.join(homeDirectory, '\Downloads');

    await t
      .click(this.downloadPage)
      .expect(this.downloadFileText.visible).eql(true)
      .expect(this.downloadTabMessageIDText.visible).eql(true)
      .expect(this.downloadTabContentTypeText.visible).eql(true)
      .expect(this.downloadButtonPayload.visible).eql(true)
      .click(this.downloadButtonPayload)
      .expect(fs.existsSync(downloadLocation, fileNametxt)).ok();
  }

  async downloadPayloadforHeldAndManuallyCompleted() {
       await t
      .click(this.downloadPage)
      .expect(this.downloadFileText.visible).eql(true)
      .expect(this.downloadTabMessageIDText.visible).eql(true)
      .expect(this.downloadTabContentTypeText.visible).eql(true)
  }

  async metaData() {
    await t
      .click(this.metadataScreen)
      .expect(this.messageUniqueId.withText(messageId).exists).ok()
  }
  async exceptionValidation() {
    // Ensure the exception tab exists
    const exceptionTabExists = await this.exceptionTab.exists;

    if ( exceptionTabExists) {
      await t
        .click(this.exceptionTab)
        .click(this.exceptionTabSearchBox)
        .expect(this.exceptionTabSearchBox.visible).ok();
    }
    // If the exception tab does not exist, do nothing
  }

  async messageDateAndUpdatedDateColumnsSortable() {
    // this selector only exists for sortable columns 
    const sortableColumn = Selector('[data-testid="sortable-column-label"]');
    // we have used above selector to find the child element with the texts
    const messageDateElement = sortableColumn.find('h6').withText('Message date');
    const updatedDateElement = sortableColumn.find('h6').withText('Updated date');
    const messageIDElement = sortableColumn.find('h6').withText('Message ID');
    const modeMessageTypeElement = sortableColumn.find('h6').withText('Mode/Message type');
    const businessIDElement = sortableColumn.find('h6').withText('Business ID');
    const senderElement = sortableColumn.find('h6').withText('Sender');
    const receiverElement = sortableColumn.find('h6').withText('Receiver');
    const statusElement = sortableColumn.find('h6').withText('Status');
    // Asserting Message date & Updated date are exists and visible and not other columns
    // which indicate both are only sortable column
    await t.expect(messageDateElement.exists).ok();
    await t.expect(messageDateElement.visible).ok();
    await t.expect(updatedDateElement.exists).ok();
    await t.expect(updatedDateElement.visible).ok();
    await t.expect(messageIDElement.exists).notOk();
    await t.expect(modeMessageTypeElement.exists).notOk();
    await t.expect(businessIDElement.exists).notOk();
    await t.expect(senderElement.exists).notOk();
    await t.expect(receiverElement.exists).notOk();
    await t.expect(statusElement.exists).notOk();
  }

  async selectingAllUncheckedColumns() {

    await t.click(this.columnView)
      .click('[name="messageSubType"][data-indeterminate="false"]')
      .click('[name="parentId"][data-indeterminate="false"]')
      .click('[name="processId"][data-indeterminate="false"]')
      .click('[name="senderDivision"][data-indeterminate="false"]')
      .click('[name="receiverDivision"][data-indeterminate="false"]')
      .click('[name="exception"][data-indeterminate="false"]')
      .click('[name="updatedDate"][data-indeterminate="false"]')
      .click('[data-testid="popover"] div')

  }

  async resetingDefaultColumnView() {

    await t.click(this.columnView)
    await t.click(this.resetFilter)
    await t.click('[data-testid="popover"] div')
  }

  async validatingCountOf15Columns() {

    await t.expect(this.messagetableColumns.count).within(14, 15); // asserting 14/15 columns visible, Actions column only visible if any message
  }

  async validatingMessageIDInSearchResults() {

    const searchResultMessageID = await Selector('[data-testid="table-row-0"] td h6 nobr').textContent;
    await t.expect(searchResultMessageID).eql(messageId) //asserting search result is same as the message id we are searching

  }

  async validatingMessageTypeInSearchResults() {

    const searchResultMessageType = await Selector('[data-testid="table-row-0"] td').nth(1).find('h6 div').textContent;
    await t.expect(searchResultMessageType).eql(messageType) //asserting message type in search result

  }

  async validatingSenderInSearchResults() {

    const searchResultSender = await Selector('[data-testid="table-row-0"] td h6').nth(6).textContent;
    await t.expect(searchResultSender).eql(sender) //asserting sender in search result

  }

  async validatingReceiverInSearchResults() {

    const searchResultReceiver = await Selector('[data-testid="table-row-0"] td h6').nth(8).textContent;
    await t.expect(searchResultReceiver).eql(receiver) //asserting receiver in search result

  }

  async validatingBusinessIDInSearchResults() {

    const searchResultBusinessID = await Selector('[data-testid="table-row-0"] td h6').nth(4).textContent;
    await t.expect(searchResultBusinessID).eql(businessId) //asserting Business ID in search result

  }


  async validatingProcessIDInSearchResults() {

    const searchResultProcessID = await Selector('[data-testid="table-row-0"] td h6').nth(5).textContent;
    await t.expect(searchResultProcessID).eql(processId) //asserting Process ID in search result

  }

  async senderDropdownSelection(sendername) {

    await t.click(Selector('[title="Open"]').nth(1).find('svg'));
    await t.typeText(Selector('[data-testid="form-body"] [class^="MuiInputBase-input MuiOutlinedInput-input MuiInput"]'), sendername)
      .pressKey('down')
      .pressKey('enter')

  }

  async validateSenderAndReceiverDropdownValuesNotDuplicates(dropdownname) {
    if (dropdownname == 'sender') {
      await t.click(this.senderDropdown)
    }
    else if (dropdownname == 'receiver') {
      await t.click(this.receiverDropdown)
    }
    const allLists = [];
    const options = Selector('[data-option-index] span'); //This will select all the options from the dropdown
    for (let i = 0; i < await options.count; i++) {
      const values = await options.nth(i).innerText;
      allLists.push(values);
    }
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
    const duplicates = (findDuplicates(allLists))
    var lengthOfDuplicate = duplicates.length
    if (lengthOfDuplicate > 0) {
      await t.expect(lengthOfDuplicate).eql(0);
    } else {
      console.log('No duplicates found.');
    }
    if (dropdownname == 'sender') {
      await t.click(this.senderDropdown)
    }
    else if (dropdownname == 'receiver') {
      await t.click(this.receiverDropdown)
    }
  }

  async validateMessageTypeAndSubTypeDropdownValuesInAscOrder(dropdown) {
    if (dropdown == 'messageType') {
      await t.click(this.messageTypeDropdown)
      const messageTypes = Selector('[data-option-index] span'); // This will select all the options from the dropdown
      for (let i = 0; i < await messageTypes.count; i++) {
        const messageTypevalues = await messageTypes.nth(i).innerText;
        dropdownValuesMessageType.push(messageTypevalues);
      }
      const sortedDropdownValues = dropdownValuesMessageType.sort((a, b) => a - b);
      await t.expect(dropdownValuesMessageType).eql(sortedDropdownValues)
      await t.click(this.messageTypeDropdown)
    }
    else if (dropdown == 'messageSubType') {
      await t.click(this.messageSubTypeDropdown)
      const messageSubTypes = Selector('[data-option-index] span');// This will select all the options from the dropdown
      for (let i = 0; i < await messageSubTypes.count; i++) {
        const messageSubTypevalues = await messageSubTypes.nth(i).innerText;
        dropdownValuesMessageSubType.push(messageSubTypevalues);
      }
      const sortedDropdownValues = dropdownValuesMessageSubType.sort((a, b) => a - b);
      await t.expect(dropdownValuesMessageSubType).eql(sortedDropdownValues)
      await t.click(this.messageSubTypeDropdown)
    }
  }

  async validateSenderAndReceiverDivisionDropdownValuesInAscOrder(dropdown) {
    const dropdownValues = [];
    if (dropdown == 'senderDivision') {
      await t.click(this.senderDivisionDropdown)
    }
    else if (dropdown == 'receiverDivision') {
      await t.click(this.receiverDivisionDropdown)
    }

    const divisionList = Selector('[data-option-index] span'); // This will select all the options from the dropdown
    for (let i = 0; i < await divisionList.count; i++) {
      const divisionListvalues = await divisionList.nth(i).innerText;
      dropdownValues.push(divisionListvalues);
    }
    const sortedDropdownValues = dropdownValues.sort((a, b) => a - b);
    await t.expect(dropdownValues).eql(sortedDropdownValues)
    if (dropdown == 'senderDivision') {
      await t.click(this.senderDivisionDropdown)
    }
    else if (dropdown == 'receiverDivision') {
      await t.click(this.receiverDivisionDropdown)
    }
  }

  async validateSenderReceiverDropdownValuesInAscOrder(dropdown) {
    const dropdownValues = [];
    if (dropdown == 'sender') {
      await t.click(this.senderDropdown)
    }
    else if (dropdown == 'receiver') {
      await t.click(this.receiverDropdown)
    }

    const divisionList = Selector('[data-option-index] span');

    for (let i = 0; i < await divisionList.count; i++) {
      const divisionListvalues = await divisionList.nth(i).innerText;
      dropdownValues.push(divisionListvalues);
    }
    const sortedDropdownValues = dropdownValues.sort((a, b) => a - b);
    await t.expect(dropdownValues).eql(sortedDropdownValues)
    if (dropdown == 'sender') {
      await t.click(this.senderDropdown)
    }
    else if (dropdown == 'receiver') {
      await t.click(this.receiverDropdown)
    }
  }


async getDistinctMessageTypeMessageSubType(filter) {
  const messageList = new Set();
  let column, tag;

  // Set up initial UI state
  await t
    .click(this.messagesDateDropdown)
    .click(this.dateRangeAll)
    .click(this.searchButton);

  // Configure column and tag based on filter type
  if (filter === 'messageType') {
    column = 1;
    tag = 'h6 div';
  } else if (filter === 'messageSubType') {
    column = 2;
    tag = 'h6';

    await t
      .click(this.columnView)
      .click(Selector('[name="messageSubType"][data-indeterminate="false"]'))
      .click(Selector('[data-testid="popover"] div'));
  }

  await t
  .click(this.rowPerPageDropdown)
  .click(this.row100PerPage)
  // Collect distinct message types or subtypes from the table
  while (true) {
    const rowCount = await this.tableRowSelector.count;

    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const cell = this.tableRowSelector
        .nth(rowIndex)
        .find('td')
        .nth(column)
        .find(tag);

      const text = (await cell.innerText)?.trim();
      if (text) messageList.add(text);
    }

    if (await this.nextPageButton.hasClass('Mui-disabled')) break;
    await t.click(this.nextPageButton);
  }

  // Normalize, filter, and sort the collected data
  const sortedDistinctValues = Array.from(messageList)
    .map(value => value.replace(/-/g, '').trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  // Determine which dropdown to compare with
  const dropdownValues = filter === 'messageType'
    ? dropdownValuesMessageType
    : dropdownValuesMessageSubType;

  const sortedDropdownValues = dropdownValues
    .filter(value => value !== 'All')
    .map(value => value.replace(/-/g, '').trim())
    .sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  // Assertion
  await t.expect(sortedDropdownValues).eql(sortedDistinctValues);

}

  async receiverDropdownSelection(receivername) {

    await t.click(Selector('[title="Open"]').nth(4).find('svg'));
    await t.typeText(Selector('[data-testid="form-body"] [class^="MuiInputBase-input MuiOutlinedInput-input MuiInput"]').nth(3), receivername)
      .pressKey('down')
      .pressKey('enter')

  }
  async messageTypeDropdownSelection(messagetype) {

    await t.click(Selector('[title="Open"]').nth(2).find('svg'))
    await t.click(Selector('span').withText(messagetype))

  }

  async assertProcessIdInTableRows() {

    while (true) {
      await t
      .click(this.rowPerPageDropdown)
      .click(this.row100PerPage)
      const rowCount = await this.tableRowSelector.count; // Get the total number of rows
      // Iterate through each row
      for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const processIDColumn = this.tableRowSelector.nth(rowIndex).find('td').nth(5);  // new selector for the current row's fifth column(Process ID)         
        const procesIDRowData = await processIDColumn.innerText;  // Access the data in the process id column of the current row
        await t.expect(`${procesIDRowData}`).contains(processId);  // Asserting each row contains the process ID we are searching      
      }
      // Click on next page button until we see the next page button has class name as Mui-disabled
      const isDisabled = await this.nextPageButton.hasClass('Mui-disabled');

      if (!isDisabled) {
        await t.click(this.nextPageButton);
      } else {
        break;  // Exit the loop if next page button is disabled
      }
    }
  }

  async assertMessageTypeInTableRows() {

    while (true) {
      const rowCount = await this.tableRowSelector.count; //  // Get the total number of rows
      // Iterate through each row
      for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const messageTypeColumn = this.tableRowSelector.nth(rowIndex).find('td').nth(1).find('h6 div');  // new selector for the current row's second column(message type)                             
        const messageTypeRowData = await messageTypeColumn.innerText;
        await t.expect(messageTypeRowData).match(/^(Supply Order|execution)$/);  // Asserting each row contain message type we are searching  

      }
      // Click on next page button until we see the next page button has class name as Mui-disabled
      const isDisabled = await this.nextPageButton.hasClass('Mui-disabled');

      if (!isDisabled) {
        await t.click(this.nextPageButton);
      }
      else {
        break;  // Exit the loop if next page button is disable
      }
    }
  }

  async assertSenderInTableRows() {

    while (true) {
      const rowCount = await this.tableRowSelector.count; //  // Get the total number of rows
      // Iterate through each row
      for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const senderColumn = this.tableRowSelector.nth(rowIndex).find('td').nth(3);  // new selector for the current row's third column(sender)
        const senderRowData = await senderColumn.innerText;
        await t.expect(senderRowData).match(/^(Test123|TESTMEMBER 01)$/); // Asserting each row contain sender we are searching  
      }
      // Click on next page button until we see the next page button has class name as Mui-disabled
      const isDisabled = await this.nextPageButton.hasClass('Mui-disabled');

      if (!isDisabled) {
        await t.click(this.nextPageButton);
      }
      else {
        break;  // Exit the loop if next page button is disable
      }
    }
  }

  async assertReceiverInTableRows() {

    while (true) {
      const rowCount = await this.tableRowSelector.count; //  // Get the total number of rows
      // Iterate through each row
      for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const receiverColumn = this.tableRowSelector.nth(rowIndex).find('td').nth(4);  // new selector for the current row's fourth column(receiver)
        const receiverRowData = await receiverColumn.innerText;
        await t.expect(`${receiverRowData}`).eql('CM Member Five') // Asserting each row contain receiver we are searching  
      }
      // Click on next page button until we see the next page button has class name as Mui-disabled
      const isDisabled = await this.nextPageButton.hasClass('Mui-disabled');

      if (!isDisabled) {
        await t.click(this.nextPageButton);
      }
      else {
        break;  // Exit the loop if next page button is disable
      }
    }
  }

  async assertMessageStatusInTableRows() {

    while (true) {
      const rowCount = await this.tableRowSelector.count; //  // Get the total number of rows
      // Iterate through each row
      for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const statusColumn = this.tableRowSelector.nth(rowIndex).find('td').nth(5).find('h6 span');  // new selector for the current row's fifth column(status)
        const statusRowData = await statusColumn.getAttribute('aria-label');
        await t.expect(`${statusRowData}`).eql('Complete') // Asserting each row contain message status complete
      }
      // Click on next page button until we see the next page button has class name as Mui-disabled
      const isDisabled = await this.nextPageButton.hasClass('Mui-disabled');

      if (!isDisabled) {
        await t.click(this.nextPageButton);
      }
      else {
        break;  // Exit the loop if next page button is disable
      }
    }
  }

  async assertMessageDateAsCurrentDateInTableRows() {

    while (true) {
      const rowCount = await this.tableRowSelector.count; //  // Get the total number of rows
      // Iterate through each row
      for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const messageDateColumn = this.tableRowSelector.nth(rowIndex).find('td').nth(6);  // new selector for the current row's sixth column(message date)               
        const messageDateColumnRowData = await messageDateColumn.innerText
        const extractedMessageDateRowData = messageDateColumnRowData.split(',')[0].trim(); //Extract only the date part        
        const today = new Date().toLocaleDateString('en-UK', { timeZone: 'UTC' });
        await t.expect(`${extractedMessageDateRowData}`).eql(today) // Asserting each row contain message date as today 
      }
      // Click on next page button until we see the next page button has class name as Mui-disabled
      const isDisabled = await this.nextPageButton.hasClass('Mui-disabled');

      if (!isDisabled) {
        await t.click(this.nextPageButton);
      }
      else {
        break;  // Exit the loop if next page button is disable
      }
    }
  }

  async assertMessageDateAsYesterdayOrTodayInTableRows() {

    while (true) {
      const rowCount = await this.tableRowSelector.count; //  // Get the total number of rows
      // Iterate through each row
      for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const messageDateColumn = this.tableRowSelector.nth(rowIndex).find('td').nth(6);  // new selector for the current row's sixth column(message date)               
        const messageDateColumnRowData = await messageDateColumn.innerText
        const extractedmessageDateRowData = messageDateColumnRowData.split(',')[0].trim(); //Extract only the date part from this format: 10/01/2024, 13:32:32       
        const today = new Date().toLocaleDateString('en-UK', { timeZone: 'UTC' });
        const yesterday = new Date();  //represents the current date
        yesterday.setDate(yesterday.getDate() - 1);  // get the day of the month of the current date and  subtract 1 set that for yesterday
        const yesterdayString = yesterday.toLocaleDateString('en-UK', { timeZone: 'UTC' });
        await t.expect(extractedmessageDateRowData === today || extractedmessageDateRowData === yesterdayString).eql(true)
      }

      // Click on next page button until we see the next page button has class name as Mui-disabled
      const isDisabled = await this.nextPageButton.hasClass('Mui-disabled');

      if (!isDisabled) {
        await t.click(this.nextPageButton);
      }
      else {
        break;  // Exit the loop if next page button is disable
      }
    }
  }

  async assertMessageInfo(messageInfo) {
    // Destructure messageInfo object with default values
    const {
      businessID = null,
      processID = null,
      messageType = null,
      messageID = null,
      receiver = null,
      receiverDivision = null,
      sender = null,
      senderDivision = null
    } = messageInfo;

    // Assert message info based on provided values
    if (businessID !== null) {
      await t.expect(this.messageInfoBusinessID.innerText).eql(businessID);
    }
    if (processID !== null) {
      await t.expect(this.messageInfoProcessID.innerText).eql(processID);
    }
    if (messageType !== null) {
      await t.expect(this.messageInfoMessageType.innerText).eql(messageType);
    }
    //message Id is not displayed in the messageInfo section
    // if (messageID !== null) {
    //   await t.expect(this.messageInfoMessageID.innerText).eql(messageID);
    // }
    if (receiver !== null) {
      await t.expect(this.messageInfoReceiver.innerText).eql(receiver);
    }
    if (receiverDivision !== null) {
      await t.expect(this.messageInfoReceiverDivision.innerText).eql(receiverDivision);
    }
    if (sender !== null) {
      await t.expect(this.messageInfoSender.innerText).eql(sender);
    }
    if (senderDivision !== null) {
      await t.expect(this.messageInfoSenderDivision.innerText).eql(senderDivision);
    }
  }
  // This method will retrieve the text of whole payload
  async fetchPayload() {
     return await Selector('[data-testid="highlighter"] span').innerText;
  }

  async assertMetaDataBaseOnTrackingPointValues() {
    const messageJourneyTableRows = Selector('[data-testid="message-journey-table"] tr'); // this will get all the rows from journey table

    const trackingPointValues = [];
    // Loop through each row (starting from index 1 to skip the header)
    for (let i = 1; i < await messageJourneyTableRows.count; i++) {
      const trackingPoint = await messageJourneyTableRows.nth(i).find('td').nth(0).innerText; // extracting first tracking point text
      // storing tracking points and row number for later use
      trackingPointValues.push({
        value: trackingPoint.trim().toUpperCase(),
        row: messageJourneyTableRows.nth(i),
        index: i
      });
    }
    //  here we have defined expected payload values for each tracking point
    const expectedPayloadValues = {
      'ON_RAMP': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'],
      'SEND': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'],
      'RECEIVE': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'],
      'OFF_RAMP': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'],
      'COMPLETE': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'],
      'ERROR': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'],
      'TRANSFORM': [
        ["8029057", "Norwich", "URGENT - Please deliver tomorrow. Thank you"], // without transformation
        ["8029057", "Norwich", "URGENT - Please deliver tomorrow. Thank you", "Ajits' test mapping"] // with transformation
      ],
      'CODE_MATCHER': [
        ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'], // without code matching
        ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you', 'Updated_ID1ByCM', 'Updated_ID2ByCM','Updated_ID3ByCM'] // with code matching
      ],
      'HELD': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'],
      'MANUALLY COMPLETED': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you']
    };
    // clicking on View link for each tracking point
    for (const { value, row, index } of trackingPointValues) {

      // these are the selectors for error, held, and not_started icons from second column (Stage status) from journey table
      const errorIconSelector = Selector('[data-testid="message-journey-table"] tr')
          .nth(index)
          .find('td')
          .nth(1)
          .find('[data-testid="ERROR"]');

      const heldIconSelector = Selector('[data-testid="message-journey-table"] tr')
          .nth(index)
          .find('td')
          .nth(1)
          .find('[data-testid="HELD"]');

      const notStartedIconSelector = Selector('[data-testid="message-journey-table"] tr')
          .nth(index)
          .find('td')
          .nth(1)
          .find('[data-testid="NOT_STARTED"]');
      // checking if above icons exists
      const errorIconExists = await errorIconSelector.exists;
      const heldIconExists = await heldIconSelector.exists;
      const notStartedIconExists = await notStartedIconSelector.exists;

      // Skip validation if "NOT_STARTED" icon is present otherwise continue
      if (notStartedIconExists) {
        console.log(`Skipping validation for tracking point: ${value} because it is NOT_STARTED`);
        continue;
      }
      await t.click(row.find('button').withText('View')); // This line is skipped if NOT_STARTED icon present
      // Fetch the payload xml data and saved into variable
      // line comment out due to NWK-2627 -- const dynamicPayload = await this.fetchPayload(); // This line is skipped if NOT_STARTED icon present
      // checking if TRANSFORM tracking point have failed Stage status, transformation won't happen
      if (value === 'TRANSFORM') {
        const expectedPayload = errorIconExists
            ? expectedPayloadValues['TRANSFORM'][0]
            : expectedPayloadValues['TRANSFORM'][1];
      // line comment out due to NWK-2627 -- await this.validatePayload(dynamicPayload, expectedPayload);
      // checking if CODE_MATCHER tracking point have failed Stage status, code matching won't happen
      } else if (value === 'CODE_MATCHER') {
        const expectedPayload = heldIconExists
            ? expectedPayloadValues['CODE_MATCHER'][0]
            : expectedPayloadValues['CODE_MATCHER'][1];
        // line comment out due to NWK-2627 -- await this.validatePayload(dynamicPayload, expectedPayload);
      } else if (expectedPayloadValues[value]) {
        // line comment out due to NWK-2627 -- await this.validatePayload(dynamicPayload, expectedPayloadValues[value]);
      } else {
        console.warn(`No expected payload values defined for tracking point: ${value}`);
      }
      // downloading payload button is not available for below scenarios
      if (value === 'HELD' || value === 'MANUALLY COMPLETED' || (value === 'CODE_MATCHER' && heldIconExists)) {
        await this.downloadPayloadforHeldAndManuallyCompleted(); // not downloading the payload here
      } else {
        await this.downloadPayload(); // downloading and validating the payload here
      }
      // exception validation, if exception tab present
      await this.exceptionValidation();
      // validating all metadata keys
      await this.assertMetadataKeysVisibility();
      await t.click(this.messagePayloadCrossIcon);
    }
  }

  async assertMetaDataBaseOnTrackingPointValuesSkipTransform() {
    const messageJourneyTableRows = Selector('[data-testid="message-journey-table"] tr'); // this will get all the rows from journey table

    const trackingPointValues = [];
    // Loop through each row (starting from index 1 to skip the header)
    for (let i = 1; i < await messageJourneyTableRows.count; i++) {
      const trackingPoint = await messageJourneyTableRows.nth(i).find('td').nth(0).innerText; // extracting first tracking point text
      // storing tracking points and row number for later use
      trackingPointValues.push({
        value: trackingPoint.trim().toUpperCase(),
        row: messageJourneyTableRows.nth(i),
        index: i
      });
    }
    //  here we have defined expected payload values for each tracking point
    const expectedPayloadValues = {
      'ON_RAMP': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'],
      'SEND': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'],
      'RECEIVE': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'],
      'OFF_RAMP': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'],
      'COMPLETE': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'],
      'ERROR': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'],
      'CODE_MATCHER': [
        ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'], // without code matching
        ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you', 'Updated_ID1ByCM', 'Updated_ID2ByCM','Updated_ID3ByCM'] // with code matching
      ],
      'HELD': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you'],
      'MANUALLY COMPLETED': ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you']
    };
    // clicking on View link for each tracking point
    for (const { value, row, index } of trackingPointValues) {

      // these are the selectors for error, held, and not_started icons from second column (Stage status) from journey table
      const errorIconSelector = Selector('[data-testid="message-journey-table"] tr')
          .nth(index)
          .find('td')
          .nth(1)
          .find('[data-testid="ERROR"]');

      const heldIconSelector = Selector('[data-testid="message-journey-table"] tr')
          .nth(index)
          .find('td')
          .nth(1)
          .find('[data-testid="HELD"]');

      const notStartedIconSelector = Selector('[data-testid="message-journey-table"] tr')
          .nth(index)
          .find('td')
          .nth(1)
          .find('[data-testid="NOT_STARTED"]');
      // checking if above icons exists
      const errorIconExists = await errorIconSelector.exists;
      const heldIconExists = await heldIconSelector.exists;
      const notStartedIconExists = await notStartedIconSelector.exists;

      // Skip validation if "NOT_STARTED" icon is present otherwise continue
      if (notStartedIconExists) {
        console.log(`Skipping validation for tracking point: ${value} because it is NOT_STARTED`);
        continue;
      }
      await t.click(row.find('button').withText('View')); // This line is skipped if NOT_STARTED icon present
      if (value === 'TRANSFORM') {
        // Skip fetching payload and any validation here for TRANSFORM
        console.log(`Skipping payload fetch for tracking point: ${value}`);
        await t.click(this.messagePayloadCrossIcon);  // close the payload popup
        continue;  // move on to next tracking point
      }

      // For other tracking points, fetch payload as usual
      const dynamicPayload = await this.fetchPayload();

      // existing validation logic
      if (value === 'CODE_MATCHER') {
        const expectedPayload = heldIconExists
            ? expectedPayloadValues['CODE_MATCHER'][0]
            : expectedPayloadValues['CODE_MATCHER'][1];
        await this.validatePayload(dynamicPayload, expectedPayload);
      } else if (expectedPayloadValues[value]) {
        await this.validatePayload(dynamicPayload, expectedPayloadValues[value]);
      } else {
        console.warn(`No expected payload values defined for tracking point: ${value}`);
      }

      if (value === 'HELD' || value === 'MANUALLY COMPLETED' || (value === 'CODE_MATCHER' && heldIconExists)) {
        await this.downloadPayloadforHeldAndManuallyCompleted();
      } else {
        await this.downloadPayload();
      }
      await this.exceptionValidation();
      await this.assertMetadataKeysVisibility();
      await t.click(this.messagePayloadCrossIcon);
    }
  }

  async verifyTransformPayloadFormat({
                                       trackingPoint = 'TRANSFORM',
                                       mappingKey = 'mapping',
                                       errorMappingKey = 'errorMapping',
                                       occurrence = 1  // for selecting which TRANSFORM
                                     } = {}) {
    const messageJourneyTableRows = Selector('[data-testid="message-journey-table"] tr');

    let matchCount = 0;

    for (let i = 1; i < await messageJourneyTableRows.count; i++) {
      const currentTrackingPoint = await messageJourneyTableRows.nth(i).find('td').nth(0).innerText;

      if (currentTrackingPoint.trim().toUpperCase() === trackingPoint.toUpperCase()) {
        matchCount++;

        if (matchCount !== occurrence) continue; // Skip until we hit the correct one
        await t.click(messageJourneyTableRows.nth(i).find('button').withText('View'));
        const actualPayload = await this.fetchPayload();

        const fileMap = {
          mappingJson: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'jsonOutput.json'),
          mappingJsonToXml: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'JsonToXml.xml'),
          mappingOriginalPayloadXML: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'payload.xml'),
          mappingFindAndReplaceOutputXML: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'FindAndReplaceOutput.xml'),
          mappingXmlToEdifactOutput: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'XMLToEDIFACTOutput.xml'),
          mappingXmlToEdiANSIx12Output: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'XMLToEdiANSIIx12Output.xml'),
          mappingSchematronOutput: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'SchematronOutput.xml'),
          errorMappingSchematronOutput: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'SchematronInvalidInput.xml'),
          errorMappingJson: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'nonJsonFile.txt'),
          errorMappingXML: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'nonXMLFile.txt'),
          payloadMissingEndTag: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'payloadMissingEndTag.xml'),
          XSDCompliantPayload: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'XSDCompliantPayload.xml'),
          XSDNonCompliantPayload: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'XSDNonCompliantPayload.xml'),
          FlatFileOutput: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'FlatFileOutput.xml'),
          InvalidDelimiterPayload: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'InvalidDelimiterPayload.xml'),
          EDIFACTOutput: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'EDIFACTOutput.xml'),
          EDIFACTInvalidInput: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'EDIFACTInvalidInput.txt'),
          EDI_ANSIx12Output: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'EDI_ANSIx12Output.xml'),
          XalanOutput: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'XalanOutput.txt'),
          ISOOutput: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'ISOOutput.xml'),
         // errorMappingB: path.resolve(__dirname, '..', 'testScripts', '_uploads_', 'errorB.json'),
        };

        const errorIconSelector = messageJourneyTableRows.nth(i)
            .find('td').nth(1)
            .find('[data-testid="ERROR"]');
        const errorIconExists = await errorIconSelector.exists;

        const selectedKey = errorIconExists ? errorMappingKey : mappingKey;
        const filePathToUse = fileMap[selectedKey];
        const expectedPayload = fs.readFileSync(filePathToUse, 'utf8').trim();

        await t.expect(actualPayload).eql(expectedPayload, `Payload for ${trackingPoint} (occurrence ${occurrence}) does not match expected format`);
        break;
      }
    }
  }


  //lineto assert the visibility of metadata keys
  async assertMetadataKeysVisibility() {

    // List of common metadata keys to assert
    const metadataKeys = [
      '_interlokMessageConsumedFrom',
      'adpmessagetype',
      'adpnextmlemarkersequence',
      'businessId',
      'pn.routing.channel',
      'pn.routing.description',
      'destination',
      'pn.routing.hubSource',
      'JMS_Solace_DeadMsgQueueEligible',
      'JMS_Solace_DeliverToOne',
      'JMS_Solace_ElidingEligible',
      'JMS_Solace_isXML',
      'JMSDeliveryMode',
      'JMSDestination',
      'JMSExpiration',
      'JMSMessageID',
      'JMSPriority',
      'JMSRedelivered',
      'JMSReplyTo',
      'JMSTimestamp',
      'JMSXDeliveryCount',
      'JMSXUserID',
      "pn.routing.messageStatus",
      'messageType',
      'messageuniqueid',
      'processId',
      'pn.routing.region',
      'pn.routing.sequenceNumber',
      'Solace_JMS_Prop_IS_Reply_Message',
      'source',
      'Receiver division',
      'Sender division'
    ];
    await t.click(this.metadataScreen)
    for (const key of metadataKeys) {
      // Define a selector for the metadata key
      const metadataKeySelector = Selector('[data-testid^="vertical-table-row-"] th').withText(key);

      if (key === 'pn.routing.channel') {
        // For the 'channel' key, check if it exists, and skip the assertion if it doesn't
        const channelKeyExists = await metadataKeySelector.exists;

        if (!channelKeyExists) {
          continue; // Skip the assertion and move to the next key
        }
      }

      // Assert the metadata key is visible (for all other keys)
      await t
        .expect(metadataKeySelector.exists).ok(`Metadata key ${key} is not visible`)
    }
  }

  async seacrhByMessageId(messageuniqueid) {

    await t.click(this.tabSearchById);
    await t.typeText(this.messageIdInput, messageuniqueid);
    await t.click(this.searchButton);
  }
  async clearMessageId() {
    await t
        .selectText(this.messageIdInput)
        .pressKey('delete')
  }
  async searchAndReplayMessage()
  {
    await t
        .click(Selector(this.searchButton))
        .click(this.viewDetails)
        .click(this.replayButton)
  }
  async searchAndManuallyCompleteMessage()
  {
    await t
        .click(this.searchButton)
        .click(this.viewDetails)
        .click(this.manuallyCompleteButton)
  }

  async replayMessages(messageToReplay) {
    //Helper: only strip artificial suffixes added by test code
    function extractRawId(id) {
        const artificialSuffixes = [
            "-completed", "-failed", "-inProgress", "-held", "-manuallyCompleted"
        ];

        for (const suffix of artificialSuffixes) {
            if (id.endsWith(suffix)) {
                return id.slice(0, -suffix.length); 
            }
        }

        return id; 
    }


    for (let i = 0; i < messageToReplay.length; i++) {
        const id = messageToReplay[i];
        const rawId = extractRawId(id);   

        try {
            if (id.includes('completed')) { 

               const trafficManagerLink = Selector('a').withText('Traffic Manager /');

                  if (await trafficManagerLink.exists && await trafficManagerLink.visible) {
                      await t.click(trafficManagerLink);
                  } else {
                      console.log('Traffic Manager link not visible, skipping click');
                  }

                await t.click(Selector(this.tabSearchById));
                await this.clearMessageId();
                await t.typeText(Selector(this.messageIdInput), rawId);   // search rawId
                await this.searchAndReplayMessage();
                await t.expect(this.sentForReplay.visible).ok();
                await t.expect(this.completedMessageReplayed.visible).ok({ timeout: 15000 });
            } 
            else if (id.includes('failed')) {
                 const trafficManagerLink = Selector('a').withText('Traffic Manager /');

                  if (await trafficManagerLink.exists && await trafficManagerLink.visible) {
                      await t.click(trafficManagerLink);
                  } else {
                      console.log('Traffic Manager link not visible, skipping click');
                  }
                await t.click(Selector(this.tabSearchById));
                await this.clearMessageId();
                await t.typeText(Selector(this.messageIdInput), rawId);   // search rawId
                await this.searchAndReplayMessage();
                await t.expect(this.sentForReplay.visible).ok();
                await t.expect(this.failedMessageReplayed.visible).ok({ timeout: 15000 });
            } 
            else if (id.includes('inProgress')) {
                const trafficManagerLink = Selector('a').withText('Traffic Manager /');

                  if (await trafficManagerLink.exists && await trafficManagerLink.visible) {
                      await t.click(trafficManagerLink);
                  } else {
                      console.log('Traffic Manager link not visible, skipping click');
                  }
                await t.click(Selector(this.tabSearchById));
                await t.typeText(Selector(this.messageIdInput), rawId);   // search rawId
                await this.searchAndReplayMessage();
                if (await this.warningReplay.exists) {
                    await t.click(this.okReplayButton);
                    await t.expect(this.sentForReplay.visible).ok();
                    await t.expect(this.longerDurationMessage.visible).ok({ timeout: 15000 });
                } else {
                    await t.expect(this.sentForReplay.visible).ok();
                    await t.expect(this.messageReplayed.exists).ok();
                }
            } 
            else if (id.includes('held')) {
                 const trafficManagerLink = Selector('a').withText('Traffic Manager /');

                  if (await trafficManagerLink.exists && await trafficManagerLink.visible) {
                      await t.click(trafficManagerLink);
                  } else {
                      console.log('Traffic Manager link not visible, skipping click');
                  }
                await t.click(Selector(this.tabSearchById));
                await this.clearMessageId();
                await t.typeText(Selector(this.messageIdInput), rawId);   // search rawId
                await this.searchAndReplayMessage();
                await t.expect(this.sentForReplay.visible).ok();
                await t.expect(this.heldMessageReplayed.visible).ok({ timeout: 15000 });
            } 
            else if (id.includes('manuallyCompleted')) {
                 const trafficManagerLink = Selector('a').withText('Traffic Manager /');

                  if (await trafficManagerLink.exists && await trafficManagerLink.visible) {
                      await t.click(trafficManagerLink);
                  } else {
                      console.log('Traffic Manager link not visible, skipping click');
                  }
                await t.click(Selector(this.tabSearchById));
                await this.clearMessageId();
                await t.typeText(Selector(this.messageIdInput), rawId);   // search rawId
                await this.searchAndManuallyCompleteMessage();
                await t.expect(this.sentForManualComplete.visible).ok();
                await t.expect(this.messageManuallyComplete.visible).ok({ timeout: 15000 });
                await t.wait(5000).click(this.replayButton);
                await t.expect(this.sentForReplay.visible).ok();
                await t.expect(this.manuallyCompletedMessageReplayed.visible).ok({ timeout: 15000 });
            }
              console.log(`Replay succeeded for message ID: ${id}`);
        } catch (error) {
            console.warn(`Replay failed for message ID "${id}" (searched: "${rawId}"). Error: ${error.message}`);
            // Continue to next message
        }
    }
};



async replayCCMessages(messageToReplay) {
  // Define expected snackbar messages per ID
const expectedMessages = {
    '256a3945-9d62-4651-9fc5-6981978e18d6': 'This message does not support reprocessing',
    '61e8ff9c-8c6a-4d96-a02b-bb5fa354e69d': 'Unable to replay message'
};
    for (let i = 0; i < messageToReplay.length; i++) {
        const id = messageToReplay[i];

        const trafficManagerLink = Selector('a').withText(/Traffic Manager/);

        if (await trafficManagerLink.exists) {
            await t.expect(trafficManagerLink.visible).ok({ timeout: 5000 });
            await t.click(trafficManagerLink);
        }

        await t.expect(Selector(this.tabSearchById).exists).ok({ timeout: 5000 });
        await t.click(Selector(this.tabSearchById));

        await this.clearMessageId();
        await t.typeText(Selector(this.messageIdInput), `${id}`);
        await this.searchAndReplayMessage();

        const okButton = TestCafeTestingLibrary.getByRole('button', { name: 'OK' });
        if (await okButton.exists) {
            await t.click(okButton);
        }
        const snackbar = Selector('div[class*="MuiSnackbarContent-message"]');
        await t.expect(snackbar.exists).ok({ timeout: 5000 });
        const actualMessage = await snackbar.innerText;

        console.log(`Snackbar for ${id}: ${actualMessage}`);
        const closeSnackbarButton = TestCafeTestingLibrary.getByRole('button', { name: /close/i });
        await t.click(closeSnackbarButton);
          // Compare with expected message if defined
        if (expectedMessages[id]) {
            await t.expect(actualMessage).eql(
                expectedMessages[id],
                `Unexpected snackbar for ${id}`
            );
        } else {
            await t.expect(actualMessage).ok(`No snackbar message for ${id}`);
        }
    }
}



  async manuallyCompleteMessages(messageToManualComplete) {
    for (let i = 0; i < messageToManualComplete.length; i++) {
      const id = messageToManualComplete[i];

      if (id.includes('failed')) {

        await t
          .click(Selector(this.tabSearchById))
        await t
          .typeText(Selector(this.messageIdInput), `${id}`)
        await this.searchAndManuallyCompleteMessage()
        await t
          .expect(this.sentForManualComplete.visible).ok()
          .expect(this.messageManuallyComplete.visible)
          .ok({ timeout: 15000 });
      }
      else if (id.includes('held')) {
        await t.click(this.backToTrafficManagerPage)
        await t
          .click(Selector(this.tabSearchById))
        await this.clearMessageId()
        await t
          .typeText(this.messageIdInput, `${id}`)
        await this.searchAndManuallyCompleteMessage()
        await t
          .expect(this.sentForManualComplete.visible).ok()
          .expect(this.messageManuallyComplete.visible)
          .ok({ timeout: 15000 });
      }
      else if (id.includes('inProgress')) {
        await t.click(this.backToTrafficManagerPage)
        await t
          .click(this.tabSearchById)
        await this.clearMessageId()
        await t
          .typeText(this.messageIdInput, `${id}`)
        await this.searchAndManuallyCompleteMessage()
        if (this.warningReplay) {
          await t
            .click(this.okReplayButton)
            .expect(this.sentForManualComplete.visible).ok()
            .expect(this.messageManuallyComplete.visible)
            .ok({ timeout: 15000 });

        }
        else
        {
          await t 
          .expect(this.sentForManualComplete.visible).ok()
          .expect(this.messageManuallyComplete.visible)
          .ok({ timeout: 15000 });

        }


      }

    }
  };

  async searchByCirrusMessageId(messageId)
  {
       await t
      .click(this.tabSearchById)
    
      await t
        .typeText((this.messageIdInput), messageId, { replace: true })
          await t
      .click(this.searchButton)
      .wait(3000)
    if (await (this.alertMessage).exists) {
      await t.expect((this.alertMessage).innerText).contains("Unable to find any message for selected filters.");
    }
    else {

    }
    
  }     

  async searchByPNMessageId(messageuniqueid) {
    await t
        .click(Selector(this.tabSearchById))
        .typeText(Selector(this.messageIdInput), messageuniqueid, { replace: true })
        .click(Selector(this.searchButton));
  }

  async verifyOrderOfTrackingPoints(expectedOrder = []) {
    const messageJourneyTableRows = Selector('[data-testid="message-journey-table"] tr');
    const actualOrder = [];
    // Collect all tracking points
    for (let i = 1; i < await messageJourneyTableRows.count; i++) {
      const trackingPointText = await messageJourneyTableRows.nth(i).find('td').nth(0).innerText;
      actualOrder.push(trackingPointText.trim().toUpperCase());
    }
    // Compare actual order with expected order
    await t.expect(actualOrder).eql(expectedOrder, 'Tracking points are not in the expected order');
  }


  async clickMessagePayloadCloseIcon() {
    await t.click(this.messagePayloadCrossIcon);
  }

// This method checks whether a specific metadata key and value are present or not on the metadata screen.
// - If `shouldExist` is true (default), it verifies that the key exists and the value matches.
// - If `shouldExist` is false, it verifies that either the key is missing or the value does NOT match.

  async assertMetadataKeyValue(key, expectedValue, shouldExist = true) {
     await t.click(this.metadataScreen);  // metadata screen

    // Find the metadata key and its corresponding value cell
    const metadataKeySelector = Selector('[data-testid^="vertical-table-row-"] th').withText(key);
    const metadataValueSelector = metadataKeySelector.sibling('td');

    // Check if the key is actually present
    const keyExists = await metadataKeySelector.exists;

    if (shouldExist) {
      // Positive check: key should be present with the correct value
      await t.expect(keyExists).ok(`Metadata key '${key}' not found`);
      // Get the actual value and compare it to the expected value
      const actualValue = await metadataValueSelector.innerText;
      await t.expect(actualValue.trim()).eql(expectedValue, `Expected value for key '${key}' is '${expectedValue}', but found '${actualValue}'`);
    } else {
      // Negative check: key/value should not be present
      if (keyExists) {
        // If the key exists, check that the value does NOT match
        const actualValue = await metadataValueSelector.innerText;
        await t.expect(actualValue.trim()).notEql(expectedValue, `Metadata key '${key}' with value '${expectedValue}' was found but should not be present`);
      }
        // Key doesn't exist — since it shouldn't, do nothing
    }
  }

  //This function Converts a time string like "16:58:21.049" into milliseconds,which helps to compare times easily
  async parseTimeOnly(timeStr) {
  const [hours, minutes, secondsAndMs] = timeStr.split(':');
  const [seconds, milliseconds] = secondsAndMs.split('.');

  return (
      parseInt(hours) * 3600000 + // hours to ms
      parseInt(minutes) * 60000 + // minutes to ms
      parseInt(seconds) * 1000 +  // seconds to ms
      parseInt(milliseconds)
  );
}
 /* This function checks that:
   * - Each tracking point row start time is not after its end time.
   * - All start/end times across all tracking points row are in correct overall order.
 */
async assertAllTimestampsInTimeOrderOnly() {
  const messageJourneyTableRows = Selector('[data-testid="message-journey-table"] tr');
  const timeValues = [];

  for (let i = 1; i < await messageJourneyTableRows.count; i++) {
    const row = messageJourneyTableRows.nth(i);
    // Extract start and end strings from columns
    const startStr = (await row.find('td').nth(2).innerText).trim(); // e.g., "07/06/2025, 16:58:21.049"
    const endStr = (await row.find('td').nth(3).innerText).trim();
    // Extract only the time part (after the comma)
    const startTime = await this.parseTimeOnly(startStr.split(', ')[1]);
    const endTime = await this. parseTimeOnly(endStr.split(', ')[1]);

    console.log(`Row ${i} Start: ${startTime} ms, End: ${endTime} ms`);

    // Tracking point row level check: start should be <= end
    await t.expect(startTime <= endTime)
        .ok(`Start time is after end time on Row ${i}: Start=${startStr}, End=${endStr}`);

    // Collect all time values for overall order check
    timeValues.push({ time: startTime, label: `Row ${i} Start`, raw: startStr });
    timeValues.push({ time: endTime, label: `Row ${i} End`, raw: endStr });
  }

  // Check that all timestamps are in non-decreasing time order
  for (let j = 1; j < timeValues.length; j++) {
    const prev = timeValues[j - 1];
    const curr = timeValues[j];

    await t.expect(curr.time >= prev.time)
        .ok(`Times out of order:\n → ${prev.label} (${prev.raw})\n → ${curr.label} (${curr.raw})`);
  }
}


}
export default new trafficManagerPage();
