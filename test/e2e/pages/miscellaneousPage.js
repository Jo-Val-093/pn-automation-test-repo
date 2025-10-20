import { Selector, t } from "testcafe";
import { passwordSuper, usernameSuper } from "../helpers/configuration";
import codeMatcherPage from "./codeMatcherPage";
import dashBoardPage from "./dashBoardPage";
import { nanoid } from 'nanoid';
import catalogueManagementPage from "./catalogueManagementPage";
import miscellaneousInformationPage from "./miscellaneousInformationPage";
import miscellaneouMatchPage from "./miscellaneouMatchPage";
import data from "../data/data.json"

const randomCodeType = 'AutoCode' + nanoid();
const randomIndependentID1 = 'AutoID1' + nanoid();
const randomDescription = 'AutoDesc' + nanoid();
const randomCodeTypeWithSpecialCharacter = 'AutoSC$&%*' + nanoid();
const randomID1WithSpecialCharacter = 'AutoSC£**&' + nanoid();

const dataSet = require('../data/data.json')

class miscellanousPage {

    constructor() {
        this.viewLink = Selector('#codetypes-table span').withText('View')
        this.addNewCodeButton = Selector('#root span').withText('Add new code');
        this.codeTypeInputField = Selector('[data-testid="text-field-codeType"] [name="codeType"]');
        this.independentID1InputField = Selector('[data-testid="text-field-independentIdOne"] [name="independentIdOne"]');
        this.descriptionInputField = Selector('[data-testid="text-field-description"] [name="description"]');
        this.addButton = Selector('span').withText('Add').nth(1);
        this.errorMessage = Selector('#root div').withText('A record with same memberId, CodeType, Id(1), Id(2').nth(4);
        this.cancelButton = Selector('span').withText('Cancel');
        this.newCodeAddedMessage = Selector('#root div').withText('New miscellaneous added').nth(4);
        this.codeTypeRequire = Selector('p').withText('Code type is required');
        this.id1Require = Selector('p').withText('Independent ID 1 is required');
        this.descriptionRequire = Selector('p').withText('Description is required');
        this.listOfAllMyMiscCodes = Selector('#root h3').withText('List of all my miscellaneous codes');
        this.codeTypeColumn = Selector('#codetypes-table h6').withText('Code type');
        this.independentID1Column = Selector('#codetypes-table h6').withText('Independent ID 1');
        this.independentID2Column = Selector('#codetypes-table h6').withText('Independent ID 2');
        this.independentID3Column = Selector('#codetypes-table h6').withText('Independent ID 3');
        this.descriptionColumn = Selector('#codetypes-table h6').withText('Description');
        this.actionsColumn = Selector('#codetypes-table h6').withText('Actions');
       // this.matchedDropdown = Selector('[title="Open"]').nth(4).find('svg')
        this.matchedDropdown = Selector('[data-testid="ArrowDropDownIcon"]').nth(3);
        this.showAllSelection = Selector('[data-option-index="0"] span').withText('Show all');
        this.unmatchedSelection = Selector('[data-option-index="1"] span').withText('Unmatched')
        this.searchBox = Selector('[data-testid="text-field-outlined-search"] [name="search"]');
        this.id1Value = Selector('#information-table tbody tr').nth(1).find('td').nth(1).find('h6');
        this.id2Value = Selector('#information-table tbody tr').nth(2).find('td').nth(1).find('h6')
        this.id3Value = Selector('#information-table tbody tr').nth(3).find('td').nth(1).find('h6')
        this.descriptionValue = Selector('[data-testid="lastElement"]').nth(1).find('h6');     
        this.myCodeTypeDropDown = Selector('[title="Open"]').nth(0).find('svg')
        this.withAllMembersDropDown = Selector('[title="Open"]').nth(1).find('svg')
        this.noCodeTypeDropDown = Selector('[title="Open"]').nth(2).find('svg')
        this.miscellanousParagraph = Selector('p').withText('Miscellaneous');
        this.matchButtonBefore = Selector('button').withAttribute('data-testid', 'match-button');
        this.matchButtonAfter = Selector('#root span').withText('Match');
        // Match button may work for both stats need to test -  Selector('[data-testid="match-button"]')
        this.resetButtonBefore = Selector('button').withAttribute('data-testid', 'reset-caption-bar-button');  
        this.resetButtonAfter = Selector('#root span').withText('Reset');  
    }

    async verifyingUserCanNotAddDuplicateCodeTypeWithDuplicateIndependentID1OnMiscellanousPage() {
        await t
            .click(Selector(catalogueManagementPage.miscViewLink))
            .click(Selector(this.addNewCodeButton))
            .typeText(Selector(this.codeTypeInputField), data.duplicateCodeType)
            .pressKey('tab')
            .typeText(Selector(this.independentID1InputField), data.duplicateID1)
            .pressKey('tab')
            .pressKey('tab')
            .pressKey('tab')
            .pressKey('tab')
            .pressKey('tab')
            .typeText(Selector(this.descriptionInputField), randomDescription)
            .click(Selector(this.addButton))
            .expect(Selector(this.errorMessage).innerText).contains("A record with same memberId, CodeType, Id(1), Id(2) and Id(3) already exists")
            .click(Selector(this.cancelButton))
    }  
    
