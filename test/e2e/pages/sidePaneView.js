import {Selector , t} from 'testcafe';
class sidePaneView {
    constructor (){
        this.setupButton=Selector('#setup')
        this.membersDirectory=Selector('#members-directory > span.MuiButton-label.jss92 > div.jss93').withText('Members Directory')
        this.regions=Selector('#regions > span.MuiButton-label.jss92 > div.jss93').withText('Regions')
        this.roles=Selector('#roles > span.MuiButton-label.jss92 > div.jss93').withText('Roles')
        this.countries=Selector('#countries > span.MuiButton-label.jss92 > div.jss93').withText('Countries')
        this.sectors=Selector('#sectors > span.MuiButton-label.jss92 > div.jss93').withText('Sectors')
        this.userMemberConfiguration=Selector('#user-member-configuration > span.MuiButton-label.jss92 > div.jss93').withText('User Member Configuration')
        this.rolePermissionConfiguration=Selector('#role-permission-configuration > span.MuiButton-label.jss92 > div.jss93').withText('Role Permission Configuration')
        this.journeyManager=Selector('#monitor > span.MuiButton-label.jss37 > div')
        this.memberJourney=Selector('#member-journey > span.MuiButton-label.jss71 > div.jss72').withText('Member Journey')
        this.systemDefaultJourney=Selector('#system-default-journey > span.MuiButton-label.jss71 > div.jss72').withText('System Default Journey')
        }    
}
export default new sidePaneView()