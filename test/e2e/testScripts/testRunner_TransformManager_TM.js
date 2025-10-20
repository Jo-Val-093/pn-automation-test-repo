import { test, Selector } from "testcafe";
import { baseUrl } from "../helpers/configuration";
import LoginPage from "../pages/logInPage";
import dashBoardPage from "../pages/dashBoardPage";
import transformManagerPage from "../pages/transformManagerPage"
import networkSetupPage from "../pages/networkSetupPage";
const ENV_NAME = process.env.ENV_NAME;

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var member = repo.testData.member
var memberforBusinessUser = repo.testData.memberforBusinessUser;
var noTransformMember = repo.testData.noTransformMember

fixture`Dashboard Page`
  .page(baseUrl)
  test
  .meta({ e2e: 'regression', type4: 'access', type8: 'transformpage'})
  
  ("TC_NS_TM_001 validating proagrica super admin user is able to access Network setup from side navigation bar (AGS-2768)",
      async (t) => {
        await LoginPage.logInSuccessful();
        await dashBoardPage.selectMember(member);      
        await t
         .expect(Selector(dashBoardPage.networkSetupLink).visible).eql(true)
      }
);
  
test
.meta({ e2e: 'regression', type4: 'access', type8: 'transformpage'})

("TC_NS_TM_002 validating Business user with code matcher role is not able to access Network setup from side navigation bar (AGS-2768)",
    async (t) => {
      await LoginPage.logInSuccessfulAsBusinessUser();
      await dashBoardPage.selectMember(member);      
      await t
       .expect(Selector(dashBoardPage.networkSetupLink).hasClass('pointer-events-none')).eql(true);
    }
);
test
.meta({ e2e: 'regression', type4: 'access', type8: 'transformpage'})

("TC_NS_TM_003 validating when Business Admin User is trying to access'Transforms 'page directly into the browser(AGS-2768)",
    async (t) => {
      await LoginPage.logInSuccessfulAsBusinessUser();
      await dashBoardPage.selectMember(memberforBusinessUser);      
      await t.expect(Selector(dashBoardPage.networkSetupLink).hasClass('pointer-events-none')).eql(true);
        
        switch (ENV_NAME) {
          case 'dev':
          await t.navigateTo('https://proagrica-network-dev-eks-2.aga.eu-west-1.proagrica.telus.ag/network-setup/transforms')
          await t.expect(dashBoardPage.invalidAccessMessage.visible).eql(true)
              break;

          case 'test':
            await t.navigateTo('https://proagrica-network-test-eks-2.aga.eu-west-1.proagrica.telus.ag/network-setup/transforms')
            await t.expect(dashBoardPage.invalidAccessMessage.visible).eql(true)
              break;
          case 'pre':

           await t.navigateTo('https://pre.proagrica.net/network-setup/transforms')
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
  test
  .meta({e2e: 'regression', test: 'smoke', type8: 'transformpage'})
  
  ("TC_NS_TM_004 Validating display of Network setup Landing Page (AGS-2775)",
    async (t) => {
      await LoginPage.logInSuccessful();
      await dashBoardPage.selectMember(member);
      await dashBoardPage.navigateToNetworkSetupPage();
      await networkSetupPage.displayValidationNetworkSetup();
        
      }
);

fixture`Transform Listing Page`
.page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await transformManagerPage.navigateToTransformManagerPage();
  })
test
.meta({e2e: 'regression', test: 'smoke', type8: 'transformpage'})

("TC_NS_TM_005 Validating display of Transform listing section on'Transforms 'page",
  async (t) => {   
    await transformManagerPage.validatingDisplayOfTransformListingPage();
    }
);

fixture`Transform Listing Page, when No Transfroms available`
.page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(noTransformMember);
    await transformManagerPage.navigateToTransformManagerPage();
  })
test
.meta({e2e: 'regression', type8: 'transformpage'})

("TC_NS_TM_006 Validating 'No transforms available.' message visible when no transform available",
  async (t) => {
    await transformManagerPage.validatingTextMessageWhenNoTransformAvailable();
  }
);

fixture`Add new transform`
.page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await transformManagerPage.navigateToTransformManagerPage();
  })
