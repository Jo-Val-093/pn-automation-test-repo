// Here we are going to develop the UI script for new Admin page
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

fixture`Dashboard Page`
    .page(baseUrl)
test
    .meta({ e2e: 'regression', type4: 'access', type2: 'adminpage' })

    ("TC_AP_001 Validate user with access to a proagrica super admin is able to access Admin from side navigation bar (AGS-2791)",
        async (t) => {
            await LoginPage.logInSuccessful();
            await dashBoardPage.selectMember(member);
            await t
                .expect(Selector(dashBoardPage.adminSideMenu).hasClass('pointer-events-none')).eql(false)
        }
    )
test
    .meta({ e2e: 'regression', type4: 'access', type2: 'adminpage' })

    ("TC_AP_002 Validate user with access to Business user not be able to access Admin from side navigation bar (AGS-2791)",
        async (t) => {
            await LoginPage.logInSuccessfulAsBusinessUser();
            await dashBoardPage.selectMember(member);
            await t
                .expect(Selector(dashBoardPage.adminSideMenu).hasClass('pointer-events-none')).eql(true)
        }
    )
test
    .meta({ e2e: 'regression', type4: 'access', type2: 'adminpage' })

    ("TC_AP_003 Validating  when user trying to access  'Admin ' page URL directly into the browser without having any permissions to see a page (AGS-2791)",
        async (t) => {
            await LoginPage.logInSuccessfulAsBusinessUser();
            await dashBoardPage.selectMember(memberforBusinessUser);
            await t
                .expect(Selector(dashBoardPage.adminSideMenu).hasClass('pointer-events-none')).eql(true)

            switch (ENV_NAME) {

                case 'dev':
                    await t.navigateTo('https://proagrica-network-dev-eks-2.aga.eu-west-1.proagrica.telus.ag/admin')
                    await t.wait(10000)
                    await t.expect(dashBoardPage.invalidAccessMessage.visible).eql(true)
                    break;

                case 'test':
                    await t.navigateTo('https://proagrica-network-test-eks-2.aga.eu-west-1.proagrica.telus.ag/admin')
                    await t.wait(10000)
                    await t.expect(dashBoardPage.invalidAccessMessage.visible).eql(true)
                    break;

                case 'pre':
                    await t.navigateTo('https://proagrica-network-pre-eks-04-us.agv.us-east-1.proagrica.telus.ag/admin')
                    await t.wait(10000)
                    await t.expect(dashBoardPage.invalidAccessMessage.visible).eql(true)
                    break;

                default:
                    console.error("Unrecognised NODE_ENV: " + process.env.ENV_NAME);
                    process.exit(1);
            }

        }
    );

fixture`Admin Page`
    .page(baseUrl)
    .beforeEach(async t => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
        await dashBoardPage.navigateToAdminPage();

    })
test
    .meta({ e2e: 'regression'})

    ("TC_AP_004 Validate the display of Admin page",
        async (t) => {
            await adminPage.validateDisplayOfAdminPage();
        }
    )

fixture`Companies Page`
    .page(baseUrl)
    .beforeEach(async t => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
        await dashBoardPage.navigateToAdminPage();
        await adminPage.navigateToCompaniesPage();

    })
test
    .meta({ e2e: 'regression'})

    ("TC_AP_005 Validate the companies page URL",
        async (t) => {
            await companiesPage.verifyingCompaniesPageURL();
        }
    )

test
    .meta({e2e: 'regression', type3: 'smoke', type2: 'adminpage'})

    ("TC_AP_006 Validate the display of company page",
        async (t) => {
            await companiesPage.verifyingDisplayOfCompaniesPage();
        }
    )

test
    .meta({ e2e: 'regression',type5: 'pagination',type2: 'adminpage'})

    ("TC_AP_007 Validate the pagination functionality on company page",
        async (t) => {
            await companiesPage.verifyingPaginationFunctionalityOnCompaniesPage();
        }
    )

test
.meta({ e2e: 'regression',type5: 'pagination',type2: 'adminpage'})

    ("TC_AP_008 Validate user can access all pages on company page",
      async (t) => {
        await companiesPage.validateUserIsAbleToAccessAllPages1();
      }
)

test
 .meta({ e2e: 'regression', type2: 'adminpage' , type6: 'sorting'})

    ("TC_AP_009 Verifying Sorting functionality by Company Name on company page",
      async (t) => {
        await companiesPage.validateSortingByCompanyName();
      }
)

test
    .meta({ e2e: 'regression', type2: 'adminpage' , type6: 'sorting'})

    ("TC_AP_010 Verifying Sorting functionality by proagrica id on company page",
        async (t) => {
            await companiesPage.validateSortingByProagricaId();
        }
    )

