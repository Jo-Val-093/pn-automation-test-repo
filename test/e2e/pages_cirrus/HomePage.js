import { Selector, t } from 'testcafe';
class HomePage {
    constructor() {
    this.lnkHome = Selector('#menuForm\\:toolBar span').withText('Home');
    this.linkOnboarding=Selector('#menuForm\\:toolBar span').withText('Onboarding')
    this.linkLookups = Selector('#menuForm\\:toolBar span').withText('Lookups')
    this.linkMessageTracking = Selector('#menuForm\\:toolBar span').withText('Message Tracking')
    this.linkBusinessTracking = Selector('#menuForm\\:toolBar span').withText('Business Tracking')
    this.linkDocumentWorkBench = Selector('#menuForm\\:toolBar span').withText('Document Workbench')
    this.linkAdmin= Selector('#menuForm\\:toolBar span').withText('Admin')

    this.linkOnboarding = Selector('#menuForm\\:toolBar span').withText('Onboarding')

    this.linkLookups = Selector('#menuForm\\:toolBar span').withText('Lookups')
    
    this.linkMessageTracking = Selector('#menuForm\\:toolBar span').withText('Message Tracking')
    
    this.linkBusinessTracking = Selector('#menuForm\\:toolBar span').withText('Business Tracking')
    
    this.linkDocumentWorkBench = Selector('#menuForm\\:toolBar span').withText('Document Workbench')
    
    this.linkAdmin = Selector('#menuForm\\:toolBar span').withText('Admin')
    
    this.linkHome = Selector('#menuForm\\:toolBar span').withText('Home')
    
    this.linkRegisterTenant = Selector('#menuForm\\:toolBar span').withText('Register Tenant')
    
    this.linkAuthServiceAPI = Selector('#menuForm\\:toolBar span').withText('Auth Service - API')
    
    this.linkPermissionEngineAPI = Selector('#menuForm\\:toolBar span').withText('Permission Engine - API')
    
    this.linkCoreAPI = Selector('#menuForm\\:toolBar span').withText('Core - API')
    
    this.linkLookupSearch = Selector('#menuForm\\:toolBar span').withText('Lookup Search')
    
    this.linkLinkedLookups = Selector('#menuForm\\:toolBar span').withText('Linked Lookups')
    
    this.btnClose 
    
    this.linkUser = Selector('#topMenuForm\\:j_idt19_button span').withText('User: rajesh.charles@proagrica.com')
    
    this.linkChangePassword = Selector('#topMenuForm\\:j_idt19_menu span').withText('Change Password')
    
    this.txtCurrentPassword = Selector('#form\\:j_idt163\\:currentPassword')
    
    this.txtNewPassword = Selector('#form\\:j_idt163\\:password')
    
    this.txtConfirmPassword = Selector('#form\\:j_idt163\\:confirmPassword')
    
    this.linkTenantHeader = Selector('#topMenuForm\\:TenantSplitButton_button span').withText('Tenant')
    
    this.linkChangeTenant = Selector('#topMenuForm\\:TenantSplitButton_menu span').withText('Change Tenant')
    
    this.txtTenantCode = 'input[id*=tenantVO-code]'
    
    this.txtTenantName = 'input[id*=tenantVO-name]'
    
    this.txtCountry = Selector('input[id*=country_input]').nth(1)
    
    // this.chkSearchAmongAll = Selector('#viewTenantSelectorForm\\:j_idt283\\:tenantVO-searchAmongAll .ui-chkbox-icon.ui-icon.ui-icon-blank.ui-c')
    this.chkSearchAmongAll = 'div[id*=searchAmongAll]'
    this.btnSearch = Selector('button[id*=search]').nth(2)
    // this.btnSearch = Selector('#viewTenantSelectorForm\\:j_idt283\\:search span').withText('Search')
    this.btnSelect = 'button[id*=tenantAdminList]'
    // this.btnSelect = Selector('#viewTenantSelectorForm\\:tenantAdminList\\:0\\:j_idt301 span').withText('Select')
    
    this.linkChangeTimeZone = Selector('#topMenuForm\\:j_idt19_menu span').withText('Change Time Zone')
    
    this.txtCountryTimeZone = Selector('#viewTimeZoneSelectorForm\\:country_input')
    
    this.txtTimeZoneSelect = Selector('#viewTimeZoneSelectorForm\\:j_idt281 span').withText('Select')
    
    this.txtSwitchToTimezoneMessage1 = Selector('#growl_container span').withText('Changed Time Zone to: Europe/London')
    this.txtSwitchToTimezoneMessage2 = Selector('#growl_container span').withText('Changed Time Zone to: Asia/Kolkata')

    this.linkSwitchToSuperUser = Selector('#topMenuForm\\:j_idt19_menu span').withText('Switch to Super')
    
    this.txtSwitchToSuperUserMessage = Selector('#growl_container span').withText('Switched to Superuser mode')
    
    this.linkUser = Selector('#topMenuForm\\:j_idt19_button span').withText('User:')
    this.linkSuperUser = Selector('#topMenuForm\\:j_idt19_button span').withText('Super:')

    
    this.linkSwitchToUser = Selector('#topMenuForm\\:j_idt19_menu span').withText('Switch to User')
    
    this.txtSwitchToUserMessage = Selector('#growl_container span').withText('Switched to User mode')

}
}

export default new HomePage();