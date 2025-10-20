import { Selector, t } from "testcafe";
import dashBoardPage from "./dashBoardPage";
import transformManagerPage from "./transformManagerPage";
import networkSetupPage from "./networkSetupPage";
import * as TestCafeTestingLibrary from '@testing-library/testcafe'; 

const dropdownValuesMessageType = [];
const dropdownValuesMessageSubType = [];
const sortedSenderValues = [];
const sortedReceiverValues = [];
const dropdownValuesName = [];
let fixtureDataJourneyName = [];
var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var memberReceiverUC4 = repo.testData.memberReceiverUC4
var memberUC4 = repo.testData.memberUC4
class journeysPage {
  
  constructor() {
    //this.addNewJourneyButton = Selector('[data-testid="add-button"] span').withText("Add new journey");
    this.addNewJourneyButton = TestCafeTestingLibrary.getByRole('button',{ name: 'Add new journey'});
    this.journeyNameTextBox = TestCafeTestingLibrary.getAllByRole('textbox').nth(0);
    this.senderDivisionTextBox = TestCafeTestingLibrary.getAllByRole('textbox').nth(1);
    this.receiverDivisionTextBox = TestCafeTestingLibrary.getAllByRole('textbox').nth(2);
    // this.messageTypeTextBox = Selector('#root [class^="bg-inherit border-0 rounded-\\[inherit\\] px-3 py-2 ou"]').nth(12);
    // this.messageSubTypeTextBox = Selector('#root [class^="bg-inherit border-0 rounded-\\[inherit\\] px-3 py-2 ou"]').nth(14);

    this.directionArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(2);
    this.senderOperatorArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(3);
    this.senderArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(4);
    this.senderDivisionOperatorArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(5);
    this.receiverOperatorArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(6);
    this.receiverArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(7);
    this.receiverDivisionOperatorArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(8);
    this.messageStandardArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(9);
    this.messageTypeArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(10);
    this.messageSubTypeOperatorArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(11);
    this.messageSubTypeArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(12);
    this.messageModeArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(13);
    this.nextDestinationArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(14);
    this.nextDirectionArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(15);//same selector as below line, but depends on journey(send/receive)
    this.participantArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(15);//Connector dropdown
    this.endpointArrowDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(16);

    
    
    this.saveJourneyButton = TestCafeTestingLibrary.getByRole('button', { name: 'Save' });
    this.journeySavedMessage = Selector('div').withText('Journey successfully saved').nth(7);
    this.nameColumn = Selector('span').withText('Name').nth(1);
    this.senderColumn = Selector('span').withText('Sender').nth(1);
    this.receiverColumn = Selector('span').withText('Receiver').nth(1);
    this.messageTypeColumn = Selector('span').withText('Message type').nth(1);
    this.actionsColumn = Selector('span').withText('Actions');
    this.noJourneysAvailableMessage = Selector('td').withText('No journeys available')
    this.allViewLinks = Selector('button').withText('View');
    this.rowPerPageDropdown  = TestCafeTestingLibrary.getAllByTestId('icon-arrow-drop-down').nth(1);
    this.row25PerPage = TestCafeTestingLibrary.getByRole('option', { name: /25/i  });
    this.row50PerPage = TestCafeTestingLibrary.getByRole('option', { name: /50/i  });
    this.row100PerPage = TestCafeTestingLibrary.getByRole('option', { name: /100/i  });
    this.nameField = Selector('span').withText('Name');
    this.directionField = Selector('span').withText('Direction');
    this.senderField = Selector('span').withText('Sender');
    this.senderDivisionField = Selector('span').withText('Sender division');
    this.receiverField = Selector('span').withText('Receiver');
    this.receiverDivisionField = Selector('span').withText('Receiver division');
    this.messageTypeField = Selector('span').withText('Message type');
    this.messageSubtypeField = Selector('span').withText('Message subtype');
    this.nextDestinationField = Selector('span').withText('Next destination');
    this.activeCheckbox = Selector('span').withText('Active');
    this.editButton = Selector('button').withText('Edit');
    this.deleteButton = Selector('button').withText('Delete');
    this.detailsTable = Selector('span').withText('Details');
    this.stagesHeader = Selector('div').withText('Stages').nth(4);
    this.orderColumn = Selector('span').withText('Order');
    this.applicationColumn = Selector('span').withText('Application');
    this.descriptionColumn = Selector('span').withText('Description');
    this.propertiesColumn = Selector('span').withText('Properties');
    this.actionsColumnStage = Selector('span').withText('Actions');
    this.addStage = TestCafeTestingLibrary.getByRole('button',{ name: 'Add stage'});
    this.editStage = TestCafeTestingLibrary.getByRole('button',{ name: 'Edit'});
    this.addStageApplicationDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(0);
    this.addStageApplicationDropdownForOffRampJourney = Selector('.w-5.h-5.m-auto').nth(14);
    this.addStageapplicationSelection = TestCafeTestingLibrary.getAllByRole('textbox').nth(0);
    this.addStageDescriptionInput = TestCafeTestingLibrary.getAllByRole('textbox').nth(0);
    this.addStageDescriptionInputForOffRampJourney = Selector('[class^="bg-inherit border-0 rounded-\\[inherit\\] pl-1 py-2 ou"]').nth(20);
    this.addStageAddButton = Selector('button').withText('Add').nth(1);
    this.addStageTransformNameDropdown = Selector('.w-5.h-5.m-auto').nth(14);
    this.addStageTransformNameDropdownForOffRampJourney = Selector('.w-5.h-5.m-auto').nth(15);
    this.addStageTransformNameSelection = Selector('li');
    this.tableRowSelector = Selector('[data-testid^="table-row-"]'); // base selector for the table rows
    this.nextPageClickButton = Selector('div.flex.items-center.gap-2').find('button').nth(3);
    this.nextPageButton = Selector('div.flex.items-center.gap-2').find('button').nth(2);
    this.journeysBreadCrumbs = Selector('a').withText('Journeys /')
    this.okButton = Selector('button').withText('OK').withAttribute('class', /bg-primary-gradient-1/);
    this.journeyDeletedMessage = Selector('div').withText('Journey has been deleted').nth(5);
    this.searchButton = Selector('button').withText('Search');

    // selectors for both types of journeys: default and off-ramp
    this.selectors = {
      default: {
          addStageApplicationDropdown:TestCafeTestingLibrary.getAllByRole('combobox').nth(0),
          addStageDescriptionInput: TestCafeTestingLibrary.getAllByRole('textbox').nth(0),
          addStageTransformNameDropdown: TestCafeTestingLibrary.getAllByRole('combobox').nth(1)
      },
      offRamp: {
          addStageApplicationDropdown: TestCafeTestingLibrary.getAllByRole('combobox').nth(0),
          addStageDescriptionInput: TestCafeTestingLibrary.getAllByRole('textbox').nth(0),
          addStageTransformNameDropdown: TestCafeTestingLibrary.getAllByRole('combobox').nth(1)
      }
  };  
 
    this.journeyTabFilter = Selector('[data-testid="icon-chevron-down"]')
    this.nameDropdown = Selector('[data-testid="icon-arrow-drop-down"]').nth(1);
    this.messageTypeDropdown = Selector('[data-testid="icon-arrow-drop-down"]').nth(4)
    this.messageSubTypeDropdown = Selector('[data-testid="icon-arrow-drop-down"]').nth(5)        
    this.senderDropdown = Selector('[data-testid="icon-arrow-drop-down"]').nth(6)
    this.receiverDropdown = Selector('[data-testid="icon-arrow-drop-down"]').nth(7)
    this.journeysTableRows = Selector('table tbody tr');
        
  }

