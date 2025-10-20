import { test, Selector } from "testcafe";
import { baseUrl } from "../helpers/configuration";
import LoginPage from "../pages/logInPage";
import dashBoardPage from "../pages/dashBoardPage";
import networkSetupPage from "../pages/networkSetupPage";
import journeysPage from "../pages/journeysPage";
import companiesPage from "../pages/companiesPage";
const ENV_NAME = process.env.ENV_NAME ;

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var member = repo.testData.member
var memberforBusinessUser = repo.testData.memberforBusinessUser;
var noJourneyMember = repo.testData.noJourneyMember
var memberJourney = repo.testData.memberJourney;
var memberFilter = repo.testData.memberFilter;
var memberListing =repo.testData.memberListing;

//const journeysTableRows = Selector('#journeys-table').find('tbody tr');// selector for journey table all rows
const journeysTableRows = Selector('table.w-full').find('tbody tr');// selector for journey table all rows
const nameIndex = 0; // for journey name column
const senderIndex = 1; // for sender column
const receiverIndex = 2; // for receiver column
const messageTypeIndex = 3; // for message type column
const nextPageButton = Selector('div.flex.items-center > button:nth-child(4)');
const Sender = 'sender'

fixture`Dashboard Page`
  .page(baseUrl)
test
  .meta({ e2e: 'regression', type4: 'access', type7: 'journeypage'})
  
  ("TC_NS_JM_001 validating proagrica super admin user is able to access Network setup from side navigation bar",
      async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);      
        await t
         .expect(Selector(dashBoardPage.networkSetupLink).visible).eql(true)
      }
);
  
test
.meta({ e2e: 'regression', type4: 'access', type7: 'journeypage'})

("TC_NS_JM_002 validating Business user with code matcher role is not able to access Network setup from side navigation bar",
    async (t) => {
      await LoginPage.logInSuccessfulAsBusinessUser();
      await dashBoardPage.selectMember(member);      
      await t
       .expect(Selector(dashBoardPage.networkSetupLink).hasClass('pointer-events-none')).eql(true)
    }
);
test
.meta({ e2e: 'regression', type4: 'access', type7: 'journeypage'})

("TC_NS_JM_003 validating when Business Admin User is trying to access'Journey'page directly into the browser",
    async (t) => {
      await LoginPage.logInSuccessfulAsBusinessUser();
      await dashBoardPage.selectMember(memberforBusinessUser);      
      await t
        .expect(Selector(dashBoardPage.networkSetupLink).hasClass('pointer-events-none')).eql(true)
        
        switch (ENV_NAME) {

          case 'dev':
          await t.navigateTo('https://proagrica-network-dev-eks-2.aga.eu-west-1.proagrica.telus.ag/network-setup/journeys')
          await t.wait(10000)
          await t.expect(dashBoardPage.invalidAccessMessage.visible).eql(true)
          break;

          case 'test':
            await t.navigateTo('https://proagrica-network-test-eks-2.aga.eu-west-1.proagrica.telus.ag/network-setup/journeys')
            await t.wait(10000)
            await t.expect(dashBoardPage.invalidAccessMessage.visible).eql(true)
            break;

          case 'pre':
           await t.navigateTo('https://pre.proagrica.net/network-setup/journeys')
           await t.wait(10000)
           await t.expect(dashBoardPage.invalidAccessMessage.visible).eql(true)
           break;
           
          default:
              console.error("Unrecognised NODE_ENV: " + process.env.ENV_NAME);
              process.exit(1);
      }
       
    }
);
fixture`Network setup Page`
  .page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await dashBoardPage.navigateToNetworkSetupPage();
  })
    test
      .meta({ e2e: 'regression', type7: 'journeypage'})
  
      ("TC_NS_JM_004 Validating display of Network setup Landing Page",
        async (t) => {
          await networkSetupPage.displayValidationNetworkSetup();
        }
    );
      
