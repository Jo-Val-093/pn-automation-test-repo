import {Selector , t} from 'testcafe';
class sectorPage {
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
        this.sectorPage=Selector('#root > div > header > div > div:nth-child(4) > h4')
        this.addSectorButton=Selector('span.material-icons.MuiIcon-root').withText('add_box')
        this.typeSectorButton=Selector('#root > div > main > div.jss66 > div > div.jss78 > div > div > div > table > tbody > tr:nth-child(6) > td.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignLeft > div > div > input')
        this.saveSectorButton=Selector('span.material-icons.MuiIcon-root').withText('check')
        this.cancelSectorButton=Selector('span.material-icons.MuiIcon-root').withText('clear')
    }

    async navigateToSectors(){
        await t
        .click(Selector(this.setupButton))
        .wait(2000)
        .pressKey('down')
        .click(Selector(this.sectors))
        .expect(Selector(this.sectorPage).innerText).contains('Sectors')
    }

    async addSector(){
        await
        this.navigateToSectors()
        await t
        .click(Selector(this.addSectorButton))
    }


    async saveSector(){
        await
        this.addSector()
        await t
        .typeText(Selector(this.typeSectorButton),'XYZ')
        .click(Selector(this.saveSectorButton))
    }

    async cancelSector(){
        await
        this.addSector()
        await t
        .typeText(Selector(this.typeSectorButton),'XYZ')
        .click(Selector(this.cancelSectorButton))
    }
    
}
export default new sectorPage()