import { Given, When, Then } from "@wdio/cucumber-framework";
import { $, browser } from "@wdio/globals";

const submitBtn = $(
  "//input[@type='submit' and @value='Send to Customer Care']"
);

Given(/^launch Google URL$/, async () => {
  await browser.url("https://google.com");
  await browser.$('[name="q"]').waitForDisplayed({ timeout: 5000 });
});

When(/^I enter the (.*) in search box$/, async (word) => {
  const keyword = $('[name="q"]');
  await keyword.setValue(word);
  await browser.keys("Enter");
  await $("//h3").waitForDisplayed({ timeout: 5000 }); // Wait for search results
});

Then(/^I should see the first result and click on it$/, async () => {
  const firstResult = $("//h3");
  await firstResult.click();
});

Then(/^Verify the (.*) is correct$/, async (expectUrl) => {
  const browserUrl = await browser.getUrl();
  await expect(browserUrl).toBe(expectUrl);
  await browser.pause(2000);
});

Given(/^launch automation test url$/, async () => {
  await browser.url("https://parabank.parasoft.com/parabank/index.htm");
  await browser.pause(2000);
});

When(/^I clickon the mail icon under Welcome ParaBank$/, async () => {
  const mailIcon = $("//a[text()='contact']");
  await mailIcon.waitForDisplayed();
  await mailIcon.click();
  const cusCareText = $("//h1[text()='Customer Care']");
  await cusCareText.waitForDisplayed();
  const browserUrl = await browser.getUrl();
  browser.pause(2000);
  await expect(browserUrl).toContain(
    "https://parabank.parasoft.com/parabank/contact.htm"
  );
});

Then(/^I should see the CustomerCare fields$/, async () => {
  await submitBtn.waitForClickable();
  await browser.pause(2000);
});

Then(
  /^I enter the (.*) (.*) (.*) (.*)$/,
  async (name: string, email: string, phone: string, msg: string) => {
    // Create an array of form field data
    const formData = [
      { name: "name", selector: $("#name"), value: name },
      { name: "email", selector: $("#email"), value: email },
      { name: "phone", selector: $("#phone"), value: phone },
      { name: "message", selector: $("#message"), value: msg },
    ];

    // Example usage: Filling out the form
    for (let field of formData) {
      await field.selector.setValue(field.value);
      await browser.pause(2000);
    }
  }
);

Then(/^Proceed to clickon the submit button$/, async () => {
  await submitBtn.click();
  await browser.pause(2000);
});

Given(/^Launch the Internet herokuapp website$/, async () => {
  await browser.url("https://the-internet.herokuapp.com/");
  await browser.pause(5000);
  const assertUrl = await browser.getUrl();
  await expect(assertUrl).toContain("the-internet.herokuapp.com");
});

When(/^clickon the Dropdown menu$/, async () => {
  const dropDownMenu = $("//a[text()='Dropdown']");
  await dropDownMenu.click();
  await browser.pause(2000);
});

Then(/^verify and select dropdown options$/, async () => {
  const listOfOpt = await $$("//select/option");
  for (let optionElement of listOfOpt) {
    const optionText = await optionElement.getText();
    await $("//select").selectByVisibleText(optionText);
    await browser.pause(1000);
  }
});

When(/^clickon the Checkboxmenu$/, async () => {
  const checkBoxMenu = await $("//a[text()='Checkboxes']");
  await checkBoxMenu.click();
});

Then(/^select the checkboxes that are unselected and vice versa$/, async () => {
  const checkBoxList = await $$("//form//input[@type='checkbox']");
  for (let ele of checkBoxList) {
    await ele.waitForDisplayed();
    if (!(await ele.isSelected())) {
      await ele.click();
    } else {
      await ele.click();
    }
    await browser.pause(2000);
  }
});
