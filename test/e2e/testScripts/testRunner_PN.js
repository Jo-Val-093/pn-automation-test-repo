import { test, Selector } from "testcafe";
import { baseUrl } from "../helpers/configuration";
import dashboard from "../pages/dashBoardPage";
import trafficManagerPage from "../pages/trafficManagerPage";
import pageFooters from '../pages/pageFooter'
import LoginPage from "../pages/logInPage";
import accountSettingsPage from "../pages/accountSettingsPage";
import dashBoardPage from "../pages/dashBoardPage";
import axios from 'axios';
import fs from 'fs';
import {requestBody} from "../testScripts/Usecase4.js";

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var businessId = repo.testData.businessId;
var messageId = repo.testData.messageId;
var processId = repo.testData.processId;
var member = repo.testData.member
var memberPn = repo.testData.memberPn
var memberFilter = repo.testData.memberFilter
var sourcePNID = repo.testData.sourcePNID
var destinationPNID = repo.testData.destinationPNID
var memberSelect = repo.testData.memberSelect
var sourcePNIDReplay = repo.testData.sourcePNIDReplay
var destinationPNIDReplay = repo.testData.destinationPNIDReplay
var memberCirrus = repo.testData.cirrusAliasMember1

const ENV_NAME = process.env.ENV_NAME;

const ENV_CONFIG = {
    'dev': {
        url: 'https://network-core-dev-eks-2.aga.eu-west-1.proagrica.telus.ag/test-utils/api/pn-mock-on-ramp/in',
        apiKey: 'm4sba8cn93df39lvyzlsxztug7r2xxro'
    },
    'test': {
        url: 'https://network-core-test-eks-2.aga.eu-west-1.proagrica.telus.ag/test-utils/api/pn-mock-on-ramp/in',
        apiKey: '14g4s2a8cn34df39gvyzlsgztjg7r2x4he'
    },
    'pre': {
        url: 'https://network-core-pre-eks-03-eu.agv.eu-west-1.proagrica.telus.ag/test-utils/api/pn-mock-on-ramp/in',
        apiKey: '95pjhsti69s0jswv7pqz7q61lqefhzqo'
    },
    'prod': {
        url: 'https://network-core-prod-eks-04-us.agv.us-east-1.proagrica.telus.ag/test-utils/api/pn-mock-on-ramp/in',
        apiKey: 'pbwa0say7zay5b65guhaforz05ly4tk3',
    },
};

if (!ENV_CONFIG[ENV_NAME]) {
    throw new Error(`Unknown environment: ${ENV_NAME}`);
}
const { url: messageURL, apiKey } = ENV_CONFIG[ENV_NAME];


fixture('Proagrica Network')
test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type4: 'access' })

    ('TC_LI_001 : login successful', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member);
    })

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type4: 'access' })

    ('TC_LI_002 : login Unsuccessful - incorrect email', async t => {
        await
            LoginPage.inCorrectCredentials("inCorrectUserId");
    })
