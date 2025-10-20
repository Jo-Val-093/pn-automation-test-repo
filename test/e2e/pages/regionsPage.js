import {Selector , t} from 'testcafe';
class regionPage {
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
        this.regionPage=Selector('#root > div > header > div > div:nth-child(4) > h4')
        this.addRegionButton=Selector('span.material-icons.MuiIcon-root').withText('add_box')
        this.typeRegionButton=Selector('#root > div > main > div.jss66 > div > div.jss78 > div > div > div > table > tbody > tr:nth-child(6) > td.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignLeft > div > div > input')
        this.saveRegionButton=Selector('span.material-icons.MuiIcon-root').withText('check')
        this.cancelRegionButton=Selector('span.material-icons.MuiIcon-root').withText('clear')
    }

    async navigateToRegions(){
        await t
        .click(Selector(this.setupButton))
        .wait(2000)
        .pressKey('down')
        .click(Selector(this.regions))
        .expect(Selector(this.regionPage).innerText).contains('Regions')
    }

    async addRegion(){
        await
        this.navigateToRegions()
        await t
        .click(Selector(this.addRegionButton))
    }


    async saveRegion(){
        await
        this.addRegion()
        await t
        .typeText(Selector(this.typeRegionButton),'XYZ')
        .click(Selector(this.saveRegionButton))
    }

    async cancelRegion(){
        await
        this.addRegion()
        await t
        .typeText(Selector(this.typeRegionButton),'XYZ')
        .click(Selector(this.cancelRegionButton))
    }
    
}
export default new regionPage()