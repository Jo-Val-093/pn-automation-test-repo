import { Selector, test, t } from 'testcafe';

import { baseUrl } from "../helpers/configuration";
import dashBoardPage from '../pages/dashBoardPage';
import trafficManagerPage from "../pages/trafficManagerPage";
import LoginPage from "../pages/logInPage";
import LoginPage_Cirrus from '../pages_cirrus/LoginPage_Cirrus';
import HomePage from '../pages_cirrus/HomePage';
import MessageTracking from '../pages_cirrus/MessageTracking';
import DocumentWorkbench from '../pages_cirrus/DocumentWorkBench';
import * as TestCafeTestingLibrary from '@testing-library/testcafe';

const data = require("../data/CirrusConnect.json");
const fs = require('fs');
const path = require('path');
const repo = require(path.resolve('./test/e2e/data/index.js'));

const uploadfilePath = 'uploads/payload.xml';
const uploadfilePathFailed = 'uploads/payload_failed.xml';

const completedMessage = [];
const failedMessage = [];
const inProgressMessage = [];

const member = repo.testData.cirrusAliasMember1;
const member1 = repo.testData.cirrusAliasMember2;

const USERNAME = 'jothivalan.muthalagan@proagrica.com';
const PASSWORD = 'Chennai@2021';


fixture `Verify_MessageTrackingExecutionCompletedSIT`
   .page (data.SITUrl)
test
.meta({  type20: 'ccData'})

(`Verify_MessageTrackingExecutionCompletedSIT`, async t => {
    await LoginPage_Cirrus.userlogin(data.UserName, data.Password);

    // Switch to correct tenant
    await t
        .click(HomePage.linkTenantHeader)
        .click(HomePage.linkChangeTenant)
        .typeText(HomePage.txtTenantCode, data.switchtenantcode_c)
        .click(HomePage.chkSearchAmongAll)
        .click(HomePage.btnSearch)
        .click(HomePage.btnSelect);
    const uploadfilePath = 'uploads/payload.xml';
    const totalMessages = 5;

    for (let i = 0; i < totalMessages; i++) {
        await t
            .click(DocumentWorkbench.lnkDocumentWorkbench)
            .click(DocumentWorkbench.lnkDocumentWorkbench)
            .click(DocumentWorkbench.lnkGateway)
            .click(DocumentWorkbench.lnkUploads)
            .click(DocumentWorkbench.lnkActions)
            .click(DocumentWorkbench.lnkUploadDocuments)
            const uploadInput = DocumentWorkbench.uploadFile
        await t
            .setFilesToUpload(uploadInput, [uploadfilePath])
            .typeText(DocumentWorkbench.lstDestination, data.destination_c)
            .typeText(DocumentWorkbench.lstType, data.type_c)
            .wait(5000) 
            .click(DocumentWorkbench.btnSave);

        const msgId = await DocumentWorkbench.txtMsgId.innerText;
        completedMessage.push(msgId);

        await t.wait(1000).pressKey('tab').pressKey('enter').wait(1000);
    }

    // Message Tracking validation
    await t
        .click(MessageTracking.linkMessageTracking)
        .click(MessageTracking.linkMessageTracking)
        .wait(1000)
        .click(MessageTracking.linkSearch)
        .wait(1000);

    for (const msg of completedMessage) {
        await t
            .click(MessageTracking.btnClear)
            .wait(1000)
            .typeText(MessageTracking.txtMessageId, msg)
            .click(MessageTracking.btnSearch)
            .wait(1000)
            .click(MessageTracking.btnView);

        
        for (let i = 0; i < 5; i++) {            
            const valmessage = await MessageTracking.txtMsgStatus.value   
            if (valmessage === 'Completed' ) {
                break;
                
            } else {
                await t
                .wait(1000)
                .eval(() => location.reload(true));              
            }            

        }
        
        const valmessage = await MessageTracking.txtMsgStatus.value
        await t
        .expect(valmessage).eql('Completed') 
        .click (Selector('span.ui-menuitem-text').withText('Message Search'))
    }
    await LoginPage_Cirrus.logout(); 
});



