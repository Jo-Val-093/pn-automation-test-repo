import {Selector , t} from 'testcafe';
import logInPage from './logInPage';
import { passwordSuper, usernameSuper, ENV_DNS } from "../helpers/configuration";
import * as TestCafeTestingLibrary from '@testing-library/testcafe'; 
import data from "../data/data.json"

class pageFooters {
    constructor() {
        this.acceptCookies=Selector('[data-testid="cookiesAlert"] div div div button u');
        this.cookiePolicy=TestCafeTestingLibrary.getByRole('link', { name: 'Cookie policy' });
        this.privacyPolicy= TestCafeTestingLibrary.getByRole('link', { name: 'Privacy policy' });
        this.termsAndConditions=Selector('footer a').withText('Terms and conditions');
        this.proagricaNetworkTCs=Selector('footer a').withText('Proagrica Network T&Cs');
        this.copyRight=Selector('footer a').withText('Copyright © 2023 LexisNexis Risk Solutions Group');
        this.cookiePolicyPage=Selector('h1.h2.md\\:h1.text-textBrand'); 
        this.privacyPolicyPage=Selector('h1.h2.md\\:h1.text-textBrand'); 
        this.termsAndConditionsPage=Selector('#post-19 > header > div.col.text-center.entry-text > div.header > h1')
        this.proagricaNetworksTCs=Selector('#root > div > div.jss6 > div > div > div.jss24 > p')
        this.copyRightPage=Selector('body > div.page-wrapper > div:nth-child(1) > div > div > div > div > div > h1')
    }
    
    async navigateCookiePolicy() {
        await t
        .maximizeWindow()
        .wait(20000)   
        if (await Selector(this.acceptCookies).exists) {
            await t.click(Selector(this.acceptCookies));
        }
        await t
            .click(Selector(this.cookiePolicy))
            .navigateTo('https://www.telus.com/agcg/en-gb/privacy-policy/cookie-statement')
        await t
            .expect(Selector(this.cookiePolicyPage).innerText).contains('Cookie Statement')
    }

    async navigateTermsAndConditions() {
        await t
        .maximizeWindow()
        .wait(20000)   
        if (await Selector(this.acceptCookies).exists) {
            await t.click(Selector(this.acceptCookies));
        }
        await t
            .click(Selector(this.termsAndConditions))
            .navigateTo('https://risk.lexisnexis.com/corporate/terms')
        await t
            .expect(Selector('h1').withText('Terms and Conditions of Use for this Web Site')).ok()
    }

    async navigatePrivacyPolicy() {
        await t
        .maximizeWindow()
        .wait(20000)   
        if (await Selector(this.acceptCookies).exists) {
            await t.click(Selector(this.acceptCookies));
        }
        await t
            .click(Selector(this.privacyPolicy))
            .navigateTo('https://www.telus.com/agcg/en-gb/privacy-policy')
        await t
            .expect(Selector(this.privacyPolicyPage).innerText).contains('Privacy and Data Use Policy')
    }

    async pnTermsAndConditions() {

        await t
        .maximizeWindow()
        .wait(20000)   
        if (await Selector(this.acceptCookies).exists) {
            await t.click(Selector(this.acceptCookies));
        }
        await t.click(Selector('#root span').withText('Log in').with({ timeout: 30000 }))
        .typeText(Selector(logInPage.emailAddress),usernameSuper)
        .pressKey('tab')
        .typeText(Selector(logInPage.password),passwordSuper)
        .pressKey('enter')
        .maximizeWindow()
        .click(Selector('footer a').withText('Proagrica Network T&Cs'))
        await t.expect(Selector('#root p').withText('Terms and Conditions')).ok()
    }

    async navigateCopyRight() {
        await t
            .maximizeWindow()
            .wait(20000)   
            if (await Selector(this.acceptCookies).exists) {
                await t.click(Selector(this.acceptCookies));
            }
            await t.navigateTo('https://risk.lexisnexis.com/corporate/copyright')
            await t.expect(Selector(this.copyRightPage).innerText).contains('Copyright')
    }

}
    

export default new pageFooters();
