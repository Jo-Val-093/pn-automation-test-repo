import { Selector, t } from 'testcafe';
import networkSetupPage from './networkSetupPage';
import dashBoardPage from './dashBoardPage';
import * as TestCafeTestingLibrary from '@testing-library/testcafe'; 

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var sourcePNID = repo.testData.sourcePNID
class transformManagerPage {
    constructor() {
        this.transformsText = Selector('#root h1').withText('Transforms');
        this.addNewTransformButton = Selector('button').withText('Add new transform');
        this.noTransfomrsAvailableText = Selector('td').withText('No transforms available.');
        this.transformNameInputField = Selector('[class="input"]').nth(1);
        this.transformDescInputField = Selector('[class="input"]').nth(2);
        this.saveTransformButton = Selector('button').withText('Save');
        this.cancelTransformButton = Selector('button').withText('Cancel');
        this.atLeastOneStepSnackbar = Selector('.MuiSnackbarContent-message');
        this.transformDetailsDiv = Selector('#root h1').withText('Transform details');
        this.stepsDiv = Selector('#root h3').withText('Steps');
        this.basicInformationText = Selector('span').withText('Basic information');
        this.transformNameField = Selector('span').withText('Name *');
        this.transformDescriptionField = Selector('span').withText('Description *')
        this.orderColumn = Selector('span').withText('Order');
        this.typeColumn = Selector('span').withText('Type');
        this.nameColumn = Selector('span').withText('Name');
        this.propertiesColumn = Selector('span').withText('Properties');
        this.actionsColumn = Selector('span').withText('Actions');
        this.addStep = TestCafeTestingLibrary.getByRole('button', { name: 'Add step' });
        this.nameIsRequiredText = TestCafeTestingLibrary.getByText('Name is required');
        this.descriptionIsRequiredText = TestCafeTestingLibrary.getByText('Description is required');
        this.stepTypeDropdownArrow = TestCafeTestingLibrary.queryAllByTestId('icon-arrow-drop-down').nth(1);
        this.saxonXSLTransformSelection = TestCafeTestingLibrary.getByRole('option',{name :'Saxon XSL transform'})
        this.xPathMetadataSelection = TestCafeTestingLibrary.getByRole('option',{name :'XPath metadata'})
        this.stepNameInputField = Selector('[class="input"]').nth(4);
        this.stepPropertiesURLInputField =  Selector('[class="input"]').nth(5);
        this.addStepAddButton = Selector('button').withText('Add').nth(1);
        this.addStepCancelButton = Selector('button').withText('Cancel').nth(1);
        this.transformSuccessSavedSnackBar = Selector('div').withText('Transform successfully saved').nth(5);
        this.urlRequiredText = TestCafeTestingLibrary.getByText('URL is required');
        this.metadataKeyRequiredText = TestCafeTestingLibrary.getByText('Metadata key is required');
        this.xPathRequiredText = TestCafeTestingLibrary.getByText('XPath is required');
        this.stepPropertiesMetadataKeyInputField = Selector('[class="input"]').nth(5);
        this.stepPropertiesXPathInputField = Selector('[class="input"]').nth(6);
        this.URLIsNotValidSnackBar = Selector('div').withText('URL is not valid').nth(6);
        this.unableToSaveTransformSnackBar = Selector('div').withText('Unable to save transform').nth(5)
        this.editStep = TestCafeTestingLibrary.queryByRole('button', { name: 'Edit' });
        this.updateButton = Selector('button').withText('Update');
        this.viewLinkForFirstTransform = TestCafeTestingLibrary.getAllByRole('button', { name: 'View' }).nth(0);
        this.transformNameFieldInViewModal = Selector('span').withText('Name');
        this.transformDescriptionFieldInViewModal = Selector('span').withText('Description');
        this.deleteTransformButton = Selector('button').withText('Delete');
        this.editTransformButton = Selector('button').withText('Edit');
        this.moveDownButtton = TestCafeTestingLibrary.getByRole('button', { name: 'Move down' });
        this.moveUpButton = TestCafeTestingLibrary.getByRole('button', { name: 'Move up' });
        this.deleteStepButton = Selector('button').withText('Delete');




    }  
    
    async navigateToTransformManagerPage(){
        await t
            .click(dashBoardPage.networkSetupLink)
            .click(networkSetupPage.viewLinkTMCard)
                   
    }   

