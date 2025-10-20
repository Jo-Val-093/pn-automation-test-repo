import {Selector , t} from 'testcafe';
class countriesPage {
    constructor (){
        this.setupButton=Selector('#setup')
        this.membersDirectory=Selector('#members-directory div').withText('Members Directory')
        this.regions=Selector('#regions div').withText('Regions')
        this.roles=Selector('#roles div').withText('Roles')
        this.countries=Selector('#countries div').withText('Countries')
        this.sectors=Selector('#sectors div').withText('Sectors')
        this.userMemberConfiguration=Selector('#user-member-configuration div').withText('User Member Configuration')
        this.rolePermissionConfiguration=Selector('#role-permission-configuration div').withText('Role Permission Configuration')
        this.journeyManager=Selector('#monitor div')
        this.memberJourney=Selector('#member-journey div').withText('Member Journey')
        this.systemDefaultJourney=Selector('#system-default-journey div').withText('System Default Journey')
        this.countriesPageHaeder=Selector('#root > div > header > div > div:nth-child(4) > h4')
        this.addCountriesButton=Selector('span.material-icons.MuiIcon-root').withText('add_box')
        this.typeCountriesButton=Selector('#root > div > main > div.jss66 > div > div.jss78 > div > div > div > table > tbody > tr:nth-child(6) > td.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignLeft > div > div > input')
        this.saveCountriesButton=Selector('span.material-icons.MuiIcon-root').withText('check')
        this.cancelCountriesButton=Selector('span.material-icons.MuiIcon-root').withText('clear')
    }

    async navigateToCountries(){
        await t
        .click(Selector(this.setupButton))
        .wait(2000)
        .pressKey('down')
        .click(Selector(this.countries))
        .expect(Selector(this.countriesPageHaeder).innerText).contains('Countries')
    }

    async addCountries(){
        await
        this.navigateToCountries()
        await t
        .click(Selector(this.addCountriesButton))
    }


    async saveCountries(){
        await
        this.addCountries()
        await t
        .typeText(Selector(this.typeCountriesButton),'XYZ')
        .click(Selector(this.saveCountriesButton))
    }

    async cancelCountries(){
        await
        this.addCountries()
        await t
        .typeText(Selector(this.typeCountriesButton),'XYZ')
        .click(Selector(this.cancelCountriesButton))
    }
    
}
export default new countriesPage()