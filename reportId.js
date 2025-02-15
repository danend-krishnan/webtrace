const { chromium } = require('playwright');

async function reportHateSpeech(instaPostUrl, username, password) {
    console.log("Reached here with post URL: " + instaPostUrl);

    const browser = await chromium.launch({ headless: false }); // Set headless: true for background operation
    const page = await browser.newPage();

    // Log in to Instagram
    await page.goto('https://www.instagram.com/accounts/login/');
    await page.waitForSelector('input[name="username"]');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    // Go to the post
    await page.goto(instaPostUrl);
    await page.waitForSelector('article'); // Wait for the post to load

    // Attempt to click the "More options" button (three dots)
    // Using XPath for more precision
    const menuButton = await page.locator('xpath=//button[@aria-label="More options"]');
    await menuButton.click();
    console.log("Clicked the 'More options' button");

    // Wait for the "Report" option to appear and click it
    const reportButton = await page.locator('text="Report"');
    await reportButton.click();
    console.log("Clicked the 'Report' button");

    // Wait for the report menu to load
    await page.waitForSelector('div[role="menu"]'); // Ensure the menu appears

    // Click on the "It’s inappropriate" option
    const inappropriateButton = await page.locator('text="It’s inappropriate"');
    await inappropriateButton.click();
    console.log("Selected 'It’s inappropriate'");

    // Click on the "Submit" button
    const submitButton = await page.locator('button:has-text("Submit")');
    await submitButton.click();
    console.log("Reported post " + instaPostUrl + " successfully.");

    await browser.close();
}



async function sendDM(Webtraceog, targetUsername, message, username, password) {
    const browser = await chromium.launch({ headless: false }); // Launch browser
    const page = await browser.newPage();

    await page.goto('https://www.instagram.com/accounts/login/');
    await page.waitForSelector('input[name="username"]');
    await page.fill('input[name="username"]', username);
    await page.fill('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    await page.goto(`https://www.instagram.com/${targetUsername}/`);

 
    await page.waitForSelector('button[type="button"]:has-text("Message")');
    const messageButton = await page.locator('button[type="button"]:has-text("Message")');
    await messageButton.click();
    console.log(`Opened DM with ${targetUsername}`);

   
    await page.waitForSelector('textarea[placeholder="Message..."]');


    const messageBox = await page.locator('textarea[placeholder="Message..."]');
    await messageBox.fill(message);

   
    await messageBox.press('Enter');
    console.log(`Sent message to ${targetUsername}: "${message}"`);


    await browser.close();
}

module.exports = {
    reportHateSpeech: reportHateSpeech,
    sendDM: sendDM
};