  async inputJourneyName(journeyName) {
    const updatedJourneyName = journeyName + Date.now();
    await t.typeText(this.journeyNameTextBox,updatedJourneyName);
    return updatedJourneyName;
    
  }

  // async inputSenderDivision(senderDivision) {
  //   await t.typeText(this.senderDivisionTextBox, senderDivision);
  // }

  async inputSenderDivision(senderDivision) {
    const updatedSenderDivision = senderDivision + Date.now();
     await t.typeText(this.senderDivisionTextBox, updatedSenderDivision);
     return updatedSenderDivision ;
  }
 async inputSenderDivisionNew(senderDivision) {
     await t
    //     .expect(this.senderDivisionTextBox.exists).ok({ timeout: 5000 })
    //     .scrollIntoView(this.senderDivisionTextBox)
        .typeText(this.senderDivisionTextBox, senderDivision, { replace: true });
}


  async inputReceiverDivision(receiverDivision) {
    await t.typeText(this.receiverDivisionTextBox, receiverDivision);

  }

  // async inputMessageType(messageType) {
  //   const updatedMessageType = messageType + Date.now();
  //   await t.typeText(this.messageTypeTextBox, updatedMessageType);
  //   return updatedMessageType;
  // }

   async directionDropdownSelection(direction) {
    await t.click(this.directionArrowDropdown);
    await t.click(TestCafeTestingLibrary.getByRole('option',{name :direction}));
  }

  async senderDropdownSelection(sender) {
    await t.click(this.senderArrowDropdown);
    await t.click(TestCafeTestingLibrary.getByRole('option',{name :sender}));
  }
  async senderOperatorDropdownSelection(senderOperator) {
    await t.click(this.senderOperatorArrowDropdown);
    await t.click(TestCafeTestingLibrary.getByRole('option',{name :senderOperator}));
  }
  // async senderDivisionOperatorDropdownSelection(senderDivisionOperator) {
  //   await t.click(this.senderDivisionOperatorArrowDropdown);
  //   await t.click(Selector('.dropdown-options').withText(senderDivisionOperator));
  // }
  async senderDivisionOperatorDropdownSelection(senderDivisionOperator) {
    await t.click(this.senderDivisionOperatorArrowDropdown);
    await t.click(TestCafeTestingLibrary.getByRole('option',{name :senderDivisionOperator}))
  }