test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type4: 'access' })

    ('TC_LI_003 : login Unsuccessful - incorrect password', async t => {
        await
            LoginPage.inCorrectCredentials("inCorrectPassword");
    })

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type4: 'access' })

    ('TC_LI_004 : Forgot password', async t => {
        await
            LoginPage.forgotPassword();
    })

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type4: 'access' })

    ('TC_LI_005 : sign up', async t => {
        await
            LoginPage.signUp();
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard' })

    ('TC_DB_001 : Select your Time Zone', async t => {
        await
            LoginPage.logInSuccessful()
        await
            accountSettingsPage.selectYourTimeZone();
    });

// notification button is not theere on UI anymore so comment out this test for now

// test
//     .page(baseUrl)
//     .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard' })

//     ('TC_DB_004:Dashboard Page_notification', async t => {
//         await
//             LoginPage.logInSuccessful()
//         await
//             dashboard.notification()
//     })

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard' })

    ('TC_DB_005 : Account settings', async t => {
        await
            LoginPage.logInSuccessful()
        await
            accountSettingsPage.navigateAccountSetting();
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard' })

    ('TC_DB_006 : Log out', async t => {
        await
            LoginPage.logInSuccessful();
        await
            LoginPage.logoutSuccessful();
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard' })

    ('TC_AS_001 : Select your Time Zone', async t => {
        await
            LoginPage.logInSuccessful()
        await
            accountSettingsPage.selectYourTimeZone();
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard' })

    ('TC_AS_002 : Send password reset email', async t => {
        await
            LoginPage.logInSuccessful()
        await
            accountSettingsPage.sendPasswordResetMail();
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard' })

    ('TC_AS_003 : Verify account details', async t => {
        await
            LoginPage.logInSuccessful()
        await
            accountSettingsPage.verifyAccount();
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type3: 'smoke', type15: 'filter' })

    ('TC_TM_001 to TC_TM_007: Traffic manager_Filter', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.selectFilter()
         await
        //     trafficManagerPage.dateRangeAllA() //commented out dateRangeAllA() as we dont have ALL option in the message status filter
        trafficManagerPage.searchByDate('dateRangeAll')
        // await
        //     trafficManagerPage.searchByMessageStaus("All")
         await
            trafficManagerPage.resetFiltersApplied()
         await
         trafficManagerPage.searchByDate('dateRangeAll')
        //     trafficManagerPage.dateRangeAllA()
        await
            trafficManagerPage.searchByMessageStaus("messageStatusComplete")
        await
            trafficManagerPage.resetFiltersApplied()
          await
         trafficManagerPage.searchByDate('dateRangeAll')
        //     trafficManagerPage.dateRangeAllA()
        await
            trafficManagerPage.searchByMessageStaus("messageStatusManuallyCompleted")
        await
            trafficManagerPage.resetFiltersApplied()
           await
         trafficManagerPage.searchByDate('dateRangeAll')
         await
            trafficManagerPage.searchByMessageStaus("messageStatusInProgress")
        await
            trafficManagerPage.resetFiltersApplied()
         await
         trafficManagerPage.searchByDate('dateRangeAll')
        //     trafficManagerPage.dateRangeAllA()
         await
            trafficManagerPage.searchByMessageStaus("messageStatusFailed")
        await
            trafficManagerPage.resetFiltersApplied()
          await
         trafficManagerPage.searchByDate('dateRangeAll')
        //     trafficManagerPage.dateRangeAllA()
        await
            trafficManagerPage.searchByMessageStaus("messageStatusHeld")
        await
            trafficManagerPage.resetFiltersApplied()
    })

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type15: 'filter' })

    ('TC_TM_008 to TC_TM_015: Traffic manager_Filter', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.selectFilter()
        await
            trafficManagerPage.searchByDate("dateRangeToday")
        await
            trafficManagerPage.resetFiltersApplied()
        await
            trafficManagerPage.searchByDate("All")
        await
            trafficManagerPage.resetFiltersApplied()
        await
            trafficManagerPage.searchByDate("dateRangeThisWeek")
        await
            trafficManagerPage.resetFiltersApplied()
        await
            trafficManagerPage.searchByDate("dateRangeThisMonth")
        await
            trafficManagerPage.resetFiltersApplied()
        await
            trafficManagerPage.searchByDate("dateRangeSinceYesterday")
        await
            trafficManagerPage.resetFiltersApplied()
        await
            trafficManagerPage.searchByDate("dateRangeSinceLast7Days")
        await
            trafficManagerPage.resetFiltersApplied()
        await
            trafficManagerPage.searchByDate("dateRangeSinceLast30Days")
        await
            trafficManagerPage.resetFiltersApplied()
        await
            trafficManagerPage.searchByDate("Custom")
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type3: 'smoke' })

    ('TC_TM_016: Traffic manager_Completed status', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.searchById("messageId")
        await
            trafficManagerPage.verifyMessageStatus("Completed")
        await
            trafficManagerPage.viewMessage()
        await
            trafficManagerPage.verifyMessageStatus("Completed")
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_TM_017: Traffic manager_In Progress status', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.searchById("inProgressMessageId")
        await
            trafficManagerPage.verifyMessageStatus("In progress")
        await
            trafficManagerPage.viewMessage()
        await
            trafficManagerPage.verifyMessageStatus("In progress")
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_TM_0018: Traffic manager_Failed status', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.searchById("failedMessageId")
        await
            trafficManagerPage.verifyMessageStatus("Error")
        await
            trafficManagerPage.viewMessage()
        await
            trafficManagerPage.verifyMessageStatus("Error")
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_TM_0018A: Traffic manager_Manually Completed status', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.searchById("manuallyCompletedMessageId")
        await
            trafficManagerPage.verifyMessageStatus("Manually completed")
        await
            trafficManagerPage.viewMessage()
        await
            trafficManagerPage.verifyMessageStatus("Manually completed")
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_TM_0018B: Traffic manager_Held status', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.searchById("heldMessageId")
        await
            trafficManagerPage.verifyMessageStatus("Held")
        await
            trafficManagerPage.viewMessage()
        await
            trafficManagerPage.verifyMessageStatus("Held")
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_TM_019: Traffic manager_Filter, search by Message ID', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.selectingAllUncheckedColumns() // this will select all unchecked columns
        await
            trafficManagerPage.searchById("messageId")
        await
            trafficManagerPage.validatingCountOf15Columns() // asserting 15 columns visible
        await
            trafficManagerPage.validatingMessageIDInSearchResults() //asserting search result showing the same message id we are searching
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_TM_019A: Traffic manager_Filter, validating message type, sender and receiver', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.selectingAllUncheckedColumns() // this will select all unchecked columns
        await
            trafficManagerPage.searchById("messageId")
        await
            trafficManagerPage.validatingCountOf15Columns() // asserting 15 columns visible
        await
            trafficManagerPage.validatingMessageTypeInSearchResults() //asserting message type in search result
        await
            trafficManagerPage.validatingSenderInSearchResults() //asserting sender in search result
        await
            trafficManagerPage.validatingReceiverInSearchResults() //asserting receiver in search result

    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_TM_020: Traffic manager_Filter, search by Business ID', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(memberPn)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.selectingAllUncheckedColumns() // this will select all unchecked columns
        await
            trafficManagerPage.searchById("businessId")
        await
            trafficManagerPage.validatingCountOf15Columns() // asserting 15 columns visible
        await
            trafficManagerPage.validatingBusinessIDInSearchResults() //asserting Business ID in search result

    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_TM_021: Traffic manager_Filter,  search by Process ID', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(memberPn)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.selectingAllUncheckedColumns() // this will select all unchecked columns
        await
            trafficManagerPage.searchById("processId")
        await
            trafficManagerPage.validatingCountOf15Columns() // asserting 15 columns visible
        await
            trafficManagerPage.validatingProcessIDInSearchResults() //asserting Process ID in search result
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_TM_022 : Traffic manager _Reset,  Clicking reset button ,will reset the filters applied', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(memberPn)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.selectingAllUncheckedColumns()
        await
            trafficManagerPage.validatingCountOf15Columns() // asserting 15 columns visible
        await
            trafficManagerPage.resetingDefaultColumnView() // reseting default column view
        await t.expect(trafficManagerPage.messagetableColumns.count).within(7, 8); // asserting reset, Actions column only visible if any message
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_TM_024: Validating user can reset the column fields view on message listing table', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(memberPn)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.selectingAllUncheckedColumns()
        await
            trafficManagerPage.validatingCountOf15Columns()
        await
            trafficManagerPage.resetingDefaultColumnView()
        // Assert that the number of columns is reset to 8
        await t.expect(trafficManagerPage.messagetableColumns.count).within(7, 8); // asserting reset, Actions column only visible if any message
    });


test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_TM_024A: Validating default column view on Traffic manager page', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(memberPn)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        const defaultColumnNamesArray = [];

        for (let rowIndex = 0; rowIndex < await trafficManagerPage.messagetableColumns.count; rowIndex++) {
            const defaultColumnNames = await trafficManagerPage.messagetableColumns.nth(rowIndex).textContent;
            defaultColumnNamesArray.push(defaultColumnNames)
        }
        // Assert that the number of columns is equal to 7 or 8
        await t.expect(trafficManagerPage.messagetableColumns.count).within(7, 8); // asserting reset, Actions column only visible if any message
        // Assert specific column names
        await t.expect(defaultColumnNamesArray[0]).eql('Message ID');
        await t.expect(defaultColumnNamesArray[1]).eql('Mode/Message type');
        await t.expect(defaultColumnNamesArray[2]).eql('Business ID');
        await t.expect(defaultColumnNamesArray[3]).eql('Sender');
        await t.expect(defaultColumnNamesArray[4]).eql('Receiver');
        await t.expect(defaultColumnNamesArray[5]).eql('Status');
        await t.expect(defaultColumnNamesArray[6]).eql('Message date');
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_TM_025: Validating user can select all the columns on message listing table and those fields getting displayed', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(memberPn)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.selectingAllUncheckedColumns()

        const defaultColumnNamesArray = [];

        for (let rowIndex = 0; rowIndex < await trafficManagerPage.messagetableColumns.count; rowIndex++) {
            const defaultColumnNames = await trafficManagerPage.messagetableColumns.nth(rowIndex).textContent;
            defaultColumnNamesArray.push(defaultColumnNames)
        }
        // Assert that the number of columns is equal to 15
        await trafficManagerPage.validatingCountOf15Columns()
        // Assert specific column names
        await t.expect(defaultColumnNamesArray[0]).eql('Message ID');
        await t.expect(defaultColumnNamesArray[1]).eql('Mode/Message type');
        await t.expect(defaultColumnNamesArray[2]).eql('Message subtype');
        await t.expect(defaultColumnNamesArray[3]).eql('Parent ID');
        await t.expect(defaultColumnNamesArray[4]).eql('Business ID');
        await t.expect(defaultColumnNamesArray[5]).eql('Process ID');
        await t.expect(defaultColumnNamesArray[6]).eql('Sender');
        await t.expect(defaultColumnNamesArray[7]).eql('Sender division');
        await t.expect(defaultColumnNamesArray[8]).eql('Receiver');
        await t.expect(defaultColumnNamesArray[9]).eql('Receiver division');
        await t.expect(defaultColumnNamesArray[10]).eql('Status');
        await t.expect(defaultColumnNamesArray[11]).eql('Exception');
        await t.expect(defaultColumnNamesArray[12]).eql('Message date');
        await t.expect(defaultColumnNamesArray[13]).eql('Updated date');
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_TM_026: Validating sender and receiver checkbox can not be unchecked in message view section:', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await t.click(trafficManagerPage.columnView)

        const senderCheckbox = Selector('input[name="sender"][type="checkbox"]');
        const receiverCheckbox = Selector('input[name="receiver"][type="checkbox"]');

        // checking if both checkboxes are initially checked
        await t.expect(senderCheckbox.checked).ok('sender Checkbox should be initially checked');
        await t.expect(receiverCheckbox.checked).ok('receiver Checkbox should be initially checked');

        // Try to uncheck the checkboxes
        await t.click(senderCheckbox);
        await t.click(receiverCheckbox);

        // checking if both checkboxes are still checked
        await t.expect(senderCheckbox.checked).ok('sender Checkbox should remain checked');
        await t.expect(receiverCheckbox.checked).ok('receiver Checkbox should remain checked');

    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_TM_027: Validate user is able to copy the message Id by clicking the copy icon in the message list view', async t => {
        await LoginPage.logInSuccessful()
        await dashboard.selectMember(member)
        await trafficManagerPage.selectFilter()
        await trafficManagerPage.searchByDate("dateRangeAll")
        await t.click(Selector(trafficManagerPage.searchButton))
        await t.click('[data-testid="copy-button-0"] .MuiSvgIcon-root')  // first copy button
        const firstCopiedMessageID = await Selector('[data-testid="table-row-0"] td h6 nobr').textContent; // first messageID
        await t.click(Selector(trafficManagerPage.tabSearchById))
        await t.click('[name="messageId"]')
        //await t.pressKey('ctrl+v')  does not work due to browser security
        await t.typeText(Selector('[name="messageId"]'), firstCopiedMessageID, { paste: true });
        await t.click(Selector(trafficManagerPage.searchButton));
        const searchResultMessageID = await Selector('[data-testid="table-row-0"] td h6 nobr').textContent;
        await t.expect(firstCopiedMessageID).eql(searchResultMessageID);
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_TM_028: Validate if Download button appears when values are present and is hidden when no values are available in Traffic Manager message list view ', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(memberPn)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await t.click(trafficManagerPage.tabSearchById)
        await t.typeText(trafficManagerPage.messageIdInput, 'NotExistingMessageId')
        await t.click(Selector(trafficManagerPage.searchButton))
        await t.expect((trafficManagerPage.alertMessage).innerText).contains("Unable to find any message for selected filters.");
        await t.wait(5000)
        await t.expect(trafficManagerPage.downloadButton.visible).eql(false)
        trafficManagerPage.resetFiltersApplied()
        await t.wait(5000)
        await t.expect(trafficManagerPage.downloadButton.visible).eql(true)

    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })
    ('TC_TM_031: Validating only Message date and Updated date are sortable column', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await t.click(trafficManagerPage.columnView)
          //  .click('[name="updateDate"][data-indeterminate="false"]') commented out as selector not working
            .click(Selector('[data-testid="popover"] span').withText('Updated date'))
            .click('[data-testid="popover"] div')
        await trafficManagerPage.messageDateAndUpdatedDateColumnsSortable();
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage'})
    ('TC_TM_032: Traffic manager_Filter, message should display as per the filter selected by sender,message type and today date', async t => {

    let requestBody;
    let senderName;
    let messageType;


    if (['dev', 'test', 'pre'].includes(process.env.ENV_NAME)) {
      // --- Use this data for DEV, TEST, or PRE ---
      senderName = 'Test123';
      messageType = 'Supply Order';
      requestBody = {
        "metadata": {
          "source": "PN0000001000",
          "destination": "PN0000009100",
          "messageType": "Supply Order",
          "businessId": "PN_UC_1",
          "processId": "PN_UC_1",
        },
        "payload": "<order><name>MemberA</name><Amount>£10</Amount><address>Proagrica Sutton</address></order>"
      };
    } else {
      // --- Use this data for PRODUCTION ---
      senderName = 'TESTMEMBER 01';
      messageType = 'execution';
      requestBody = {
        "metadata": {
        "source": "PN1000001000",
        "destination": "PN1000001001",
        "messageType": "execution",
        "messageSubType": "Purchase Order",
        "subSource": "SD",
        "subDestination": "RD",
        "businessId": "BID_06112024_US",
        "processId": "PID_06112024_US"
        },
        "payload": "<order><name>ProdMember</name><Amount>£1000</Amount><address>Production Address</address></order>"
      };
    }

    const sendCompletedMessagRequest = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } });
    await t.expect(sendCompletedMessagRequest.status).eql(200);

    await LoginPage.logInSuccessful();
    await dashboard.selectMember(member);
    await trafficManagerPage.navigateToTrafficManagerPage();
    await t.click(Selector(trafficManagerPage.tabFilter));

    // Use the senderName variable set by the if-condition
    await trafficManagerPage.senderDropdownSelection(senderName);

    await trafficManagerPage.messageTypeDropdownSelection(messageType);
    await t.click(Selector(trafficManagerPage.searchButton));
    
    // Assertions
    await trafficManagerPage.assertMessageTypeInTableRows();
    await trafficManagerPage.assertSenderInTableRows();
    await trafficManagerPage.assertMessageDateAsCurrentDateInTableRows();

        // const requestBody = {
        //     "metadata": {
        //         "source": "PN0000001000",
        //         "destination": "PN0000009100",
        //         "messageType": "Supply Order",
        //         "businessId": "PN_UC_1",
        //         "processId": "PN_UC_1",
        //     },
        //     "payload": "<order><name>MemberA</name><Amount>£10</Amount><address>Proagrica Sutton</address></order>"
        // }

        // const sendCompletedMessagRequest = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } }); // Included API key in the headers
        // await t.expect(sendCompletedMessagRequest.status).eql(200);  // Asserting response code

        // await
        //     LoginPage.logInSuccessful()
        // await
        //     dashboard.selectMember(member)
        // await
        //     trafficManagerPage.navigateToTrafficManagerPage()
        // await t.click(Selector(trafficManagerPage.tabFilter))
        // await
        //     trafficManagerPage.senderDropdownSelection('Test123')
        // await
        //     trafficManagerPage.messageTypeDropdownSelection('Supply Order')
        // await t.click(Selector(trafficManagerPage.searchButton))
        // await
        //     trafficManagerPage.assertMessageTypeInTableRows()
        // await
        //     trafficManagerPage.assertSenderInTableRows()
        // await
        //     trafficManagerPage.assertMessageDateAsCurrentDateInTableRows()
    });

test   // work on test for now, pre implementation not done yet
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })
    ('TC_TM_033: Traffic manager_Filter, message should display as per the filter selected by sender,receiver message status and date since yesterday', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await t.click(Selector(trafficManagerPage.tabFilter))
        await
            trafficManagerPage.senderDropdownSelection('sender')
         await
             trafficManagerPage.receiverDropdownSelection('CM Member Five')
        await
            trafficManagerPage.searchByDate("dateRangeSinceYesterday")
        await
            trafficManagerPage.searchByMessageStaus('messageStatusComplete')
        await t.click(Selector(trafficManagerPage.searchButton))
        await
            trafficManagerPage.assertSenderInTableRows() // Asserting each row contain sender we have filter for
        await
            trafficManagerPage.assertReceiverInTableRows()   // Asserting each row contain receiver we have filter for
        await
            trafficManagerPage.assertMessageStatusInTableRows() // Asserting each row contain message status we have filter for
        await
            trafficManagerPage.assertMessageDateAsYesterdayOrTodayInTableRows() // Asserting each row contain received date as today or yesterday
    });
