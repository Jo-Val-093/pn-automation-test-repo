import { Selector, t } from 'testcafe';
import { passwordSuper, usernameSuper } from "../helpers/configuration";
import codeMatcherRoutePage from './codeMatcherRoutePage';
import basePage from './basePage';
import data from "../data/data.json";
import { nanoid } from 'nanoid';
const randomXPath = 'Auto' + nanoid();

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var member2 = repo.testData.member2;
var member = repo.testData.member;


const receiverValueRouteInfoPage = Selector('#route-information-table h6').nth(6)
const senderValueRouteInfoPage = Selector('#route-information-table h6').nth(4);


class routeInformationPage extends basePage{
    constructor() {

        super()
        this.routeInformationText = Selector('#root h2').withText('Route information');
        this.senderText = Selector('#route-information-table h6').withText('Sender');
        this.ReceiverText = Selector('#route-information-table h6').withText('Receiver');
        this.messageTypeText = Selector('#route-information-table h6').withText('Message type');
        this.activeRowText = Selector('#route-information-table h6').withText('Active');
        this.lastUpdatedText = Selector('#route-information-table h6').withText('Last updated');
        this.editedByText = Selector('#route-information-table h6').withText('Edited by');
        this.copyXpathIcon = Selector('#route-config-table tbody tr td').nth(3).find('h6 button span svg');
        this.serviceTypeColumn = Selector('#route-config-table h6').withText('Service type');
        this.sourceCodeTypeColumn = Selector('#route-config-table h6').withText('Source code type');
        this.destinationCodeTypeColumn  = Selector('#route-config-table h6').withText('Destination code type');
        this.baseXpathColumn = Selector('#route-config-table h6').withText('Base XPath');
        this.activeColumn = Selector('#route-config-table h6').withText('Active');
        this.actionsColumn = Selector('#route-config-table h6').withText('Actions');
        this.editLink = Selector('span').withText('Edit');
        this.editCrossIcon = Selector('[data-testid="cross-icon"] path');
        this.editDoneIcon = Selector('[data-testid="done-icon"]');
        this.routeEditedMessage = Selector('div').withText('Route edited').nth(6);
        this.senderRequiredText = Selector('[data-testid="form"] p').withText('Sender is required');
        this.receiverRequiredText = Selector('[data-testid="form"] p').withText('Receiver is required');
        this.messageTypeRequiredText = Selector('[data-testid="form"] p').withText('Message type is required');
        // Edit Message route window
        this.editRouteLooseChnagesOKButton = Selector('[data-testid="confirm"] span').withText('OK');
        this.editRouteLooseChnagesCancelButton = Selector('[data-testid="cancel"] span').withText('Cancel');
        
        this.duplicateRouteAlertMessage = Selector('[data-testid="alerts"] div').withText('Route Config can not be updated as Route config al').nth(2);
        this.addConfigButton = Selector('[data-testid="add-config"] span').withText('Add config');
        this.addNewConfigModalTitle = Selector('[data-testid="dialog"] h5').withText('Add new config');
        this.configDetailsModalTitle = Selector('[data-testid="dialog"] h5').withText('Config details');
        this.editConfigDetailsModalTitle = Selector('[data-testid="dialog"] h5').withText('Edit config details');
        this.serviceTypeTitle = Selector('h6').withText('Service type *');
        this.sourceCodeTypeTitle = Selector('h6').withText('Source code type *');
        this.destinationCodeTypeTitle = Selector('h6').withText('Destination code type *');
        this.baseXpathTitle = Selector('h6').withText('Base XPath *');
               
        this.addButtonDisableStat = Selector('button').withAttribute('type', 'submit');
        this.addButtonEnableStat = Selector('[data-testid="confirm"] span').withText('Add');
        
        this.addNewConfigCancelButton = Selector('[data-testid="cancel"] span').withText('Cancel');
        this.addNewConfigCancelButton1 = Selector('[data-testid="cancel"]').nth(1).find('span').withText('Cancel') // when new route --> new config 
        this.newConfigLooseChangesCancelButton = Selector('[data-testid="cancel"]').nth(1).find('span').withText('Cancel');
        this.newConfigLooseChangesCancelButton2 = Selector('[data-testid="cancel"]').nth(2).find('span').withText('Cancel')
        
        this.newConfigLooseChnagesOkButton = Selector('[data-testid="confirm"]').nth(1).find('span').withText('OK');
        this.newConfigLooseChnagesOkButton2 = Selector('[data-testid="confirm"]').nth(2).find('span').withText('OK')

        this.configCrossIcon = Selector('[data-testid="close-icon"] path');
        this.configCrossIcon1 = Selector('[data-testid="close-icon"]').nth(1)
        this.serviceTypeDropDown = Selector('[title="Open"]').nth(0).find('svg');
       // this.serviceTypeDropDown1 = Selector('[title="Open"]').nth(4).find('svg')
        
        this.serviceTypeTextBox = Selector('[data-testid="form"] div div').nth(1).find('div div div div input');
        this.sourceCodeTypeTextBox = Selector('[data-testid="text-field-codeType"] div input');
        this.destinationCodeTypeTextBox = Selector('[data-testid="text-field-targetCodeType"] div input');
        this.baseXPathTextBox = Selector('[data-testid="text-field-baseXpath"] div input');
        this.replacingAttributeTextBox = Selector('[data-testid="text-field-assignedByValue"] div input');
       // this.configLooseChangesMessage = Selector('[data-testid="dialog"]').nth(1).find('h5').withText('You are about to loose your changes');
        this.configLooseChangesMessage = Selector('h5').withText('You are about to lose your changes')
        this.activeCheckBox = Selector('[data-testid="checkbox-is-active"] [data-indeterminate="false"]');
        this.newConfigAddedMessage = Selector('[data-testid="alerts"] div').withText('New config added').nth(2);
        this.configDetailsCancelButton = Selector('[data-testid="cancel"] span').withText('Cancel');
        this.firstViewLinkSerTypConTable = Selector('#route-config-table span').withText('View');
        this.serviceTypeConfigTable = Selector('#route-config-table h6');
        this.duplicateConfigErrorMessage = Selector('[data-testid="alerts"] div').withText('The same configuration already exists in DB. Pleas').nth(1);
        // Duplicate config alert message on Edit Config Detials Modal
        this.duplicateConfigErrorMessage1 = Selector('[data-testid="alerts"] div').withText('The same configuration already exists in DB. Pleas').nth(2)

        this.editButtonOnCOnfigDetails = Selector('[data-testid="confirm"] span').withText('Edit');
        this.saveButtonEditConfigDetails = Selector('button').withAttribute('type', 'submit');
        
        this.translOption1 = Selector('[data-option-index="0"] span').withText('transl');
        this.configEditedMessage = Selector('[data-testid="alerts"] div').withText('Config edited').nth(2);
    
        //this.activeValue = Selector('[data-testid]').nth(45).find('h6');
        this.activeValue = Selector('#route-config-table h6').nth(10);
        this.editedByValue = Selector('[data-testid="lastElement"]').nth(1).find('h6');

       }