    async receiverDropdownSelection(receiver) {
    await t.click(this.receiverArrowDropdown);
    await t.click(TestCafeTestingLibrary.getByRole('option',{name :receiver}));
  }

    async receiverOperatorDropdownSelection(receiverOperator) {
    await t.click(this.receiverOperatorArrowDropdown);
    await t.click(TestCafeTestingLibrary.getByRole('option',{name :receiverOperator}));
  }
  
   async receiverDivisionOperatorDropdownSelection(receiverDivisionOperator) {
    await t.click(this.receiverDivisionOperatorArrowDropdown);
    await t.click(TestCafeTestingLibrary.getByRole('option',{name:receiverDivisionOperator}));
  }
  async messageStandardDropdownSelection(messageStandard) {
    await t.click(this.messageStandardArrowDropdown);
    await t.click(TestCafeTestingLibrary.getByRole('option',{name:messageStandard}));
  }

  async messageTypeDropdownSelection(messageType) {
    await t.click(this.messageTypeArrowDropdown);
    await t.click(TestCafeTestingLibrary.getByRole('option',{name:messageType}));
  }
  async messageSubTypeOperatorArrowDropdownSelection(messageSubTypeOperator) {
      await t.click(this.messageSubTypeOperatorArrowDropdown);
    await t.click(TestCafeTestingLibrary.getByRole('option',{name:messageSubTypeOperator}));
  }
    async messageSubTypeDropdownSelection(messageSubType) {
    await t.click(this.messageSubTypeArrowDropdown);
    await t.click(TestCafeTestingLibrary.getByRole('option',{name:messageSubType}));
  }
  async nextDestinationDropdownSelection(nextDestination) {
    await t.click(this.nextDestinationArrowDropdown);
    await t.click(TestCafeTestingLibrary.getByRole('option',{name:nextDestination}));
  }

  async nextDirectionDropdownSelection(nextDirection) {
    await t.click(this.nextDirectionArrowDropdown);
    await t.click(TestCafeTestingLibrary.getByRole('option',{name:nextDirection}));
  }

  async participantDropdownSelection(participant) {
    await t.click(this.participantArrowDropdown);
    await t.click(TestCafeTestingLibrary.getByRole('option',{name:participant}));
  }

  async endpointDropdownSelection(endpoint) {
    await t.click(this.endpointArrowDropdown);
    await t.click(TestCafeTestingLibrary.getByRole('option',{name:endpoint}));
  }
  async saveJourney() {
    await t.click(this.saveJourneyButton);
    await t.expect(this.journeySavedMessage.visible).ok();
  }

  // Sets journey fields, saves the journey, and asserts the journey save message visibility.