test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type16: 'pagefooter' })

    ('TC_PF_001 : Cookie Policy', async t => {
        await
            pageFooters.navigateCookiePolicy();
    });
test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type16: 'pagefooter' })

    ('TC_PF_002 : Privacy Policy', async t => {
        await
            pageFooters.navigatePrivacyPolicy();
    });

test.skip // Skipped this test due to terms and condition unavailability in Network UI footer page
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type16: 'pagefooter' })

    ('TC_PF_003 : Terms and Conditions', async t => {
        await
            pageFooters.navigateTermsAndConditions();
    });

test.skip // Skipped this test due to terms and condition unavailability in Network UI footer page
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type16: 'pagefooter' })

    ('TC_PF_004 : PN Terms and Conditions', async t => {
        await
            pageFooters.pnTermsAndConditions();
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type16: 'pagefooter' })

    ('TC_PF_005 : CopyRight', async t => {
        await
            pageFooters.navigateCopyRight();
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type3: 'smoke', type17: 'message' })

    ('TC_MD_001 : Validate Messages_Message info', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.searchById("messageId")
        await
            trafficManagerPage.viewMessage()
        await
            trafficManagerPage.validateMessageDetails();
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type17: 'message' })

    ('TC_MD_002 : Validate Messages_Message Journey', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.searchById("messageId")
        await
            trafficManagerPage.viewMessage()
        await
            trafficManagerPage.validateMessageJourney();
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type17: 'message' })

    ('TC_MD_003 : Validate Messages_Message Events', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.searchById("messageId")
        await
            trafficManagerPage.viewMessage()
        await
            trafficManagerPage.validateMessageEvents();
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type3: 'smoke', type17: 'message' })

    ('TC_MD_004, 05 : Validate and Download Message payload', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.searchById("messageId")
        await
            trafficManagerPage.viewMessage()
        await
            trafficManagerPage.viewJourneyDetails()
        // comment out below lines due to the impact of NWK-2627    
        // const dynamicPayload = await trafficManagerPage.fetchPayload();
        // await trafficManagerPage.validatePayload(dynamicPayload, ['8029057', 'Norwich', 'URGENT - Please deliver tomorrow. Thank you']);
        await
            trafficManagerPage.downloadPayload()
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type17: 'message' })

    ('TC_MD_006 : Validate Message Metadata', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.searchById("messageId")
        await
            trafficManagerPage.viewMessage()
        await
            trafficManagerPage.viewJourneyDetails()
        await
            trafficManagerPage.metaData()
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type17: 'message' })

    ('TC_MD_007 : Validate Message Exception', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await
            trafficManagerPage.searchById("failedMessageId")
        await
            trafficManagerPage.viewMessage()
        //await
        //trafficManagerPage.viewJourneyDetails()
        await
            trafficManagerPage.exceptionValidation()
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard' })

    ('TC_DB_01 : Dashboard_Message volumes by status', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(memberPn)
        await
            dashBoardPage.messageStatusByVolume()
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard' })

    ('TC_DB_02 : Dashboard_Completed', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(memberPn)
        await
            dashBoardPage.messageStatusByVolume()

    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard' })

    ('TC_DB_03 : Dashboard_Completed_link', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(memberPn)
        await
            dashboard.messageStatusByVolume()
        //await
        // dashboard.messageUrlLink()
        //await t.wait(5000)
    });

test
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })

    ('TC_RM_01 : Related messages are associated to Process ID', async t => {
        await LoginPage.logInSuccessful()
        await dashboard.selectMember(memberPn)
        await trafficManagerPage.navigateToTrafficManagerPage()
        await trafficManagerPage.selectingAllUncheckedColumns() // this will select all unchecked columns
        await trafficManagerPage.searchById("processId")
        await trafficManagerPage.viewMessage()
        const processIdValue = Selector('span').withText('Process ID').sibling('div');
        await t.expect(processIdValue.innerText).contains(processId);// Asserting variable like processId
        await t.click(trafficManagerPage.relatedMessagesButton)
        await trafficManagerPage.assertProcessIdInTableRows()  // Asserting each row contains the process ID we are searching

    });