    async validateUserIsAbleToNavigateToRouteInformationPage() {
       
           
      await t 
           .click(codeMatcherRoutePage.receiverColumn)
           .click(codeMatcherRoutePage.receiverColumn)
           .click(Selector(codeMatcherRoutePage.viewLinks))
           .expect(this.routeInformationText.innerText).eql('Route information')     
    }

    async validateTheDisplayOfRouteInformationPage() {        
        await t
            .expect(this.senderText.textContent).eql('Sender')
            .expect(this.ReceiverText.textContent).eql('Receiver')
            .expect(this.messageTypeText.textContent).eql('Message type')
            .expect(this.activeRowText.textContent).eql('Active')
            .expect(this.lastUpdatedText.textContent).eql('Last updated')
            .expect(this.editedByText.textContent).eql('Edited by')    
    }

    async validateTheDisplayOfColumnUnderServiceTypeConfigsection() {
        
        await t
            
            .click(Selector(codeMatcherRoutePage.viewLinks))
            .expect(this.serviceTypeColumn.visible).eql(true)
            .expect(this.sourceCodeTypeColumn.visible).eql(true)    
            .expect(this.destinationCodeTypeColumn .visible).eql(true)    
            .expect(this.baseXpathColumn.visible).eql(true)    
            .expect(this.activeColumn.visible).eql(true)    
            .expect(this.actionsColumn.visible).eql(true)    
    }

    async validateUserIsAbleToCopyandPasteBaseXpath() {
        
        await t
            .setTestSpeed(0.01)
            .expect(this.copyXpathIcon.exists).ok()
            .click(this.copyXpathIcon)
                         
    }       

