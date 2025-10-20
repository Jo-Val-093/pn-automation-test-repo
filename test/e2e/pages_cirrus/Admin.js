import { Selector, t } from 'testcafe';
class Admin {
    constructor() {

    this.lnkAdmin = Selector('#menuForm\\:toolBar span').withText('Admin')
    this.lnkSuper=Selector('#menuForm\\:toolBar span').withText('Super')
    this.lnkUsers=Selector('#menuForm\\:toolBar a').withText('Users')
    this.lnkLegacyBrowsers= Selector('#menuForm\\:toolBar span').withText('Legacy Browsers')
    this.lnkDashboards=Selector('#menuForm\\:toolBar span').withText('Dashboards').nth(2)
    this.lnkBusiness=Selector('#menuForm\\:toolBar span').withText('Business').nth(1)
    this.lnkTenant=Selector('#menuForm\\:toolBar span').withText('Tenant').nth(1)
    this.lnkMessageTypeMapping=Selector('#menuForm\\:toolBar span').withText('Message Type Mapping')
    this.lnkTenants=Selector('#menuForm\\:toolBar span').withText('Tenants')
    this.lnkUsers=Selector('#menuForm\\:toolBar span').withText('Users').nth(1)
    this.lnkAccessTracking=Selector('#menuForm\\:toolBar span').withText('Access Tracking')
    this.lnkAccessDashboard=Selector('#menuForm\\:toolBar span').withText('Access Dashboard')
    this.lnkActiveUsers=Selector('#menuForm\\:toolBar span').withText('Active Users')
    this.lnkArchiving=Selector('#menuForm\\:toolBar span').withText('Archiving')
    this.lnkMainConfiguration = Selector('#menuForm\\:toolBar span').withText('Main Configuration')
    this.lnkArchiveConfiguration = Selector('#menuForm\\:toolBar span').withText('Archive Configuration')
    this.lnkConfigChangeHistory=Selector('#menuForm\\:toolBar span').withText('Config Change History')
    this.lnkGatewaydownloadRules=Selector('#menuForm\\:toolBar span').withText('Gateway Download Rules')
    this.lnkRouting=Selector('#menuForm\\:toolBar span').withText('Routing')
}
}

export default new Admin();