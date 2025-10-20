import { Selector, t } from 'testcafe';
import dashBoardPage from "../pages/dashBoardPage";
import * as TestCafeTestingLibrary from '@testing-library/testcafe'; 

class networkSetupPage {
    constructor() {
        this.networkSetupHeader = TestCafeTestingLibrary.getByText('Network setup', { selector: 'h2' });
        this.CandMIntegrationsText = TestCafeTestingLibrary.getByText('Configure and manage integrations');
        this.transformsCardText = TestCafeTestingLibrary.getByText('Transforms', { selector: 'h4' });
        this.journeysCardText = TestCafeTestingLibrary.getByText('Journeys', { selector: 'h4' });
        this.viewLinkTMCard = TestCafeTestingLibrary.getAllByText('View').nth(0);
        this.viewLinkJourneysCard = TestCafeTestingLibrary.getAllByText('View').nth(1);

    }

    async navigateToJourneysPage(){
        await t
        .click(this.viewLinkJourneysCard)
     }
    
   
    async displayValidationNetworkSetup(){
        await t
        .expect(Selector(this.networkSetupHeader).visible).eql(true) 
        .expect(Selector(this.CandMIntegrationsText).visible).eql(true)
        .expect(Selector(this.transformsCardText).visible).eql(true)
        .expect(Selector(this.viewLinkTMCard).visible).eql(true)
        .expect(Selector(this.journeysCardText).visible).eql(true)
        .expect(Selector(this.viewLinkJourneysCard).visible).eql(true)
    }   
     
}
export default new networkSetupPage()