    async validationOfCodeMatcherRouteEditMode() {
        
        await t
            .click(this.editLink)
            .expect(this.editCrossIcon.visible).eql(true)
            .expect(this.editDoneIcon.visible).eql(true)
            .typeText(codeMatcherRoutePage.senderDropDown, 'Sender')
            .pressKey('down')
            .pressKey('enter')
            .pressKey('tab')
            .typeText(codeMatcherRoutePage.messageTypeDropDown, 'Message type')
            .pressKey('down')
            .pressKey('enter')
            .click(this.editDoneIcon)
            .expect(this.senderRequiredText.visible).eql(true)
            .expect(this.receiverRequiredText.visible).eql(true)
            .expect(this.messageTypeRequiredText.visible).eql(true)
            .typeText(codeMatcherRoutePage.senderDropDown, data.member)
            .pressKey('down')   
            .pressKey('enter')
            .pressKey('tab')
            .typeText(codeMatcherRoutePage.receiverDropDown1, data.member2)
            //  .pressKey('down')Testr
            .pressKey('enter')
            .pressKey('tab')
            .typeText(codeMatcherRoutePage.messageTypeDropDown, 'Movemen')
            .pressKey('down')
            .pressKey('enter')
            .click(this.editDoneIcon)
            .expect(this.duplicateRouteAlertMessage.visible).eql(true)
            .click(this.editCrossIcon)
            .expect(codeMatcherRoutePage.routeLooseChnagesMessage.visible).eql(true)
            .click(this.editRouteLooseChnagesOKButton)                                  
    }       

    async validateUserIsAbleToEditCodeMatcherRouteDetails() {
        
        await t
            .click(codeMatcherRoutePage.receiverColumn)
            .click(codeMatcherRoutePage.receiverColumn)
            .click(codeMatcherRoutePage.viewLinks)
            .click(this.editLink)
            .click(codeMatcherRoutePage.senderDropDown)
            .typeText(codeMatcherRoutePage.senderDropDown, member)
            .pressKey('down')
            .pressKey('enter')
            .pressKey('tab')
            .typeText(codeMatcherRoutePage.receiverDropDown1,member2)
           // .pressKey('down')
            .pressKey('enter')
            .pressKey('tab')
            .typeText(codeMatcherRoutePage.messageTypeDropDown, 'Financial')
            .pressKey('down')
            .pressKey('enter')
            .click(this.editDoneIcon)
            .expect(this.routeEditedMessage.innerText).contains('Route edited')
            .click(this.editLink)
            .typeText(codeMatcherRoutePage.senderDropDown, data.member)
            .pressKey('down')
            .pressKey('enter')
            .pressKey('tab')
            .typeText(codeMatcherRoutePage.receiverDropDown1, data.member2)
           // .pressKey('down')
            .pressKey('enter')
            .pressKey('tab')
            .typeText(codeMatcherRoutePage.messageTypeDropDown, 'Executi')
            .pressKey('down')
            .pressKey('enter')
            .click(this.editDoneIcon)
            .expect(this.routeEditedMessage.innerText).contains('Route edited')
                                         
    }     

    async validationOfAddNewConfigModal() {
        
        await t
            .click(this.addConfigButton)
            .expect(this.addNewConfigModalTitle.visible).eql(true)
            .expect(this.serviceTypeTitle.visible).eql(true)
            .expect(this.sourceCodeTypeTitle.visible).eql(true)
            .expect(this.destinationCodeTypeTitle.visible).eql(true)
            .expect(this.baseXpathTitle.visible).eql(true)
            .expect(this.activeCheckBox.visible).eql(true)
            .expect(this.addButtonDisableStat.hasAttribute('disabled')).eql(true)
            .click(this.serviceTypeDropDown)
            .pressKey('down')
            .pressKey('enter')
            .typeText(this.sourceCodeTypeTextBox, '1')
            .typeText(this.destinationCodeTypeTextBox, '2')
            .typeText(this.baseXPathTextBox,randomXPath )
            .expect(this.addButtonEnableStat.hasAttribute('disabled')).eql(false)
            .click(this.addNewConfigCancelButton)
            .expect(this.configLooseChangesMessage.visible).eql(true)
            .click(this.newConfigLooseChangesCancelButton)
            .click(this.configCrossIcon)
            .expect(this.configLooseChangesMessage.visible).eql(true)
            .click(this.newConfigLooseChangesCancelButton)
            .click(this.addButtonEnableStat)
            .expect(this.newConfigAddedMessage.visible).eql(true)
            .expect(this.routeInformationText.visible).eql(true)
            .expect(this.serviceTypeConfigTable.withText(randomXPath).visible).eql(true)
           
            .expect(this.activeValue.innerText).eql('Yes')
            .expect(this.editedByValue.innerText).eql(process.env.E2E_USERNAME_SUPER)
            
            .click(this.addConfigButton)
            .click(this.serviceTypeDropDown)
            .pressKey('down')
            .pressKey('enter')
            .typeText(this.sourceCodeTypeTextBox, '1')
            .typeText(this.destinationCodeTypeTextBox, '2')
            .typeText(this.baseXPathTextBox, '3')
            .typeText(this.replacingAttributeTextBox, '4',{replace:true})
            .click(this.addButtonEnableStat)
            .expect(this.duplicateConfigErrorMessage.visible).eql(true)
            .click(this.addNewConfigCancelButton)
            .click(this.editRouteLooseChnagesOKButton)
        
            const text1 = await senderValueRouteInfoPage.innerText
            const text2 = await receiverValueRouteInfoPage.innerText
            await t.click(codeMatcherRoutePage.codeMatcherRoutesHeader)  
            const text3 = await codeMatcherRoutePage.senderValueCMRoutePage.innerText
            const text4 = await codeMatcherRoutePage.ReceiverValueCMRoutePage.innerText
            await t.expect(text1).eql(text3) && await t.expect(text2).eql(text4)    
    }