test
    .meta({ e2e: 'regression', type2: 'adminpage' , type6: 'sorting'})

    (("TC_AP_010 Verifying Search functionality by proagrica id on company page",
      "TC_AP_012 Validating user is able to search by Company name",
      "TC_AP_013 Validating user is able to search by Trading countries"),
        async (t) => {
            await companiesPage.validateSearchByProagricaId("PN0000001081");
            await companiesPage.validateSearchByCompany("Test123");
            await companiesPage.validateSearchByTradingCountries("United Kingdom");
        }
    )
test
    .meta({ e2e: 'regression', type2: 'adminpage' , type6: 'sorting'})

    (("TC_AP_014 Validate when user select show all option from Trading countries, data displayed for all countries"),
        async (t) => {
            await companiesPage.getDistinctTradingCountries();
        }
    )

    test
    .meta({ e2e: 'regression', type2: 'adminpage' , type6: 'sorting'})

    (("TC_AP_015 Add Company: Validating the display of Add new company modal",
      "TC_AP_016 Add Company: Validating add button is only active after key in all mandatory fields value",
      "TC_AP_017 Add Company: Add Company: Validating an error messages for proper format of Proagrica ID",
      "TC_AP_018 Add Company: Validating an error messages for duplicate PN id and duplicate Company name",
      "TC_AP_019 Add Company: Validating an error message when user press cancel button after making some changes",
      "TC_AP_020 Add Company: Validating user is able to add company successfully"),
        async (t) => {
            await companiesPage.validateAddNewCompanyModal();
            await companiesPage.validateConfirmToCancel();
            await companiesPage.checkForProagricaIdFormat();
            await companiesPage.checkForDuplicateCompanyAndProagricaId();
            // await companiesPage.createRandomCompany(); //Disabled to avoid frequent additions of new companies
        }
    )
        
    test
    .meta({ e2e: 'regression', type2: 'adminpage' , type6: 'sorting'})

    (("TC_AP_021 Edit Company: Validating user can see Edit pencil icon on Company Details page",
      "TC_AP_022 Edit Company: Validating user can not edit Proagrica ID on Company Details page",
      "TC_AP_023 Edit Company: Validating user is back to company details page, when click on Cancel icon before changing any data",
      "TC_AP_024 Edit Company: Validating error messages if user not filled mandatory detials ( Company Name *, Trading countries *) and click Tick icon",
      "TC_AP_025 Edit Company: Validating an error message when user edit the company name as already existing company name",
      "TC_AP_026 Edit Company: Validating if Proagrica ID field is unable to edit",
      "TC_AP_027 Edit Company: Validating the warning pop up message when user click on X icon after making some changes in edit company",
      "TC_AP_028 Edit Company: Validating user is able to edit the company successfully"),
        async (t) => {
           await companiesPage.validateSuccessfulCompanyEdit();
           await companiesPage.validateProagricaIdFieldIsReadOnly();
           await companiesPage.validateRequiredFieldsInEditModal();
           await companiesPage.validateDuplicateFieldsInEditModal();
           await companiesPage.validateUnsavedChangesWarningOnClose(); 
         }
    )

fixture`Connectors Page`
    .page(baseUrl)
    .beforeEach(async t => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);
        await dashBoardPage.navigateToAdminPage();


    })
test
    .meta({ e2e: 'regression',type2: 'adminpage'})

    ("TC_AP_029 Validate the Connectors page URL",
        async (t) => {

            await adminPage.navigateToConnectorsPage();
            await connectorsPage.verifyingConnectorsPageURL();
        }
    )

test
    .meta({ e2e: 'regression',type2: 'adminpage'})

    ((      "TC_AP_030	Validate the display of connectors page",
            "TC_AP_031  Validating pagination functionality on Connectors page",
            "TC_AP_032	Validate user can access all the pages on Connectors page"),
        async (t) => {

            await adminPage.navigateToConnectorsPage();
            await connectorsPage.verifyingDisplayOfConnectorsPage();
            await connectorsPage.verifyingPaginationFunctionalityOnConnectorsPage();
            await connectorsPage.validateUserIsAbleToAccessAllPages();

        }
    )

    test
    .meta({ e2e: 'regression',type2: 'adminpage'})

    ((     
            "TC_AP_033	Verifying Sorting functionality by Name on Connectors page",
            "TC_AP_034	Validating user is able to search by Connectors name"),
        async (t) => {

            await adminPage.navigateToConnectorsPage();
            await connectorsPage.validateSortingByConnectorsName();
            await connectorsPage.searchConnector('Test123'); 

        }
    )

