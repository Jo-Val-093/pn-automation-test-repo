import { Selector, t } from 'testcafe';
import dashBoardPage from './dashBoardPage';
import * as TestCafeTestingLibrary from '@testing-library/testcafe'; 

class adminPage {
    constructor() {
        this.adminHeaderText = TestCafeTestingLibrary.getByRole('heading', {name: 'Admin'});
        this.companiesText = TestCafeTestingLibrary.getByText('Companies');
        this.usersText = TestCafeTestingLibrary.getByText('Users');
        this.rolesText = TestCafeTestingLibrary.getByText('Roles');
        this.connectorsText = TestCafeTestingLibrary.getByText('Connectors');
        this.arrowLinkForCompanies = TestCafeTestingLibrary.getByText('Companies').child('button')
        this.arrowLinksForConnectors = TestCafeTestingLibrary.getByText('Connectors').child('button')
    }
 
    async validateDisplayOfAdminPage(){
        await t
        .expect(this.adminHeaderText.visible).eql(true)
        .expect(this.companiesText.visible).eql(true)
        .expect(this.usersText.visible).eql(true)
        .expect(this.rolesText.visible).eql(true)   
        .expect(this.connectorsText.visible).eql(true)                               
    } 

    async navigateToCompaniesPage(){
        await t
            .click(this.arrowLinkForCompanies)
                            
    }
    async navigateToConnectorsPage(){
        await t
            .click(this.arrowLinksForConnectors)
                            
        }
    }
export default new adminPage()