fixture`Journey Listing Page`
  .page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(memberListing);
    await dashBoardPage.navigateToNetworkSetupPage();
    await networkSetupPage.navigateToJourneysPage();
  })
    test
    .meta({ e2e: 'regression', type3: 'smoke', type7: 'journeypage'})
    ("TC_NS_JM_005 Validating display of Journey listing table section on'Journeys' page",
        async (t) => {       
          await journeysPage.validatingDisplayOfJourneyListingPage();
        }
    );
    
    test
    .meta({ e2e: 'regression',type5: 'pagination', type7: 'journeypage'})
    ("TC_NS_JM_006 Validating pagination functionality on journeys page",
        async (t) => {       

          await journeysPage.verifyingPaginationFunctionalityOnJourneysPage();
        }
    );
      
    test
    .meta({ e2e: 'regression',type5: 'pagination', type7: 'journeypage'})
    ("TC_NS_JM_007 Validate user can access all the pages on journeys page",
      async (t) => {       

        await companiesPage.validateUserIsAbleToAccessAllPages();
      }
    );
  
    test
    .meta({ e2e: 'regression',type6: 'sorting', type7: 'journeypage'})
    ("TC_NS_JM_008 Validating default sorting order is by journey name in ascending order ",
      async (t) => {       

        // Extracting journey names data from the journeys table before sorting
        const journeyNamesBeforeSorting = await journeysPage.extractColumnData(journeysTableRows, nameIndex, nextPageButton);
        // Sorting journey names in ascending order, ignoring case sensitivity
        const journeyNamesAscendingBefore = journeyNamesBeforeSorting.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        // Triggering sorting in descending order by clicking on the name column
        await t.click(journeysPage.journeyTabFilter);
        await t.click(journeysPage.nameColumn);
        await t.click(journeysPage.nameColumn);
        const journeyNamesAfterSorting = await journeysPage.extractColumnData(journeysTableRows, nameIndex, nextPageButton);
        const journeyNamesAscendingAfter = journeyNamesAfterSorting.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        // Asserting if journey names are sorted in ascending order
        await t.expect(journeyNamesAscendingBefore).eql(journeyNamesAscendingAfter);
      }
    );

    test
    .meta({ e2e: 'regression', type3: 'smoke', type6: 'sorting', type7: 'journeypage'})
    ("TC_NS_JM_009 Validating the sorting in descending order by journey name",
      async (t) => {       

       // Extracting journey names data from the journeys table before sorting
        const namesBeforeSorting = await journeysPage.extractColumnData(journeysTableRows, nameIndex, nextPageButton);
       // Sorting journey names in descending order, ignoring case sensitivity
       const namesDescending = namesBeforeSorting.slice().sort((a, b) => {
      // Compare case-insensitively and prioritize lowercase names
        const compareResult = a.toLowerCase().localeCompare(b.toLowerCase());
        return compareResult === 0 ? (a < b ? -1 : 1) : compareResult;
    }).reverse();  // Reverse to make the order descending
       // Triggering sorting in descending order by clicking on the name column in journey manager table
        await t.click(journeysPage.journeyTabFilter);
        await t.click(journeysPage.nameColumn);
       // Extracting journey names data from the journeys table after sorting
        const namesAfterSorting = await journeysPage.extractColumnData(journeysTableRows, nameIndex, nextPageButton);
        // Sorting journey names in descending order, ignoring case sensitivity
      const namesDescendingAfter = namesAfterSorting.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).reverse();
       // Asserting if journey names are sorted in descending order
      await t.expect(namesDescending).eql(namesDescendingAfter); 
      }
    );

  test
    .meta({ e2e: 'regression',type6: 'sorting', type7: 'journeypage'})
    ("TC_NS_JM_010 Validating the sorting order by ascending by sender",
      async (t) => {       
        // Extracting sender data from the journeys table
        const sendersBeforeSorting = await journeysPage.extractColumnData(journeysTableRows, senderIndex, nextPageButton);
        // Sorting senders in ascending order
        const sendersAscending = sendersBeforeSorting.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        //Empty values inbetween the arrays extracted are placed at the end of the array
        const senderAscBeforeAndRearranged = await journeysPage.moveEmptyValuesToEnd(sendersAscending);
        // Triggering ascending sorting by clicking on the sender column
        await t.click(journeysPage.journeyTabFilter);
        await t.click(journeysPage.senderColumn);
        await t.click(journeysPage.senderColumn);
        // Extracting senders data after sorting
        const sendersAfterSorting = await journeysPage.extractColumnData(journeysTableRows, senderIndex, nextPageButton);
       // Asserting if senders are sorted in ascending order
        await t.expect(senderAscBeforeAndRearranged).eql(sendersAfterSorting);
      
      }
    );

    test
    .meta({ e2e: 'regression',type6: 'sorting', type7: 'journeypage'})
    ("TC_NS_JM_011 Validating the sorting order by descending by sender",
      async (t) => {       
       
        // Extracting sender data from the journeys table
        const sendersBeforeSorting = await journeysPage.extractColumnData(journeysTableRows, senderIndex, nextPageButton); // Extract data from the sender column for all rows
        // Sorting senders in descending order
        const sendersDescending = sendersBeforeSorting.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).reverse();
        //Empty values inbetween the arrays extracted are placed at the top of the array
        const senderDescBeforeAndRearranged = await journeysPage.moveEmptyValuesToTop(sendersDescending);
        //Triggering descending sorting by clicking on the sender column
        await t.click(journeysPage.journeyTabFilter);
        await t.click(journeysPage.senderColumn);
        // Extracting senders data after sorting
        const sendersAfterSorting = await journeysPage.extractColumnData(journeysTableRows, senderIndex, nextPageButton);
        // Asserting if senders are sorted in descending order
         await t.expect(senderDescBeforeAndRearranged).eql(sendersAfterSorting);
       }
    );

    test
    .meta({ e2e: 'regression',type6: 'sorting', type7: 'journeypage'})
    ("TC_NS_JM_012 Validating the sorting order by ascending by receiver",
      async (t) => {       
       
        // Extracting recivers data from the journeys table
        const receiversBeforeSorting = await journeysPage.extractColumnData(journeysTableRows, receiverIndex, nextPageButton);
        //Sorting receivers in ascending order
        const receiversAscending = receiversBeforeSorting.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        //Empty values inbetween the arrays extracted are placed at the bottom of the array
        const receiverAscBeforeAndRearranged = await journeysPage.moveEmptyValuesToEnd(receiversAscending);
        //Triggering ascending sorting by clicking on the receiver column
        await t.click(journeysPage.journeyTabFilter);
        await t.click(journeysPage.receiverColumn);
        await t.click(journeysPage.receiverColumn);
        //Extracting receivers data after sorting
        const receiversAfterSorting = await journeysPage.extractColumnData(journeysTableRows, receiverIndex, nextPageButton);
        // Asserting if receivers are sorted in ascending order
        await t.expect(receiverAscBeforeAndRearranged).eql(receiversAfterSorting);
      }
    );

    test
    .meta({ e2e: 'regression',type6: 'sorting', type7: 'journeypage'})
    ("TC_NS_JM_013 Validating the sorting order by descending by receiver",
      async (t) => {       
        // Extracting receiver data from the journeys table
        const receiversBeforeSorting = await journeysPage.extractColumnData(journeysTableRows, receiverIndex, nextPageButton);
        // Sorting receivers in descending order
        const receiversDescending = receiversBeforeSorting.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())).reverse();
        //Empty values inbetween the arrays extracted are placed at the bottom of the array
       const receiverDescBeforeAndRearranged = await journeysPage.moveEmptyValuesToTop(receiversDescending);
        // Triggering descending sorting by clicking on the receiver column
        await t.click(journeysPage.journeyTabFilter);
        await t.click(journeysPage.receiverColumn);
        // Extracting receivers data after sorting
        const receiversAfterSorting = await journeysPage.extractColumnData(journeysTableRows, receiverIndex, nextPageButton);
        // Asserting if receivers are sorted in descending order
        await t.expect(receiverDescBeforeAndRearranged).eql(receiversAfterSorting);
      }
    );

    test
    .meta({ e2e: 'regression',type6: 'sorting', type7: 'journeypage'})
    ("TC_NS_JM_014 Validating the sorting order by ascending by message type",
      async (t) => {       
       
        // Extracting message type data from the journeys table
        const messageTypesBeforeSorting = await journeysPage.extractColumnData(journeysTableRows, messageTypeIndex, nextPageButton);
        // Sorting message types in ascending order
        const messageTypesAscending = messageTypesBeforeSorting.slice().sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase()));
        // Triggering ascending sorting by clicking on the message type column twice
        await t.click(journeysPage.journeyTabFilter);
        await t.click(journeysPage.messageTypeColumn);
        await t.click(journeysPage.messageTypeColumn);
        // Extracting message types data after sorting
        const messageTypesAfterSorting = await journeysPage.extractColumnData(journeysTableRows, messageTypeIndex, nextPageButton);
        // Asserting if message types are sorted in ascending order
        await t.expect(messageTypesAscending).eql(messageTypesAfterSorting);
      }
    );
  
    test
    .meta({ e2e: 'regression',type6: 'sorting', type7: 'journeypage'}) 
    ("TC_NS_JM_015 Validating the sorting order by descending by message type",
      async (t) => {       
    
        // Extracting message type data from the journeys table
        const messageTypesBeforeSorting = await journeysPage.extractColumnData(journeysTableRows, messageTypeIndex, nextPageButton);
        // Sorting message types in descending order
        const messageTypesDescending = messageTypesBeforeSorting.slice().sort((a, b) => b.toLowerCase().localeCompare(a.toLowerCase()));
        // Triggering descending sorting by clicking on message type column once
        await t.click(journeysPage.journeyTabFilter);
        await t.click(journeysPage.messageTypeColumn);
        // Extracting message types data after sorting
        const messageTypesAfterSorting = await journeysPage.extractColumnData(journeysTableRows, messageTypeIndex, nextPageButton);
        // Asserting if message types are sorted in descending order
        await t.expect(messageTypesDescending).eql(messageTypesAfterSorting);
      }
    );
   
  fixture`No journeys available Page`
    .page(baseUrl)
    .beforeEach(async t => {
      await LoginPage.logInSuccessful();
    })
  test
  .meta({ e2e: 'regression', type7: 'journeypage'})
  ("TC_NS_JM_016 Verifying 'No journeys available' message visible when no journeys available",
      async (t) => { 
        await dashBoardPage.selectMember(noJourneyMember);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();
        await journeysPage.verifyingNoJourneysAvailableMessage()
      }
  );

  fixture`View Journey Section Page`
    .page(baseUrl)
    .beforeEach(async t => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();
        await journeysPage.navigateToViewJourneyPage();
    })
    test
    .meta({ e2e: 'regression', type7: 'journeypage'})
    ("TC_NS_JM_017  Verifying url is displaying journey id at the end",
       async (t) => {       
         await journeysPage.verifyURLWithDigitsAtEnd();
          }
    );
    test
    .meta({ e2e: 'regression', type7: 'journeypage'})
    ("TC_NS_JM_018 Validating display of view journey Section page",
       async (t) => {       
         await journeysPage.validatingDisplayOfViewJourneyPage();
          }
    );
    test
    .meta({ e2e: 'regression', type7: 'journeypage'})
    ("TC_NS_JM_019 Validating display of Stages table on journey Section page",
       async (t) => {       
         await journeysPage.validatingDisplayOfStagesTableOnJourneyPage();
          }
    );
