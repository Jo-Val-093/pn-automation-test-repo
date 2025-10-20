import { Selector, t } from 'testcafe';

class LoginPage {
  constructor() {
    this.inputUsername = '#j_username';
    this.inputPassword = '#j_password';
    this.buttonLogin = '#loginButton';
    this.lnkHome = Selector('span').withText('Home'); 

    this.logout = Selector('#topMenuForm\\:j_idt24 span').withText('Logout');

    
  }

  async userlogin(username, password) {
    await t.maximizeWindow(); 
    await t.wait(1000);

    const closePopup = Selector('#j_idt6\\:j_idt7 .ui-icon.ui-icon-closethick');
    if (await closePopup.exists && await closePopup.visible) {
      await t.click(closePopup); 
    }

    await t.typeText(this.inputUsername, username);
    await t.typeText(this.inputPassword, password);
    await t.click(this.buttonLogin);

    await t
      .expect(this.lnkHome.exists).ok('Home link should exist after login', { timeout: 10000 })
      .expect(this.lnkHome.visible).ok('Home link should be visible after login', { timeout: 10000 });
  }
  async logout()

{
await t.click(logout);
}

}

export default new LoginPage();
