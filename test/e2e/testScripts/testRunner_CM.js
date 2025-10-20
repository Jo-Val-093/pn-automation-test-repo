import { test, Selector } from "testcafe";
import { baseUrl } from "../helpers/configuration";
import LoginPage from "../pages/logInPage";
import codeMatcherPage from "../pages/codeMatcherPage";
import catalogueManagementPage from "../pages/catalogueManagementPage";
import data from "../data/data.json"
import dashBoardPage from "../pages/dashBoardPage";
import miscellaneouMatchPage from "../pages/miscellaneouMatchPage";
import miscellaneousInformationPage from "../pages/miscellaneousInformationPage";
import miscellaneousPage from "../pages/miscellaneousPage";

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var memberforBusinessUser = repo.testData.memberforBusinessUser;
var member = repo.testData.member


// Dashboard Page

fixture`Dashboard Page`
  .page(baseUrl)
  
  // This testcase is for business user profile as CM role - Member: Test123

test
  .meta({ e2e: 'regression',  type4: 'access', type10: 'catalougepage'})
  
  ("TC_CM_001 Validating business user profile as CM role",
    async (t) => {
         await LoginPage.logInSuccessfulAsBusinessUser();
         await dashBoardPage.selectMember(member);
                    
        await t
         .expect(Selector(dashBoardPage.viewLinkCodeMatcher).visible).eql(true)
         .expect(Selector(dashBoardPage.monitoringSideMenu).hasClass('pointer-events-none')).eql(true)
      }
);
  
//This testcase is for business user profile as User(Member) role - Member: PN-Test

test
.meta({ e2e: 'regression',  type4: 'access', type10: 'catalougepage'})
  ("TC_CM_001A: Validating business user profile as User(Member) role",
     async (t) => {       
        await LoginPage.logInSuccessfulAsBusinessUser();
        await dashBoardPage.selectMember(memberforBusinessUser);
        await t
        .expect(Selector(dashBoardPage.enrichmentSideMenu).hasClass('pointer-events-none')).eql(true)
        .expect(Selector(dashBoardPage.viewLinkTrafficManager).visible).eql(true)
      }
  );
  
  //This testcase is for Progrica Super User Profile - Member: Test123

test
.meta({ e2e: 'regression',  type4: 'access', type10: 'catalougepage'})
  ("TC_CM_001B: Validating Progrica Super User Profile",
    async (t) => {   
          await LoginPage.logInSuccessful();
          await dashBoardPage.selectMember(member); 
          await t
         .expect(Selector(dashBoardPage.viewLinkCodeMatcher).visible).eql(true)
         .expect(Selector(dashBoardPage.viewLinkTrafficManager).visible).eql(true)
         .click(Selector(dashBoardPage.viewLinkCodeMatcher))
         .expect(Selector(codeMatcherPage.viewLinkCodeMatcherRoute).visible).eql(true)     
      }
  );
  
 fixture`Code Matcher Page`
  .page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);

  })

