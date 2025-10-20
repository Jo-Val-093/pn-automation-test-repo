import { Selector, t } from 'testcafe';
const ENV_NAME = process.env.ENV_NAME;
import * as TestCafeTestingLibrary from '@testing-library/testcafe'; 
import { ClientFunction } from 'testcafe';
class companiesPage {
    constructor() {
        this.companiesHeaderText = Selector('#root h2').withText('Companies');
        this.addNewCompanyButton = Selector('button').withText('Add new company');
        this.resetButton = Selector('button').withText('Reset');
        this.tradingCountryTextBox = Selector('[placeholder="Trading country"]');
        this.searchCompanyTextBox = Selector('[placeholder="Search Proagrica ID/company name"]');
        this.proagricaIdColumn = Selector('h6').withText('Proagrica ID');
        this.companyNameColumn = Selector('h6').withText('Company name');
        this.tradingCountriesColumn = Selector('h6').withText('Trading countries');
        this.activeColumn = Selector('h6').withText('Active');
        this.actionsColumn = Selector('h6').withText('Actions');
        this.viewLinks = Selector('button').withText('View');
        this.rowPerPageDropdown = TestCafeTestingLibrary.getAllByRole('combobox').nth(1);
        this.row5PerPage = Selector('#menu- li').withText('5');
        this.row25PerPage = Selector('#menu- li').withText('25');
        this.row50PerPage = TestCafeTestingLibrary.getByRole('option', { name: /50/i  });
        this.lastPageClickButton = Selector('[data-testid="handleLastPageClick-button"] svg');
        this.pagesText = Selector('div').withText('pages').nth(9);
        this.firstCompany = Selector('[data-testid="table-row-0"] td:nth-child(2) h6');
        this.lastCompany = Selector('[data-testid^="table-row"]:last-child td:nth-child(2) h6');
        this.nextPageClickButton1 = Selector('[data-testid="handleNextClick-button"]')  // This selector is for company listing page as this page haven't been refactored to use the new components yet
        this.nextPageClickButton = Selector('button')  //  This selector is for other page like Journey, Transform, connector which are now using new components
                                .find('span.h-4.block.\\[\\&\\>\\*\\]\\:h-full')
                                .find('svg[data-testid="icon-chevron-right"]')
                                .parent('span') // back to span
                                .parent('button'); // back to button
        this.firstPageClickButton = Selector('[data-testid="handleFirstPageClick-button"] svg');
        this.firstProagricaID = Selector('[data-testid="table-row-0"] td:first-child h6');
        this.lastProagricaID = Selector('[data-testid^="table-row"]:last-child td:first-child h6');
        this.proagricaIDField = Selector('[name="proagricaId"]');
        this.companyNameField = Selector('[name="companyName"]');
        this.tradingCountriesArrowDropdown = Selector('[title="Open"]').nth(1).find('svg');
        this.activeCheckbox = Selector('[data-testid="checkbox-is-active"] input');
        this.addButton = Selector('[data-testid="confirm-button"] span').withText('Add');
        this.newCompanyAddedText = Selector('div').withText('New company added').nth(5);
        this.searchProagricaIDCompanyName = TestCafeTestingLibrary.getAllByPlaceholderText('Search Proagrica ID/company name')
        this.firstRowSearchResult = TestCafeTestingLibrary.findAllByRole('row', { index: 0 });
        this.clearSearchResults = TestCafeTestingLibrary.getByTestId('CancelIcon')
        this.searchByTradingCountries = TestCafeTestingLibrary.getByRole('button', { name: /open/i });
        this.tradingCountries = TestCafeTestingLibrary.getAllByRole('combobox').nth(0);
        this.confirmCancel = Selector('div').withText('Are you sure you want to proceed?').nth(4)
        this.crossButton = TestCafeTestingLibrary.getByTestId('cross-icon');
        this.closeIcon = Selector('[data-testid="close-icon"]')
        this.cancelButton = Selector('[data-testid="cancel-button"]')
        this.okCancel = Selector('span').withText('OK')
        this.editButton = Selector('span').withText('Edit')
        this.doneIcon = TestCafeTestingLibrary.getByTestId('done-icon');
        this.editCompanyName = '';
        this.getProagricaID = '';
        this.connectorMonitoring = Selector('#root button').withText('Connector monitoring');
        this.addConnectorsButton = Selector('[data-testid="tab-panel-3"] button').withText('Add connector');
        this.removeConnectorsButton = Selector('#tabpanel-3 button').withText('Remove').nth(3);
        this.enterConnectorsName = Selector('#tabpanel-3 [data-headlessui-state="focus"]');
        this.confirmAddConnectors = Selector('#root div').withText('Connector added successfully').nth(6);
        this.confirmRemoveConnectors = Selector('#root div').withText('Connector removed successfully').nth(6);
    }
        
    
    async verifyingCompaniesPageURL() {
        const currentUrl = await t.eval(() => window.location.href);
    
        const expectedDevUrl = 'https://proagrica-network-dev-eks-2.aga.eu-west-1.proagrica.telus.ag/admin/companies';
        const expectedTestUrl = 'https://proagrica-network-test-eks-2.aga.eu-west-1.proagrica.telus.ag/admin/companies';
        const expectedPreUrls = [
            'https://proagrica-network-pre-eks-04-us.agv.us-east-1.proagrica.telus.ag/admin/companies',
            'https://pre.proagrica.net/admin/companies'
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
    
    async verifyingDisplayOfCompaniesPage() {      
        await t
        .expect(this.companiesHeaderText.exists).ok()
        .expect(this.addNewCompanyButton.exists).ok()
        .expect(this.resetButton.exists).ok()
        .expect(this.tradingCountryTextBox.exists).ok()
        .expect(this.searchCompanyTextBox.exists).ok()
        .expect(this.proagricaIdColumn.visible).eql(true)
        .expect(this.companyNameColumn.visible).eql(true)
        .expect(this.tradingCountriesColumn.visible).eql(true)
        .expect(this.activeColumn.visible).eql(true)
        .expect(this.actionsColumn.visible).eql(true)
              
    } 

    async verifyingPaginationFunctionalityOnCompaniesPage() {      
        await t
        .expect(this.viewLinks.count).eql(10)
        .click(this.rowPerPageDropdown)
        .click(this.row5PerPage)
        .expect(this.viewLinks.count).eql(5)
        .click(this.rowPerPageDropdown)
        .click(this.row25PerPage)
        .expect(this.viewLinks.count).eql(25)
        .click(this.rowPerPageDropdown)
        .click(this.row50PerPage) 
        .expect(this.viewLinks.count).eql(50)
              
    } 
       
    async validateUserIsAbleToAccessAllPages() {
        while (true) {
            const isDisabled = await this.nextPageClickButton.hasClass('fill-neutral-300');
    
            if (!isDisabled) {
                await t.click(this.nextPageClickButton);
                await t.wait(1000); 
            } else {
                break;
            }
        }
        await t.expect(this.nextPageClickButton.hasClass('fill-neutral-300')).ok('Next page button should be disabled');

}
//  this method added only for companies page
 async validateUserIsAbleToAccessAllPages1() {
        while (true) {
            const isDisabled = await this.nextPageClickButton1.hasAttribute('disabled');
    
            if (!isDisabled) {
                await t.click(this.nextPageClickButton1);
                await t.wait(1000); 
            } else {
                break;
            }
        }
        await t.expect(this.nextPageClickButton1.hasAttribute('disabled')).ok('Next page button should be disabled');

}
    
    async validateSortingByCompanyName() {
        const firstCompanyName = await this.firstCompany.innerText
        await t.click(this.companyNameColumn)
        await t.click(this.lastPageClickButton)
        const lastCompanyName = await this.lastCompany.innerText
        await t.expect(firstCompanyName).eql(lastCompanyName)
    }
    
    async validateSortingByProagricaId() {      
        await t.click(this.proagricaIdColumn)
        const firstProagricaIDText = await this.firstProagricaID.innerText
        await t.click(this.proagricaIdColumn)
        await t.click(this.lastPageClickButton)
        const lastProagricaIDText = await this.lastProagricaID.innerText
        await t.expect(firstProagricaIDText).eql(lastProagricaIDText)
    }
    async clearSearchInput()
    {
        await t.click(this.clearSearchResults)
    }
    async validateSearchByProagricaId(proagricaId) {      
        await t.typeText(this.searchProagricaIDCompanyName, proagricaId)
        const firstRowResult = this.firstRowSearchResult.child('td').nth(0).innerText
        await t
        .expect(firstRowResult).eql(proagricaId)
        const rowCount =  await Selector('tbody > tr').count;
       // Assert that only one row is present
        await t.expect(rowCount).eql(1, 'Expected exactly one search result row');
        this.clearSearchInput()

    }
    async validateSearchByCompany(companyName) {      
        await t.typeText(this.searchProagricaIDCompanyName, companyName)
        const firstRowResult = this.firstRowSearchResult.child('td').nth(1).innerText
        await t.expect(firstRowResult).eql(companyName)
        this.clearSearchInput()
    }
    async validateSearchByTradingCountries(tradingCountry)
    {
        await t
        .wait(2000)
        .click(this.searchByTradingCountries)
        .click(TestCafeTestingLibrary.getByRole('option',{name:tradingCountry}));
        const firstRowResult = this.firstRowSearchResult.child('td').nth(2).innerText
        await t.expect(firstRowResult).eql(tradingCountry)
    }
//     async validatSortingByProagricaId() { 
//         const tableSelector = Selector('#populated-companies-table tbody') // for whole table
//         const rows = tableSelector.find('tr'); // iterate through rows, default 10 rows
//         const columnValues = []; // extracting elements and sorting in reverse order in this array
//         const columnValues2 = []; // clicking on proagrica id and then storing elements in this array
//         //Before sorting by proagrica id
//         await t.click(this.rowPerPageDropdown)
//         await t.click(this.row50PerPage)
//         for (let rowIndex = 0; rowIndex < await rows.count; rowIndex++) {
//             const cellValueSelector = rows.nth(rowIndex).find('td:nth-child(1)');
//             const cellValue = await cellValueSelector.textContent;
//             columnValues.push(cellValue); // inserting first 50 values into array
//         }
//         await t.click(this.nextPageClickButton)    
//             for (let rowIndex = 0; rowIndex < await rows.count; rowIndex++) {
//             const cellValueSelector = rows.nth(rowIndex).find('td:nth-child(1)');
//             const cellValue = await cellValueSelector.textContent;
//             columnValues.push(cellValue); // inserting remaining values into array
//         }
//         columnValues.sort().reverse();  // sorting the array in reverese order
//         //After sorting by proagrica id
//         await t.click(this.firstPageClickButton)
//         await t.click(this.proagricaIdColumn)
//         for (let rowIndex = 0; rowIndex < await rows.count; rowIndex++) {
//             const cellValueSelector = rows.nth(rowIndex).find('td:nth-child(1)');
//             const cellValue = await cellValueSelector.textContent;
//             columnValues2.push(cellValue); // inserting first 50 values into array
//         }
//         await t.click(this.nextPageClickButton)    
//             for (let rowIndex = 0; rowIndex < await rows.count; rowIndex++) {
//             const cellValueSelector = rows.nth(rowIndex).find('td:nth-child(1)');
//             const cellValue = await cellValueSelector.textContent;
//             columnValues2.push(cellValue); // inserting remaining values into array
//         }
//         await t.expect(columnValues).eql(columnValues2);        
    // };

    async getDistinctTradingCountries() {
        await t
            .click(this.rowPerPageDropdown)
            .click(this.row50PerPage)
        const getRowsCount = async () => {
            const rows = TestCafeTestingLibrary.queryAllByTestId(/^table-row-/); // Use a regex to find matching rows
            return await rows.count;
        };
        const getTradingCountriesDropdownOptions = async () => {
            await t.click(TestCafeTestingLibrary.getAllByRole('combobox').nth(0))
            const dropdownOptions = Selector('[data-option-index]')
            // Extract the text from each option
            const tradingCountryNames = [];

            for (let i = 0; i < await dropdownOptions.count; i++) {

                const textContent = await dropdownOptions.nth(i).innerText;
                tradingCountryNames.push(textContent); // Store the option text
            }

            return tradingCountryNames; // Return the list of tradingCountryNames
        };

        const countryList = new Set(); // Create a set to store the country list from the summary table
        while (true) {
            const rowCount = await getRowsCount();
            // Loop through each row in the table
            for (let rowIndex = 0; rowIndex < rowCount; rowIndex++) {
                // Find the element by test ID for the specific row and column (3rd column)
                const cell = TestCafeTestingLibrary.findByTestId(`table-row-${rowIndex}`).child('td').nth(2).child('h6').child('span');
                const countryValue = await cell.getAttribute('aria-label')
                if (typeof countryValue === 'string' && countryValue.includes(',')) {
                    // If it contains a comma, split it and add each part to the Set
                    const splitValues = countryValue.split(',').map(item => item.trim()); // Split and trim the values
                    splitValues.forEach(value => countryList.add(value)); // Add each value to the Set
                } else if (typeof countryValue === 'string') {
                    // If no comma, simply add the whole value to the Set
                    countryList.add(countryValue.trim());
                }

            }

            const isDisabled = await this.nextPageClickButton1.hasAttribute('disabled');
            if (!isDisabled) {
                await t.click(this.nextPageClickButton1);//click the nextpage until it is disabled
                await t.wait(1000); 
            } else {
                break;
            }
        }
        const distinctArray = Array.from(countryList); //Convert set to array for validation
        //sort the arrays to validate against the dropdown option
        const sortedDistinctCompaniesValues = [...distinctArray].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
         //get the dropdown list from Trading countries
        const dropdownTradingCountryList = await getTradingCountriesDropdownOptions();
        //Verify if the countries displayed in the summary table are in the dropdown list from Trading countries
        const allPresent = sortedDistinctCompaniesValues.every(country => dropdownTradingCountryList.includes(country));
        await t.expect(allPresent).ok();
    }
    async generateProagricaID() {
        const randomNumber = Math.floor(Math.random() * 9000000000);
        const proagricaIDCounter = randomNumber.toString().padStart(10, '0');
        return `PN${proagricaIDCounter}`;  
    }

    async createRandomCompany() {
        await t.click(this.addNewCompanyButton);
        await t.click(this.proagricaIDField);
        let randomProagricaID = await this.generateProagricaID();
        await t.typeText(this.proagricaIDField, randomProagricaID);
        await t.typeText(this.companyNameField, 'testcafeCompany' + Date.now());
        await t.click(this.tradingCountriesArrowDropdown);
        await t.click(Selector('[data-option-index] span').withText('United Kingdom'));
        await t.click(this.activeCheckbox)
        await t.click(this.addButton);
        await t.expect(this.newCompanyAddedText.visible).eql(true)
    } 
    async isAddButtonEnabled()
    {
        await t.click(this.proagricaIDField);
        let randomProagricaID = await this.generateProagricaID();
        await t.typeText(this.proagricaIDField, randomProagricaID);
        await t.typeText(this.companyNameField, 'testcafeCompany' + Date.now());
        await t.click(this.tradingCountriesArrowDropdown);
        await t.click(Selector('[data-option-index] span').withText('United Kingdom'));
        await t.click(this.activeCheckbox)
        await t.expect(this.addButton.hasClass('Mui-disabled')).notOk('Button should be disabled');
    }
    async closeTheAddCompanyModal()
    {
        await t
        .click(this.closeIcon)
        .click(this.okCancel)
    }
    async validateAddNewCompanyModal()
    {
      await t.click(this.addNewCompanyButton)
      await this.isAddButtonEnabled();
      await this.closeTheAddCompanyModal();
    
    } 
    async checkForDuplicateCompanyAndProagricaId()
    {
        await t
        .click(this.addNewCompanyButton)
        .click(this.proagricaIDField)
        .typeText(this.proagricaIDField,'PN9999999999')
        .typeText(this.companyNameField, 'Test123')
        .click(this.tradingCountriesArrowDropdown)
        .click(Selector('[data-option-index] span').withText('United Kingdom'))
        .click(this.activeCheckbox)
        await t.click(this.addButton)
        .expect(Selector('div.MuiSnackbarContent-message').withText('Adding new company failed').exists).ok()
        await this.closeTheAddCompanyModal();
    }    
    async checkForProagricaIdFormat()
    {
        await t
        .click(this.addNewCompanyButton)
        .click(this.proagricaIDField)
        .typeText(this.proagricaIDField,'PN99999999' )
        .typeText(this.companyNameField, 'PA11')
        .click(this.tradingCountriesArrowDropdown)
        .click(Selector('[data-option-index] span').withText('United Kingdom'))
        .click(this.activeCheckbox)
        await t.click(this.addButton)
        .expect(Selector('p').withText('Proagrica ID format is incorrect. Please use the correct one e.g. PN9999999999').exists).ok();
        await this.closeTheAddCompanyModal();
    }   
    async validateConfirmToCancel()
    {
        await t
        .click(this.addNewCompanyButton)
        .click(this.proagricaIDField)
        .typeText(this.proagricaIDField,'PN8912999999' )
        .typeText(this.companyNameField, 'PA18')
        .click(this.cancelButton)
        .expect(this.confirmCancel.exists).ok()
        .click(this.okCancel)
    }
    async searchForCompanyToEdit(companyName)
    {
        await t
        .typeText(this.searchProagricaIDCompanyName, companyName)
        .click(this.viewLinks.nth(0))
        .click(this.editButton)      
    }
    async removeTradingCountries()
    {
        const count = await this.clearSearchResults.count;
        for (let i = 0; i < count; i++) {
            // remove the first element
            await t.click(this.clearSearchResults.nth(0));
        }
    }
    async getCompanyName()
    {
       
    }
    async validateSuccessfulCompanyEdit()
    {
     
        await this.searchForCompanyToEdit('testcafeCompany');
        await t
        .expect(this.editButton.exists).ok()
        .selectText(this.companyNameField) 
        .pressKey('delete')
        this.editCompanyName = 'testcafeCompany' + Date.now()
      await t
       .typeText(this.companyNameField, this.editCompanyName)
      .click(this.doneIcon)
      .expect(Selector('h6').withText(this.editCompanyName).exists).ok()
      this.getProagricaID = await Selector('#information-table tbody tr td').nth(1).find('h6').innerText
    
    } 
    async validateRequiredFieldsInEditModal()
    {
        
        await t.click(Selector('a').withText('Companies /'))
        await this.searchForCompanyToEdit('testcafeCompany');
        await this.removeTradingCountries();
        await t
            .selectText(this.companyNameField)
            .pressKey('delete')
            .click(this.doneIcon)
            .expect(Selector('p').withText('Company name is required').exists).ok()
            .expect(Selector('p').withText('Trading countries is required').exists).ok()

    }

    async validateDuplicateFieldsInEditModal()
    {
        await t.click(Selector('a').withText('Companies /'))
        await this.searchForCompanyToEdit('testcafeCompany');
        await t
        .selectText(this.companyNameField)
        .pressKey('delete')
        .typeText(this.companyNameField, 'ABCTest3 Ltd')
        .click(this.doneIcon)
        .expect(TestCafeTestingLibrary.getByText('Company with entered Company name already exists.').exists).ok()
 }
    async validateProagricaIdFieldIsReadOnly()
    {
  const refreshPage = ClientFunction(() => location.reload());

await refreshPage();
        await t.click(Selector('a').withText('Companies /'))
        const companySearch = this.editCompanyName
        await this.searchForCompanyToEdit(companySearch);
        const PNID = this.getProagricaID
        const proagricaIDNumber = Selector('h6').withText(PNID)
        const tag = await proagricaIDNumber.tagName;
        await t
        .expect(proagricaIDNumber.exists).ok('Element should exist before checking tagName')
        .expect(tag).notEql('input', 'It should not be an input')
        .expect(tag).notEql('textarea', 'It should not be a textarea');

    }
    async validateUnsavedChangesWarningOnClose()
    {
        await t.click(Selector('a').withText('Companies /'))
        await this.searchForCompanyToEdit('testcafeCompany');
        await t
        .selectText(this.companyNameField)
        .pressKey('delete')
        .typeText(this.companyNameField, 'ABCTest3 Ltdss')
        .click(this.crossButton)
        .expect(this.confirmCancel.exists).ok()
        .click(this.okCancel)
    }
        async validateConnectorAddedForMonitoring()
    {
        await t
        .typeText(this.searchProagricaIDCompanyName, 'Test123')
        .click(this.viewLinks.nth(0))
        await t
        .click(this.connectorMonitoring)
        .expect(this.addConnectorsButton.exists).ok()
        await t
        .click(this.addConnectorsButton)
        .click('#tabpanel-3 .p-2')
        await t
        .expect(this.enterConnectorsName.exists).ok()
        .typeText(this.enterConnectorsName, 'MOCK ON RAMP')
        .click(Selector('.dropdown-options div').withText('MOCK ON RAMP'))
        .expect(this.confirmAddConnectors.exists).ok()
        await t
        .click(Selector('[data-testid="CloseIcon"]'))
    }
        async validateConnectorRemovedFromMonitoring()
    {
        await t.typeText(this.searchProagricaIDCompanyName, 'Test123')
        .click(this.viewLinks.nth(0))
        await t
        .click(this.connectorMonitoring)
        await t
        .expect(Selector('#tabpanel-3 td').withText('MOCK ON RAMP').exists).ok()
        .click(this.removeConnectorsButton)
        .expect(this.confirmRemoveConnectors.exists).ok()
        await t
        .click(Selector('[data-testid="CloseIcon"]'))
        .expect(Selector('#tabpanel-3 td').withText('MOCK ON RAMP').exists).notOk()

    }   


}
export default new companiesPage()