    async validatingDisplayOfTransformListingPage(){
        const columnHeaders = [
            {
                selector: Selector('span').withText('Name'),
                text: 'Name'
            },
            {
                selector: Selector('span').withText('Description'),
                text: 'Description'
            },
            {
                selector: Selector('span').withText('Actions'),
                text: 'Actions'
            }        
        ];

            for (let i = 0; i < columnHeaders.length; i++) {
            const currentColumnLabel = columnHeaders[i].selector;
            await t.expect(currentColumnLabel.textContent).eql(columnHeaders[i].text);
            }
           
            const networkSetupBreadCrumbText = (await Selector('a').withText('Network setup /').innerText).replace(/\s+/g, ' ')
            const transformsBreadCrumbText = await Selector('span').withText('Transforms').innerText
            const completeBreadcrumbsText = networkSetupBreadCrumbText + transformsBreadCrumbText;
            await t
            .expect(completeBreadcrumbsText).eql('Network setup / Transforms')
            .expect(this.transformsText.visible).eql(true)
            .expect(this.addNewTransformButton.visible).eql(true);  
    }      
    
    
    async validatingTextMessageWhenNoTransformAvailable(){
             await t.expect(this.noTransfomrsAvailableText.visible).eql(true);
    } 

    async addingTransformWithoutSteps() {
        
        await t
            .click(this.addNewTransformButton)
            .click(this.saveTransformButton)
            .expect(this.nameIsRequiredText.visible).eql(true)
            .expect(this.descriptionIsRequiredText.visible).eql(true)
            .typeText(this.transformNameInputField, 'test')
            .typeText(this.transformDescInputField, 'test')
            .click(this.saveTransformButton)
            .expect(this.atLeastOneStepSnackbar.innerText).eql('At least one step should be added to the transform')  
    } 

    async validatingDisplayOfAddNewTransformModal() {
        
        await t
            .click(this.addNewTransformButton)
            .expect(this.transformDetailsDiv.visible).eql(true)
            .expect(this.basicInformationText.visible).eql(true)
            .expect(this.stepsDiv.visible).eql(true)
            .expect(this.transformNameField.visible).eql(true)
            .expect(this.transformDescriptionField.visible).eql(true)
            .expect(this.orderColumn.visible).eql(true)
            .expect(this.typeColumn.visible).eql(true)
            .expect(this.nameColumn.visible).eql(true)
            .expect(this.propertiesColumn.visible).eql(true)
            .expect(this.actionsColumn.visible).eql(true)
            .expect(this.saveTransformButton.visible).eql(true)
            .expect(this.cancelTransformButton.visible).eql(true)
            .expect(this.addStep.visible).eql(true)
    } 

    async generateRandomNumber() {
        return Math.floor(Math.random() * 10) + 1; 
    }
          
    async addTransformStepPropertiesValidation() {
        
        await t
            .click(this.addNewTransformButton)
            .typeText(this.transformNameInputField, 'createdViaScript' + Date.now())
            .typeText(this.transformDescInputField, 'This transform is added by testcafe script')
            .click(this.addStep)
            .click(this.stepTypeDropdownArrow)
            .click(this.saxonXSLTransformSelection)
            .typeText(this.stepNameInputField, 'step' + await this.generateRandomNumber())
            .click(this.addStepAddButton)
            .expect(this.urlRequiredText.visible).eql(true)
            .typeText(this.stepPropertiesURLInputField, 'incorrectURLFormat')
            .click(this.addStepAddButton)
            .click(this.saveTransformButton)
            .expect(this.URLIsNotValidSnackBar.visible).eql(true)
            .click(this.editStep)
            .click(this.stepTypeDropdownArrow)
            .click(this.xPathMetadataSelection)
            .typeText(this.stepNameInputField, 'step' + await this.generateRandomNumber())
            .click(this.updateButton)
            .expect(this.metadataKeyRequiredText.visible).eql(true)
            .expect(this.xPathRequiredText.visible).eql(true)
            .typeText(this.stepPropertiesMetadataKeyInputField, 'key' + await this.generateRandomNumber(), { replace: true })
            .typeText(this.stepPropertiesXPathInputField, '//incorrect/Xpath/Format/', { replace: true })
            .click(this.updateButton)
            .click(this.saveTransformButton)
            .expect(this.unableToSaveTransformSnackBar.visible).eql(true) // this require proper error message, like xpath not valid..requeted ticket to be raised          
           
    }
       
    async viewTransform() {
        await t.click(this.viewLinkForFirstTransform);

    }        
    
