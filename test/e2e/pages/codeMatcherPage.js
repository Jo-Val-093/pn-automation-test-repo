import { Selector, t } from 'testcafe';
import XPathSelector from '../helpers/xpath-selector';
import dashBoardPage from './dashBoardPage';
import * as TestCafeTestingLibrary from '@testing-library/testcafe';

class CMPage {
  constructor() {
    
    this.viewLinkCatM = TestCafeTestingLibrary.getAllByRole('button', { name: 'View' }).nth(0);
    this.viewLinkCodeMatcherRoute = TestCafeTestingLibrary.getAllByRole('button', { name: 'View' }).nth(1);
   // this.CodeMatcherText = Selector('#root h2').withText('Code Matcher');
    this.enrichmentHeader = TestCafeTestingLibrary.getByRole('heading', { name: 'Enrichment', exact: true });
    this.addValueHeader = TestCafeTestingLibrary.getByRole('heading', { name: 'Add value to messages with enrichment services' });
    
    this.catalougeManagementHeader = TestCafeTestingLibrary.getByRole('heading', { name: 'Catalogue management' })
    this.codeMatcherRouteHeader = TestCafeTestingLibrary.getByRole('heading', { name: 'Code Matcher routes' });
    this.lookupTablesHeader = TestCafeTestingLibrary.getByRole('heading', { name: 'Lookup tables' });  
  }
  async navigateToEnrichmentPage () {
    await t
    .click(Selector(dashBoardPage.viewLinkCodeMatcher))
    .expect(this.enrichmentHeader.visible).eql(true)
    .expect(this.addValueHeader.visible).eql(true)
    // .click(this.viewLinkCatM)
    // .expect(this.catalougeManagementHeader.visible).eql(true)
     }
}
export default new CMPage();