test
  .meta({e2e: 'regression', type8: 'transformpage'})
  
  ("TC_NS_TM_007 Validating display of add new transform modal in 'Transforms 'page",
    async (t) => {   
      await transformManagerPage.validatingDisplayOfAddNewTransformModal();
      }
  ); 
  
test
.meta({e2e: 'regression', type8: 'transformpage'})(

  ("TC_NS_TM_008 Validate Name and Description are mandatory when adding transform",
    "TC_NS_TM_009: Validate user is not able to add Transforms without steps by clicking on 'Add Transfrom' button",
    "TC_NS_TM_008 and TC_NS_TM_009 Validation of mandatory fields and at least one step require"),
  async (t) => {   
    await transformManagerPage.addingTransformWithoutSteps();
    }
);

test
.meta({e2e: 'regression', type8: 'transformpage'})(

  ("TC_NS_TM_010 Validate user is not able to add Transforms with 'Saxon XSL Transform' step without 'Properties Url'",
   "TC_NS_TM_011 Validate user is not able to add Transforms with 'Xpath metadata' step without 'Properties Metadata key' and 'XPath",
   "TC_NS_TM_012 Validate user is not able to add Transforms with 'Saxon XSL Transform' step with invalid format of  'Properties Url'",
   "TC_NS_TM_013 Validate user is not able to add Transforms with 'Xpath metadata' step with invalid format of  'Properties Xpath'",
   "TC_NS_TM_010 to 013 validation of mandatory transform steps and format of url and xPath fields"),
   async (t) => {   
     await transformManagerPage.addTransformStepPropertiesValidation();
    }
);

test
.meta({e2e: 'regression', type8: 'transformpage'})

  ("TC_NS_TM_014 Validate user is able to add Transforms with 'Saxon XSL Transform' step by clicking on 'Add Transfrom' button",
   async (t) => {   
     await transformManagerPage.createTransform('saxonXSLT');
    }
);

test
.meta({e2e: 'regression', type8: 'transformpage'})

  ("TC_NS_TM_015 Validate user is able to add Transforms with 'XPath metadata' step by clicking on 'Add Transfrom' button",
   async (t) => {   
     await transformManagerPage.createTransform('xpathMetadata');
    }
);

test
.meta({e2e: 'regression', type8: 'transformpage'})

  ("TC_NS_TM_016 Validate user is able to add Transforms with 'XPath metadata' and 'Saxon XSL Transform' step by clicking on 'Add Transfrom' button",
   async (t) => {   
     await transformManagerPage.createTransform('saxonXSLT_and_xpathMetadata')
    }
);

test
.meta({e2e: 'regression', type8: 'transformpage'})

  ("TC_NS_TM_017 Validate user is able to add more steps on existing Transform",
   async (t) => {   
     await transformManagerPage.createTransform('saxonXSLT');
     await transformManagerPage.addMoreStepOnExistingTransform('saxonXSLT_InvalidURL');
    }
);

fixture`View Transform`
.page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await transformManagerPage.navigateToTransformManagerPage();
  })
test
  .meta({e2e: 'regression', type8: 'transformpage'})
  
  ("TC_NS_TM_018 Validate user is able view a Transform",
    async (t) => {   
      await transformManagerPage.viewTransform();
      await transformManagerPage.validatingDisplayOfViewTransformModal();
      }
  ); 
  
 fixture`Edit Transform`
.page(baseUrl)
  .beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
    await transformManagerPage.navigateToTransformManagerPage();
  })
test
  .meta({e2e: 'regression', type8: 'transformpage'})
  
  ("TC_NS_TM_019 Validate user is able to Edit a transform by Clicking on Edit Transform button",
    async (t) => {   
      await transformManagerPage.createTransform('saxonXSLT')
      await transformManagerPage.editTransformNameAndDesc();
      }
);  
test
  .meta({e2e: 'regression', type8: 'transformpage'})
  
  ("TC_NS_TM_021 Validate user is not able to edit a Transforms without steps in the transform by deleting a transform step (Only transform step is available)",
    async (t) => {   
      await transformManagerPage.createTransform('saxonXSLT');
      await transformManagerPage.deletingAllStepsFromTransfrom();
      }
  ); 