  async setJourneyFieldsSaveAndAssert(fields) {
    await t.click(this.addNewJourneyButton);
    // Destructure fields object with default values
    const {
      journeyName = null,
      direction = null,
      senderName = null,
      senderDivisionOperator = null,
      senderDivision = null,
      receiverName = null,
      receiverDivisionOperator = null,
      receiverDivision = null,
      messageStandard = null,
      messageType = null,
      messageSubTypeOperator = null,
      messageSubType = null,
      nextDestination = null,
      nextDirection = null,
      participant = null,
      endpoint = null,
      receiverOperator = null,
      senderOperator = null,
      senderDivisionNew = null,
    } = fields;
    // Set journey fields based on provided values
    if (journeyName !== null) {
      // Call inputJourneyName to get the updatedJourneyName
      const updatedJourneyName = await this.inputJourneyName(journeyName);
      // Save the updatedJourneyName to the fixture context
      t.fixtureCtx.updatedJourneyName = updatedJourneyName;
      fixtureDataJourneyName.push(t.fixtureCtx.updatedJourneyName);

    }
    if (direction !== null) {
      await this.directionDropdownSelection(direction);
    }
        
    if (senderOperator !== null) {
      await this.senderOperatorDropdownSelection(senderOperator);
    }
    if (senderName !== null) {
      await this.senderDropdownSelection(senderName);
    }

    if (senderDivisionOperator !== null) {
      await this.senderDivisionOperatorDropdownSelection(senderDivisionOperator);
    }

    // if (senderDivision !== null) {
    //   await this.inputSenderDivision(senderDivision);
    // }
    if (!senderDivisionNew) {
      if (senderDivision == null) {
        // Call inputSenderDivision to get the updatedSenderDivision
        const updatedSenderDivision = await this.inputSenderDivision("SD");
 
       // Save the updatedSenderDivision to the fixture context
       t.fixtureCtx.updatedSenderDivision = updatedSenderDivision;
      }
      else {
        await t.typeText(this.senderDivisionTextBox, t.fixtureCtx.updatedSenderDivision);
      }
    }
    else{
      if (senderDivisionNew !== null) {
        await this.inputSenderDivisionNew(senderDivisionNew);
      }
    }

    

     if (receiverOperator !== null) {
      await this.receiverOperatorDropdownSelection(receiverOperator);
    }

    if (receiverName !== null) {
      await this.receiverDropdownSelection(receiverName);
    }
    
    if (receiverDivisionOperator !== null) {
      await this.receiverDivisionOperatorDropdownSelection(receiverDivisionOperator);
    }


    if (receiverDivision !== null ) {
      await this.inputReceiverDivision(receiverDivision);
    }
    // if (messageType == null) {
    //   // Call inputMessageType to get the updatedMessageType
    //   const updatedMessageType = await this.inputMessageType("Invoice");

    //   // Save the updatedMessageType to the fixture context
    //   t.fixtureCtx.updatedMessageType = updatedMessageType;
    // }
    // else {
    //   await t.typeText(this.messageTypeTextBox, t.fixtureCtx.updatedMessageType);
    // }

    if (messageStandard !== null) {
      await this.messageStandardDropdownSelection(messageStandard);
    }

    if (messageType !== null) {
      await this.messageTypeDropdownSelection(messageType);
    }
    if (messageSubTypeOperator !== null) {
      await this.messageSubTypeOperatorArrowDropdownSelection(messageSubTypeOperator);
     
    }

    if (messageSubType !== null) {
      await this.messageSubTypeDropdownSelection(messageSubType);
    }
    if (nextDestination !== null) {
      await this.nextDestinationDropdownSelection(nextDestination);
    }
    if (nextDirection !== null) {
      await this.nextDirectionDropdownSelection(nextDirection);
    }
    if (participant !== null) {
      await this.participantDropdownSelection(participant);
    }
    if (endpoint !== null) {
      await this.endpointDropdownSelection(endpoint);
    }
    // Save the journey and assert the journey save message visibility
    await this.saveJourney();
  }

  async validatingDisplayOfJourneyListingPage() {
    
    await t
      .click((this.journeyTabFilter))
      .expect(this.nameColumn.visible).eql(true)
      .expect(this.senderColumn.visible).eql(true)
      .expect(this.receiverColumn.visible).eql(true)
      .expect(this.messageTypeColumn.visible).eql(true)
      .expect(this.actionsColumn.visible).eql(true)
      .expect(this.addNewJourneyButton.visible).eql(true);
      
    const networkSetupBreadCrumbText = (await Selector('.text-base a').innerText).replace(/\s+/g, ' ')
    const journeysBreadCrumbText = await Selector('.text-base span').innerText
    const completeBreadcrumbsText = networkSetupBreadCrumbText + journeysBreadCrumbText;
    await t.expect(completeBreadcrumbsText).eql('Network setup / Journeys')
  }

  async verifyingNoJourneysAvailableMessage() {
    
    await t
      .expect(this.noJourneysAvailableMessage.visible).eql(true)
      
  }

  async verifyingPaginationFunctionalityOnJourneysPage() {
    await t
      .expect(this.allViewLinks.count).lte(10)
      .click(this.rowPerPageDropdown)
      .click(this.row25PerPage)
      .expect(this.allViewLinks.count).lte(25)
      .click(this.rowPerPageDropdown)
      .click(this.row50PerPage)
      .expect(this.allViewLinks.count).lte(50)
      .click(this.rowPerPageDropdown)
      .click(this.row100PerPage)
      .expect(this.allViewLinks.count).lte(100)
  }

  async navigateToViewJourneyPage() {

    await t
      .click(this.allViewLinks);
    
  }

  async verifyURLWithDigitsAtEnd() {

    const currentURL = await t.eval(() => window.location.href);      // Get the current URL

    // Verify that the URL ends with digits using a regular expression
    await t
      .expect(currentURL).match(/\/\d+$/);
  }

  async extractColumnData(tableRows, columnIndex, nextPageButton) {
  
    const columnDataArray = [];
    while (true) {
        for (let rowIndex = 0; rowIndex < await tableRows.count; rowIndex++) {
           // const cellContent = await tableRows.nth(rowIndex).find(`td:nth-child(${columnIndex}) h6`).textContent;
            const cellContent = await tableRows.nth(rowIndex).child('td').nth(columnIndex).textContent;
   
            columnDataArray.push(cellContent);
            
        }

        const isDisabled = await nextPageButton.hasClass('base--disabled');
        
        if (!isDisabled) {
            await t.click(nextPageButton);
            await t.wait(1000); // Adjust wait time as needed
        } else {
            break;
        }
      
    }
    return columnDataArray;
}
  
async validatingDisplayOfViewJourneyPage() {
    
  await t
    .expect(this.detailsTable.visible).eql(true)
    .expect(this.nameField.visible).eql(true)
    .expect(this.directionField.visible).eql(true)
    .expect(this.senderField.visible).eql(true)
    .expect(this.senderDivisionField.visible).eql(true)
    .expect(this.receiverField.visible).eql(true)
    .expect(this.receiverDivisionField.visible).eql(true)
    .expect(this.messageTypeField.visible).eql(true)
    .expect(this.messageSubtypeField.visible).eql(true)
    .expect(this.nextDestinationField.visible).eql(true)
    .expect(this.activeCheckbox.visible).eql(true)
    .expect(this.editButton.visible).eql(true)
    .expect(this.deleteButton.visible).eql(true); 
  }