    async validationOfConfigDetailsModal() {
        
        await t
            .click(this.firstViewLinkSerTypConTable)
            .expect(this.configDetailsModalTitle.visible).eql(true)
            .expect(this.serviceTypeTitle.visible).eql(true)
            .expect(this.sourceCodeTypeTitle.visible).eql(true)
            .expect(this.destinationCodeTypeTitle.visible).eql(true)
            .expect(this.baseXpathTitle.visible).eql(true)
            .click(this.configDetailsCancelButton)
            .expect(this.routeInformationText.visible).eql(true)
            .click(this.firstViewLinkSerTypConTable)
            .click(this.configCrossIcon)
            .expect(this.routeInformationText.visible).eql(true)
    }

    async validationOfEditConfigDetailsModal() {
        
        await t
            .click(this.firstViewLinkSerTypConTable)
            .click(this.editButtonOnCOnfigDetails)
            .expect(this.editConfigDetailsModalTitle.visible).eql(true)
            .expect(this.saveButtonEditConfigDetails.hasAttribute('disabled')).eql(true)
            .click(this.serviceTypeTextBox)
            .click(this.translOption1)
            .pressKey('tab')
            .typeText(this.sourceCodeTypeTextBox, '1',{replace:true})
            .typeText(this.destinationCodeTypeTextBox, '2',{replace:true})
            .typeText(this.baseXPathTextBox, '3',{replace:true})
            .expect(this.saveButtonEditConfigDetails.hasAttribute('disabled')).eql(false)
            .typeText(this.replacingAttributeTextBox, '4',{replace:true})
            .click(this.saveButtonEditConfigDetails)
            .expect(this.duplicateConfigErrorMessage1.visible).eql(true)
            .click(this.addNewConfigCancelButton)
            .expect(this.configLooseChangesMessage.visible).eql(true)
            .click(this.newConfigLooseChangesCancelButton)
            .click(this.configCrossIcon)
            .expect(this.configLooseChangesMessage.visible).eql(true)          
            .click(this.newConfigLooseChnagesOkButton)
            .expect(this.configDetailsModalTitle.visible).eql(true)
            .click(this.configDetailsCancelButton)    
    }


    async EditingDataOnEditConfigDetailsModal() {
        
        await t
            .click(this.firstViewLinkSerTypConTable)
            .click(this.editButtonOnCOnfigDetails)
            .click(this.serviceTypeTextBox)
            .click(this.translOption1)
            .pressKey('tab')
            .typeText(this.sourceCodeTypeTextBox, '1', { replace: true })
            .typeText(this.destinationCodeTypeTextBox, '2', { replace: true })
            .typeText(this.baseXPathTextBox, randomXPath)
            .click(this.saveButtonEditConfigDetails)
            .expect(this.configEditedMessage.visible).eql(true)
            .expect(this.activeValue.innerText).eql('Yes')
            .expect(this.editedByValue.innerText).eql(process.env.E2E_USERNAME_SUPER)
            const text1 = await senderValueRouteInfoPage.innerText
            const text2 = await receiverValueRouteInfoPage.innerText
            await t.click(codeMatcherRoutePage.codeMatcherRoutesHeader)  
            const text3 = await codeMatcherRoutePage.senderValueCMRoutePage.innerText
            const text4 = await codeMatcherRoutePage.ReceiverValueCMRoutePage.innerText
            await t.expect(text1).eql(text3) && await t.expect(text2).eql(text4)
            await t.click(codeMatcherRoutePage.senderColumn)
            let firstSenderValue = await codeMatcherRoutePage.FirstRecordSenderValue.innerText;
            await t.click(codeMatcherRoutePage.senderColumn)
            .click(codeMatcherRoutePage.veryLastPage)
            .expect(codeMatcherRoutePage.lastRecordSenderValue.innerText).eql(firstSenderValue)
            await t.click(codeMatcherRoutePage.senderColumn)
            .expect(codeMatcherRoutePage.FirstRecordSenderValue.innerText).eql(firstSenderValue)           
    }
}
    export default new routeInformationPage();