    async validatingDisplayOfViewTransformModal() {

        await t
            .expect(this.basicInformationText.visible).eql(true)
            .expect(this.stepsDiv.visible).eql(true)
            .expect(this.transformNameFieldInViewModal.visible).eql(true)
            .expect(this.transformDescriptionFieldInViewModal.visible).eql(true)
            .expect(this.orderColumn.visible).eql(true)
            .expect(this.typeColumn.visible).eql(true)
            .expect(this.nameColumn.visible).eql(true)
            .expect(this.propertiesColumn.visible).eql(true)
            .expect(this.actionsColumn.visible).eql(true)
            .expect(this.deleteTransformButton.visible).eql(true)
            .expect(this.editTransformButton.visible).eql(true)        
    }

    async editTransformNameAndDesc() {
        
        await t
            .click(this.editTransformButton)
            .typeText(this.transformNameInputField, 'editedViaScript' + Date.now(), { replace: true })
            .typeText(this.transformDescInputField, 'editedViaScript' + Date.now(), { replace: true })
            .expect(this.moveDownButtton.exists).ok()
            .expect(this.moveUpButton.exists).ok()
            .click(this.saveTransformButton)
            .expect(this.transformSuccessSavedSnackBar.visible).eql(true)
    }   

    async deletingAllStepsFromTransfrom() {
        await t.click(this.editTransformButton);   
        // Loop until no more steps are visible
        while (await this.editStep.exists) {
            await t
                .click(this.editStep)
                .click(this.deleteStepButton);
        }
    
        await t
            .click(this.saveTransformButton)
            .expect(this.atLeastOneStepSnackbar.visible).eql(true)
    }
    
    async saveTransform() {
        await t
            .click(this.saveTransformButton)
            .expect(this.transformSuccessSavedSnackBar.visible).eql(true);
    }

    async createTransform(type) {
            
        await t
            .click(this.addNewTransformButton)
            .typeText(this.transformNameInputField, 'createdViaScript' + Date.now())
            .typeText(this.transformDescInputField, 'This transform is added by testcafe script')
    
        switch (type) {
            case 'saxonXSLT':
                await this.addStepWithSaxonXSLTValidURL();
                break;
            case 'saxonXSLT_InvalidURL':
                await this.addStepWithSaxonXSLTVInvalidURL();
                break;
            case 'xpathMetadata':
                await this.addStepWithXPathMetadata();
                break;
            case 'saxonXSLT_and_xpathMetadata':
                await this.addStepWithSaxonXSLTValidURL();
                await this.addStepWithXPathMetadata();
                break;
            default:
                throw new Error('Invalid transform type');
        }
    
        await this.saveTransform()
      }
    
    async addStepWithSaxonXSLTValidURL() {
        await t
            .click(this.addStep)
            .click(this.stepTypeDropdownArrow)
            .click(this.saxonXSLTransformSelection)
            .typeText(this.stepNameInputField, 'Any XML to F4FXML' + await this.generateRandomNumber())
            .typeText(this.stepPropertiesURLInputField, `http://mappings.f4f.com/F4FXML/ClientMappings/${sourcePNID}/test/anyxmlToF4FXML.xsl`)
            .click(this.addStepAddButton);
    }

    async addStepWithSaxonXSLTVInvalidURL() {
        await t
            .click(this.addStep)
            .click(this.stepTypeDropdownArrow)
            .click(this.saxonXSLTransformSelection)
            .typeText(this.stepNameInputField, 'Any XML to F4FXML' + await this.generateRandomNumber())
            .typeText(this.stepPropertiesURLInputField, 'http://invalidURLtest.com')
            .click(this.addStepAddButton);
    }
    
    async addStepWithXPathMetadata() {
        await t
            .click(this.addStep)
            .click(this.stepTypeDropdownArrow)
            .click(this.xPathMetadataSelection)
            .typeText(this.stepNameInputField, 'step' + await this.generateRandomNumber())
            .typeText(this.stepPropertiesMetadataKeyInputField, 'key' + await this.generateRandomNumber())
            .typeText(this.stepPropertiesXPathInputField, '//Test/TestNode' + await this.generateRandomNumber())
            .click(this.addStepAddButton);
    }

    async addMoreStepOnExistingTransform(type) {
        await t 
            .click(this.editTransformButton)
            switch (type) {
                case 'saxonXSLT':
                    await this.addStepWithSaxonXSLTValidURL();
                    break;
                case 'saxonXSLT_InvalidURL':
                    await this.addStepWithSaxonXSLTVInvalidURL();
                    break;
                case 'xpathMetadata':
                    await this.addStepWithXPathMetadata();
                    break;
                case 'saxonXSLT_and_xpathMetadata':
                    await this.addStepWithSaxonXSLT();
                    await this.addStepWithXPathMetadata();
                    break;
                default:
                    throw new Error('Invalid transform type');
            }
        await this.saveTransform();
    }




} 

export default new transformManagerPage()