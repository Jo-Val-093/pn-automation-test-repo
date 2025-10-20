import { Selector, test,t } from 'testcafe';

import { baseUrl } from "../helpers/configuration";
import dashboard from "../pages/dashBoardPage";
import trafficManagerPage from "../pages/trafficManagerPage";
import LoginPage from "../pages/logInPage";
import * as TestCafeTestingLibrary from '@testing-library/testcafe'; 
import LoginPage_Cirrus from '../pages_cirrus/LoginPage_Cirrus';
import HomePage from '../pages_cirrus/HomePage';
import MessageTracking from '../pages_cirrus/MessageTracking';
import DocumentWorkbench from '../pages_cirrus/DocumentWorkBench';


const ENV_NAME = process.env.ENV_NAME ;

const fs = require('fs');
const data = require("../data/oat_env.json");
const uploadfilePath = 'uploads/payloadoat.xml';

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));

const uploadfilePathFailed = 'uploads/payload_failedoat.xml';
const completedMessage = [];
const failedMessage =[];
const inProgressMessage = [];
var member1 = repo.testData.cirrusAliasMember1;
var member2 = repo.testData.cirrusAliasMember2;
var member3 = repo.testData.cirrusAliasMember3;
var member4 = repo.testData.cirrusAliasMember4;


fixture `Verify_MessageTrackingExecutionCompletedOAT`
    .page (data.Url);
  test
  .meta({  type20: 'ccData'})
    (`Verify_MessageTrackingExecutionCompleted`, async t => {
    await LoginPage_Cirrus.userlogin (data.UserName,data.Password)
    await t

    .click(HomePage.linkTenantHeader) 
    .click(HomePage.linkChangeTenant) 
    .typeText(HomePage.txtTenantCode,data.switchtenantcode_c)   
    .click(HomePage.chkSearchAmongAll)
    .click(HomePage.btnSearch)
    .click(HomePage.btnSelect)     

    
    const j = 3
    for (let i = 1; i <= j; i++) {
        await t
        .click(DocumentWorkbench.lnkDocumentWorkbench)
        .click(DocumentWorkbench.lnkDocumentWorkbench)
        .click(DocumentWorkbench.lnkGateway)
        .click(DocumentWorkbench.lnkUploads)
        .expect(DocumentWorkbench.lnkRules.exists).ok()
        .expect(DocumentWorkbench.txtSearch.exists).ok()
        .click(DocumentWorkbench.lnkActions)
        .expect(DocumentWorkbench.lnkUploadDocuments.exists).ok()
        .click(DocumentWorkbench.lnkUploadDocuments)
        const uploadInput = DocumentWorkbench.uploadFile;
        await t
        .setFilesToUpload(uploadInput, [uploadfilePath]);
        await t.typeText(DocumentWorkbench.lstDestination, data.destination_c)
        await t.typeText(DocumentWorkbench.lstType, data.type_c)
        await t.wait(5000)
        await t.pressKey('down')
        await t.pressKey('up')
        await t.pressKey('enter')
        await t.click(DocumentWorkbench.btnSave)
       const text = await DocumentWorkbench.txtMsgId.innerText;
       completedMessage.push(text);
        
        await t.wait(1000)
        await t.pressKey('tab')
        await t.pressKey('enter')
        await t.wait(1000)
        await t.click(MessageTracking.linkMessageTracking)
        await t.click(MessageTracking.linkMessageTracking)
        await t.wait(1000)
        await t.click(MessageTracking.linkSearch)
        await t.wait(1000)
        await t.click(MessageTracking.btnClear)
        await t.wait(1000)
        await t.typeText(MessageTracking.txtMessageId, text)
        await t.click(MessageTracking.btnSearch)  
        await t.eval(() => location.reload(true))
        await t.wait(30000)
        await t.eval(() => location.reload(true))
        await t.wait(30000)
        await t.eval(() => location.reload(true))
        await t.wait(1000)
        .click(MessageTracking.btnView)    
        await t.wait(1000)        
        const valmessage = await MessageTracking.txtMsgStatus.value
        await t.expect(valmessage).eql('Completed')
    }
 await LoginPage_Cirrus.logout();
 });


 fixture `Verify_MessageTrackingExecutionFailedOAT`
    .page (data.Url)