fixture('Request URL')
test.skip
    .page(baseUrl)
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })
    ('Capture and verify request URL after applying filter for messages', async t => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(member)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await t.click(Selector(trafficManagerPage.tabFilter))
        await
            trafficManagerPage.searchByDate("dateRangeAll")
        await t.click(Selector(trafficManagerPage.searchButton))

        await t.wait(1000);

        // Get the captured GET request URL
        const capturedGetRequestURL = await t.eval(() => window.location.href);

        // Assert the captured URL against an expected value
        await t.expect(capturedGetRequestURL).contains('https://proagrica-network-test-eks-2.aga.eu-west-1.proagrica.telus.ag/monitoring/traffic-manager?page=0&filter={%22dateOption%22:%22all%22,%22filterType%22:0}');

    });

fixture`Traffic Manager Filter`
    .page(baseUrl)
    .beforeEach(async (t) => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(memberFilter)
        await
            trafficManagerPage.navigateToTrafficManagerPage()
        await t.click(Selector(trafficManagerPage.tabFilter))

    });

test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })
    ('TC_TM_036A, Validate Sender and Receiver dropdown values doesnt have any duplicates ', async t => {

        await
            trafficManagerPage.validateSenderAndReceiverDropdownValuesNotDuplicates('sender')
    });

