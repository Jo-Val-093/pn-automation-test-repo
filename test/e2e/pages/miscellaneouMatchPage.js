import { Selector, t } from 'testcafe';
import miscellaneousPage from './miscellaneousPage';
import catalogueManagementPage from './catalogueManagementPage';
import * as TestCafeTestingLibrary from '@testing-library/testcafe';
const ENV_NAME = process.env.ENV_NAME ;

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var member2 = repo.testData.member2

class miscellaneousMatchPage {
    constructor() {
        this.myCodesRadioButton = Selector('[name="selectOption"]')
        this.firstMatchLink = TestCafeTestingLibrary.getAllByRole('button', { name: 'Match' })
        this.firstUnmatchLink = TestCafeTestingLibrary.getAllByRole('button', { name: 'Unmatch' })
        this.matchMiscellaneousSuccessfullyText = Selector('[data-testid="alerts"] div').withText('Match miscellaneous successfully.').nth(2)
        this.unmatchMiscellaneousSuccessfullyText = Selector('div').withText('Unmatch miscellaneous successfully.').nth(5)
     }
     async verifyingDisplayMessageForMatchAndUnmatch() {

        await t

            .click(catalogueManagementPage.miscViewLink)
            .click(miscellaneousPage.myCodeTypeDropDown)
            .click(Selector('li').withText('Alpha'))
            .pressKey('tab')
            .click(miscellaneousPage.withAllMembersDropDown)
            .click(Selector('li').withText(member2))
            .pressKey('tab')
            .click(miscellaneousPage.noCodeTypeDropDown)
            .click(Selector('li').withText('Test1001'))
            .pressKey('enter')
            .click(miscellaneousPage.matchedDropdown)
            .click(miscellaneousPage.unmatchedSelection)
            .click(miscellaneousPage.matchButtonAfter)
            .click(this.myCodesRadioButton)
            .click(this.firstMatchLink)
            .expect(this.matchMiscellaneousSuccessfullyText.innerText).eql('Match miscellaneous successfully.')           
            .click(this.firstUnmatchLink)
            .expect(this.unmatchMiscellaneousSuccessfullyText.innerText).eql('Unmatch miscellaneous successfully.')
        
       }   
}
export default new miscellaneousMatchPage()