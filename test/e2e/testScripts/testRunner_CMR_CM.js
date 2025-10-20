import { test, Selector } from "testcafe";
import { baseUrl } from "../helpers/configuration";
import dashBoardPage from "../pages/dashBoardPage";
import LoginPage from "../pages/logInPage";
import codeMatcherPage from "../pages/codeMatcherPage";
import codeMatcherRoutePage from "../pages/codeMatcherRoutePage";
import routeInformationPage from "../pages/routeInformationPage";
import E2E_USERNAME from "../helpers/configuration";
import data from "../data/data.json"
const ENV_NAME = process.env.ENV_NAME;

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var member = repo.testData.member

fixture`Visibility of Code Matcher routes Card`
  .page(baseUrl)
  test
  .meta({ e2e: 'regression', type9:'CMRpage', type4: 'access'})
    ("TC_CM_CMR_001 Validate user with access to a proagrica super admin is able to view Code Matcher Route Card enabled",
    
      async (t) => {
    
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
        await codeMatcherPage.navigateToEnrichmentPage();

        await t
        .expect(Selector(codeMatcherPage.codeMatcherRouteText).visible).eql(true)
        .expect(Selector(codeMatcherPage.viewLinkCodeMatcherRoute).visible).eql(true)
    }
);

//CM user testcase

test
.meta({ e2e: 'regression', type9:'CMRpage', type4: 'access'})
("TC_CM_CMR_001A Validate user with access to CM user role is not able to view Code Matcher Route Card enabled",

    async (t) => {
      await LoginPage.logInSuccessfulAsBusinessUser();
      await dashBoardPage.selectMember(member);
      await codeMatcherPage.navigateToEnrichmentPage();
      await t
      .expect(Selector(codeMatcherPage.codeMatcherRouteText).visible).eql(false)
      .expect(Selector(codeMatcherPage.viewLinkCodeMatcherRoute).visible).eql(false)    
      
}
);

test
  .meta({ e2e: 'regression', type9:'CMRpage', type4: 'access'})
("TC_CM_CMR_001B Validating when Business Admin User is trying to access'Code Matcher routes'page directly into the browser",

async (t) => {
  await LoginPage.logInSuccessfulAsBusinessUser();
  await dashBoardPage.selectMember(member);      
  await t.expect(Selector(dashBoardPage.enrichmentSideMenu).hasClass('pointer-events-none')).eql(false)

  const currentUrl = await t.eval(() => window.location.href);

  const expectedDevUrl = 'https://proagrica-network-dev-eks-2.aga.eu-west-1.proagrica.telus.ag/enrichment/routes';
  const expectedTestUrl = 'https://proagrica-network-test-eks-2.aga.eu-west-1.proagrica.telus.ag/enrichment/routes';
  const expectedPreUrls = [
      'https://proagrica-network-pre-eks-04-us.agv.us-east-1.proagrica.telus.ag/enrichment/routes',
      'https://pre.proagrica.net/enrichment/routes'
  ];
    let targetUrl
    switch (ENV_NAME) {
      case 'dev':
            targetUrl = expectedDevUrl;
            break;
        case 'test':
            targetUrl = expectedTestUrl;
            break;
        case 'pre':
            targetUrl = expectedPreUrls.includes(currentUrl) ? currentUrl : expectedPreUrls[0];
        break;
      default:
          console.error("Unrecognised NODE_ENV: " + process.env.ENV_NAME);
          process.exit(1);
  } 

  await t.navigateTo(targetUrl);
  await t.expect(dashBoardPage.invalidAccessMessage.visible).ok({ timeout: 10000 }); //explicit 10 second wait
  }
);

fixture `Code Matcher routes Page`
  .page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await codeMatcherPage.navigateToEnrichmentPage();
  })

test
  .meta({e2e: 'regression', type9:'CMRpage', type4: 'access'})
  ("TC_CM_CMR_002: Validate user with access to a proagrica super admin is able to navigate Code Matcher Route Card section",
    
  async (t) => {
    
        await codeMatcherRoutePage.navigateToCodeMatcherRoutesPage(); //002
  }
);

test
  .meta({e2e: 'regression', type9:'CMRpage',type3: 'smoke'})
  ("TC_CM_CMR_003 and 004  Display of 'Code Matcher routes' page",

  async (t) => {

    await codeMatcherRoutePage.navigateToCodeMatcherRoutesPage(); //002
    await codeMatcherRoutePage.validateUserCanSeeAddNewRouteButton(); //003
    await codeMatcherRoutePage.validateTheDisplayOfColumnsOnCodeMatcherRoutesPage(); //004
  }
);

test
  .meta({ e2e: 'regression', type9:'CMRpage',type5: 'pagination'})
  ("TC_CM_CMR_005 and 006 Access to all the pages and lists of rows per page", 

  async (t) => {

    await codeMatcherRoutePage.navigateToCodeMatcherRoutesPage(); //002
    await codeMatcherRoutePage.validateUserIsAbleToAccessAllPagesOnCodeMatcherRoutesPage();  //005
    await codeMatcherRoutePage.validateListChnageAsPerRowsPerPageSelected(); //006
   
  }
);