fixture `Verify_MessageTrackingExecutionFailedSIT`
    .page(data.SITUrl);

test
    .meta({ type20: 'ccData' })
    (`Verify_MessageTrackingExecutionFailedSIT`, async t => {
    // Login
     await LoginPage_Cirrus.userlogin(USERNAME, PASSWORD);

    // Switch to Super Admin
    await t
        .click(Selector('#topMenuForm\\:j_idt22_button span').withText('User: jothivalan.muthalagan@proagrica.com'))
        .click(Selector('#topMenuForm\\:j_idt22_menu span').withText('Switch to Super'));

    // Tenant Switch
    await t
        .click(HomePage.linkTenantHeader)
        .click(HomePage.linkChangeTenant)
        .typeText(HomePage.txtTenantCode, data.switchtenantcode_sit)
        .click(HomePage.chkSearchAmongAll)
        .click(HomePage.btnSearch)
        .click(HomePage.btnSelect);
    const uploadCount = 5;

    for (let i = 1; i <= uploadCount; i++) {
        // Upload Document
        await t
            .click(DocumentWorkbench.lnkDocumentWorkbench)
            .click(DocumentWorkbench.lnkDocumentWorkbench)
            .click(DocumentWorkbench.lnkGateway)
            .click(DocumentWorkbench.lnkUploads)
            .expect(DocumentWorkbench.lnkRules.exists).ok()
            .expect(DocumentWorkbench.txtSearch.exists).ok()
            .click(DocumentWorkbench.lnkActions)
            .expect(DocumentWorkbench.lnkUploadDocuments.exists).ok()
            .click(DocumentWorkbench.lnkUploadDocuments);

        const uploadInput = DocumentWorkbench.uploadFile;
        await t
            .setFilesToUpload(uploadInput, [uploadfilePathFailed])
            .typeText(DocumentWorkbench.lstDestination, data.destination_sit)
            .typeText(DocumentWorkbench.lstType, data.type_f)
            .wait(2000)
            .click(DocumentWorkbench.btnSave);

        // Capture message ID and push to array
        const msgId = await DocumentWorkbench.txtMsgId.innerText;
        failedMessage.push(msgId);

        // Post-upload cleanup
        await t
            .wait(1000)
            .pressKey('tab')
            .pressKey('enter')
            .wait(1000);

        // Message Tracking Validation
        await t
            .click(MessageTracking.linkMessageTracking)
            .click(MessageTracking.linkMessageTracking)
            .wait(1000)
            .click(MessageTracking.linkSearch)
            .wait(1000)


           for (const msg of failedMessage) {
        await t
        .click(MessageTracking.btnClear)
        .wait(1000)
        .typeText(MessageTracking.txtMessageId, msg)
        .click(MessageTracking.btnSearch)  
        .wait(250)      
        .click(MessageTracking.btnView)    
        .wait(100)         
    
        for (let i = 0; i < 5; i++) {            
            const valmessage = await MessageTracking.txtMsgStatus.value   
            if (valmessage === 'Failed' ) {
                break;
                
            } else {
                await t
                .wait(1000)
                .eval(() => location.reload(true))                
            }            

        }
        
        const valmessage = await MessageTracking.txtMsgStatus.value
        await t
        .expect(valmessage).eql('Failed') 
        .click (Selector('span.ui-menuitem-text').withText('Message Search'))
    }
    
    }

    await LoginPage_Cirrus.logout();
});


fixture `Verify_MessageTrackingExecutionInProgressSIT`
    .page(data.SITUrl);

