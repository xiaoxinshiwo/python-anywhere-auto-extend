import {test} from '@playwright/test';
import {delay, SelectorUtil} from '../lib/SelectorUtil'

const {
    USER_NAME,
    PASSWORD,
} = process.env;

let title = 'auto_extend_python_anywhere'
test(title, async ({page}) => {
    // login
    await page.goto('https://www.pythonanywhere.com/login/');
    await SelectorUtil.continueWaitFor(page, SelectorUtil.byFullText('h1', 'Log in'));
    let userName = USER_NAME || '';
    let password = PASSWORD || '';
    if(!userName || !password){
        console.log('username or password null, please setup action env params')
        process.exit(0);
    }
    await page.fill('id=id_auth-username', userName);
    await page.fill('id=id_auth-password', password);
    await page.click('id=id_next');
    await page.waitForLoadState('domcontentloaded');

    // extend
    await page.goto('https://www.pythonanywhere.com/user/zhangyongxin/webapps');
    await SelectorUtil.continueWaitFor(page, "id=main_nav");
    let extendBtn = "//input[@value='Run until 3 months from today']";
    await SelectorUtil.continueClick(page, extendBtn, 3);
})


