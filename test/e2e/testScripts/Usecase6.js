import { test, Selector } from "testcafe";
import { baseUrl } from "../helpers/configuration";
import LoginPage from "../pages/logInPage";
import dashBoardPage from "../pages/dashBoardPage";
import adminPage from "../pages/adminPage";
import connectorsPage from "../pages/connectorsPage";
import companiesPage from "../pages/companiesPage";

const ENV_NAME = process.env.ENV_NAME;

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var member = repo.testData.member
var memberforBusinessUser = repo.testData.memberforBusinessUser;

fixture`Companies Page`
    .page(baseUrl)
    .beforeEach(async t => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
        await dashBoardPage.navigateToAdminPage();
        await adminPage.navigateToCompaniesPage();

    })
test
    .meta({ e2e: 'regression', type1: 'usecaseE2E' })

    ("TC_E2E_UC6_011, 12, 13 and 14:  Validate Companies and connectors link. Monitor the health of the connectors",
        async (t) => {
            await companiesPage.verifyingCompaniesPageURL();
            await companiesPage.validateConnectorAddedForMonitoring();
            await t.click(Selector('#root a').withText('Dashboard'));
            await dashBoardPage.selectMember(member);
            await dashBoardPage.verifyConnectorMonitor();
            await dashBoardPage.navigateToAdminPage();
            await adminPage.navigateToCompaniesPage();
            await companiesPage.validateConnectorRemovedFromMonitoring();
        }
    )
    
fixture`Verify total from both widgets and from message listing page`
    .page(baseUrl)
    .beforeEach(async (t) => {
            await  LoginPage.logInSuccessful();
            await dashBoardPage.selectMember(member);
    });
    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard', type1: 'usecaseE2E'  })
    ("TC_E2E_UC6_015: Verify total numbers of Failed messages from message volumes by status, message volumes by type and message listing page",async t => {
            await dashBoardPage.verifyFailedTabCounts();
    });

    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard', type1: 'usecaseE2E'})
    ("TC_E2E_UC6_016: Verify total numbers of Held messages from message volumes by status, message volumes by type and message listing page",async t => {
            await dashBoardPage.verifyHeldTabCounts();
     });

    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard', type1: 'usecaseE2E' })
    ("TC_E2E_UC6_017: Verify total numbers of Completed messages from message volumes by status, message volumes by type and message listing page",async t => {
            await dashBoardPage.verifyCompletedTabCounts();
     });

    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard', type1: 'usecaseE2E' })
    ("TC_E2E_UC6_018: Verify total numbers of Manually Completed messages from message volumes by status, message volumes by type and message listing page",async t => {
            await dashBoardPage.verifyManuallyCompletedTabCounts();
     });

    test
    .meta({ e2e: 'regression', type13: 'trafficmanagerpage', type14: 'dashboard', type1: 'usecaseE2E' })
    ("TC_E2E_UC6_019: Verify total numbers of In Progress messages from message volumes by status, message volumes by type and message listing page",async t => {
            await dashBoardPage.verifyInProgressTabCounts();
     });    
