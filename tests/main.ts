import {test} from '@playwright/test';
import {delay, SelectorUtil} from '../lib/SelectorUtil'

const {
    USERNAME,
    PASSWORD,
} = process.env;

let title = 'auto_extend_python_anywhere'
test(title, async ({page}) => {
    let userName = USERNAME || '';
    let password = PASSWORD || '';
    if(!userName || !password){
        console.log('username or password is null, please setup action env params!!!');
        process.exit(0);
    }
    // login
    await page.goto('https://www.pythonanywhere.com/login/');
    await SelectorUtil.continueWaitFor(page, SelectorUtil.byFullText('h1', 'Log in'));
    await page.fill('id=id_auth-username', userName);
    await page.fill('id=id_auth-password', password);
    await page.click('id=id_next');
    await page.waitForLoadState('domcontentloaded');

    // extend
    await page.goto(`https://www.pythonanywhere.com/user/${userName}/webapps`);
    await SelectorUtil.continueWaitFor(page, "id=main_nav");
    let extendBtn = "//input[@value='Run until 3 months from today']";
    await SelectorUtil.continueClick(page, extendBtn, 3);
})