//     fixture`Add new journey Section Page`
//     .page(baseUrl)
//     .beforeEach(async t => {
//         await LoginPage.logInSuccessful();
//         await dashBoardPage.selectMember(member);
//         await dashBoardPage.navigateToNetworkSetupPage();
//         await networkSetupPage.navigateToJourneysPage();
//     })
// test
//   .meta({ e2e: 'regression', type3: 'smoke', type7: 'journeypage' })
//   ("TC_NS_JM_020  Validating user is able to add the Journey successfully for Direction = SEND and Next direction = SEND ",
//     async (t) => {
//       await journeysPage.setJourneyFieldsSaveAndAssert({
//         // Define the fields object with the values you want to create the journey for
//         journeyName: "send-send-journey",
//         senderDivision: "SD",
//         receiverName: "Test456",
//         receiverDivision: "RD",
//         messageSubType: "Invoice_Sub",
//         nextDirection: "Send",
//       });
//       await journeysPage.clickOnEditButton();
//       await journeysPage.addCodeMatcherStageToJourney();
//       await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL')
//       await journeysPage.addTransformStageToJourney('Saxon XSL Transform_invalidURL')
//       await journeysPage.addTransformStageToJourney('XPath Metadata Transform')
//       await journeysPage.saveJourney();
        