fixture `Route information Page`
  .page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await codeMatcherPage.navigateToEnrichmentPage();
  })
test
  .meta({ e2e: 'regression', type9:'CMRpage', type3: 'smoke',})
  ("TC_CM_CMR_007 and 008 Navigation to Route information & Display of 'Route information' page",

  async (t) => {

    await codeMatcherRoutePage.navigateToCodeMatcherRoutesPage(); //002
    await routeInformationPage.validateUserIsAbleToNavigateToRouteInformationPage(); //007
    await routeInformationPage.validateTheDisplayOfRouteInformationPage(); //008

  }
);

test
  .meta({ e2e: 'regression', type9:'CMRpage'})
  ("TC_CM_CMR_009 and 010 Display of Service type Config table & Copy BaseXpath function",

  async (t) => {

    await codeMatcherRoutePage.navigateToCodeMatcherRoutesPage(); //002
    await routeInformationPage.validateTheDisplayOfColumnUnderServiceTypeConfigsection(); //009
    await routeInformationPage.validateUserIsAbleToCopyandPasteBaseXpath(); //010
   
  }
);

fixture `Adding New Route`
  .page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await codeMatcherPage.navigateToEnrichmentPage();
  })

test
  .meta({ e2e: 'regression', type9:'CMRpage', test: 'smoke'})
  ("TC_CM_CMR_011,012,013 and 014 Validation of Receiver dropdown, Next Button, Duplicate Routes and Warning alert when route not saved",

  async (t) => {

    await codeMatcherRoutePage.navigateToCodeMatcherRoutesPage(); //002
    await codeMatcherRoutePage.validatingReceiverDropdownAndNextButtonDuplicateRoutesAndWarningPopUp(); //011,012,013 and 014
  }
);

test
  .meta({ e2e: 'regression', type9:'CMRpage'})
  ("TC_CM_CMR_015 Validating Sender and Receiver can not be same on Add New Message Route modal",

  async (t) => {

    await codeMatcherRoutePage.navigateToCodeMatcherRoutesPage(); //002
    await codeMatcherRoutePage.validatingSenderAndReceiverCanNotBeSameWhenAddingNewMessageRoute(); //015
  }
);

fixture `Editing Code Matcher Route`
  .page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await codeMatcherPage.navigateToEnrichmentPage();
  })

test
  .meta({ e2e: 'regression', type9:'CMRpage'})
  ("TC_CM_CMR_016, 017, 018 and 019: Access to Edit mode design, Mandatoty fields alert, Duplicate route alert, Warning alert when route not saved", 

  async (t) => {

    await codeMatcherRoutePage.navigateToCodeMatcherRoutesPage(); //002
    await routeInformationPage.validateUserIsAbleToNavigateToRouteInformationPage(); //007
    await routeInformationPage.validationOfCodeMatcherRouteEditMode(); //016,017,018,019
  
   
  }
);

test
  .meta({ e2e: 'regression', type9:'CMRpage'})
  ("TC_CM_CMR_020 Validating user is able to perform edit Routes actions", 

  async (t) => {
     await codeMatcherRoutePage.navigateToCodeMatcherRoutesPage(); //002
     await routeInformationPage.validateUserIsAbleToEditCodeMatcherRouteDetails(); //020
   
  }
);

fixture `Add new config Modal`
  .page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await codeMatcherPage.navigateToEnrichmentPage();
  })


test
  .meta({ e2e: 'regression', type9:'CMRpage'})
  (("TC_CM_CMR_021: Validating the display of Add new config modal(EWS-664) via Add config button",
    "TC_CM_CMR_023: Validating the Active check box is tick by default on Add new config modal(EWS-664)",
    "TC_CM_CMR_024: Validating Add button is only activated once all mandatory fileds are populated on Add new config modal(EWS-664)",
    "TC_CM_CMR_025: Validating the alert message when user press cancel button after making changes on Add new config modal(EWS-664)",
    "TC_CM_CMR_026: Validating the alert message when user press X Icon after making changes on Add new config modal(EWS-664)",
    "TC_CM_CMR_027: Validating the confirm message when user add unique config details on Add new config modal(EWS-664)",
    "TC_CM_CMR_028: Validating user can see refreshed list of Configs under service type config table after adding it via Add config button(EWS-734)",
    "TC_CM_CMR_029: Validating the error message when user try to add duplicate config details on Add new config modal(EWS-664)",
    "TC_CM_CMR_047: Validating user can see updated (Edited by, Last updated,and Active value) straight away after adding new config (EWS-748)",
    "TC_CM_CMR_048: Validating when user add new config details, then they can see it as the first row on the Routes list table (EWS-749)",
    "Add new config Modal: TC_CM_CMR_021 to TC_CM_CMR_029 and TC_CM_CMR_047 and 048"),

    async (t) => {

      await codeMatcherRoutePage.navigateToCodeMatcherRoutesPage(); //002
      await routeInformationPage.validateUserIsAbleToNavigateToRouteInformationPage(); //007
      await routeInformationPage.validationOfAddNewConfigModal(); //021 to 029

    }
);

