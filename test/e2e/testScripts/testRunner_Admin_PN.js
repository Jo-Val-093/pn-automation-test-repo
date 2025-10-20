import {test , Selector } from "testcafe";
import { baseUrl, baseUrlAdmin } from "../helpers/configuration";
import dashBoardPage from "../pages/dashBoardPage";
import trafficManagerPage from "../pages/trafficManagerPage";
import pageFooters from '../pages/pageFooter'
import LoginPage from "../pages/logInPage";
import accountSettingsPage from "../pages/sidePaneView";
import sectorsPage from "../pages/sectorsPage";
import regionsPage from "../pages/regionsPage";
import rolesPage from "../pages/rolesPage";
import countriesPage from "../pages/countriesPage";

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var member = repo.testData.member

fixture ('Proagrica Network Admin')
test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_LI_001 : login successful',async t=>{
    await 
    LoginPage.logInSuccessfulA()
    dashboard.selectMember(member);
})

test
.page(baseUrlAdmin)
.meta({e2e: 'legacy' })

('TC_LI_002 : login Unsuccessful - incorrect email',async t=>{
    await 
    LoginPage.inCorrectCredentials("inCorrectUserId");
})
test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_LI_003 : login Unsuccessful - incorrect password',async t=>{
    await 
    LoginPage.inCorrectCredentials("inCorrectPassword");
})

test
.page(baseUrlAdmin)
.meta({e2e: 'legacy'})

('TC_LI_004 : Forgot password',async t=>{
    await 
    LoginPage.forgotPassword();
})

test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_LI_005 : sign up',async t=>{
    await 
    LoginPage.signUp();
});

test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_DB_001 : Navigate to Sector',async t=>{
    await 
    LoginPage.logInSuccessfulA()
    await
    sectorsPage.navigateToSectors();

});

test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_DB_004:Add Sectors' , async t=>{
    await
    LoginPage.logInSuccessfulA()
    await
    sectorsPage.addSector()
})

test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_DB_004:Save Sectors' , async t=>{
    await
    LoginPage.logInSuccessfulA()
    await
    sectorsPage.saveSector()
})

test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_DB_004:Add Sectors' , async t=>{
    await
    LoginPage.logInSuccessfulA()
    await
    sectorsPage.cancelSector()
})

test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_DB_001 : Navigate to Region',async t=>{
    await 
    LoginPage.logInSuccessfulA()
    await
    regionsPage.navigateToRegions();

});

test
.page(baseUrlAdmin)
.meta({e2e: 'legacy'})

('TC_DB_004:Add Region' , async t=>{
    await
    LoginPage.logInSuccessfulA()
    await
    regionsPage.addRegion()
})

test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_DB_004:Save Region' , async t=>{
    await
    LoginPage.logInSuccessfulA()
    await
    regionsPage.saveRegion()
})

test
.page(baseUrlAdmin)
.meta({e2e: 'legacy'})

('TC_DB_004:Add Sectors' , async t=>{
    await
    LoginPage.logInSuccessfulA()
    await
    regionsPage.cancelRegion()
})

test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_DB_001 : Navigate to Roles',async t=>{
    await 
    LoginPage.logInSuccessfulA()
    await
    rolesPage.navigateToRoles();

});


test
.page(baseUrlAdmin)
.meta({e2e: 'legacy'})

('TC_DB_004:Add Roles' , async t=>{
    await
    LoginPage.logInSuccessfulA()
    await
    rolesPage.addRole()
})

test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_DB_004:Save Roles' , async t=>{
    await
    LoginPage.logInSuccessfulA()
    await
    rolesPage.saveRoles()
})

test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_DB_004:Cancel Roles' , async t=>{
    await
    LoginPage.logInSuccessfulA()
    await
    rolesPage.cancelRoles()
})

test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_DB_001 : Navigate to Countries',async t=>{
    await 
    LoginPage.logInSuccessfulA()
    await
    countriesPage.navigateToCountries();
});

test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_DB_004:Add Countries' , async t=>{
    await
    LoginPage.logInSuccessfulA()
    await
    countriesPage.addCountries()
})

test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_DB_004:Save Countries' , async t=>{
    await
    LoginPage.logInSuccessfulA()
    await
    countriesPage.saveCountries()
})

test
.page(baseUrlAdmin)
.meta({ e2e: 'legacy'})

('TC_DB_004:Cancel Countries' , async t=>{
    await
    LoginPage.logInSuccessfulA()
    await
    countriesPage.cancelCountries()
})