test
    .meta({ e2e: 'regression',type2: 'adminpage'})

    ((      "TC_AP_035	Add Connectors: Validating the display of Add new connectors page",
            "TC_AP_036	Add Connectors: Validating save button is only active after entering name field",
            "TC_AP_037	Add Connectors: Validating user is able to add company successfully",
            "TC_AP_038	Add Connectors: Validating an error messages for duplicate Connector name",
            "TC_AP_039	Add Connectors: Validating an error message when user press cancel button after making some changes",
            "TC_AP_040	Add Connectors: Verify in add connectors page the Region dropdown has two regions (EU and US)"
),
        async (t) => {

            await adminPage.navigateToConnectorsPage();
            await connectorsPage.validateIsSaveButtonEnabled();
            await connectorsPage.addConnectors('TestConnector123');
            await connectorsPage.validateDuplicateConnectorname();
            await connectorsPage.validateCancelMessage();
        }
    )

    test
    .meta({ e2e: 'regression',type2: 'adminpage'})

    (("TC_AP_041 Edit Connectors: Validating user can see Edit button  on Add Connectors page and edit an unused connector",
      "TC_AP_042 Edit Connectors : Validating an error message when user edit the Connector name which is already in use",
      "TC_AP_043 Edit Connectors : Validating user is back to Connectors details page, when click on Cancel icon before changing any data",
      "TC_AP_044 Edit Connectors : Validating save button is enabled once Connector name is edited",
      "TC_AP_045 Edit Company: Validating the warning pop up message when user click on Cancel icon after making some changes in edit connectors"),
        async (t) => {

            await adminPage.navigateToConnectorsPage();
            await connectorsPage.validateEditButtonVisibilityOnAddConnectorsPage();
            await connectorsPage.validateErrorMessageForDuplicateConnectorNameEdit();
            await connectorsPage.validateNavigationToDetailsPageOnCancelWithoutChanges();
            await connectorsPage.validateSaveButtonEnabledAfterConnectorNameEdit();
            await connectorsPage.validateWarningPopupOnCancelAfterEditingConnector();
        }
    )

    test
    .meta({ e2e: 'regression',type2: 'adminpage'})

    ((
        "TC_AP_046 Delete Connectors: Validating if unused connectors by a journey can be deleted",
        "TC_AP_047 Delete Connectors: Validating if connectors used  by a journey cannot be deleted"
        ),
        async (t) => {
             await  adminPage.navigateToConnectorsPage();
             await connectorsPage.validateUnusedConnectorCanBeDeleted('TestConnector123');
             await connectorsPage.validateUsedConnectorCannotBeDeleted('Demo_Connector_1');
        }
    )
    test
    .meta({ e2e: 'regression',type2: 'adminpage'})

    ((
        "TC_AP_048 Add endpoint : Verifying  modal is displayed after clicking ",
        "TC_AP_049 Add endpoint : Verifying Add button is enabled only after key in any of the mandatory fields",
        "TC_AP_050 Add endpoint : Verifying if alert message is displayed if Cancel button is clicked after entering mandatory fields (Type and Value)",
        "TC_AP_051 Add endpoint : Validating user is able to add endpoint successfully",
        "TC_AP_052 Add endpoint : Validating an error messages An endpoint with the same type and value already exists. Please populate with a unique type/value pair for duplicate Name  and duplicate Value", 
        "TC_AP_053 Add endpoint : Verifying if multiple endpoints can be added under connector",
        "TC_AP_054 Add endpoint : Verifying if type dropdown in add endpoint modal has two options SOLACE_JMS_TOPIC and SOLACE_JMS_QUEUE",
        "TC_AP_055 Add endpoint : Verifying if alert message is displayed if Add button is clicked without entering mandatory fields (Type and Value)"
        ),                                  
        async (t) => {
            await adminPage.navigateToConnectorsPage();
            await connectorsPage.validateAddEndpointModalDisplayedOnClick();
            await connectorsPage.validateAddButtonEnabledAfterEnteringMandatoryFields();
            await connectorsPage.validateAlertOnCancelAfterEnteringMandatoryFields();
            await connectorsPage.validateSuccessfulEndpointAddition();
            // await connectorsPage.validateErrorOnDuplicateEndpointTypeAndValue();
            // await connectorsPage.validateMultipleEndpointsCanBeAddedToConnector();
            // await connectorsPage.validateTypeDropdownOptionsInAddEndpointModal();
            // await connectorsPage.validateAlertOnAddWithoutMandatoryFields();
        }
    )
    test
    .meta({ e2e: 'regression',type2: 'adminpage'})

    ((
        "TC_AP_057 Edit endpoint : Verifying if endpoint can be edited successfully (all mandatory fields)",
        "TC_AP_058 Edit endpoint : Validating the warning pop up message when user click on cancel  button after making some changes in edit endpoint"
        ),
        async (t) => {
            await adminPage.navigateToConnectorsPage();
            await connectorsPage.validateSuccessfullEditAndAddEndpoint();
            await connectorsPage.validateWarningMessageonCancelAfterEdit();
        }
    )
    test
    .meta({ e2e: 'regression',type2: 'adminpage'})

    ((
        "TTC_AP_059 Delete Endpoint: Validating if unused endpoint can be deleted",
        "TC_AP_060 Delete Endpoint: Validating if used endpoint cannot be deleted"
        ),
        async (t) => {
            await adminPage.navigateToConnectorsPage();
            await connectorsPage.validateUnusedEndpointDelete();
            await connectorsPage.validateUsedEndpointDelete();
        }
    )

