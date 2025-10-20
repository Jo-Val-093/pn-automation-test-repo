import { Selector, t } from 'testcafe';

class SignupPage {
    constructor() {
        // First "Sign up" button (before credentials)
        this.initialSignUpButton = Selector('button').withText('Sign up');

        // Inputs (credentials form)
        this.emailInput = Selector('input#email');
        this.passwordInput = Selector('input#password');

        // Final Sign up (submit credentials)
        this.finalSignUpButton = Selector('button[data-action-button-primary="true"]');

        // Cookie banner dismiss button
        this.cookieOkButton = Selector('button[aria-label="close"]').withText('OK');
    }

    /**
     * Complete signup using given email & password.
     * @param {string} email 
     * @param {string} password 
     */
    async completeSignup(email, password) {
        // Dismiss cookie banner if visible
        if (await this.cookieOkButton.exists && await this.cookieOkButton.visible) {
            console.log('Cookie banner detected, dismissing...');
            await t.click(this.cookieOkButton);
        }

        await t.wait(2000);
        await t.click(this.initialSignUpButton);

        // Step 2: Wait for credentials form
        await t.expect(this.emailInput.exists).ok({ timeout: 15000 });
        console.log(' Signup form visible');

        // Step 3: Fill in credentials
        await t.typeText(this.emailInput, email, { replace: true });
        await t.typeText(this.passwordInput, password, { replace: true });

        console.log(` Using test email: ${email}`);

        // Step 4: Submit signup form
        await t.wait(1000);
        await t.click(this.finalSignUpButton);
        console.log(' Submitted signup form');

        // Expect to land on dashboard after confirmation
        await t.expect(Selector('h1').withText('Dashboard').exists).ok({ timeout: 30000 });
    }
}

export default new SignupPage();
