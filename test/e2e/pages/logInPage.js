import {Selector , t} from 'testcafe';
import { passwordSuper, usernameSuper } from "../helpers/configuration";
import data from "../data/data.json"

class logInPage {
    constructor (){
        this.acceptCookies=Selector('[data-testid="cookiesAlert"] div div div button u');
        this.logInButton = Selector('span').withText('Log in');
        this.emailAddress=Selector('#username');
        this.password=Selector('#password');
        this.passwordToggle=Selector('cd1df0865 ulp-button-icon c6cad41d5 _button-icon');
        this.signInButton = Selector('[name="action"][data-action-button-primary="true"]')
        this.forgotPasswordButton=Selector('main a').withText('Forgot password?');
        this.forgotYourPassword=Selector('header h1').withText('Forgot Your Password?');
        this.enterEmailAddress=Selector('main [name="email"]');
        this.sendEmail=Selector('main button').withText('Send email');
        this.checkYourEmail=Selector('main h1').withText('Check Your Email');
        this.signUpButton=Selector('main a').withText('Sign up');
        this.enterPassword=Selector('main [name="password"]');
        //this.signUpUser=Selector('button.cefe98bea.cc48b7925.cdfc94bba.c00a72e00.c75945474');
        //this.user=Selector('#root > div.jss9 > header > div > div.MuiGrid-root.jss18 > div.jss55 > div > div.jss58')
        this.user = Selector('#headlessui-menu-button-\\:r6\\: div div span')
        this.signUpuser=Selector('main button').withText('Sign up');
        this.logOutButton=Selector('button').withText('Logout')
    }
    async logInSuccessfulAsBusinessUser(){
        await t.maximizeWindow()
        if (await Selector(this.acceptCookies).exists) {
            await t.click(Selector(this.acceptCookies));
        }
        await t.click(Selector(this.logInButton.with({ timeout: 30000 })))
        .typeText(Selector(this.emailAddress),data.BusinessUserID)
        .typeText(Selector(this.password),data.BusinessUserPassword)
        .click(Selector(this.signInButton))
        await t.expect(Selector('h1').withText('Dashboard').innerText).contains('Dashboard')
    }
	    async logInSuccessful(){
        await t.maximizeWindow()
        if (await Selector(this.acceptCookies).exists) {
            await t.click(Selector(this.acceptCookies));
        }
        await t.click(Selector(this.logInButton.with({ timeout: 30000 })))
        .typeText(Selector(this.emailAddress),usernameSuper)
        .typeText(Selector(this.password),passwordSuper)
        .click(Selector(this.signInButton))
        await t.expect(Selector('h1').withText('Dashboard').innerText).contains('Dashboard')
    }
    async logInSuccessfulA(){
        await t
        .maximizeWindow()   
        if (await Selector(this.acceptCookies).exists) {
            await t.click(Selector(this.acceptCookies));
        }
        await t.click(Selector(this.logInButton.with({ timeout: 30000 })))
        await t
        .typeText(Selector(this.emailAddress),usernameSuper)
        .typeText(Selector(this.password),passwordSuper)
        .click(Selector(this.signInButton))
        }

       async logInSuccessfulLegacyAdmin(){
         console.log('Logging in with:', usernameSuper);

    await t
        .maximizeWindow()
        .typeText(this.emailAddress, usernameSuper, { replace: true })
        .typeText(this.password, passwordSuper, { replace: true });

    // Try pressing enter instead of click
    await t
        .pressKey('enter');

    // OR ensure button is clicked properly
    // await t.scrollIntoView(this.logInButton).click(this.logInButton);



        }
   

    async logoutSuccessful(){
        await t
        .click(Selector(this.user))
        .click(Selector(this.logOutButton))
    }   

    async inCorrectCredentials(a){
        await t.maximizeWindow() 
        if (await Selector(this.acceptCookies).exists) {
            await t.click(Selector(this.acceptCookies));
        }
        await t.click(Selector(this.logInButton.with({ timeout: 30000 })))
        
        await t.wait(3000)
        if (a=='inCorrectUserId'){
            await t
            .typeText(Selector(this.emailAddress),'jothivalan.mualagann@proagrica.com')
            .typeText(Selector(this.password),passwordSuper)
        }
        else if (a=='inCorrectPassword'){
            await t
            .typeText(Selector(this.emailAddress),usernameSuper)
            .typeText(Selector(this.password),'Test_Proagrica11')
        }
        await t            
        .click(Selector(this.signInButton))
        .expect(Selector('#error-element-password').innerText).contains('Wrong email or password')

        Selector('main span').withText('Wrong email or password')
    }

    async forgotPassword(){
        await t.maximizeWindow()
        if (await Selector(this.acceptCookies).exists) {
            await t.click(Selector(this.acceptCookies));
        }
        await t.click(Selector(this.logInButton.with({ timeout: 30000 })))
        await t
        .click(Selector(this.forgotPasswordButton))
        .expect(Selector(this.forgotYourPassword).innerText).contains('Forgot Your Password?')
        .typeText(Selector(this.enterEmailAddress),usernameSuper)
        await t
        .click(Selector(this.sendEmail))
        await t
        .expect(Selector(this.checkYourEmail).innerText).contains('Check Your Email')
    }

    async signUp(){
        await t
        .maximizeWindow()
        if (await Selector(this.acceptCookies).exists) {
            await t.click(Selector(this.acceptCookies));
        }
        await t.click(Selector(this.logInButton.with({ timeout: 30000 })))
        await t
        .expect(Selector(this.signUpButton).innerText).contains('Sign up')
        .click(Selector(this.signUpButton))
        .expect(Selector('header').innerText).contains('Welcome')
        .typeText(Selector(this.enterEmailAddress),'jothivalan.muthalagan@proagrica.com')
        .typeText(Selector(this.enterPassword),passwordSuper)
        .click(Selector(this.signUpuser))
    }
}
export default new logInPage();
