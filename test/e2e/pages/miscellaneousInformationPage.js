import { Selector, t } from 'testcafe';
import catalogueManagementPage from './catalogueManagementPage';
import miscellaneousPage from './miscellaneousPage';
import { nanoid } from 'nanoid';

const EditID1 = 'EditID1' + nanoid();
const EditID2 = 'EditID2' + nanoid();
const EditID3 = 'EditID3' + nanoid();
const EditID4 = 'EditID4' + nanoid();
const EditID5 = 'EditID5' + nanoid();
const EditDescription = 'EditDesc' + nanoid();

class miscellaneousInformationPage {
    constructor() {
        this.unmatchLink = Selector('#scrollableTable button').withText('Unmatch')
        this.confirmationRequiredPopUp = Selector('h5').withText('Confirmation required');
        this.unmatchWarningMessageText = Selector('div').withText('This code could be in use, are you sure you want t').nth(4);
        this.cancelButton = Selector('button').withText('Cancel');
        this.editButton = Selector('#information-table span').withText('Edit');
        this.independentID1TextBox = Selector('[name="independentIdOne"]');
        this.independentID2TextBox = Selector('[name="independentIdTwo"]');
        this.independentID3TextBox = Selector('[name="independentIdThree"]');
        this.independentID4TextBox = Selector('[name="independentIdFour"]');
        this.independentID5TextBox = Selector('[name="independentIdFive"]');
        this.descriptionTextBox = Selector('[name="description"]');
        this.doneIcon = Selector('[data-testid="done-icon"]');
     }

   async verifyingUserIsAbleToEditExistiingCodeType() {
       
       await t
       
           .click(catalogueManagementPage.miscViewLink)
           .click(miscellaneousPage.matchedDropdown)
           .click(miscellaneousPage.unmatchedSelection)
           .click(miscellaneousPage.viewLink)
           .click(this.editButton)
           .selectText(this.independentID1TextBox)
           .typeText(this.independentID1TextBox, EditID1)
           .pressKey('tab')
           .typeText(this.independentID2TextBox, EditID2)
           .pressKey('tab')
           .typeText(this.independentID3TextBox, EditID3)
           .pressKey('tab')
           .typeText(this.independentID4TextBox, EditID4)
           .pressKey('tab')
           .typeText(this.independentID5TextBox, EditID5)
           .pressKey('tab')
           .typeText(this.descriptionTextBox, EditDescription)
           .click(this.doneIcon)     
}
}
export default new miscellaneousInformationPage()