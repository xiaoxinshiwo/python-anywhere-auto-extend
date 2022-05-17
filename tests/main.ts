import {test} from '@playwright/test';
import {delay, SelectorUtil} from '../lib/SelectorUtil'

let title = 'auto_extend_python_anywhere'
test(title, async ({page}) => {
    // login
    await page.goto('https://www.pythonanywhere.com/login/');
    await SelectorUtil.continueWaitFor(page, SelectorUtil.byFullText('h1', 'Log in'));
    await page.fill('id=id_auth-username', 'zhangyongxin');
    await page.fill('id=id_auth-password', 'Xiaoxin0223!');
    await page.click('id=id_next');
    await page.waitForLoadState('domcontentloaded');

    // extend
    await page.goto('https://www.pythonanywhere.com/user/zhangyongxin/webapps');
    await SelectorUtil.continueWaitFor(page, "id=main_nav");
    let extendBtn = "//input[@value='Run until 3 months from today']";
    await SelectorUtil.continueClick(page, extendBtn, 3);
})


