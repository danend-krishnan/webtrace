const { chromium } = require("playwright");
const {algo} = require("./algo")

async function loginAndSearch(username, password, accountToSearch) {
  const browser = await chromium.launchPersistentContext("/tmp/insta-session", {
    headless: false,
    args: ["--no-sandbox"],
  });

  const page = browser.pages()[0] || (await browser.newPage());
//ummm login try
  try {
    await page.goto("https://www.instagram.com/accounts/login/");
    await page.waitForSelector('input[name="username"]', { timeout: 20000 });
    await page.type('input[name="username"]', username);
    await page.type('input[name="password"]', password);
    await page.click('button[type="submit"]');
    await page.waitForNavigation({ timeout: 30000 });
    console.log("Logged in!");

    // nasty profile
    await page.goto(`https://www.instagram.com/${accountToSearch}/`);
    await page.waitForSelector("h1", { timeout: 20000 });
    const profileName = await page.$eval("h1", (el) => el.innerText);
    console.log("Profile Name:", profileName);

    //scrolling nasty posts
    console.log("Scrolling to load posts...");
    let scrolling = true;
    while (scrolling) {
      let oldHeight = await page.evaluate(() => document.body.scrollHeight);
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(2000);
      let newHeight = await page.evaluate(() => document.body.scrollHeight);
      if (oldHeight === newHeight) scrolling = false;
    }

    // nasty url retrival...hehe jzt being Script Kiddie here
    console.log("Extracting post URLs...");
    const posts = await page.$$eval("article a", (links) =>
      links
        .map((link) => link.href)
        .filter((href) => href.includes("/p/")) //umm gotta filter nasty post url
    );
    console.log("Filtered post URLs:", posts);

    if (posts.length === 0) {
      console.log("No posts found.");
      await browser.close();
      return;
    }

    // Extract nasty captions from nasty posts
    const allWords = [];
    for (const post of posts) {
      console.log("Opening post:", post);
      await page.goto(post);

      try {
        const caption = await page.$eval(
          "article div > div > div > div > span",
          (el) => el.innerText
        );
        if (caption) {
          console.log("Caption found:", caption);
          allWords.push(...caption.split(" "));
        }
      } catch (err) {
        console.log("No caption found or selector issue:", err.message);
      }
    }

    console.log("All Captions Words:", allWords);
    await browser.close();
  } catch (err) {
    console.error("Error during process:", err.message);
    await browser.close();
  }
}

function monitor(instaid) {
  loginAndSearch("Webtrace_og", "dan@12345", instaid);
  algo();
}


// function allWords(allWords){
//   const scrapped = allWords;
//   console.log(allWords);
// }

module.exports = {
  monitor: monitor,
  loginAndSearch: loginAndSearch
};