test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })
    ('TC_TM_036B, Validate Sender and Receiver dropdown values doesnt have any duplicates ', async t => {

        await
            trafficManagerPage.validateSenderAndReceiverDropdownValuesNotDuplicates('receiver')
    });
test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })
    ('TC_TM_037A, The dropdown values Message type Message subtype should be listed in ascending order ', async t => {
        await
            trafficManagerPage.validateMessageTypeAndSubTypeDropdownValuesInAscOrder('messageType')
        await
            trafficManagerPage.validateMessageTypeAndSubTypeDropdownValuesInAscOrder('messageSubType')
    });
test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })
    ('TC_TM_037B, The dropdown values Sender division Receiver division should be listed in ascending order ', async t => {
        await
            trafficManagerPage.validateSenderAndReceiverDivisionDropdownValuesInAscOrder('senderDivision')
        await
            trafficManagerPage.validateSenderAndReceiverDivisionDropdownValuesInAscOrder('receiverDivision')
    });
test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })
    ('TC_TM_037C, The dropdown values Sender Receiver  should be listed in ascending order ', async t => {
        await
            trafficManagerPage.validateSenderReceiverDropdownValuesInAscOrder('sender')
        await
            trafficManagerPage.validateSenderReceiverDropdownValuesInAscOrder('receiver')
    });
