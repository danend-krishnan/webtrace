const { firefox } = require('playwright');
async function loginAndSearch(username, password, accountToSearch) {
  const browser = await firefox.launch({ headless: false, args: ['--no-sandbox']});
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/accounts/login/');
  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', username);
  await page.type('input[name="password"]', password);
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  console.log('Logged in!');
  await page.goto(`https://www.instagram.com/${accountToSearch}/`);
  await page.waitForSelector('h1');
  const profileName = await page.$eval('h1', el => el.innerText);
  console.log('Profile Name:', profileName);
  await browser.close();
}
loginAndSearch('Webtrace_og', 'dan@12345', '__.k.r.i.s.h');