  async validatingDisplayOfStagesTableOnJourneyPage() {
    
    await t
      .expect(this.stagesHeader.visible).eql(true)
      .expect(this.orderColumn.visible).eql(true)
      .expect(this.applicationColumn.visible).eql(true)
      .expect(this.descriptionColumn.visible).eql(true)
      .expect(this.propertiesColumn.visible).eql(true)
      .expect(this.actionsColumnStage.visible).eql(true)
  }

  async clickOnEditButton() {
    await t.click(this.editButton)
  }
  
  async addCodeMatcherStageToJourney() {
    
    await t
      .click(this.addStage)
      .click(this.addStageApplicationDropdown)
      .click(TestCafeTestingLibrary.getByRole('option', { name: 'Code Matcher' })) // role=option
      .typeText(this.addStageDescriptionInput, 'stage' + await transformManagerPage.generateRandomNumber())
      .click(this.addStageAddButton)
  }
 
    
  async addTransformStageToJourney(transformName, journeyType = 'default') {
    
    //appropriate set of selectors will be used based on the journey type

    const selectors = this.selectors[journeyType];

    await t
        .click(this.addStage)
        .click(selectors.addStageApplicationDropdown)
         .wait(1000)
       // .click(TestCafeTestingLibrary.getByText('Transform'))
        .click(TestCafeTestingLibrary.getByRole('option', { name: 'Transform' }))  // role=option
        .typeText(selectors.addStageDescriptionInput, 'stage' + await transformManagerPage.generateRandomNumber())
        .click(selectors.addStageTransformNameDropdown);

    switch (transformName) {
      // Transforms with matching display names
      case 'Saxon XSL Transform_validURL':
      case 'Saxon XSL Transform_invalidURL':
      case 'XPath Metadata Transform':
      case 'Saxon XSLT And XPath Metadata Transform':
      case 'Xalan XSL Transform':
      case 'FLAT_FILE_TRANSFORM_With fixed length data':
      case 'FLAT_FILE_TRANSFORM_With semicolon separator':
      case 'XSD_VALIDATION Transform':
      case 'Basic_xml_validation':
      case 'Schematron XSL Validation Transform':
      case 'Schematron to HTML Report':
      case 'EDI to XML Converter Transform':
      case 'XML to EDI Converter - ANSI X12 Transform':
      case 'XML_TO_JSON Transform':
      case 'XML to EDI Converter - EDIFACT Transform':
      case 'JSON_TO_XML_CONVERTER Transform':
      case 'UTF_8_BOM_REMOVER Transform':
      case 'VALUE_METADATA Transform Edi ANSI X12':
      case 'VALUE_METADATA Transform Edifact':
      case 'CHANGE_CHARACTER_ENCODING from ISO-8859-1 to UTF-8':
      case 'CHANGE_CHARACTER_ENCODING from UTF-8 to ISO-8859-1':
      case 'CHARACTER ENCODING from ISO-8859-1 to ISO-8859-1 and EDIFACT to xml':

        await t
            .click(TestCafeTestingLibrary.getByText(transformName))
            .click(this.addStageAddButton);
        break;

      default:
        throw new Error(`Unknown transform type: ${transformName}`);
      }

    }

  async assertJourneyNameInTableRows() {
    let journeyNameFound = false;
  
    while (true) {
      const rowCount = await this.tableRowSelector.count; // Get the total number of rows
  
      // Iterate through each row
      for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
        const journeyNameColumn = this.tableRowSelector.nth(rowIndex).find('td').nth(0); // New selector for the current row's first column (journey name)
        const journeyNameRowData = await journeyNameColumn.innerText; // Access the data in the journey name column
  
        if (journeyNameRowData === t.fixtureCtx.updatedJourneyName) {
          journeyNameFound = true;
          break; // Break the loop if journey name found on first page
        }
      }
  
      if (journeyNameFound) {
        break; 
      }
  
      // Click on next page button until we see the next page button is disabled
      const isDisabled = await this.nextPageButton.hasClass('Mui-disabled');
  
      if (!isDisabled) {
        await t.click(this.nextPageButton);
      } else {
        break; // Exit the loop if next page button is disabled
      }
    }
  
