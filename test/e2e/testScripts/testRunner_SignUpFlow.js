// test/e2e/testScripts/testRunner_SignUpFlow.js
import { baseUrlAdmin } from '../helpers/configuration';
import LoginPage from "../pages/logInPage";
import dashboardPage from '../pages/dashBoardPage';
import signUpPage from '../pages/signUpPage';
import userManagementPage from '../pages/userManagementPage';
import { Selector } from 'testcafe';
import { getEmail, extractLink } from '../helpers/mailosaurUtils';

fixture`Signup Flow`.page(baseUrlAdmin);

test
    .meta({ type20: 'signUpFlow' })
    ('TC_SU_001 : New user signup & verification', async t => {
        //  Generate unique test credentials 
        const testEmail = `user${Date.now()}@${process.env.MAILOSAUR_SERVER_ID}.mailosaur.net`;
        const password = `Test!${Date.now()}`;

        // ---  Login as admin and create user ---
        await LoginPage.logInSuccessfulLegacyAdmin();
        await userManagementPage.createUser(testEmail, 'POCTest');

        // ---  Fetch invite email ---
        const inviteEmail = await getEmail(testEmail, 'invite', { wait: true, timeout: 60000 });
        const inviteLink = extractLink(inviteEmail, 'invite');
        console.log(`Invite link: ${inviteLink}`);

        

        // ---  Complete signup ---
        await t.navigateTo(inviteLink);
        await signUpPage.completeSignup(testEmail, password);

        // ---  Fetch verification email ---
        const verificationEmail = await getEmail(testEmail, 'verify', { wait: true, timeout: 60000 });
        const verificationLink = extractLink(verificationEmail, 'verification');
        console.log(`Verification link: ${verificationLink}`);

        // ---  Confirm account ---
        await t.navigateTo(verificationLink);

        // Handle cookie banner if present
        if (await signUpPage.cookieOkButton.exists && await signUpPage.cookieOkButton.visible) {
            console.log(' Cookie banner detected, dismissing...');
            await t.click(signUpPage.cookieOkButton);
        }

        // --- Validate dashboard ---
        await t.expect(Selector('h1').withText('Dashboard').exists).ok({ timeout: 30000 });
        console.log(' User signup & verification flow completed successfully!');
    });
