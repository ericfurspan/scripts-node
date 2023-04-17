import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import AdblockerPlugin from 'puppeteer-extra-plugin-adblocker';
import fetch from 'node-fetch';
import 'dotenv/config';

puppeteer.use(StealthPlugin());
puppeteer.use(AdblockerPlugin({ blockTrackers: true }));

const { SLACK_WEBHOOK_URL } = process.env;
const PAGE_URL = 'https://www.lids.com/nba-new-york-knicks/new-york-knicks-mitchell-and-ness-x-lids-1998-all-star-weekend-hardwood-classics-cake-pop-fitted-hat-cream/o-3514+t-69258542+p-2694394122+z-8-3242102590'
const DESIRED_HAT_SIZE = '7 1/8';

/**
  https://pptr.dev/#?product=Puppeteer&version=v14.1.1&show=api-class-page
  https://github.com/berstend/puppeteer-extra/tree/master/packages/puppeteer-extra
*/
export default async () => {
  const browser = await puppeteer
  .launch({
    headless: true,
    defaultViewport: null,
  });

  try {    
    const page = await browser.newPage();
    await page.setUserAgent(`"Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1)", locale: "de-DE,de"`)

    await page.goto(PAGE_URL);
    console.log('navigated to page')

    await page.waitForSelector('#size-selector-list');
    console.log('found #size-selector-list')

    const isAvailable = await page
      .$eval(
        `#size-selector-list > a[aria-label='Size ${DESIRED_HAT_SIZE}']`,
        el => el.classList.contains('available')
      );

    console.log('isAvailable', isAvailable)

    if (isAvailable) {
      await fetch(SLACK_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: `Size ${DESIRED_HAT_SIZE} is available!\n\n${PAGE_URL}`
        }),
      });
    }

    await browser.close();
  } catch (error) {
    console.log('error', error.message);
    await fetch(SLACK_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { text: error.message }
    });

    await browser.close();
  }
}