    // Assert that the journey name was found
    await t.expect(journeyNameFound).ok('The journey name was not found in any of the table rows.');
  }
  async navigateToJourneyListing() {
    await t.click(this.journeysBreadCrumbs);
  }  

  async deleteJourney() {
    await t
      .click(this.deleteButton)
      .click(this.okButton)
      .expect(this.journeyDeletedMessage.visible).eql(true);
  }

  async validateSenderReceiverAndNameDropdownValuesNotDuplicates(dropdownname) {
    if (dropdownname == 'sender') {
      await t.click(this.senderDropdown)
    }
    else if (dropdownname == 'receiver') {
      await t.click(this.receiverDropdown)
    }
    else if (dropdownname == 'name') {
      await t.click(this.nameDropdown)
    }
    const allLists = [];
    const options =  Selector('.dropdown-option'); // This will select all the options from the dropdown
    for (let i = 0; i < await options.count; i++) {
      const values = await options.nth(i).innerText;
      allLists.push(values);
    }
    let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)
    const duplicates = (findDuplicates(allLists))
    var lengthOfDuplicate = duplicates.length
    if (lengthOfDuplicate > 0) {
      await t.expect(lengthOfDuplicate).eql(0);
    } else {
      console.log('No duplicates found.');
    }
    if (dropdownname == 'sender') {
      await t.click(this.senderDropdown)
    }
    else if (dropdownname == 'receiver') {
      await t.click(this.receiverDropdown)
    }
    else if (dropdownname == 'name') {
      await t.click(this.nameDropdown)
    }
  }
 
  async validateDropdownValuesInAscOrder(dropdown) {
    if (dropdown == 'messageType') {
      await t.click(this.messageTypeDropdown)
      const messageTypes = Selector('.dropdown-option')// It will gives all the dropdown values
      for (let i = 0; i < await messageTypes.count; i++) {
        const messageTypevalues = await messageTypes.nth(i).innerText;
        dropdownValuesMessageType.push(messageTypevalues);
      }
      const sortedDropdownValues = dropdownValuesMessageType.sort((a, b) => a - b);
      await t.expect(dropdownValuesMessageType).eql(sortedDropdownValues)
      await t.click(this.messageTypeDropdown)
    }
    else if (dropdown == 'messageSubType') {
      await t.click(this.messageSubTypeDropdown)
      const messageSubTypes =  Selector('.dropdown-option');
      for (let i = 0; i < await messageSubTypes.count; i++) {
        const messageSubTypevalues = await messageSubTypes.nth(i).innerText;
        dropdownValuesMessageSubType.push(messageSubTypevalues);
      }
      const sortedDropdownValues = dropdownValuesMessageSubType.sort((a, b) => a - b);
      await t.expect(dropdownValuesMessageSubType).eql(sortedDropdownValues)
      await t.click(this.messageSubTypeDropdown)
    }
    else if (dropdown == 'name') {
      await t.click(this.nameDropdown)
      const nameValues =  Selector('.dropdown-option');
      for (let i = 0; i < await nameValues.count; i++) {
        const values = await nameValues.nth(i).innerText;
        dropdownValuesName.push(values);
      }
      const sortedDropdownValues = dropdownValuesName.sort((a, b) => a - b);
      await t.expect(dropdownValuesName).eql(sortedDropdownValues)
      await t.click(this.messageSubTypeDropdown)
    }
  }

  async validateSenderReceiverDropdownValues(dropdown) {
    const dropdownValues = [];
    if (dropdown == 'sender') {
      await t.click(this.senderDropdown)
    }
    else if (dropdown == 'receiver') {
      await t.click(this.receiverDropdown)
    }

    const divisionList =  Selector('.dropdown-option');

    for (let i = 0; i < await divisionList.count; i++) {
      const divisionListvalues = await divisionList.nth(i).innerText;
      dropdownValues.push(divisionListvalues);
    }
    const sortedDropdownValues = dropdownValues.sort((a, b) => a - b);
    await t.expect(dropdownValues).eql(sortedDropdownValues)
 
    if (dropdown == 'sender') {
      await t.click(this.senderDropdown)
      sortedSenderValues.push(...sortedDropdownValues);
    }
    else if (dropdown == 'receiver') {
      await t.click(this.receiverDropdown)
      sortedReceiverValues.push(...sortedDropdownValues);
    }
 
  }

  // async getDistinctMessageTypeMessageSubType(filter) {
    
  //   if (filter == 'sender') {
  //     var columnIndex = 1;
  //   }
  //   if (filter == 'receiver') {
  //     var columnIndex = 2;
  //   }
  //   if (filter == 'messageType') {
  //     var columnIndex = 3;
  //   }
  //   if (filter == 'name') {
  //     var columnIndex = 0;
  //   }

  //   const messageList = new Set();
  //  while (true) {
  //     const rowCount = await this.journeysTableRows.count; // Get the total number of rows
  //    // Iterate through each row
  //     for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
  //   const valuesInColumn = await this.journeysTableRows.nth(rowIndex).child('td').nth(columnIndex).textContent;
  //      // Adding the column data to the Array   
  //       messageList.add(valuesInColumn)
  //     }
     

  //     // Click on next page button until we see the next page button has class name as Mui-disabled
  //     const isDisabled = await this.nextPageButton.hasClass('base--disabled');

  //     if (!isDisabled) {
  //       await t.click(this.nextPageButton);
  //     } else {
  //       break;  // Exit the loop if next page button is disabled
  //     }
  //   }
  //   //Get MessageType and MessageSubtype dropdown values and sort it
  //   const distinctArray = Array.from(messageList);
  //   const sortedDistinctValues = [...distinctArray].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  //   if (filter == 'messageType') {
  //     //Remove 'All' value from the list
  //     var newArray = dropdownValuesMessageType.filter((value) => value != 'All');
  //     var sortedDropdownValuesMessageType = [...newArray].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  //     //Verify the sorted dropdown value and sorted distint values of messageTypes are equal
  //     await t.expect(sortedDropdownValuesMessageType).eql(sortedDistinctValues)
     
  //   }
  //   else if (filter == 'sender') {
  //     //Remove 'All' and empty value from the list
  //     var sortedSenderDistinctValues = sortedDistinctValues.filter((value) => value != 'All' && value !== "");
  //     var newArray = sortedSenderValues.filter((value) => value != 'All' && value !== "");
  //     var sortedDropdownValuesSender = [...newArray].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  //     //Verify the sorted dropdown value and sorted distint values of messageSubypes are equal
  //    await t.expect(sortedDropdownValuesSender).eql(sortedSenderDistinctValues)
      
  //   }
  //   else if (filter == 'receiver') {
  //     //Remove 'All' and empty value from the list
  //     var sortedReceiverDistinctValues = sortedDistinctValues.filter((value) => value != 'All' && value !== "");
  //     var newArray = sortedReceiverValues.filter((value) => value != 'All' && value !== "");
  //     var sortedDropdownValuesReceiver = [...newArray].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  //     //Verify the sorted dropdown value and sorted distint values of messageSubypes are equal
  //    await t.expect(sortedDropdownValuesReceiver).eql(sortedReceiverDistinctValues)
  //   }
  //   if (filter == 'name') {
  //     //Remove empty spaces from the disctinct values
  //     var sortedDistinctValuesTrimmed = sortedDistinctValues.map(value => value.replace(/\s+$/, ''));
  //     //Remove 'All' value from the list
  //     var newArray = dropdownValuesName.filter((value) => value != 'All');
  //     var sortedDropdownValuesName = [...newArray].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
  //     //Verify the sorted dropdown value and sorted distint values of messageTypes are equal
  //     await t.expect(sortedDropdownValuesName).eql(sortedDistinctValuesTrimmed)
     
  //   }

  // }

  async getDistinctMessageTypeMessageSubType(filter) {
  const columnIndexMap = {
    name: 0,
    sender: 1,
    receiver: 2,
    messageType: 3
  };
  const columnIndex = columnIndexMap[filter];
  const messageList = new Set();

  // Collect all unique values from paginated table
  while (true) {
    const rowCount = await this.journeysTableRows.count;
    for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
      const cellText = await this.journeysTableRows.nth(rowIndex).child('td').nth(columnIndex).textContent;
      messageList.add(cellText);
    }

    const isDisabled = await this.nextPageClickButton.hasClass('base--disabled');
    if (isDisabled) break;
    await t.click(this.nextPageButton);
  }

  // Process values
  let distinctValues = Array.from(messageList).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  // Common filters
  const removeAllAndEmpty = (arr) => arr.filter(v => v !== 'All' && v.trim() !== '');

  // Compare against dropdown values based on filter
  const dropdownMap = {
    messageType: dropdownValuesMessageType,
    sender: sortedSenderValues,
    receiver: sortedReceiverValues,
    name: dropdownValuesName
  };

  let expectedValues = dropdownMap[filter];

  if (filter === 'name') {
    distinctValues = distinctValues.map(v => v.trim()).filter(v => v !== '');
    expectedValues = dropdownMap[filter].filter(v => v !== 'All');
  } else if (['sender', 'receiver'].includes(filter)) {
    distinctValues = removeAllAndEmpty(distinctValues);
    expectedValues = removeAllAndEmpty(expectedValues);
  } else if (filter === 'messageType') {
    expectedValues = expectedValues.filter(v => v !== 'All');
  }

  expectedValues = [...expectedValues].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));

  await t.expect(expectedValues).eql(distinctValues);
}


  async moveEmptyValuesToEnd(arr) {
    let concatValues = [];
    // Filter out the empty values
    const nonEmpty = arr.filter(value => value !== null  && value !== "");
    // Filter the empty values
    const empty = arr.filter(value => value === null || value === "");
    // Concatenate non-empty values with the empty values
    concatValues = nonEmpty.concat(empty);
    return concatValues;
  }
  async moveEmptyValuesToTop(arr) {
    let concatValues = [];
    // Filter out the empty values
    const nonEmpty = arr.filter(value => value !== null  && value !== "");
    // Filter the empty values
    const empty = arr.filter(value => value === null || value === "");
    // Concatenate empty values with the non empty values
    concatValues = empty.concat(nonEmpty);
    return concatValues;
  }

  async searchAndDeleteJourney()
  {
    await t
    .click(this.searchButton)
    .click(this.allViewLinks )
    .click(this.deleteButton)
    .click(this.okButton );
  }

