import {Selector , t} from 'testcafe';
class rolePage {
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
        this.rolePage=Selector('#root > div > header > div > div:nth-child(4) > h4')
        this.addRoleButton=Selector('span.material-icons.MuiIcon-root').withText('add_box')
        this.typeRoleButton=Selector('#root > div > main > div.jss66 > div > div.jss78 > div > div > div > table > tbody > tr:nth-child(6) > td.MuiTableCell-root.MuiTableCell-body.MuiTableCell-alignLeft > div > div > input')
        this.saveRoleButton=Selector('span.material-icons.MuiIcon-root').withText('check')
        this.cancelRoleButton=Selector('span.material-icons.MuiIcon-root').withText('clear')
    }

    async navigateToRoles(){
        await t
        .click(Selector(this.setupButton))
        .wait(2000)
        .pressKey('down')
        .click(Selector(this.roles))
        .expect(Selector(this.rolePage).innerText).contains('Roles')
    }

    async addRole(){
        await
        this.navigateToRoles()
        await t
        .click(Selector(this.addRoleButton))
    }


    async saveRoles(){
        await
        this.addRole()
        await t
        .typeText(Selector(this.typeRoleButton),'XYZ')
        .click(Selector(this.saveRoleButton))
    }

    async cancelRoles(){
        await
        this.addRole()
        await t
        .typeText(Selector(this.typeRoleButton),'XYZ')
        .click(Selector(this.cancelRoleButton))
    }
    
}
export default new rolePage()