test
    .meta({  type20: 'ccData'})
    (`Verify_MessageTrackingExecutionFailed`, async t => {
    await LoginPage_Cirrus.userlogin (data.UserName,data.Password)
    await t

    .click(HomePage.linkTenantHeader) 
    .click(HomePage.linkChangeTenant) 
    .typeText(HomePage.txtTenantCode,data.switchtenantcode_f)   
    .click(HomePage.chkSearchAmongAll)
    .click(HomePage.btnSearch)
    .click(HomePage.btnSelect)     

  
    const j = 5
    for (let i = 1; i <= j; i++) {
        await t
        .click(DocumentWorkbench.lnkDocumentWorkbench)
        .click(DocumentWorkbench.lnkDocumentWorkbench)
        .click(DocumentWorkbench.lnkGateway)
        .click(DocumentWorkbench.lnkUploads)
        .expect(DocumentWorkbench.lnkRules.exists).ok()
        .expect(DocumentWorkbench.txtSearch.exists).ok()
        .click(DocumentWorkbench.lnkActions)
        .expect(DocumentWorkbench.lnkUploadDocuments.exists).ok()
        .click(DocumentWorkbench.lnkUploadDocuments)
        const uploadInput = DocumentWorkbench.uploadFile;
        await t
        .setFilesToUpload(uploadInput, [uploadfilePath]);
        await t.typeText(DocumentWorkbench.lstDestination, data.destination_f)
        await t.typeText(DocumentWorkbench.lstType, data.type_f)      
        await t.wait(2000)
        await t.click(DocumentWorkbench.btnSave)

        const text = await DocumentWorkbench.txtMsgId.innerText;
        failedMessage.push(text);
        
        await t.wait(1000)
        await t.pressKey('tab')
        await t.pressKey('enter')
        await t.wait(1000)
        await t.click(MessageTracking.linkMessageTracking)
        await t.click(MessageTracking.linkMessageTracking)
        await t.wait(1000)
        await t.click(MessageTracking.linkSearch)
        await t.wait(1000)
        await t.click(MessageTracking.btnClear)
        await t.wait(1000)
        await t.typeText(MessageTracking.txtMessageId, text)
        await t.click(MessageTracking.btnSearch)  
        await t.eval(() => location.reload(true))
        await t.wait(25000)
        await t.eval(() => location.reload(true))
        await t.wait(1000)
        .click(MessageTracking.btnView)    
        await t.wait(1000)        
        const valmessage = await MessageTracking.txtMsgStatus.value
        await t.expect(valmessage).eql('Failed')
    }
console.log(failedMessage)
    await LoginPage_Cirrus.logout();
 });


  fixture `Verify_MessageTrackingExecutionInProgressOAT`
    .page (data.Url)
 test
  .meta({  type20: 'ccData'})
   (`Verify_MessageTrackingExecutionInProgressOAT`, async t => {
    await LoginPage_Cirrus.userlogin (data.UserName,data.Password)
    await t

    .click(HomePage.linkTenantHeader) 
    .click(HomePage.linkChangeTenant) 
    .typeText(HomePage.txtTenantCode,data.switchtenantcode_ip)   
    .click(HomePage.chkSearchAmongAll)
    .click(HomePage.btnSearch)
    .click(HomePage.btnSelect)     

    const j = 3
    for (let i = 1; i <= j; i++) {
        await t
        .click(DocumentWorkbench.lnkDocumentWorkbench)
        .click(DocumentWorkbench.lnkDocumentWorkbench)
        .click(DocumentWorkbench.lnkGateway)
        .click(DocumentWorkbench.lnkUploads)
        .expect(DocumentWorkbench.lnkRules.exists).ok()
        .expect(DocumentWorkbench.txtSearch.exists).ok()
        .click(DocumentWorkbench.lnkActions)
        .expect(DocumentWorkbench.lnkUploadDocuments.exists).ok()
        .click(DocumentWorkbench.lnkUploadDocuments)
        const uploadInput = DocumentWorkbench.uploadFile;
        await t
        .setFilesToUpload(uploadInput, [uploadfilePath]);
        await t.typeText(DocumentWorkbench.lstDestination, data.destination_ip)
        await t.typeText(DocumentWorkbench.lstType, data.type_ip)
        await t.wait(5000)
        // await t.pressKey('down')
        // await t.pressKey('up')
        // await t.pressKey('enter')
        await t.click(DocumentWorkbench.btnSave)

        const text = await DocumentWorkbench.txtMsgId.innerText;
        inProgressMessage.push(text);
        
        await t.wait(1000)
        await t.pressKey('tab')
        await t.pressKey('enter')
        await t.wait(1000)
        await t.click(MessageTracking.linkMessageTracking)
        await t.click(MessageTracking.linkMessageTracking)
        await t.wait(1000)
        await t.click(MessageTracking.linkSearch)
        await t.wait(1000)
        await t.click(MessageTracking.btnClear)
        await t.wait(1000)
        await t.typeText(MessageTracking.txtMessageId, text)
        await t.click(MessageTracking.btnSearch)  
        await t.eval(() => location.reload(true))
        await t.wait(25000)
        await t.eval(() => location.reload(true))
        await t.wait(1000)
        .click(MessageTracking.btnView)    
        await t.wait(1000)        
        const valmessage = await MessageTracking.txtMsgStatus.value
        await t.expect(valmessage).eql('In Progress')
    }
console.log(inProgressMessage)
 });

   fixture (`Validate Cirrus Message in PN Taffic Manager`)
   test
       .page(baseUrl)
       
      .meta({  type20: 'ccData'})
   
       ('Validate Completed,Failed,In Progress Message in PN', async t => {
           await LoginPage.logInSuccessful();
 
const messageGroups = [
    { messages: completedMessage, status: "Completed" },
    { messages: failedMessage, status: "Failed" },
    { messages: inProgressMessage, status: "In Progress" }
];
for (const { messages, status } of messageGroups) {
      // Perform member selection and navigation only for Failed or In Progress
            if ((status === 'Completed' ) && messages.length > 0) {
                 console.log('status')
                await dashboard.selectMember(member3);    
                await trafficManagerPage.navigateToTrafficManagerPage();         
            }
             if ((status === 'Failed') && messages.length > 0) {
                await dashboard.selectMember(member4);    
                await trafficManagerPage.navigateToTrafficManagerPage();         
            }
             if ((status === 'In Progress' ) && messages.length > 0) {
                await dashboard.selectMember(member2);    
                await trafficManagerPage.navigateToTrafficManagerPage();         
            }
    for (const id of messages) {
        try {
            console.log(`Searching for message ID: ${id} with expected status: ${status}`);

            await trafficManagerPage.searchByCirrusMessageId(id);
            await trafficManagerPage.verifyMessageStatus(status);

        } catch (error) {
            console.error(`Error validating message ID ${id} with status ${status}:`, error);
        }
    }
}

    });
   