async deleteJourneysByPrefixes(t, prefixes) {
    while (true) {
        const journeyRows = Selector('table tbody tr');
        const rowCount = await journeyRows.count;

        if (rowCount === 0) {
            console.log(`No journeys found for prefixes: ${prefixes.join(', ')}`);
            break;
        }

        let deletedSomething = false;
        let foundMatchingButProtected = false;

        for (let i = rowCount - 1; i >= 0; i--) {
            const row = journeyRows.nth(i);
            const journeyName = (await row.find('td').nth(0).innerText).trim();
            const journeyNameLower = journeyName.toLowerCase();

            if (journeyNameLower === 'no journeys available') {
                console.log(`Only placeholder row left for prefixes: ${prefixes.join(', ')}`);
                return;
            }

            const matchesPrefix = prefixes.some(prefix => journeyNameLower.startsWith(prefix.toLowerCase()));
            const isProtected = journeyNameLower.includes('do not edit or delete');

            if (matchesPrefix) {
                if (!isProtected) {
                    // Delete journey
                    const viewButton = row.find('button, a').withText('View');
                    if (await viewButton.exists && await viewButton.visible) {
                        await t.scrollIntoView(viewButton).click(viewButton).wait(1500);
                    }

                    const deleteButton = TestCafeTestingLibrary.getByText('Delete', { timeout: 5000 });
                    await t.expect(deleteButton.exists).ok('Delete button not found');
                    await t.click(deleteButton).wait(500);

                    const okButton = Selector('button').withText('OK');
                    if (await okButton.exists && await okButton.visible) {
                        await t.click(okButton).wait(500);
                        console.log(`Deleted: ${journeyName}`);
                    }

                    deletedSomething = true;
                    // break here is removed so it can delete multiple in one pass
                } else {
                    foundMatchingButProtected = true;
                    console.log(`Skipped (protected): ${journeyName}`);
                }
            } else {
                console.log(`Skipped (prefix mismatch): ${journeyName}`);
            }
        }

        if (!deletedSomething) {
            if (foundMatchingButProtected) {
                console.log(`All journeys with matching prefixes are protected. Stopping.`);
            } else {
                console.log(`No journeys with matching prefixes found. Stopping.`);
            }
            break;
        }
    }
}



  async findAndViewJourneyByName(journeyToFind)
  {
    await t.click(this.journeyTabFilter)
    await t.click(this.nameDropdown)
    await t.click(Selector('.dropdown-options div').withText(journeyToFind))
    await t.click(this.searchButton)
    await t.click(this.allViewLinks )

  }

  async deleteAllStages() {
    while (await this.allViewLinks.exists) {
      await t.click(this.editButton);
      await t.click(this.editStage);
      await t.click(this.deleteButton);
      await t.click(this.saveJourneyButton);
    }
  }
  async isJourneyPresent(journeyPrefix) {
    const regex = new RegExp(journeyPrefix, 'i');
    const journeyCell = Selector('table')
        .filterVisible()
        .find('td:nth-child(1)')
        .withText(regex);

    return await journeyCell.exists; // returns true/false
}
async retryUntilSuccess(t, fn, journeyPrefix, retries = 3, delayMs = 2000) {
    for (let attempt = 1; attempt <= retries; attempt++) {

        // Pre-check: skip if journey already exists
        const existsBefore = await this.isJourneyPresent(journeyPrefix);
        if (existsBefore) {
            console.log(`Journey ${journeyPrefix} already exists. Skipping creation.`);
            return;
        }

        try {
            console.log(`Journey creation attempt ${attempt}`);
            await fn(); // run creation

            // Navigate back to listing page
            await t.click(this.journeysBreadCrumbs);

            // Validate journey exists after creation
            const existsAfter = await this.isJourneyPresent(journeyPrefix);
            if (!existsAfter) throw new Error(`Journey ${journeyPrefix} not found after creation`);

            console.log(`Journey ${journeyPrefix} created successfully on attempt ${attempt}`);
            return; // exit retry loop

        } catch (err) {
            console.warn(`Attempt ${attempt} failed: ${err.message}`);
            if (attempt === retries) throw err;
            console.log(`Retrying after ${delayMs}ms...`);
            await t.wait(delayMs);
        }
    }
}


}

export default new journeysPage();
