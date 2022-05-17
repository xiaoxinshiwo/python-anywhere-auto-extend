/**
 *
 * created by zhangyongxin
 */
export async function delay(time: number) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}

class SelectorUtil {

    static byFullText(tag: string, text: string) {
        return 'xpath=//' + tag + '[text()="' + text + '"]';
    }

    static async continueWaitFor(page: any, selector: string) {
        let times = 0;
        let totalTimes = 10;
        while (times < totalTimes) {
            let ready = await this.waitForWithCatch(page, selector);
            console.log(`####selector:${selector}###ready:${ready}`)
            if (ready) {
                return;
            }
            console.log('continue wait for:' + selector);
            times = times + 1;
            await delay(500);
        }
    }

    static async waitForWithCatch(page: any, selector: string) {
        return await page.waitForSelector(selector, {timeout: 500})
            .then(() => {
                return true;
            })
            .catch((err: any) => {
                console.log('wait selector with error:'+err)
                return false;
            })
    }

    static async continueClick(page: any, selector: string, clickTimes?: number) {
        let times = 0;
        if(!clickTimes){
            clickTimes = 1;
        }
        while (times < clickTimes) {
            let clicked = await this.clickWithCatch(page, selector);
            console.log(`####selector:${selector}###clicked:${clicked}`)
            if (clicked) {
                return;
            }
            console.log('continue click for:' + selector);
            times = times + 1;
            await delay(500);
        }
    }


    static async clickWithCatch(page: any, selector: string) {
        return await page.click(selector, {timeout: 500})
            .then(() => {
                return true;
            })
            .catch((err: any) => {
                console.log('click button with error:'+err);
                return false;
            })
    }
}

export {SelectorUtil}