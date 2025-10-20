import { Selector, t } from 'testcafe';
import * as TestCafeTestingLibrary from '@testing-library/testcafe'; 

class UserManagementPage {
    constructor() {
        this.setupButton = TestCafeTestingLibrary.getByRole('button', { name: /setup/i });
        this.userMemberConfig = TestCafeTestingLibrary.getByRole('button', { name: /user member configuration/i });
        this.addUserButton = TestCafeTestingLibrary.getByRole('button', { name: /add user/i });
        this.firstNameInput = TestCafeTestingLibrary.getByLabelText(/first name/i);
        this.lastNameInput = TestCafeTestingLibrary.getByLabelText(/last name/i);
        this.emailInput = TestCafeTestingLibrary.getByLabelText(/user email/i);
        this.roleDropdown = TestCafeTestingLibrary.getByLabelText(/role/i);
        this.proagricaSuperUserOption = TestCafeTestingLibrary.getByRole('option', { name: /proagrica super user/i });
        this.inviteButton = Selector('#add-user');
        this.inviteSuccessMessage = Selector('*').withText(/Invite sent successfully/i);
        this.logoutButton = Selector('button').withText('Log Out');
    }

    async createUser(email, name) {
        // Fill user creation form
        await t
            .click(this.setupButton)
            .click(this.userMemberConfig)
            .click(this.addUserButton)
            .typeText(this.firstNameInput, name, { replace: true })
            .typeText(this.lastNameInput, name, { replace: true })
            .typeText(this.emailInput, email, { replace: true })
            .click(this.roleDropdown)
            .click(this.proagricaSuperUserOption)
            .click(this.inviteButton)
            .expect(this.inviteSuccessMessage.innerText)
            .contains('Invite sent successfully', { timeout: 10000 });

        // Log out after invite
        await t
            .expect(this.logoutButton.exists).ok({ timeout: 30000 })
            .wait(5000)
            .click(this.logoutButton)
            .wait(5000);

        // Clear session & cookies to simulate incognito
        await t.eval(() => localStorage.clear());
        await t.eval(() => sessionStorage.clear());
        await t.deleteCookies();

        console.log(` User ${email} created & logged out`);
    }
}

export default new UserManagementPage();