test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })
    ('TC_TM_39, The "Message type" and "Message subtype" dropdowns display distinct values based on the Message type and Message subtype from the search results shown in the summary table. ', async t => {
        await
             trafficManagerPage.getDistinctMessageTypeMessageSubType('messageType')
        await
             trafficManagerPage.getDistinctMessageTypeMessageSubType('messageSubType')
    });

const messageIds = [];
const ccMessageIds = ['256a3945-9d62-4651-9fc5-6981978e18d6','61e8ff9c-8c6a-4d96-a02b-bb5fa354e69d'];
fixture`Replay message for Proagrica super user and Business user`
    .page(baseUrl)
    .beforeEach(async (t) => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(memberSelect)
        await
            trafficManagerPage.navigateToTrafficManagerPage()

    });

test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })(
        ": Posting inprogress,failed,held,completed message using send to receive journey",
        async (t) => {
            requestBody.metadata.messageuniqueid = "inProgressMesage" + Date.now();
            // Save messageuniqueid to fixture context
            const messageuniqueid = requestBody.metadata.messageuniqueid;
            if (messageuniqueid) {
                messageIds.push(messageuniqueid);  // Push the ID into the array
            }
            // Update the below fields in requestBody
            requestBody.metadata.source = sourcePNIDReplay,
                requestBody.metadata.destination = destinationPNIDReplay,
                requestBody.metadata.subSource = "SDR";
            requestBody.metadata.subDestination = "RDR";
            requestBody.metadata.messageType = "financial";
            requestBody.metadata.messageSubType = "Return Invoice";
            // Send request
            const sendCompletedMessagRequest = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
            await t.expect(sendCompletedMessagRequest.status).eql(200); // Asserting response code

            //Post message with failed status
            requestBody.metadata.messageuniqueid = "failedMessage" + Date.now();
            const messageuniqueid2 = requestBody.metadata.messageuniqueid;
            if (messageuniqueid) {
                messageIds.push(messageuniqueid2);  // Push the ID into the array
            }
            requestBody.metadata.subSource = "SDRJ";
            requestBody.metadata.subDestination = "RDRJ";
            requestBody.metadata.messageType = "F4FInvoice";
            requestBody.metadata.messageSubType = "Debit";
            // Send request

            const sendCompletedMessagRequest1 = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
            await t.expect(sendCompletedMessagRequest1.status).eql(200); // Asserting response code

            //Post message with held status
            requestBody.metadata.messageuniqueid = "heldMessage" + Date.now();
            const messageuniqueid3 = requestBody.metadata.messageuniqueid;
            if (messageuniqueid3) {
                messageIds.push(messageuniqueid3);  // Push the ID into the array
            }
            requestBody.metadata.messageType = "execution";
            requestBody.metadata.messageSubType = "";
            requestBody.metadata.subSource = "SD174290134392688";
            requestBody.metadata.subDestination = "RD";

            // Send request
            const sendCompletedMessagRequest2 = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
            await t.expect(sendCompletedMessagRequest2.status).eql(200); // Asserting response code

            //Post message with completed status
            requestBody.metadata.messageuniqueid = "completedMessage" + Date.now();
            const messageuniqueid4 = requestBody.metadata.messageuniqueid;
            if (messageuniqueid3) {
                messageIds.push(messageuniqueid4);  // Push the ID into the array
            }
            requestBody.metadata.messageType = "StockTransfer";
            requestBody.metadata.messageSubType = "115";
            requestBody.metadata.subSource = "SendJ";
            requestBody.metadata.subDestination = "ReceiveJ";

            // Send request
            const sendCompletedMessagRequest4 = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
            await t.expect(sendCompletedMessagRequest4.status).eql(200); // Asserting response code

            //Post message with failed status and change it to manually complete
            requestBody.metadata.messageuniqueid = "manuallyCompleted" + Date.now();
            const messageuniqueid5 = requestBody.metadata.messageuniqueid;
            if (messageuniqueid) {
                messageIds.push(messageuniqueid5);  // Push the ID into the array
            }
            requestBody.metadata.messageType = "F4FInvoice";
            requestBody.metadata.messageSubType = "Debit";
            // Send request

            const sendCompletedMessagRequest5 = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
            await t.expect(sendCompletedMessagRequest5.status).eql(200); // Asserting response code

        });

