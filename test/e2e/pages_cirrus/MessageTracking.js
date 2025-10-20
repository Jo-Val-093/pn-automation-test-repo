import { Selector, t } from 'testcafe';
class MessageTracking {
    constructor() {
        
        this.linkMessageTracking = Selector('#menuForm\\:toolBar span').withText('Message Tracking')
        this.linkSearch = Selector('#menuForm\\:toolBar span').withText('Search').nth(1)        
        this.btnSearchByBusinessId = Selector('#searchForm\\:searchTabs a').withText('Search by Business Id')        
        this.txtBusinessId1 = Selector('#searchForm\\:searchTabs\\:messageVO-businessId-searchBy')        
        this.btnSearch1 = Selector('#searchForm\\:searchTabs\\:searchByBusinessId span').withText('Search')
        this.btnSearch = Selector('#searchForm\\:searchTabs\\:search span').withText('Search')
        // this.btnView = Selector('button[id*=j_idt261_button]')
        this.btnView = Selector('button[id*="_button"]').withText('View')
       
        this.txtMsgStatus = Selector('input[id*=messageVO-messageStatus]')
        this.btnClear = Selector('#searchForm\\:searchTabs\\:j_idt194 span').withText('Clear')        
        this.btnSearchByMessageId = Selector('#searchForm\\:searchTabs a').withText('Search by Message Id')        
        this.txtMessageId1 = Selector('#searchForm\\:searchTabs\\:messageVO-uniqueId-searchBy')        
        this.btnSearchByParentId = Selector('#searchForm\\:searchTabs a').withText('Search by Parent Id')        
        this.txtParentId1 = Selector('#searchForm\\:searchTabs\\:messageVO-parentId-searchBy')        
        this.btnSearchByProcessId = Selector('#searchForm\\:searchTabs a').withText('Search by Process Id')        
        this.txtProcessId1 = Selector('#searchForm\\:searchTabs\\:messageVO-processId-searchBy')        
        this.linkArchive = Selector('#menuForm\\:toolBar span').withText('Archive')        
        this.txtSource = Selector('#searchForm\\:searchTabs\\:messageVO-source_input')        
        this.txtDestination = Selector('#searchForm\\:searchTabs\\:messageVO-destination_input')        
        this.txtType = Selector('#searchForm\\:searchTabs\\:messageVO-type_input')  
        this.txtMessageId = 'input[id*=messageVO-uniqueId]'        
        this.txtBusinessId = Selector('#searchForm\\:searchTabs\\:messageVO-businessId')        
        this.txtProcessId = Selector('#searchForm\\:searchTabs\\:messageVO-processId')        
        this.txtParentId = Selector('#searchForm\\:searchTabs\\:messageVO-parentId')        
        this.txtDate = Selector('#searchForm\\:searchTabs\\:j_idt181_label')        
        this.linkDashboards = Selector('#menuForm\\:toolBar span').withText('Dashboards')        
        this.linkVolume = Selector('#menuForm\\:toolBar span').withText('Volume')        
        this.linkType = Selector('#menuForm\\:toolBar span').withText('Type')        
        this.linkPerformance = Selector('#menuForm\\:toolBar span').withText('Performance')        
        this.linkStatus = Selector('#menuForm\\:toolBar a').withText('Status')        
        this.linkSummary = Selector('#menuForm\\:toolBar span').withText('Summary')        
        this.linkError = Selector('#menuForm\\:toolBar span').withText('Error')        
        this.linkTopSummary = Selector('#menuForm\\:toolBar span').withText('Top 10 Summary')        
        this.btnClear = Selector('#searchForm\\:searchTabs\\:j_idt189 span').withText('Clear')        
        this.btnSearchHistory  = Selector('#searchForm\\:searchTabs a').withText('Search History') 
      
}
}

export default new MessageTracking();
