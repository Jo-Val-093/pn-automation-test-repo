import {Selector,t} from 'testcafe';
import * as TestCafeTestingLibrary from '@testing-library/testcafe'; 
    class dashBoardPage {
    constructor() {
        this.SelectMember1 = TestCafeTestingLibrary.getAllByRole('combobox').nth(0)
        this.SelectMember2 = Selector('.relative.group.flex.w-full input')
        this.viewLinkCodeMatcher = TestCafeTestingLibrary.getAllByText('View').nth(1);
        this.viewLinkTrafficManager = TestCafeTestingLibrary.getAllByText('View').nth(0);
        this.networkSetupLink = TestCafeTestingLibrary.getByRole('link', { name: 'Network setup' });
        this.monitoringSideMenu = TestCafeTestingLibrary.getByRole('link', { name: 'Monitoring' });
        this.enrichmentSideMenu = TestCafeTestingLibrary.getByRole('link', { name: 'Enrichment' });
        this.adminSideMenu = TestCafeTestingLibrary.getByRole('link', { name: 'Admin' });
        this.invalidAccessMessage = TestCafeTestingLibrary.queryByText("You don't have access to this page. If you think you should have access, please contact the Proagrica support team");
        this.messageByVolumeCompleted = TestCafeTestingLibrary.getAllByText('Completed').nth(0);
        this.messageByVolumeErrored = TestCafeTestingLibrary.getAllByText('Failed').nth(0);
        this.messageByVolumeHeld = TestCafeTestingLibrary.getAllByText('Held').nth(0);
        this.messageByVolumeInProgress = TestCafeTestingLibrary.getAllByText('In progress').nth(0);
        this.messageByVolumeManuallyCompleted = TestCafeTestingLibrary.getAllByText('Manually completed').nth(0);
        this.messageVolumesByStatusHeader = TestCafeTestingLibrary.getByText('Message volumes by status');
    }
       
   // new select member method

   async selectMember(memberName) {
    await t
        .click(this.SelectMember1)
        //.click(TestCafeTestingLibrary.getByText(memberName))
        .click(TestCafeTestingLibrary.getByRole('option', {name: memberName}))
       
    }

    async navigateToAdminPage() {
        await t
        .click(this.adminSideMenu)

    }
    async navigateToNetworkSetupPage(){
        await t
        .click(this.networkSetupLink)
     }
    async verifyUser() {
        await t.expect(Selector(this.SelectMember).exists).ok()
    }
    async verifyUser() {
        await t.expect(Selector(this.SelectMember).exists).ok()
    }
    async messageStatusByVolume() {
        await t
        .expect(this.messageVolumesByStatusHeader.exists).ok()
        .expect(this.messageByVolumeCompleted.exists).ok()
        .expect(this.messageByVolumeErrored.exists).ok()
        .expect(this.messageByVolumeInProgress.exists).ok()
        .expect(this.messageByVolumeManuallyCompleted.exists).ok()
        .expect(this.messageByVolumeHeld.exists).ok()
      }
    async messageUrlLink() {
        await t
        .hover(Selector('#highcharts-wqtqqyu-0 .highcharts-point'))
        .click(Selector('[class^="highcharts-markers highcharts-series-0 highcharts-"] .highcharts-point'))
    }

    async verifyFailedTabCounts() {
  // Total messages' count link from message volume by type widget
  const totalMessagesCountForFailedTab = Selector('tr')
    .withText('Total messages')
    .find('td')
    .nth(8)
    .find('a');

  // Checking if the selector exists
  const totalMessagesCountExists = await totalMessagesCountForFailedTab.exists;

  // If the selector exists, get its text; otherwise, assume '0' messages
  let totalMessagesCountForFailedTabText = '0';
  if (totalMessagesCountExists) {
    totalMessagesCountForFailedTabText = await totalMessagesCountForFailedTab.innerText;
  }

  // Get the Failed count from the widget - message volumes by status
  const mvsCountFailed = Selector('div.flex.w-1\\/2.items-center.font-semibold')
    .withText('Failed')
    .find('span.ml-auto.p-4');
  const mvsCountFailedText = await mvsCountFailed.innerText;

    // Verify that the total messages count matches on both widgets
  await t.expect(totalMessagesCountForFailedTabText).eql(mvsCountFailedText, 'Failed count not matching');

    // If there are any Failed messages, verify the count shown on the listing page as well
  if (totalMessagesCountForFailedTabText !== '0') {
    // Click the count link to open the message listing page
    await t.click(totalMessagesCountForFailedTab);

    // Get the pagination text showing the message range and total, e.g. "1–10 of 1057"
    const messageListingTotalText = await Selector('p').nth(1).innerText;

    // Extract the total count number from the text using regex
    const match = messageListingTotalText.match(/1\s*[-–]\s*\d+\s*of\s*(\d+)/);
    const messageListingTotalCount = match ? parseInt(match[1], 10) : 0;

    // Verify that the total messages count matches the listing page total count
    await t.expect(parseInt(totalMessagesCountForFailedTabText, 10)).eql(messageListingTotalCount);
  } else {
    // If there are zero messages, skip checking the listing page count
    console.log('No Failed messages found, skipping listing count verification.');
  }
}

  async verifyHeldTabCounts() {
  // Switch to the Held tab first
  await t.click(Selector('button[role="tab"]').withText('Held'));

  // Total messages' count link from message volume by type widget
  const totalMessagesCountForHeldTab = Selector('tr')
    .withText('Total messages')
    .find('td')
    .nth(8)
    .find('a');

  // Checking if the selector exists
  const totalMessagesCountExists = await totalMessagesCountForHeldTab.exists;

  // If the selector exists, get its text; otherwise, assume '0' messages
  let totalMessagesCountForHeldTabText = '0';
  if (totalMessagesCountExists) {
    totalMessagesCountForHeldTabText = await totalMessagesCountForHeldTab.innerText;
  }

  // Get the Held count from the widget - message volumes by status
  const mvsCountHeld = Selector('div.flex.w-1\\/2.items-center.font-semibold')
    .withText('Held')
    .find('span.ml-auto.p-4');
  const mvsCountHeldText = await mvsCountHeld.innerText;

  // Verify that the total messages count matches on both widgets
  await t.expect(totalMessagesCountForHeldTabText).eql(mvsCountHeldText, 'Held count not matching');

  // If there are any Held messages, verify the count shown on the listing page as well
  if (totalMessagesCountForHeldTabText !== '0') {
    // Click the count link to open the message listing page
    await t.click(totalMessagesCountForHeldTab);

    // Get the pagination text showing the message range and total, e.g. "1–10 of 1057"
    const messageListingTotalText = await Selector('p').nth(1).innerText;

    // Extract the total count number from the text using regex
    const match = messageListingTotalText.match(/1\s*[-–]\s*\d+\s*of\s*(\d+)/);
    const messageListingTotalCount = match ? parseInt(match[1], 10) : 0;

    // Verify that the total messages count matches the listing page total count
    await t.expect(parseInt(totalMessagesCountForHeldTabText, 10)).eql(messageListingTotalCount);
  } else {
    // If there are zero messages, skip checking the listing page count
    console.log('No Held messages found, skipping listing count verification.');
  }
}

async verifyCompletedTabCounts() {
  // Switch to the Completed tab first
  await t.click(Selector('button[role="tab"]').withText('Completed'));

  // Total messages' count link from message volume by type widget
  const totalMessagesCountForCompletedTab = Selector('tr')
    .withText('Total messages')
    .find('td')
    .nth(8)
    .find('a');

  // Checking if the selector exists
  const totalMessagesCountExists = await totalMessagesCountForCompletedTab.exists;

  // If the selector exists, get its text; otherwise, assume '0' messages
  let totalMessagesCountForCompletedTabText = '0';
  if (totalMessagesCountExists) {
    totalMessagesCountForCompletedTabText = await totalMessagesCountForCompletedTab.innerText;
  }

  // Get the Completed count from the widget - message volumes by status
  const mvsCountCompleted = Selector('div.flex.w-1\\/2.items-center.font-semibold')
    .withText('Completed')
    .find('span.ml-auto.p-4');
  const mvsCountCompletedText = await mvsCountCompleted.innerText;

  // Verify that the total messages count matches on both widgets
  await t.expect(totalMessagesCountForCompletedTabText).eql(mvsCountCompletedText, 'Completed count not matching');

  // If there are any Completed messages, verify the count shown on the listing page as well
  if (totalMessagesCountForCompletedTabText !== '0') {
    // Click the count link to open the message listing page
    await t.click(totalMessagesCountForCompletedTab);

    // Get the pagination text showing the message range and total, e.g. "1–10 of 1057"
    const messageListingTotalText = await Selector('p').nth(1).innerText;

    // Extract the total count number from the text using regex
    const match = messageListingTotalText.match(/1\s*[-–]\s*\d+\s*of\s*(\d+)/);
    const messageListingTotalCount = match ? parseInt(match[1], 10) : 0;

    // Verify that the total messages count matches the listing page total count
    await t.expect(parseInt(totalMessagesCountForCompletedTabText, 10)).eql(messageListingTotalCount);
  } else {
    // If there are zero messages, skip checking the listing page count
    console.log('No Completed messages found, skipping listing count verification.');
  }
}

async verifyManuallyCompletedTabCounts() {
  // Switch to the Manually Completed tab first
  await t.click(Selector('button[role="tab"]').withText('Manually completed'));

  // Total messages' count link from message volume by type widget
  const totalMessagesCountForManuallyCompletedTab = Selector('tr')
    .withText('Total messages')
    .find('td')
    .nth(8)
    .find('a');

  // Checking if the selector exists
  const totalMessagesCountExists = await totalMessagesCountForManuallyCompletedTab.exists;

  // If the selector exists, get its text; otherwise, assume '0' messages
  let totalMessagesCountForManuallyCompletedTabText = '0';
  if (totalMessagesCountExists) {
    totalMessagesCountForManuallyCompletedTabText = await totalMessagesCountForManuallyCompletedTab.innerText;
  }

  // Get the Manually Completed count from the widget - message volumes by status
  const mvsCountManuallyCompleted = Selector('div.flex.w-1\\/2.items-center.font-semibold')
    .withText('Manually completed')
    .find('span.ml-auto.p-4');
  const mvsCountManuallyCompletedText = await mvsCountManuallyCompleted.innerText;

  // Verify that the total messages count matches on both widgets
  await t.expect(totalMessagesCountForManuallyCompletedTabText).eql(
    mvsCountManuallyCompletedText,
    'Manually completed count not matching'
  );

  // If there are any Manually Completed messages, verify the count shown on the listing page as well
  if (totalMessagesCountForManuallyCompletedTabText !== '0') {
    // Click the count link to open the message listing page
    await t.click(totalMessagesCountForManuallyCompletedTab);

    // Get the pagination text showing the message range and total, e.g. "1–10 of 1057"
    const messageListingTotalText = await Selector('p').nth(1).innerText;

    // Extract the total count number from the text using regex
    const match = messageListingTotalText.match(/1\s*[-–]\s*\d+\s*of\s*(\d+)/);
    const messageListingTotalCount = match ? parseInt(match[1], 10) : 0;

    // Verify that the total messages count matches the listing page total count
    await t
      .expect(parseInt(totalMessagesCountForManuallyCompletedTabText, 10))
      .eql(messageListingTotalCount);
  } else {
    // If there are zero messages, skip checking the listing page count
    console.log('No Manually completed messages found, skipping listing count verification.');
  }
}

async verifyInProgressTabCounts() {
  // Switch to the In Progress tab first
  await t.click(Selector('button[role="tab"]').withText('In progress'));

  // Total messages' count link from message volume by type widget
  const totalMessagesCountForInProgressTab = Selector('tr')
    .withText('Total messages')
    .find('td')
    .nth(8)
    .find('a');

  // Checking if the selector exists
  const totalMessagesCountExists = await totalMessagesCountForInProgressTab.exists;

  // If the selector exists, get its text; otherwise, assume '0' messages
  let totalMessagesCountForInProgressTabText = '0';
  if (totalMessagesCountExists) {
    totalMessagesCountForInProgressTabText = await totalMessagesCountForInProgressTab.innerText;
  }

  // Get the In Progress count from the widget - message volumes by status
  const mvsCountInProgress = Selector('div.flex.w-1\\/2.items-center.font-semibold')
    .withText('In progress')
    .find('span.ml-auto.p-4');
  const mvsCountInProgressText = await mvsCountInProgress.innerText;

  // Verify that the total messages count matches on both widgets
  await t.expect(totalMessagesCountForInProgressTabText).eql(
    mvsCountInProgressText,
    'In progress count not matching'
  );

  // If there are any In Progress messages, verify the count shown on the listing page as well
  if (totalMessagesCountForInProgressTabText !== '0') {
    // Click the count link to open the message listing page
    await t.click(totalMessagesCountForInProgressTab);

    // Get the pagination text showing the message range and total, e.g. "1–10 of 1057"
    const messageListingTotalText = await Selector('p').nth(1).innerText;

    // Extract the total count number from the text using regex
    const match = messageListingTotalText.match(/1\s*[-–]\s*\d+\s*of\s*(\d+)/);
    const messageListingTotalCount = match ? parseInt(match[1], 10) : 0;

    // Verify that the total messages count matches the listing page total count
    await t
      .expect(parseInt(totalMessagesCountForInProgressTabText, 10))
      .eql(messageListingTotalCount);
  } else {
    // If there are zero messages, skip checking the listing page count
    console.log('No In progress messages found, skipping listing count verification.');
  }
}

async verifyConnectorMonitor() {
    await t
        .click(Selector('#root a').withText('Dashboard'))
        .click(Selector('#root button').withText('All'))
        .expect(Selector('td').withText('MOCK ON RAMP').exists).ok();
}

}

export default new dashBoardPage();
