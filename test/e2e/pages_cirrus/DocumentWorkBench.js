import { Selector, t } from 'testcafe';
class DocumentWorkbench {
    constructor() {
    this.lnkDocumentWorkbench= Selector('#menuForm\\:toolBar span').withText('Document Workbench')
    this.lnkGateway=Selector('#menuForm\\:toolBar span').withText('Gateway')
    this.lnkDashboard=Selector('#menuForm\\:toolBar span').withText('Dashboard').nth(2)
    this.lnkUploads=Selector('#menuForm\\:toolBar span').withText('Uploads')
    this.lnkDownloads=Selector('#menuForm\\:toolBar span').withText('Downloads')
    this.lnkTestPortal=Selector('#menuForm\\:toolBar span').withText('Test Portal')
    this.lnkDataSets=Selector('#menuForm\\:toolBar span').withText('Data Sets')
    this.lnkTests=Selector('#menuForm\\:toolBar span').withText('Tests')
    this.lnkTstResults=Selector('#menuForm\\:toolBar span').withText('Test Results')
    this.lnkTestSchedules=Selector('#menuForm\\:toolBar span').withText('Test Schedules')
    this.lnkTransform=Selector('#menuForm\\:toolBar span').withText('Transform')
    this.lnkWorkflow=Selector('#menuForm\\:toolBar span').withText('Workflow')
    this.lnkRules=Selector('#menuForm\\:toolBar span').withText('Rules')
    this.txtUploads = Selector('#form\\:j_idt161 span').withText('Uploads')
    this.txtSearch = Selector('#form\\:searchTabs a').withText('Search')
    // this.lnkActions = Selector('#menuForm\\:j_idt159_button span').withText('Actions')
    this.lnkActions = Selector('button[id*=menuForm]').withText('Actions')
    
    // this.lnkUploadDocuments = Selector('#menuForm\\:j_idt159_menu span').withText('Upload Document')
    this.lnkUploadDocuments =  Selector('span[class=ui-menuitem-text]').withText('Upload Document')
    this.uploadFile = Selector('#viewUploadForm\\:j_idt223_input')
    this.lstDestination=  'input[id*=newUpload-destination_input]'
    this.lstType = 'input[id*=newUpload-messageType_input]'

    this.btnSave = 'button[id*=j_idt233]'
    this.txtMsgId = Selector('#form\\:documentTable_data td')  

}
}

export default new DocumentWorkbench();