test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })
    ((  "TC_TM_036 Business User/Proagrica Super User Traffic manager_Details Page - Replay InProgress message",
        "TC_TM_037 Business User/Proagrica Super User Traffic manager_Details Page - Replay Held message",
        "TC_TM_038 Business User/Proagrica Super User Traffic manager_Details Page - Replay failed message",
        "TC_TM_039 Business User/Proagrica Super User Traffic manager_Details Page - Replay Complete message",
        "TC_TM_040 Business User/Proagrica Super User Traffic manager_Details Page - Replay Manual complete message"), async t => {

            await trafficManagerPage.replayMessages(messageIds);
            await LoginPage.logoutSuccessful();
            await LoginPage.logInSuccessfulAsBusinessUser();
            await dashBoardPage.selectMember(memberSelect);
            await trafficManagerPage.navigateToTrafficManagerPage();
            // Replay messages as a business user (Business User is unable to replay Inprogress message)
            await trafficManagerPage.replayMessages(messageIds);
        });


test  //This test runs only in test env due no cc data in pre
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })
    (("TC_TM_044 Business User/Proagrica Super User Traffic manager_Details Page - Replay CC-In Progress message"), async t => {

            await dashBoardPage.selectMember(memberCirrus);
            await trafficManagerPage.navigateToTrafficManagerPage();
            await trafficManagerPage.replayCCMessages(ccMessageIds);
        });        

const messageIdArray = [];
fixture`Manually complete message as a Business user and Proagrica super user`
    .page(baseUrl)
    .beforeEach(async (t) => {
        await
            LoginPage.logInSuccessful()
        await
            dashboard.selectMember(memberSelect)
        await
            trafficManagerPage.navigateToTrafficManagerPage()

    });

test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })(
        ": Posting inprogress,failed,held,completed message using send to receive journey",
        async (t) => {
            //Post message with failed status
            requestBody.metadata.messageuniqueid = "failedMessage" + Date.now();
            const messageuniqueid1 = requestBody.metadata.messageuniqueid;
            if (messageuniqueid1) {
                messageIdArray.push(messageuniqueid1);  // Push the ID into the array
            }
            requestBody.metadata.source = sourcePNIDReplay,
            requestBody.metadata.destination = destinationPNIDReplay,
            requestBody.metadata.subSource = "RDRJ";
            requestBody.metadata.subDestination = "SDRJ";
            requestBody.metadata.messageType = "F4FInvoice";
            requestBody.metadata.messageSubType = "Debits";
            // Send request

            const sendCompletedMessagRequest1 = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
            await t.expect(sendCompletedMessagRequest1.status).eql(200); // Asserting response code

            //Post message with held status
            requestBody.metadata.messageuniqueid = "heldMessage" + Date.now();
            const messageuniqueid2 = requestBody.metadata.messageuniqueid;
            if (messageuniqueid2) {
                messageIdArray.push(messageuniqueid2);  // Push the ID into the array
            }
            requestBody.metadata.messageType = "execution";
            requestBody.metadata.messageSubType = "";
            requestBody.metadata.subSource = "SD174290134392688";
            requestBody.metadata.subDestination = "RD";

            // Send request
            const sendCompletedMessagRequest2 = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
            await t.expect(sendCompletedMessagRequest2.status).eql(200); // Asserting response code

            //Post message with completed status
            requestBody.metadata.messageuniqueid = "completedMessage" + Date.now();
            const messageuniqueid3 = requestBody.metadata.messageuniqueid;
            if (messageuniqueid3) {
                messageIdArray.push(messageuniqueid3);  // Push the ID into the array
            }
            requestBody.metadata.messageType = "StockTransfer";
            requestBody.metadata.messageSubType = "115";
            requestBody.metadata.subSource = "SendJ";
            requestBody.metadata.subDestination = "ReceiveJ";

            // Send request
            const sendCompletedMessagRequest4 = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
            await t.expect(sendCompletedMessagRequest4.status).eql(200); // Asserting response code

            //Post message with failed status and change it to manually complete
            requestBody.metadata.messageuniqueid = "manuallyCompleted" + Date.now();
            const messageuniqueid4 = requestBody.metadata.messageuniqueid;
            if (messageuniqueid4) {
                messageIdArray.push(messageuniqueid4);  // Push the ID into the array
            }
            requestBody.metadata.messageType = "F4FInvoice";
            requestBody.metadata.messageSubType = "Debit";
            // Send request

            const sendCompletedMessagRequest5 = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
            await t.expect(sendCompletedMessagRequest5.status).eql(200); // Asserting response code
            requestBody.metadata.messageuniqueid = "inProgressMesage" + Date.now();
            // Save messageuniqueid to fixture context
            const messageuniqueid5 = requestBody.metadata.messageuniqueid;
            if (messageuniqueid5) {
                messageIdArray.push(messageuniqueid5);  // Push the ID into the array
            }
            // Update the below fields in requestBody
            requestBody.metadata.source = sourcePNIDReplay,
            requestBody.metadata.destination = destinationPNIDReplay,
            requestBody.metadata.subSource = "SDR";
            requestBody.metadata.subDestination = "RDR";
            requestBody.metadata.messageType = "financial";
            requestBody.metadata.messageSubType = "Return Invoice";
            // Send request
            const sendCompletedMessagRequest = await axios.post(messageURL, requestBody, { headers: { 'Api-Key': apiKey } }); // Include the API key in the headers
            await t.expect(sendCompletedMessagRequest.status).eql(200); // Asserting response code

        });