//     });
// test
//   .meta({ e2e: 'regression', type3: 'smoke', type7: 'journeypage' })
//   ("TC_NS_JM_021  Validating user is able to add the Journey successfully for Direction = SEND and Next direction = SEND with Receiver as wildcard",
//     async (t) => {
//       await journeysPage.setJourneyFieldsSaveAndAssert({
//         // Define the fields object with the values you want to create the journey for
//         journeyName: "send-send-journey",
//         senderDivision: "SD",
//         receiverOperator: "Any",
//         receiverDivision: "RD",
//         messageSubType: "Invoice_Sub",
//         nextDirection: "Send",
//       });
//       await journeysPage.clickOnEditButton();
//       await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL')
//       await journeysPage.saveJourney();
          
//     });
      
//     test
//     .meta({ e2e: 'regression', type3: 'smoke', type7: 'journeypage' })
//     ("TC_NS_JM_022  Validating user should be able to add the Journey successfully for Direction = RECEIVE and Next direction = RECEIVE with Sender as wildcard",
//       async (t) => {
//         await journeysPage.setJourneyFieldsSaveAndAssert({
//           // Define the fields object with the values you want to create the journey for
//           journeyName: "receive-receive-journey",
//           direction: "Receive",
//           senderOperator: "Any",
//           senderDivision: "SD",
//           receiverDivision: "RD",
//           messageSubType: "Invoice_Sub",
//           nextDirection: "Receive",  


