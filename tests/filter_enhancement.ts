import {test} from "@playwright/test";
import {delay, SelectorUtil} from "../lib/SelectorUtil";

/**
 * pick up enhancement to do from beta ppm
 * created by zhangyongxin
 */

let title = 'filter_enhancement'
const {
    USERNAME_PPM,
    PASSWORD_PPM,
} = process.env;
test(title, async ({page}) => {
    let userName = USERNAME_PPM || '';
    let password = PASSWORD_PPM || '';
    if(!userName || !password){
        console.log('PASSWORD_PPM or PASSWORD_PPM is null, please setup action env params!!!');
        process.exit(0);
    }
    await page.goto('https://beta.ppm-demo.com/itg/dashboard/app/portal/PageView.jsp');
    await page.fill('id=field-username', userName);
    await page.fill('id=field-password', password);
    await page.click('id=label-LOGON_SUBMIT_BUTTON_CAPTION');

    await page.waitForLoadState('domcontentloaded');
    await delay(1000);
    const pageUrls = [
        "https://beta.ppm-demo.com/itg/dashboard/app/portal/MaxView.jsp?portletId=774569985&ENTITY_MODE=Y&entityId=&entityType=&entityKey=",
        "https://beta.ppm-demo.com/itg/dashboard/app/portal/MaxView.jsp?dshOldState=maximized&portletId=774569985&entityId=&pageId=774537216&entityType=&ENTITY_MODE=Y&entityKey=&Pluto_p774569985_startingRow=101",
        "https://beta.ppm-demo.com/itg/dashboard/app/portal/MaxView.jsp?dshOldState=maximized&portletId=774569985&entityId=&pageId=774537216&entityType=&ENTITY_MODE=Y&entityKey=&Pluto_p774569985_startingRow=201",
    ]
    for (let pageUrl of pageUrls) {
        await filterEachPage(page, pageUrl);
    }
})

async function filterEachPage(page: any, pageUrl: string) {
    await page.goto(pageUrl);

    let aLinks = await page.locator('//table[contains(@id,"marginManagerTable_")]//tr', {
        hasText: "In Backlog"
    }).locator('//a[contains(@href,"tg/web/knta/crt/RequestDetail.jsp?REQUEST_ID=")]');
    const count = await aLinks.count();
    console.log('######count=' + count);
    for (let i = 0; i < count; ++i) {
        try {
            let href = await aLinks.nth(i).getAttribute('href');
            await aLinks.nth(i).click();
            await page.waitForLoadState('domcontentloaded');
            await delay(1000);
            let agileInfo = await page.inputValue('id=REQ.P.KNTA_AGILE_INSTANCE_NAMEAC_TF');
            let works = await page.inputValue('id=REQD.P.SIZEESTIMATE');
            if (agileInfo === '' || agileInfo.length === 0) {
                console.log("########results", {href: href, works: works})
            }
        } catch (e) {
            await page.goBack();
            await delay(1000);
        }

    }
}