    async verifyingUserCanAddDuplicateCodeTypeWithUniqueIndependentID1OnMiscellanousPage() {                      
      
            await t
                //.click(Selector(catalogueManagementPage.miscViewLink))
                .click(Selector(this.addNewCodeButton))
                .typeText(Selector(this.codeTypeInputField),data.duplicateCodeType)
                .pressKey('tab')
                .typeText(Selector(this.independentID1InputField), randomIndependentID1)
                .pressKey('tab')
                .pressKey('tab')
                .pressKey('tab')
                .pressKey('tab')
                .pressKey('tab')
                .typeText(Selector(this.descriptionInputField), randomDescription)
                .click(Selector(this.addButton))
                .expect(Selector(this.newCodeAddedMessage).innerText).eql("New miscellaneous added");       
        } 
    

    async verifyingUserCanAddUniqueCodeTypeWithUniqueIndependentID1OnMiscellanousPage() {
       
        await t
           //.click(Selector(catalogueManagementPage.miscViewLink))
            .click(Selector(this.addNewCodeButton))
            .typeText(Selector(this.codeTypeInputField), randomCodeType)
            .pressKey('tab')
            .typeText(Selector(this.independentID1InputField), randomIndependentID1)
            .pressKey('tab')
            .pressKey('tab')
            .pressKey('tab')
            .pressKey('tab')
            .pressKey('tab')
            .typeText(Selector(this.descriptionInputField), randomDescription)
            .click(Selector(this.addButton))
            .expect(Selector(this.newCodeAddedMessage).innerText).eql("New miscellaneous added");
            
    }

    async verifyingUserCanAddUniqueCodeTypeWithDuplicateIndependentID1OnMiscellanousPage() {
      
        await t
            //.click(Selector(catalogueManagementPage.miscViewLink))
            .click(Selector(this.addNewCodeButton))
            .typeText(Selector(this.codeTypeInputField), randomCodeType)
            .pressKey('tab')
            .typeText(Selector(this.independentID1InputField), data.duplicateID1)
            .pressKey('tab')
            .pressKey('tab')
            .pressKey('tab')
            .pressKey('tab')
            .pressKey('tab')
            .typeText(Selector(this.descriptionInputField), randomDescription)
            .click(Selector(this.addButton))
            .expect(Selector(this.newCodeAddedMessage).innerText).eql("New miscellaneous added");
            
    }


    async verifyingUserCanNotAddAnyNewCodeTypeWithoutMandatoryCodeTypeFieldOnMiscellanousPage() {
        
        await t
            //.click(Selector(catalogueManagementPage.miscViewLink))
            .click(Selector(this.addNewCodeButton))
            .typeText(Selector(this.independentID1InputField), randomIndependentID1)
            .typeText(Selector(this.descriptionInputField), randomDescription)
            .click(Selector(this.addButton))
            .expect(Selector(this.codeTypeRequire).innerText).eql("Code type is required")
            .click(Selector('span').withText('Cancel'));
            
    }

    async verifyingUserCanNotAddAnyNewCodeTypeWithoutMandatoryIndependentID1FieldOnMiscellanousPage() {
        
        await t
            //.click(Selector(catalogueManagementPage.miscViewLink))
            .click(Selector(this.addNewCodeButton))
            .typeText(Selector(this.codeTypeInputField), randomCodeType)
            .typeText(Selector(this.descriptionInputField), randomDescription)
            .click(Selector(this.addButton))
            .expect(Selector(this.id1Require).innerText).eql("Independent ID 1 is required")
            .click(Selector('span').withText('Cancel'));
            
    }

    async verifyingUserCanNotAddAnyNewCodeTypeWithoutMandatoryDescriptionFieldOnMiscellanousPage() {
        
        await t
            //.click(Selector(catalogueManagementPage.miscViewLink))
            .click(Selector(this.addNewCodeButton))
            .typeText(Selector(this.codeTypeInputField), randomCodeType)
            .typeText(Selector(this.independentID1InputField), randomIndependentID1)
            .click(Selector(this.addButton))
            .expect(Selector(this.descriptionRequire).innerText).eql("Description is required")
            .click(Selector('span').withText('Cancel'));
            
    }

    async verifyingUserIsAbleToViewUploadedProductsOnMiscellanousPage() {
        
        await t
            .click(Selector(catalogueManagementPage.miscViewLink))
            .expect(Selector(this.listOfAllMyMiscCodes).innerText).eql("List of all my miscellaneous codes")
            .expect(Selector(this.codeTypeColumn).visible).eql(true)
            .expect(Selector(this.independentID1Column).visible).eql(true)
            .expect(Selector(this.independentID2Column).visible).eql(true)
            .expect(Selector(this.independentID3Column).visible).eql(true)
            .expect(Selector(this.descriptionColumn).visible).eql(true)
            .expect(Selector(this.actionsColumn).visible).eql(true);
    }