fixture `View Config details Modal for existing routes`
  .page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await codeMatcherPage.navigateToEnrichmentPage();
  })


test
  .meta({ e2e: 'regression', type9:'CMRpage'})
  ("TC_CM_CMR_030 and 031: Dispaly of Config Details Modal, Cancel button or X icon",

    async (t) => {

      await codeMatcherRoutePage.navigateToCodeMatcherRoutesPage(); //002
      await routeInformationPage.validateUserIsAbleToNavigateToRouteInformationPage(); //007
      await routeInformationPage.validationOfConfigDetailsModal(); //030 and 031

    }
);
  
fixture `New Route and New Config Modal`
  .page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await codeMatcherPage.navigateToEnrichmentPage();
  })


test
  .meta({ e2e: 'regression', type9:'CMRpage'})
  (("TC_CM_CMR_032: Validating when user add new message route, they can see Add new config modal(EWS-631)",
    "TC_CM_CMR_033: Validating when user tick/untick Active button on Add new Route pop up, they can see same on Add new config modal (EWS-631)",
    "TC_CM_CMR_034: Validating the field Destination Queue is auto populated with 'UK Cirrus' value on Add new config modal(EWS-631)",
    "TC_CM_CMR_035: Validating when user click on Previous button before making any changes, is back on Add New Message Route modal (EWS-631)",
    "TC_CM_CMR_036: Validating warning pop up message on Add new config modal, when user click on Cancel button or X icon (EWS-631)",
    "TC_CM_CMR_037: Validating user is back on original Code Matcher routes page when confirming OK on warning pop up (EWS-631)",
    "TC_CM_CMR_038: Validating Add button will get only active after populating some values in all mandatory fields on Add new config modal (EWS-631)",
    " New Route and New Config Modal: TC_CM_CMR_032 to TC_CM_CMR_039"),
    
    async (t) => {

      await codeMatcherRoutePage.navigateToCodeMatcherRoutesPage(); //002
      await codeMatcherRoutePage.validationOfNewRouteAndNewConfigDetailsModal(); //032 to 038

    }    
  );

 
fixture `Edit Config details Modal`
.page(baseUrl)
.beforeEach(async t => {
  await LoginPage.logInSuccessful();
  await dashBoardPage.selectMember(member);
  await codeMatcherPage.navigateToEnrichmentPage();
})

test
  .meta({ e2e: 'regression', type9:'CMRpage'})
  (("TC_CM_CMR_040: Validating user can see Edit Config details modal (EWS-630)",
    "TC_CM_CMR_041: Validating Save button will become active only if all mandatory fields populated and user edit some data (EWS-630)",
    "TC_CM_CMR_042: Validating an error message when user edit some config data on edit config details modal which is already exists (EWS-630)",
    "TC_CM_CMR_043: Validating warning pop up message when user press cancel button or X icon on edit config details modal after making any changes (EWS-630) ",
    "TC_CM_CMR_044: Validating user is back on config details modal when press Ok on config loose changes warning pop up (EWS-630) ",
    "Edit Config details Modal: TC_CM_CMR_040 to TC_CM_CMR_044"),
  
  async (t) => {

    await codeMatcherRoutePage.navigateToCodeMatcherRoutesPage(); //002
    await routeInformationPage.validateUserIsAbleToNavigateToRouteInformationPage(); //007
    await routeInformationPage.validationOfEditConfigDetailsModal(); // 040 to 044
  }
);

test
  .meta({ e2e: 'regression', type9:'CMRpage'})
  (("TC_CM_CMR_045: Validating the confirmation message when user edit some data on edit config details modal (EWS-630)",
    "TC_CM_CMR_046: Validating user can see updated (Edited by, Last updated,and Active value) straight away after editing an existing config (EWS-748)",
    "TC_CM_CMR_049: Validating when user edit existing config details, then they can see it as the first row on the Routes list table (EWS-749)",
    "TC_CM_CMR_050: Validating the sorting functionality on Code Matcher routes list page (EWS-749)",
    "Edit Config details Modal: TC_CM_CMR_045/046 and TC_CM_CMR_049/050"),

    async (t) => {

      await codeMatcherRoutePage.navigateToCodeMatcherRoutesPage(); //002
      await routeInformationPage.validateUserIsAbleToNavigateToRouteInformationPage(); //007
      await routeInformationPage.EditingDataOnEditConfigDetailsModal(); //045,046,049 and 050

    }
  );