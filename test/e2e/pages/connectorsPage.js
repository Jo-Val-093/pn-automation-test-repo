import { Selector, t } from 'testcafe';
import * as TestCafeTestingLibrary from '@testing-library/testcafe'; 
import companiesPage from './companiesPage';
const ENV_NAME = process.env.ENV_NAME;



class connectorsPage {
    constructor() {
        this.connectorsHeaderText = TestCafeTestingLibrary.findByRole('heading', { name: /connectors/i });
        this.addNewConnectorButton = TestCafeTestingLibrary.findByRole('button', { name: 'Add new connector' });
        this.searchConnectorTextBox = TestCafeTestingLibrary.getByPlaceholderText('Search');
        this.conectorsNameColumn = TestCafeTestingLibrary.findByRole('columnheader', { name: /Name/i });
        this.regionColumn = TestCafeTestingLibrary.findByRole('columnheader', { name: /Region/i });
        this.typeColumn = TestCafeTestingLibrary.findByRole('columnheader', { name: /Type/i });
        this.actionsColumn = TestCafeTestingLibrary.findByRole('columnheader', { name: /Actions/i });
        this.viewLinks = TestCafeTestingLibrary.findAllByRole('button',{ name: /View/})
        this.rowPerPageDropdown = TestCafeTestingLibrary.getByTestId('icon-arrow-drop-down');
        this.row25PerPage = TestCafeTestingLibrary.getByRole('option', { name: /25/i  });
        this.row50PerPage = TestCafeTestingLibrary.getByRole('option', { name: /50/i  });
        this.row100PerPage = TestCafeTestingLibrary.getByRole('option', { name: /100/i  });
        this.lastPageClickButton = TestCafeTestingLibrary.getByTestId('icon-chevron-right-double');
        this.connectorFirstRow = Selector('table tbody tr').nth(0);
        this.connectorLastRow = TestCafeTestingLibrary.findAllByRole('row').nth(-1);
        this.pagesText = Selector('div').withText('pages').nth(9);
        //this.nextPageClickButton = Selector('div.flex.items-center > button:nth-child(4)');
        this.connectorNameColumn = TestCafeTestingLibrary.findByRole('heading', { name: /name/i });
        this.activeCheckbox = Selector('[data-testid="checkbox-is-active"] input');
        this.addButton = Selector('[data-testid="confirm-button"] span').withText('Add');
        this.newCompanyAddedText = Selector('div').withText('New company added').nth(5);
        this.saveConnectorButton = TestCafeTestingLibrary.findByRole('button', { name: /Save/i });
        this.nameField = TestCafeTestingLibrary.findAllByRole('textbox').nth(0);
        this.idField = TestCafeTestingLibrary.findAllByRole('textbox').nth(1);
        this.snackbarMessage = TestCafeTestingLibrary.findByText('Connector successfully saved');
        this.deleteConnectorButton = TestCafeTestingLibrary.findByRole('button', { name: /Delete/i });
        this.confirmDeleteConnector = TestCafeTestingLibrary.findByRole('button', { name: /Ok/i });
        this.snackbarMessageDelete = TestCafeTestingLibrary.findByText('Connector has been deleted');
        this.addEndpointButton = TestCafeTestingLibrary.findByRole('button', { name: /Add endpoint/i });
        this.saveEndpointButton = TestCafeTestingLibrary.findByRole('button', { name: /Add/i });
        this.updateEndpointButton = TestCafeTestingLibrary.findByRole('button', { name: /Update/i });
        this.deleteEndpointButton = TestCafeTestingLibrary.findByRole('button', { name: /Delete/i });
        this.endPointName = TestCafeTestingLibrary.findAllByRole('textbox').nth(0);
        this.endPointValue = TestCafeTestingLibrary.findAllByRole('textbox').nth(0);
        this.endPointType = TestCafeTestingLibrary.findAllByRole('combobox').nth(0);
        this.endPointValue = TestCafeTestingLibrary.findAllByRole('textbox').nth(1);
        this.editConnectors = Selector('button').withText('Edit');
        this.snackbarMessageDuplicate = TestCafeTestingLibrary.findByText('Connector name already exists. Please populate with unique value');
        this.cancelMessage = TestCafeTestingLibrary.findByText('You are about to lose your changes')
        this.okButton = TestCafeTestingLibrary.findByRole('button', { name: /Ok/i });
        this.cancelButton = TestCafeTestingLibrary.findByRole('button', { name: /Cancel/i });
        this.navigateToConnectorsPage = Selector('#root a').withText('Connectors /');
        this.deleteButton = TestCafeTestingLibrary.findByRole('button', { name: /Delete/i });
        this.snackbarDeleteMessage =TestCafeTestingLibrary.findByText('Connector has been deleted');
        this.snackbarDeleteUnusedConnector = TestCafeTestingLibrary.findByText('Unable to delete connector because it is in use in journey(s)')
        this.confirmCancel = Selector('div').withText('Are you sure you want to proceed?').nth(4)
        this.duplicateEndPointMessage = TestCafeTestingLibrary.findByText('An endpoint with the same type and value already exists. Please populate with a unique type/value pair')
        this.unableToDeleteMessage = TestCafeTestingLibrary.findByText('Unable to delete endpoint because it is in use in journey(s)')
        this.editEndPoint = Selector('#root button').withText('Edit').nth(1);
        this.closeDialog =  Selector('[class^="absolute fill-primary-500 right-4 top-2 transform"]')
        this.dropdownOptionEndPoint =   Selector('.dropdown-option') 
        this.typeMandatoryField = TestCafeTestingLibrary.getByText('Type is required')
        this.valueMandatoryField = TestCafeTestingLibrary.getByText('Value is required')
        this.typeDropdownTopic = TestCafeTestingLibrary.getByRole('option',{name : 'SOLACE_JMS_TOPIC'})
    }
        
    
    async verifyingConnectorsPageURL() {
        const currentUrl = await t.eval(() => window.location.href);
    
        const expectedDevUrl = 'https://proagrica-network-dev-eks-2.aga.eu-west-1.proagrica.telus.ag/admin/connectors';
        const expectedTestUrl = 'https://proagrica-network-test-eks-2.aga.eu-west-1.proagrica.telus.ag/admin/connectors';
        const expectedPreUrls = [
            'https://proagrica-network-pre-eks-04-us.agv.us-east-1.proagrica.telus.ag/admin/connectors',
            'https://pre.proagrica.net/admin/connectors'
        ];

        switch (ENV_NAME) {
            case 'test':
                await t.expect(currentUrl).eql(expectedTestUrl);
                break;
            case 'pre':
                await t.expect(expectedPreUrls).contains(currentUrl);
                break;
            case 'dev':
                await t.expect(currentUrl).eql(expectedDevUrl);
                break;
            default:
                process.exit(1);
        }
    }
    