test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage' })
    ((
        "TC_TM_041 Proagrica Super User/Business User Traffic manager_Details Page - Manually Complete Held message",
        "TC_TM_042 Proagrica Super User/Business User Traffic manager_Details Page - Manually Complete InProgress message",
        "TC_TM_043 Proagrica Super User/Business User Traffic manager_Details Page - Manually Complete Failed message"), async t => {

            await trafficManagerPage.manuallyCompleteMessages(messageIdArray);
            await LoginPage.logoutSuccessful();
            await LoginPage.logInSuccessfulAsBusinessUser();
            await dashBoardPage.selectMember(memberSelect);
            await trafficManagerPage.navigateToTrafficManagerPage();
            //Manually Complete messages as a business user (Business user is unable to Manually complete inprogress message->known issue)
            await trafficManagerPage.manuallyCompleteMessages(messageIdArray);
        });
fixture`Verify total from both widgets and from message listing page`
    .page(baseUrl)
    .beforeEach(async (t) => {
            await  LoginPage.logInSuccessful();
            await  dashboard.selectMember(member);
    });
    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard' })
    ("TC_TM_044 Verify total numbers of Failed messages from message volumes by status, message volumes by type and message listing page",async t => {
            await dashBoardPage.verifyFailedTabCounts();
    });

    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard' })
    ("TC_TM_045 Verify total numbers of Held messages from message volumes by status, message volumes by type and message listing page",async t => {
            await dashBoardPage.verifyHeldTabCounts();
     });

    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard' })
    ("TC_TM_046 Verify total numbers of Completed messages from message volumes by status, message volumes by type and message listing page",async t => {
            await dashBoardPage.verifyCompletedTabCounts();
     });

    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard' })
    ("TC_TM_047 Verify total numbers of Manually Completed messages from message volumes by status, message volumes by type and message listing page",async t => {
            await dashBoardPage.verifyManuallyCompletedTabCounts();
     });

    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard' })
    ("TC_TM_048 Verify total numbers of In Progress messages from message volumes by status, message volumes by type and message listing page",async t => {
            await dashBoardPage.verifyInProgressTabCounts();
     });

fixture`Traffic manager_Download with different date ranges`
    .page(baseUrl)
    .beforeEach(async (t) => {
            await  LoginPage.logInSuccessful();
            await  dashboard.selectMember(member);
    });
    test // this test is also included in message download script using api using api
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type3: 'smoke' })

    ('TC_TM_045: Traffic manager_Download - dateRangeAll', async t => {
        
        await trafficManagerPage.downloadMessages('dateRangeAll')
    });

    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type3: 'smoke' })

    ('TC_TM_046: Traffic manager_Download - dateRangeSinceLast30Days', async t => {
        
        await trafficManagerPage.downloadMessages('dateRangeSinceLast30Days')
    });

    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type3: 'smoke' })

    ('TC_TM_047: Traffic manager_Download - dateRangeSinceLast7Days', async t => {
        
        await trafficManagerPage.downloadMessages('dateRangeSinceLast7Days')
    });

    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type3: 'smoke' })

    ('TC_TM_048: Traffic manager_Download - dateRangeSinceYesterday', async t => {
        
        await trafficManagerPage.downloadMessages('dateRangeSinceYesterday')
    });

    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type3: 'smoke' })

    ('TC_TM_049: Traffic manager_Download - dateRangeThisMonth', async t => {
        
        await trafficManagerPage.downloadMessages('dateRangeThisMonth')
    });

    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type3: 'smoke' })

    ('TC_TM_050: Traffic manager_Download - dateRangeThisWeek', async t => {
        
        await trafficManagerPage.downloadMessages('dateRangeThisWeek')
    });

    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type3: 'smoke' })

    ('TC_TM_051: Traffic manager_Download - dateRangeToday', async t => {

        await trafficManagerPage.downloadMessages('dateRangeToday')
    });