    async verifyingUserCanAddUniqueCodeTypeAndID1UsingSpecialCharacter() {
       
        await t
            //.click(Selector(catalogueManagementPage.miscViewLink))
            .click(Selector(this.addNewCodeButton))
            .typeText(Selector(this.codeTypeInputField), randomCodeTypeWithSpecialCharacter)
            .pressKey('tab')
            .typeText(Selector(this.independentID1InputField), randomID1WithSpecialCharacter)
            .pressKey('tab')
            .pressKey('tab')
            .pressKey('tab')
            .pressKey('tab')
            .pressKey('tab')
            .typeText(Selector(this.descriptionInputField), randomDescription)
            .click(Selector(this.addButton))
            .expect(Selector(this.newCodeAddedMessage).innerText).eql("New miscellaneous added");
            
    }

    async verifyingUserCanSearchAproductByID1OnProductsPage() {
       
        await t
            .click(Selector(this.matchedDropdown))       
            .click(this.showAllSelection)
            .pressKey('tab')
            .typeText(Selector(this.searchBox), "Beta")
            .wait(5000)
            .click(Selector(this.viewLink))
            .expect(Selector(this.id1Value).innerText).eql("Beta")            
            
    }


    async verifyingUserCanSearchAproductByID2OnProductsPage() {
       
        await t
            .click(this.miscellanousParagraph)
            .click(Selector(this.matchedDropdown))       
            .click(this.showAllSelection)
            .pressKey('tab')
            .typeText(Selector(this.searchBox), "Gamma")
            .click(Selector(this.viewLink))
            .expect(Selector(this.id2Value).innerText).eql("Gamma")            
            
    }

    async verifyingUserCanSearchAproductByID3OnProductsPage() {
       
        await t
            .click(this.miscellanousParagraph)
            .click(Selector(this.matchedDropdown))       
            .click(this.showAllSelection)
            .pressKey('tab')
            .typeText(Selector(this.searchBox), "Delta")
            .wait(5000)
            .click(Selector(this.viewLink))
            .expect(Selector(this.id3Value).innerText).eql("Delta")            
            
    }

    async verifyingUserCanSearchAproductByDescriptionOnProductsPage() {
       
        await t
            .click(this.miscellanousParagraph)
            .click(Selector(this.matchedDropdown))       
            .click(this.showAllSelection)
            .pressKey('tab')
            .typeText(Selector(this.searchBox), "Eta")
            .wait(5000)
            .click(Selector(this.viewLink))
            .expect(Selector(this.descriptionValue).innerText).eql("Eta")            
            
    }

    async verifyingUserCanSearchAproductByAlphabetAndSpecialCharacternOnProductsPage() {
       
        await t
            .click(this.miscellanousParagraph)
            .click(Selector(this.matchedDropdown))       
            .click(this.showAllSelection)
            .pressKey('tab')
            .typeText(Selector(this.searchBox), 'ID***', { replace: true })
            .wait(5000)
            .expect(Selector(this.viewLink).exists).ok({ timeout: 5000 })
            .click(Selector(this.viewLink))
            .expect(Selector(this.id1Value).innerText).eql("ID***")            
            
    }

    async verifyingFiltersRemainsSetResetButtonAndUnmatchWarningText() {
       
        await t
               
           // .click(catalogueManagementPage.miscViewLink)
            .click(this.miscellanousParagraph)
            .expect(this.listOfAllMyMiscCodes.innerText).eql("List of all my miscellaneous codes")
            .expect(this.matchButtonBefore.hasAttribute('disabled')).eql(true)
            .click(this.myCodeTypeDropDown)
            .click(Selector('li').withText('Fcode'))
            .pressKey('tab')    
            .click(this.withAllMembersDropDown)
            .click(Selector('span').withText('AutoScriptMember'))
            .pressKey('tab')
            .click(this.noCodeTypeDropDown)
            .click(Selector('span').withText('TestCode'))
            .expect(this.matchButtonAfter.hasAttribute('disabled')).eql(false)
            .click(this.viewLink)
            .click(miscellaneousInformationPage.unmatchLink)
            .expect(miscellaneousInformationPage.confirmationRequiredPopUp.innerText).eql('Confirmation required')
            .expect(miscellaneousInformationPage.unmatchWarningMessageText.innerText).eql('This code could be in use, are you sure you want to unmatch?')
            .click(miscellaneousInformationPage.cancelButton)
            .click(this.miscellanousParagraph)
            .expect(this.matchButtonAfter.hasAttribute('disabled')).eql(false) 
            .expect(this.resetButtonAfter.hasAttribute('disabled')).eql(false)
            .click(this.resetButtonAfter)
            .expect(this.resetButtonBefore.hasAttribute('disabled')).eql(true)
    }   
}
export default new miscellanousPage();