    async verifyingDisplayOfConnectorsPage() {      
        await t
        .expect(this.connectorsHeaderText.exists).ok()
        .expect(this.addNewConnectorButton.exists).ok()
        .expect(this.searchConnectorTextBox.exists).ok()
        .expect(this.conectorsNameColumn.visible).eql(true)
        .expect(this.regionColumn.visible).eql(true)
        .expect(this.typeColumn.visible).eql(true)
        .expect(this.actionsColumn.visible).eql(true)
              
    } 

    async verifyingPaginationFunctionalityOnConnectorsPage() {      
        await t
        .expect(this.viewLinks.count).lte(10)
        .click(this.rowPerPageDropdown)
        .click(this.row25PerPage) 
        .expect(this.viewLinks.count).lte(25)
        .click(this.rowPerPageDropdown)
        .click(this.row50PerPage) 
        .expect(this.viewLinks.count).lte(50)
        .click(this.rowPerPageDropdown)
        .click(this.row100PerPage) 
        .expect(this.viewLinks.count).lte(100)
              
    } 
       
    async validateUserIsAbleToAccessAllPages() {
     let attempts = 0;
     const maxAttempts = 10;

    while (attempts < maxAttempts) {
        const isDisabled = await companiesPage.nextPageClickButton.hasClass('fill-neutral-300');

        if (isDisabled) {
            break;
        }

        await t.click(companiesPage.nextPageClickButton);
        await t.wait(1000); // wait for page content to load
        attempts++;
    }
     if (attempts === maxAttempts) {
        console.log('Reached max page attempts (10), but button is still enabled.');
    } else {
        // If it exited early
        await t
            .expect(companiesPage.nextPageClickButton.hasClass('fill-neutral-300'))
            .ok('Next page button should be disabled after navigating all pages');
        }
    }
    
    async validateSortingByConnectorsName() {
        await t.wait(1000)
        const firstConnectorName = await this.connectorFirstRow.child('td').nth(0).innerText
        await t.click(this.conectorsNameColumn)
        await t.wait(1000)
        await t.click(this.lastPageClickButton)
        const lastConnectorName = await this.connectorLastRow.child('td').nth(0).innerText
        await t.expect(firstConnectorName).eql(lastConnectorName)
    }