test
  .meta({ e2e: 'regression', type10: 'catalougepage'})
  ("TC_CM_002 : Validating user can navigate to 'Code Matcher' card",
  async (t) => {
    await codeMatcherPage.navigateToEnrichmentPage(); //002
    
  })

  fixture`Catalogue management Page`
  .page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await codeMatcherPage.navigateToEnrichmentPage();

  })

 test
   .meta({ e2e: 'regression', type10: 'catalougepage', type11: 'template'})
    ( ("TC_CM_003 : Validating user can navigate to 'Catalogue management'' card",
      "TC_CM_004 : Validate the display of columns available on 'Catalogue management' page",
      "TC_CM_005 : Validate the display of Code types available on 'Catalogue management' page",
      "TC_CM_006 : Validate the Actions column in the 'Code Management' page with no exception",
      "TC_CM_007 : Validate the Actions column in the 'Code Management' page with exception",
      "TC_CM_008 : Validate user is able to download template for Code Type 'Miscellaneous'",
      "TC_CM_009 : Validate user is able to upload template for Code Type 'Miscellaneous'",
      "TC_CM_010 : Validate user is not able to upload template for code Type 'Miscellaneous' without key in the mandatory details",
      "TC_CM_011 : Validate user is not able to upload template for code Type 'Miscellaneous' with incorrect Owning Member ID",
      "TC_CM_012 : Validate user is able to cancel an upload template",
      "TC_CM_013 : Validate user is able to re-upload a cancelled file",
      "TC_CM_014 : Validate user is able to delete an upload template",
      "TC_CM_021 : Validate user is not able to upload a file which is in 'Word' format",
      "TC_CM_022 : Validate user is not able to upload a file which is in 'Excel' format",
      "TC_CM_023:  Validate user is not able to upload a template in csv file size more than 1MB",
      "TC_CM_025 : Validate user is not able to upload a csv template with duplicated records in the input csv file",
      "TC_CM_026 : Validate user is able to 'Export' the error from 'File Validation Errors' popup",
      "TC_CM_033 : Validate user is able to see correct number of errors on File validation Errors pop up box",
      "Code Matcher TestCases: 003 to 014, 021, 022,023 025, 026 and 033"),
      
    async (t) => {
    await catalogueManagementPage.navigateToCatalogueManagementPage();//003
    await catalogueManagementPage.verifyingUserIsOnCatalogueManagementPage();//004
    await catalogueManagementPage.verifyingUserIsOnCatalogueManagementPagebyCatalougeTypes(); //005
    await catalogueManagementPage.verifyingActionColumnOnCatalogueManagementPageWithNoException(); //006
    await catalogueManagementPage.verifyingActionColumnOnCatalogueManagementPageWithException(); //007
    await catalogueManagementPage.verifyingUserIsAbleToDownloadTheTemplate(); //008
    await catalogueManagementPage.verifyingUserIsAbleToUploadTheCorrectTemplate(); //009
    await catalogueManagementPage.verifyingUserIsNotAbleToUploadTheTemplateWithoutKeyInMandatoryDetails(); //010
    await catalogueManagementPage.verifyingUserIsNotAbleToUploadTemplateWithIncorrectOwningMemberID(); //011
    await catalogueManagementPage.verifyingUserIsAbleToCancelAnUploadTemplate(); //012
    await catalogueManagementPage.verifyingUserIsAbleToReUploadCancelledTemplate(); //013
    await catalogueManagementPage.verifyingUserIsAbleToDeleteAnUploadTemplate(); //014
    await catalogueManagementPage.verifyingErrorMessageWhenUserTryingToUploadTemplateInWordFormat(); //021
    await catalogueManagementPage.verifyingErrorMessageWhenUserTryingToUploadTemplateInExcelFormat(); //022
    await catalogueManagementPage.verifyingErrorMessageWhenUserTryingToUploadTemplateLargerThan1MB(); //023
    await catalogueManagementPage.verifyingUserIsNotAbleToUploadTemplateWithDuplicateRecordsAndAbleToExportTheError(); //025 and 026
    await catalogueManagementPage.verifyingUserIsAbleToSeeExactNumberOfErrorsInTemplate(); //033
         
  }
);

fixture`Miscellanous Page`

.page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await codeMatcherPage.navigateToEnrichmentPage();
    await catalogueManagementPage.navigateToCatalogueManagementPage();

  })

 test
   .meta({ e2e: 'regression', type10: 'catalougepage',type12: 'miscCMPage'})(
    ( "TC_CM_015 : Validate user is able to view the uploaded products",
      "TC_CM_016 : Validate user is able to search for a product by ID1 in 'Miscellaneous page",
      "TC_CM_017 : Validate user is able to search for a product by ID2 in 'Miscellaneous page",
      "TC_CM_018 : Validate user is able to search for a product by ID3 in 'Miscellaneous page",
      "TC_CM_019 : Validate user is able to search for a product by Description in 'Miscellaneous page",
      "TC_CM_020 : Validate user is able to search for a product by Alphabet + Special Character in 'Miscellaneous page",
      "TC_CM_027: Validate when user move to Miscellaneous information page, filters are remains set the same for first three columns",
      "TC_CM_028: Validate user is able to Reset the filters on Miscellaneous page for first three columns when click on reset button",
      "TC_CM_029: Validate the warning message when user trying to unmatch the codes between two members",
           
      "Code Matcher TestCases: TC_CM_015 to 020, 027, 028 and 029"),
    async (t) => {
    await miscellaneousPage.verifyingUserIsAbleToViewUploadedProductsOnMiscellanousPage(); //015
    await miscellaneousPage.verifyingUserCanSearchAproductByID1OnProductsPage(); //016
    await miscellaneousPage.verifyingUserCanSearchAproductByID2OnProductsPage(); //017
    await miscellaneousPage.verifyingUserCanSearchAproductByID3OnProductsPage(); //018
    await miscellaneousPage.verifyingUserCanSearchAproductByDescriptionOnProductsPage(); //019
    await miscellaneousPage.verifyingUserCanSearchAproductByAlphabetAndSpecialCharacternOnProductsPage(); //020
    await miscellaneousPage.verifyingFiltersRemainsSetResetButtonAndUnmatchWarningText(); //027, 028 and 029    
  }
);

