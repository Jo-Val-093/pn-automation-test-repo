import { Selector, t } from 'testcafe';
import { passwordSuper, usernameSuper } from "../helpers/configuration";
import codeMatcherPage from './codeMatcherPage';
import data from "../data/data.json";
import routeInformationPage from './routeInformationPage';

class codeMatcherRoutePage {
    constructor() {
        this.listOfAllMyCodeMatcherRouteText = Selector('#root h3').withText('List of all my Code Matcher routes');
        this.senderColumn = Selector('#route-table h6').withText('Sender');
        this.receiverColumn = Selector('#route-table h6').withText('Receiver');
        this.messageTypeColumn = Selector('#route-table h6').withText('Message type');
        this.lastUpdatedColumn = Selector('#route-table h6').withText('Last updated');
        this.editedByColumn = Selector('#route-table h6').withText('Edited by');
        this.activeColumn = Selector('#route-table h6').withText('Active');
        this.actionsColumn = Selector('#route-table h6').withText('Actions');
        this.rows10option = Selector('#root div').withText('10').nth(10);
        this.viewLinks = Selector('#route-table span').withText('View');
        this.veryLastPage = Selector('[data-testid="handleLastPageClick-button"] svg');
        this.veryFirstPage = Selector('[data-testid="handleFirstPageClick-button"] svg path')
        this.pagesText = Selector('div').withText('pages').nth(10)
        this.addNewRouteButton = Selector('#root span').withText('Add new route');
        this.senderDropDown = Selector('[data-testid="form"] div div').nth(1).find('div div div div input');
        this.messageTypeDropDown = Selector('[data-testid="form"] div').nth(16).find('div').nth(1).find('div div div div input');
        this.nextButtonBefore = Selector('button').withAttribute('type', 'submit');
        this.nextButtonAfter = Selector('span').withText('Next');
        this.cancelButton = Selector('span').withText('Cancel');
        this.okButton = Selector('span').withText('OK');
        this.receiverDropDown1 = Selector('[data-testid="form"] div').nth(8).find('div').nth(1).find('div div div div input');
        this.sameRouteExistMessage = Selector('.MuiSnackbarContent-message').withText('The same routes already exist in DB');
        this.noOptionsDropdownText = Selector('div').withText('No options').nth(2);
        this.routeLooseChnagesMessage = Selector('[data-testid="dialog"] h5').withText('You are about to lose your changes');
        this.areYouSureWantToProceedMessage = Selector('div').withText('Are you sure you want to proceed?').nth(4)
        // Add New Message route window
        this.addRouteLooseChnagesOKButton = Selector('[data-testid="confirm"]').nth(1).find('span').withText('OK');
        this.addRouteLooseChnagesCancelButton = Selector('[data-testid="cancel"]').nth(1).find('span').withText('Cancel');
        this.addRouteCrossIcon = Selector('[data-testid="close-icon"]');
        this.previousButtoonOnAddNewConfig = Selector('[data-testid="previous"] span').withText('Previous');
        this.addNewMessageRouteModalText = Selector('#dialog-title h5').withText('Add new message route');
        this.codeMatcherRoutesHeader = Selector('#crumb-1 p').withText('Code Matcher routes /');
        
        // First line values from Code Matcher routes Page
        this.senderValueCMRoutePage = Selector('#route-table h6').nth(7);
        this.ReceiverValueCMRoutePage = Selector('#route-table h6').nth(8);
               
        this.FirstRecordSenderValue = Selector('#route-table tbody tr td').nth(0).find('h6');  //A100
        this.lastRecordSenderValue = Selector('[data-testid="lastElement"] h6').nth(0) //A100
        this.receiverTextInDropdown = Selector('input').withAttribute('value', 'Receiver');
    }

    async navigateToCodeMatcherRoutesPage() {
        
         await t  
            .click(Selector(codeMatcherPage.viewLinkCodeMatcherRoute))
            .expect(this.listOfAllMyCodeMatcherRouteText.visible).eql(true)
    }

    async validateTheDisplayOfColumnsOnCodeMatcherRoutesPage() {
        await t
            .expect(this.senderColumn.visible).eql(true)
            .expect(this.receiverColumn.visible).eql(true)
            .expect(this.messageTypeColumn.visible).eql(true)
            .expect(this.lastUpdatedColumn.visible).eql(true)
            .expect(this.editedByColumn.visible).eql(true)
            .expect(this.activeColumn.visible).eql(true)
            .expect(this.actionsColumn.visible).eql(true)
            .takeScreenshot()
    }

    async validateUserIsAbleToAccessAllPagesOnCodeMatcherRoutesPage() {
        await t
            .click(this.veryLastPage)
            .click(this.veryFirstPage)
            .expect(this.pagesText.innerText).contains('1')
    }