    async addConnectors(testconnector) {
       await t
        .typeText(this.nameField,testconnector)
        .typeText(this.idField,testconnector)
        .click(this.saveConnectorButton)
        .expect(this.snackbarMessage.exists).ok('Snackbar message is visible')
} 

async validateIsSaveButtonEnabled(){
    await t
    .click(this.addNewConnectorButton)
    const isSaveEnabled = this.saveConnectorButton
    await t
    .expect(isSaveEnabled.hasAttribute('disabled')).ok('Save button is disabled')  
}


async validateDuplicateConnectorname(){

    await t
    .click(this.navigateToConnectorsPage)
    .click(this.addNewConnectorButton)
     .typeText(this.nameField,'TestConnector123')
     .typeText(this.idField,'TestConnector123')
     .click(this.saveConnectorButton)
     .expect(this.snackbarMessageDuplicate.exists).ok();

}

async validateCancelMessage()
{
    await t
    .click(this.cancelButton)
    .expect(this.cancelMessage.exists).ok()
    .click(this.okButton)
}
    async searchConnector(Connector)
    {
        const firstConnectorName = this.connectorFirstRow.child('td').nth(0).innerText
        await t
        .typeText(this.searchConnectorTextBox, Connector)
        .expect(firstConnectorName).eql(Connector)

}
async deleteConnector()
{
    await t
     .click(this.deleteConnectorButton)
     .click(this.confirmDeleteConnector)
}


    async validateAddButtonEnabledAfterEnteringMandatoryFields()
    {
        
        const isAddEndpointEnabled = this.saveEndpointButton
        await t
        .expect(isAddEndpointEnabled.hasAttribute('disabled')).ok('Save button is disabled') 
        .typeText(this.endPointName,'TestEndPoint')
        .click(this.endPointType)
        .click(TestCafeTestingLibrary.getByRole('option',{name : 'SOLACE_JMS_TOPIC'}))
        .typeText(this.endPointValue,'TestEndPoint')
        .expect(isAddEndpointEnabled.hasAttribute('disabled')).notOk('Add button is enabled') 
        .click(this.cancelButton)
        .wait(1000)
        .click(this.okButton)
    }

    async validateAlertOnCancelAfterEnteringMandatoryFields()
    {

        await t
        .click(this.addEndpointButton)
        .typeText(this.endPointName,'TestEndPoint')
        .click(this.endPointType)
        .click(TestCafeTestingLibrary.getByRole('option',{name : 'SOLACE_JMS_TOPIC'}))
        .typeText(this.endPointValue,'TestEndPoint')
        .click(this.cancelButton)
        .wait(1000)
        .click(this.okButton)
    }

    async validateAddEndpointModalDisplayedOnClick()
    {
        await this.viewConnector('Test456')
        await t.click(this.addEndpointButton)
        await t.expect(await Selector('div').withText('Add endpoint').nth(9).exists).ok()
    }
async validateSuccessfulEndpointAddition()
{
    await t
    .click(this.addEndpointButton)
    .typeText(this.endPointName,'TestEndPoint')
    .click(this.endPointType)
    .click(this.typeDropdownTopic)
    .typeText(this.endPointValue,'TestEndPoint')
    .wait(1000)
    .click(this.saveEndpointButton)
}

async validateErrorOnDuplicateEndpointTypeAndValue()
{
    await t
    .click(this.addEndpointButton)
    .typeText(this.endPointName,'TestEndPoint')
    .click(this.endPointType)
    .click(TestCafeTestingLibrary.getByRole('option',{name : 'SOLACE_JMS_TOPIC'}))
    .typeText(this.endPointValue,'demo.endpoint.value')
    .click(this.saveEndpointButton)
    .expect(this.duplicateEndPointMessage.exists).ok()
    .wait(1000)
    .click(this.closeDialog)
}

async validateMultipleEndpointsCanBeAddedToConnector()
{
    await t
    .click(this.addEndpointButton)
    .typeText(this.endPointName,'TestEndPoint')
    .click(this.endPointType)
    .click(this.typeDropdownTopic)
    .typeText(this.endPointValue,'TestEndPoint'+Date.now())
    .click(this.saveEndpointButton)
    .click(this.addEndpointButton)
    .typeText(this.endPointName,'TestEndPoint')
    .click(this.endPointType)
    .click(this.typeDropdownTopic)
    .typeText(this.endPointValue,'TestEndPoint'+Date.now())
    .wait(1000)
    .click(this.saveEndpointButton)
}

async validateTypeDropdownOptionsInAddEndpointModal()
{
    await t
    .click(this.addEndpointButton)
    .click(Selector('.adornment.end button svg'))
    const firstOptionText = await this.dropdownOptionEndPoint.nth(0).innerText;
    const secondOptionText = await this.dropdownOptionEndPoint.nth(1).innerText;
    await t
    .expect(firstOptionText).eql('SOLACE_JMS_TOPIC')
    .expect(secondOptionText).eql('SOLACE_JMS_QUEUE')
    .wait(1000)
    .click(this.closeDialog)
}

async validateAlertOnAddWithoutMandatoryFields()
{
    await t
    .click(this.addEndpointButton)
    .typeText(this.endPointName, 't')
    .wait(1000)
    .click(this.saveEndpointButton)
    .expect(this.typeMandatoryField.exists).ok()
    .expect(this.valueMandatoryField.exists).ok();
}


async validateSuccessfullEditAndAddEndpoint()
{
    await this.viewConnector('Test456')
    await t
    .click(this.editEndPoint)
    .typeText(this.endPointName,'TestEndPoint123')
    .click(this.endPointType)
    .click(this.typeDropdownTopic)
    .typeText(this.endPointValue,'TestEndPoint123')
    .click(this.updateEndpointButton)
}

async validateWarningMessageonCancelAfterEdit()
{

    await t
    .click(this.editEndPoint)
    .typeText(this.endPointName,'TestEndPoint')
    .click(this.endPointType)
    .click(this.typeDropdownTopic)
    .typeText(this.endPointValue,'demo.endpoint.value11')
    .click(this.cancelButton)
    .expect(this.cancelMessage.exists).ok()
    
}

async searchEndPoint(endPoint)
{
    const targetRow = Selector('table tbody tr').withText(endPoint);
    const editButton = targetRow.find('button').withText('Edit');
    await t.click(editButton)
}

async validateUnusedEndpointDelete()
{
    await this.viewConnector('Test456')
    await this.searchEndPoint('TestEndPoint')
await t
.typeText(this.endPointValue,'demo.endpoint.value11' + Date.now(), { replace: true })
.click(this.deleteEndpointButton)
.click(this.okButton)
}

async validateUsedEndpointDelete()
{
  
    await t.click(this.navigateToConnectorsPage)
    await this.viewConnector('Demo_Connector_1')
    await this.searchEndPoint('demo.endpoint.value')
    await t
.typeText(this.endPointValue,'demo.endpoint.value11', { replace: true })
.click(this.deleteEndpointButton)
.click(this.okButton)
.expect(this.unableToDeleteMessage.exists).ok()
}

