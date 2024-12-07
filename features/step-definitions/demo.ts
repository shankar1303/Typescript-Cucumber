import { Given, When, Then } from '@wdio/cucumber-framework';
import { $, browser } from '@wdio/globals';

Given(/^launch Google URL$/, async () => {
    await browser.url('https://google.com');
    await browser.$('[name="q"]').waitForDisplayed({ timeout: 5000 });
});

When(/^I enter the (.*) in search box$/, async (word) => {
    const keyword = $('[name="q"]');
    await keyword.setValue(word);
    await browser.keys('Enter');
    await $('//h3').waitForDisplayed({ timeout: 5000 }); // Wait for search results
});

Then(/^I should see the first result and click on it$/, async () => {
    const firstResult = $("//h3");
    await firstResult.click();
});

Then(/^Verify the (.*) is correct$/, async (expectUrl) => {
    const browserUrl = await browser.getUrl();
    await expect(browserUrl).toBe(expectUrl);
    await browser.pause(2000)
})