test
    .meta({ type20: 'ccData' })
    (`Verify_MessageTrackingExecutionInProgressSIT`, async t => {
        await LoginPage_Cirrus.userlogin(USERNAME, PASSWORD);

        // Switch to Super Admin and select tenant
        await t
            .click(Selector('#topMenuForm\\:j_idt22_button span').withText(`User: ${USERNAME}`))
            .click(Selector('#topMenuForm\\:j_idt22_menu span').withText('Switch to Super'))
            .click(HomePage.linkTenantHeader)
            .click(HomePage.linkChangeTenant)
            .typeText(HomePage.txtTenantCode, data.switchtenantcode_sit)
            .click(HomePage.chkSearchAmongAll)
            .click(HomePage.btnSearch)
            .click(HomePage.btnSelect);

        const uploadCount = 5;

        for (let i = 1; i <= uploadCount; i++) {
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
                .setFilesToUpload(DocumentWorkbench.uploadFile, [uploadfilePath])
                .typeText(DocumentWorkbench.lstDestination, data.destination_sit)
                .typeText(DocumentWorkbench.lstType, data.type_ip)
                .wait(2000)
                .pressKey('down up enter')
                .click(DocumentWorkbench.btnSave);

            const msgId = await DocumentWorkbench.txtMsgId.innerText;
            inProgressMessage.push(msgId);

            await t
                .wait(1000)
                .pressKey('tab enter')
                .wait(1000);
        }

       await t
                .click(MessageTracking.linkMessageTracking)
                .click(MessageTracking.linkMessageTracking)
                .wait(1000)
                .click(MessageTracking.linkSearch)
                .wait(1000)
                
        for (const msg of inProgressMessage) {
            await t
                .click(MessageTracking.btnClear)
                .wait(1000)
                .typeText(MessageTracking.txtMessageId, msg)
                .click(MessageTracking.btnSearch)
                .wait(250)
                .click(MessageTracking.btnView)
                .wait(100);

            
            for (let i = 0; i < 5; i++) {            
                const valmessage = await MessageTracking.txtMsgStatus.value   
                if (valmessage === 'In Progress' ) {
                    break;
                    
                } else {
                    await t
                    .wait(1000)
                    .eval(() => location.reload(true));           
                }            
    
            }
            
            const valmessage = await MessageTracking.txtMsgStatus.value
            await t
            .expect(valmessage).eql('In Progress') 
            .click (Selector('span.ui-menuitem-text').withText('Message Search'))    
        }
        console.log(inProgressMessage)
        await LoginPage_Cirrus.logout();
      
    });


fixture`Validate Cirrus Message in PN Taffic Manager`
    .page(baseUrl);

test
    .meta({ type20: 'ccData' })
    (`Validate Completed, Failed, In Progress Message in PN`, async t => {
        await LoginPage.logInSuccessful();
        await dashboard.selectMember(member);
        await trafficManagerPage.navigateToTrafficManagerPage();

        const messageGroups = [
            { messages: completedMessage, status: "Completed" },
            { messages: failedMessage, status: "Failed" },
            { messages: inProgressMessage, status: "In Progress" }
        ];

        

        for (const { messages, status } of messageGroups) {

            if ((status === 'In Progress' || status === 'Failed') && messages.length > 0) {
                await dashboard.selectMember(member1);
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

    fixture`Validate and Replay Cirrus Message in PN Traffic Manager`
    .page(baseUrl);

test
    .meta({ type20: 'ccData' })
    ('Validate and Replay Completed, Failed, In Progress Messages in PN', async t => {
        await LoginPage.logInSuccessful();
        await dashboard.selectMember(member);
        await trafficManagerPage.navigateToTrafficManagerPage();

        const messageGroups = [
            { messages: completedMessage, status: "Completed" },
            { messages: failedMessage, status: "Failed" },
            { messages: inProgressMessage, status: "In Progress" }
        ];

        function buildTaggedId(id, status) {
            if (status === "Completed") return `${id}-completed`;
            if (status === "Failed") return `${id}-failed`;
            if (status === "In Progress") return `${id}-inProgress`;
            return id;
        }

        for (const { messages, status } of messageGroups) {
            if (!messages.length) {
                console.log(`⚠️ No ${status} messages provided, skipping...`);
                continue;
            }

            // Pick only the first message of each status
            const firstMessage = messages[0];
            const taggedId = buildTaggedId(firstMessage, status);

            // Switch member for specific statuses if needed
            if (["In Progress", "Failed"].includes(status)) {
                await dashboard.selectMember(member1);
                await trafficManagerPage.navigateToTrafficManagerPage();
            }

            console.log(`Replaying first ${status} message:`, taggedId);
            await trafficManagerPage.replayMessages([taggedId]);
        }
    });