    async viewConnector(connectorSearch)
    {

     this.searchConnector(connectorSearch);
     await t
     .click(this.viewLinks)

    }
    async viewOnlyConnectorName(connectorSearch)
    {

     await t
     .typeText(this.searchConnectorTextBox, connectorSearch)
     .click(this.viewLinks)

    }

    async validateEditButtonVisibilityOnAddConnectorsPage()
    {
        await this.viewConnector('Test123')
        await t.expect(this.editConnectors.exists).ok()

    }
    
    async validateErrorMessageForDuplicateConnectorNameEdit()
    {
        await t.click(this.navigateToConnectorsPage)
        await this.viewConnector('Test123')
        await t
        .click(this.editConnectors)
        .selectText(this.nameField) 
        .pressKey('delete')
        .typeText(this.nameField,'Test456')
        .click(this.saveConnectorButton)
        .expect(this.snackbarMessageDuplicate.exists).ok();

    }
    async validateNavigationToDetailsPageOnCancelWithoutChanges()
    {
        await t
        .click(this.navigateToConnectorsPage)
        await this.viewConnector('Test456')
        await t
        .click(this.editConnectors)
        .click(this.cancelButton)
        await t.expect(Selector('#root span').withText('Name').exists).ok();
    }
    async validateSaveButtonEnabledAfterConnectorNameEdit()
    {
        await t 
        .click(this.navigateToConnectorsPage)
        await this.viewOnlyConnectorName('Testcafe')
        await t
        .click(this.editConnectors)
        .selectText(this.nameField)
        .typeText(this.nameField, 'Testcafe' + Date.now(), { replace: true })
        .expect(this.saveConnectorButton.exists).ok(); 
    }
    async validateWarningPopupOnCancelAfterEditingConnector()
    {
        await t 
        .click(this.navigateToConnectorsPage)
        await this.viewOnlyConnectorName('Testcafe')
        await t
        .click(this.editConnectors)
        .selectText(this.nameField) 
        .pressKey('delete')
        .typeText(this.nameField,'Testcafe'+Date.now(),{replace: true})
        .click(this.cancelButton)
        .expect(this.cancelMessage.exists).ok()
        .click(this.okButton);

    }
    async validateUnusedConnectorCanBeDeleted(connectorToDelete)
    {
        await this.viewConnector(connectorToDelete)
        await t
        .click(this.deleteButton)
        .click(this.okButton)
        .expect(this.snackbarDeleteMessage.exists).ok();
    }
    async validateUsedConnectorCannotBeDeleted(connectorToDelete)
    {
        await t.wait(1000)
        await this.viewConnector(connectorToDelete)
        await t
        .click(this.deleteButton)
        .click(this.okButton)
        .expect(this.snackbarDeleteUnusedConnector.exists).ok();
    }
}
export default new connectorsPage() 