//         });
//         await journeysPage.clickOnEditButton();
//         await journeysPage.addTransformStageToJourney('Saxon XSL Transform_validURL')
//         await journeysPage.saveJourney();
            
//       });
           
fixture`Journey Manager Filter`
    .page(baseUrl)
    .beforeEach(async (t) => {
        await LoginPage.logInSuccessful()
        await dashBoardPage.selectMember(memberJourney);
        await dashBoardPage.navigateToNetworkSetupPage();
        await networkSetupPage.navigateToJourneysPage();
        await t.click(Selector(journeysPage.journeyTabFilter))

    });

test
    .meta({ e2e: 'regression', type7: 'journeypage' })
    ('TC_NS_JM_042A, Validate Sender dropdown values doesnt have any duplicates ', async t => {

        await
        journeysPage.validateSenderReceiverAndNameDropdownValuesNotDuplicates('sender')
    });

test
    .meta({ e2e: 'regression', type7: 'journeypage' })
    ('TC_NS_JM_042B, Validate Receiver and Name dropdown values doesnt have any duplicates ', async t => {

        await
        journeysPage.validateSenderReceiverAndNameDropdownValuesNotDuplicates('receiver')
        journeysPage.validateSenderReceiverAndNameDropdownValuesNotDuplicates('name')
    });
    
test
    .meta({ e2e: 'regression', type7: 'journeypage' })
    ('TC_NS_JM_043A, The dropdown values should be listed in ascending order ', async t => {
        await
        journeysPage.validateDropdownValuesInAscOrder('messageType')
        await
        journeysPage.validateDropdownValuesInAscOrder('messageSubType')
        await
        journeysPage.validateDropdownValuesInAscOrder('name')
    });
test
    .meta({ e2e: 'regression', type7: 'journeypage' })
    ('TC_NS_JM_043B, dropdown values should be listed in ascending order ', async t => {
        await
        journeysPage.validateSenderReceiverDropdownValues('sender')
        await
       journeysPage.validateSenderReceiverDropdownValues('receiver')
   });

    test
    .meta({ e2e: 'regression',type6: 'sorting', type7: 'journeypage'})
    ('TC_NS_JM_045 "Message type" ,"Receiver","Sender","Name" dropdowns display distinct values based on the Message type from the search results shown in the summary table.',
      async (t) => {       
        await
       journeysPage.getDistinctMessageTypeMessageSubType('messageType');
       journeysPage.getDistinctMessageTypeMessageSubType('sender');
       journeysPage.getDistinctMessageTypeMessageSubType('receiver');
       journeysPage.getDistinctMessageTypeMessageSubType('name');
      }
    );