fixture`MiscellanousMatch Page`

.page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await codeMatcherPage.navigateToEnrichmentPage();
    await catalogueManagementPage.navigateToCatalogueManagementPage();

  })

test
.meta({ e2e: 'regression', type10: 'catalougepage', type3: 'smoke'})(
    ("TC_CM_030: Validate the display a pop-up message when user confirm the Match",
     "TC_CM_031: Validate the display a pop-up message when user confirm the Unmatch",
     "Code Matcher TestCase 030 and 031 for matching and unmatching end to end functionality"),
    async (t) => {
     
      await miscellaneouMatchPage.verifyingDisplayMessageForMatchAndUnmatch();

    }
)

fixture`Miscellanous Information Page`

.page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await codeMatcherPage.navigateToEnrichmentPage();
    await catalogueManagementPage.navigateToCatalogueManagementPage();

  })

test
  .meta({ e2e: 'regression', type10: 'catalougepage', type12: 'miscCMPage'})
  ("TC_CM_032: Validate user is able to edit the ID1,2,3,4,5 and Description for any existing code type",

    async (t) => {
      
      await miscellaneousInformationPage.verifyingUserIsAbleToEditExistiingCodeType();
      
    }
)

fixture`Add new code Button`

.page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await codeMatcherPage.navigateToEnrichmentPage();
    await catalogueManagementPage.navigateToCatalogueManagementPage();

  })

     
  test
  .meta({ e2e: 'regression', type10: 'catalougepage', type12: 'miscCMPage'})(
  ( "TC_ANC_001 : Validate user can not add duplicate code type and duplicate Independent ID 1 using ' Add new code' button",
    "TC_ANC_002 : Validate user can add duplicate code type with unique IndependentID1 using ' Add new code' button",
    "TC_ANC_003 : Validate user can add unique code type with unique IndependentID1 using ' Add new code' button",
    "TC_ANC_004 : Validate user can add unique code type with duplicate IndependentID1 using ' Add new code' button",
    "TC_ANC_005 : Validate user can not add any new code type without key in code type details using ' Add new code' button",
    "TC_ANC_006 : Validate user can not add any new code type without key in independent ID 1 details using ' Add new code' button",
    "TC_ANC_007 : Validate user can not add any new code type without key in description details using ' Add new code' button",
    "TC_ANC_008 : Validate user can add unique code type and ID1 with special character using ' Add new code' button",

    "Add new code Button TestCases: TC_ANC_001 to 008"),
    
  async (t) => { 
    await miscellaneousPage.verifyingUserCanNotAddDuplicateCodeTypeWithDuplicateIndependentID1OnMiscellanousPage();
    await miscellaneousPage.verifyingUserCanAddDuplicateCodeTypeWithUniqueIndependentID1OnMiscellanousPage();
    await miscellaneousPage.verifyingUserCanAddUniqueCodeTypeWithUniqueIndependentID1OnMiscellanousPage();
    await miscellaneousPage.verifyingUserCanAddUniqueCodeTypeWithDuplicateIndependentID1OnMiscellanousPage();
    await miscellaneousPage.verifyingUserCanNotAddAnyNewCodeTypeWithoutMandatoryCodeTypeFieldOnMiscellanousPage()
    await miscellaneousPage.verifyingUserCanNotAddAnyNewCodeTypeWithoutMandatoryIndependentID1FieldOnMiscellanousPage();
    await miscellaneousPage.verifyingUserCanNotAddAnyNewCodeTypeWithoutMandatoryDescriptionFieldOnMiscellanousPage();
    await miscellaneousPage.verifyingUserCanAddUniqueCodeTypeAndID1UsingSpecialCharacter();

    }
);