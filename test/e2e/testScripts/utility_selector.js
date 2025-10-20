import * as TestCafeTestingLibrary from '@testing-library/testcafe'; 
import { Selector, t } from 'testcafe';
import { baseUrl } from '../helpers/configuration';
import LoginPage from "../pages/logInPage";
import dashBoardPage from "../pages/dashBoardPage";

var path = require('path');
var repo = require(path.resolve('./test/e2e/data/index.js'));
var member = repo.testData.member

fixture('Find All selectors')
.page(baseUrl)
.beforeEach(async t => {
    await LoginPage.logInSuccessful();
    await dashBoardPage.selectMember(member);
});
test
.meta({ type18: 'utility' })
('checking howw many elements available with specific text on a page', async t => {

    const checkingText = TestCafeTestingLibrary.getAllByText('View');  // change this to your text
    const checkingTextCount = await checkingText.count;
    console.log(`Found ${checkingTextCount} matching with your searching text`);

    const combobox = TestCafeTestingLibrary.getAllByRole('combobox');
    const comboboxCount = await combobox.count;
    console.log(`Found ${comboboxCount} combobox"`);

    const textboxes = TestCafeTestingLibrary.getAllByRole('textbox');
    const textboxCount = textboxes.length;
    // Log the count or handle the case where no textboxes are found
    if (textboxCount === 0) {
        console.log('No textboxes found');
    } else {
        console.log(`Found ${textboxCount} textboxes`);
    }

    const allLinks = TestCafeTestingLibrary.getAllByRole('link');
    const linkCount = await allLinks.count;
    console.log(`Found ${linkCount} links on the page`);

    // Print all link hrefs
    for (let i = 0; i < linkCount; i++) {
        const linkHref = await allLinks.nth(i).getAttribute('href');
        console.log(`Link ${i + 1}: ${linkHref}`);
    }
});


