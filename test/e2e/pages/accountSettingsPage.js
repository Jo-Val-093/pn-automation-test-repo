import { Selector, t } from 'testcafe';
import {usernameSuper } from "../helpers/configuration";
import * as TestCafeTestingLibrary from '@testing-library/testcafe'; 

class accountSettingsPage {
    constructor (){
        this.UTC = TestCafeTestingLibrary.getByText('UTC');
        this.accountSettings = Selector('.text-base.pb-4 .font-bold');
        this.email = Selector('span').withText('Email');
        //this.verifyEmail = Selector('[data-testid="emailvalue"] h6');
        this.timeZone = Selector('.MuiTypography-root.MuiTypography-h4.css-ds9yab').nth(1);
        this.selectYourTimeZone = Selector('#root [class^="MuiTypography-root MuiTypography-subtitle1 css-niu"]');
        this.sendPasswordResetEmail = TestCafeTestingLibrary.getAllByRole('button', { name: 'Apply' }).nth(1);
        this.applyButton = Selector('span').withText('Apply');
        this.verifyEmail = TestCafeTestingLibrary.getByText(usernameSuper);
    }
    async navigateAccountSetting(){
        await t
        .click(Selector(this.UTC))
        .expect(Selector(this.accountSettings).innerText).contains('Account settings')
        .takeElementScreenshot(Selector(this.accountSettings))
    }

    async verifyAccount(){
        const verifyEmail = TestCafeTestingLibrary.getByText(usernameSuper);
        await t
        .click(Selector(this.UTC))
        .expect(Selector(this.email).innerText).contains('Email')
        .expect(verifyEmail.exists).ok()
        .takeElementScreenshot(verifyEmail)
    }

    async sendPasswordResetMail(){
        await t
        .click((this.UTC))
        .expect(Selector(this.email).innerText).contains('Email')
        .expect((this.verifyEmail).innerText).contains(usernameSuper)
        .click(this.sendPasswordResetEmail)
        const firstLine = TestCafeTestingLibrary.getByText("We've sent you an email with a link to change your password.");
        await t
        .expect(firstLine.exists).ok()
        .expect(firstLine.innerText)
        .contains("We've sent you an email with a link to change your password.");

    }

    async selectYourTimeZone(){
        await t
        .click(Selector(this.UTC))
        await t
            .expect(Selector(this.timeZone).innerText).contains('Time Zone')
            .click(Selector('[title="Open"]').nth(1).find('[data-testid="ArrowDropDownIcon"]'))
            .click(Selector('[data-option-index="18"] span').withText('UTC'))
            .click(Selector(this.applyButton))
    }

    
}
export default new accountSettingsPage()