import { Selector, t } from 'testcafe';
class HomePage {
    constructor() {
        this.linkOnboarding =  Selector('#menuForm\\:toolBar span').withText('Onboarding')
        this.linkAuthServiceAPI = Selector('#menuForm\\:toolBar span').withText('Auth Service - API')
        this.txtAuthServiceAPI = Selector('#api_info div').withText('Auth Service API')
        this.linkCoreAPI = Selector('#menuForm\\:toolBar span').withText('Core - API')
        this.txtCoreAPI = Selector('#logo span').withText('Cirrus - Connect')
        this.linkPermissionEngineAPI = Selector('#menuForm\\:toolBar span').withText('Permission Engine - API')
        this.txtPermissionEngineAPI = Selector('#api_info div').withText('Permission Engine API')
        this.linkRegisterTenant
        this.txtCode
        this.txtName
        this.txtCountry
        this.btnRegister
}
}

export default new HomePage();