    async validateListChnageAsPerRowsPerPageSelected() {
        await t

            .expect(this.viewLinks.count).eql(10)
            .click(this.rows10option)
            .pressKey('up')
            .pressKey('enter')
            .expect(this.viewLinks.count).eql(5)
            .pressKey('down')
            .pressKey('down')
            .pressKey('down')
            .pressKey('enter')
            .expect(this.viewLinks.count).eql(25)
            .pressKey('down')
            .pressKey('down')
            .pressKey('enter')
            .expect(this.viewLinks.count).eql(50)
    }

    async validateUserCanSeeAddNewRouteButton() {

        await t
            .expect(this.addNewRouteButton.exists).eql(true)
    }

    async validatingReceiverDropdownAndNextButtonDuplicateRoutesAndWarningPopUp() {

        await t
            .click(this.addNewRouteButton)
            .expect(this.nextButtonBefore.hasAttribute('disabled')).eql(true)
            .expect(this.receiverDropDown1.hasAttribute('disabled')).eql(true)
            .click(this.senderDropDown)
            .typeText(this.senderDropDown, 'Test12')
            .pressKey('down')
            .pressKey('enter')
            .pressKey('tab')
            .expect(this.receiverDropDown1.hasAttribute('disabled')).eql(false)
            .click(this.receiverDropDown1)
            .selectText(Selector(this.receiverTextInDropdown))
            .typeText(this.receiverDropDown1, 'NK1')
            .pressKey('down')
            .pressKey('enter')
            .pressKey('tab')
            .typeText(this.messageTypeDropDown, 'Execution')
            .pressKey('down')
            .pressKey('enter')
            .expect(this.nextButtonAfter.hasAttribute('disabled')).eql(false)
            .click(this.nextButtonAfter)
            .expect(this.sameRouteExistMessage.visible).eql(true)
            .click(this.cancelButton)
            .expect(this.routeLooseChnagesMessage.visible).eql(true)
            .expect(this.areYouSureWantToProceedMessage.visible).eql(true)
            .click(this.addRouteLooseChnagesCancelButton)
            .click(this.addRouteCrossIcon)
            .expect(this.routeLooseChnagesMessage.visible).eql(true)
            .expect(this.areYouSureWantToProceedMessage.visible).eql(true)
            .click(this.addRouteLooseChnagesOKButton)           
    }

    async validatingSenderAndReceiverCanNotBeSameWhenAddingNewMessageRoute() {

        await t
            .click(this.addNewRouteButton)
            .click(this.senderDropDown)
            .typeText(this.senderDropDown, data.member)
            .pressKey('down')
            .pressKey('enter')
            .pressKey('tab')
            .click(this.receiverDropDown1)
            .typeText(this.receiverDropDown1, data.member)
            .expect(this.noOptionsDropdownText.visible).ok()
            .click(this.cancelButton)
            .click(this.okButton) 
    }


    async validationOfNewRouteAndNewConfigDetailsModal() {
        await t
            .click(this.addNewRouteButton)
            .click(this.senderDropDown)
            .typeText(this.senderDropDown, data.member)
            .pressKey('down')
            .pressKey('enter')
            .pressKey('tab')
            .typeText(this.receiverDropDown1, data.member2)
            .pressKey('down')
            .pressKey('enter')
            .pressKey('tab')
            .typeText(this.messageTypeDropDown, 'Financial')
            .pressKey('down')
            .pressKey('enter')
            .expect(routeInformationPage.activeCheckBox.visible).eql(true)
            .click(this.nextButtonAfter)      
            .expect(routeInformationPage.addNewConfigModalTitle.visible).eql(true)
            .expect(routeInformationPage.serviceTypeTitle.visible).eql(true)
            .expect(routeInformationPage.sourceCodeTypeTitle.visible).eql(true)
            .expect(routeInformationPage.destinationCodeTypeTitle.visible).eql(true)
            .expect(routeInformationPage.baseXpathTitle.visible).eql(true)
            .expect(routeInformationPage.activeCheckBox.visible).eql(true)
            .click(this.previousButtoonOnAddNewConfig)
            .expect(this.addNewMessageRouteModalText.visible).eql(true)
            .click(this.nextButtonAfter)
            .click(routeInformationPage.addNewConfigCancelButton1)
            .expect(routeInformationPage.configLooseChangesMessage.visible).eql(true)
            .click(routeInformationPage.newConfigLooseChangesCancelButton2)
            .click(routeInformationPage.serviceTypeDropDown)
            .pressKey('down')
            .pressKey('enter')
            .typeText(routeInformationPage.sourceCodeTypeTextBox, '1')
            .typeText(routeInformationPage.destinationCodeTypeTextBox, '2')
            .typeText(routeInformationPage.baseXPathTextBox, 'Xpath')
            .expect(routeInformationPage.addButtonEnableStat.hasAttribute('disabled')).eql(false)
            .click(routeInformationPage.configCrossIcon1)
            .expect(routeInformationPage.configLooseChangesMessage.visible).eql(true)
            .click(routeInformationPage.newConfigLooseChnagesOkButton2)
            .expect(this.listOfAllMyCodeMatcherRouteText.visible).eql(true)
    }


}
export default new codeMatcherRoutePage();