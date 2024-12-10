import { Given, When, Then } from "@wdio/cucumber-framework";
import { $, browser, expect } from "@wdio/globals";
import { HerokuPage } from "../pageobjects/heroku.page";
const herokuPage = new HerokuPage();
const submitBtn = $(
  "//input[@type='submit' and @value='Send to Customer Care']"
);

Given(/^launch Google URL$/, async () => {
  await browser.url("https://google.com");
});

When(/^I enter the (.*) in search box$/, async (word) => {
  const keyword = $("//textarea[@class='gLFyf']");
  await keyword.setValue(word);
  await browser.keys("Enter");
});

Then(/^I should see the first result and click on it$/, async () => {
  const firstResult = $("//h3");
  await expect(firstResult).toBeDisplayed();
  await firstResult.click();
});

Then(/^Verify the (.*) is correct$/, async (expectUrl) => {
  await expect(browser).toHaveUrl(expectUrl);
});

Given(/^launch automation test url$/, async () => {
  await browser.url("https://parabank.parasoft.com/parabank/index.htm");
});

When(/^I clickon the mail icon under Welcome ParaBank$/, async () => {
  const mailIcon = $("//a[text()='contact']");
  await expect(mailIcon).toBeDisplayed();
  await mailIcon.click();
  const cusCareText = $("//h1[text()='Customer Care']");
  await expect(cusCareText).toBeDisplayed();
  browser.pause(2000);
  await expect(browser).toHaveUrl(
    expect.stringContaining(
      "https://parabank.parasoft.com/parabank/contact.htm"
    )
  );
});

Then(/^I should see the CustomerCare fields$/, async () => {
  await expect(submitBtn).toBeClickable();
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
    }
  }
);

Then(/^Proceed to clickon the submit button$/, async () => {
  await submitBtn.click();
});

Given(/^Launch the Internet herokuapp website$/, async () => {
  await herokuPage.open();
});

When(/^clickon the Dropdown menu$/, async () => {
  await herokuPage.goToDropdownMenu();
});

Then(/^verify and select dropdown options$/, async () => {
  await herokuPage.selectDropdownOptions();
});

When(/^clickon the Checkboxmenu$/, async () => {
  await herokuPage.goToCheckboxMenu();
});

Then(/^select the checkboxes that are unselected and vice versa$/, async () => {
  await herokuPage.toggleCheckboxes();
});

When(/^the uploading file is selected and uploaded$/, async () => {
  await browser.url("https://the-internet.herokuapp.com/upload");
  const uploadFile = await browser.uploadFile(herokuPage.fileLocation);
  await herokuPage.fileUploadInput.setValue(uploadFile);
  await herokuPage.fileSubmitButton.click();
});

Then(/^Verify the navigation and success msg$/, async () => {
  await herokuPage.verifyFileUploadSuccess();
});

Given(/^launch and login with saucedemo credentials$/, async () => {
  await browser.url("https://www.saucedemo.com/v1/");
  const userName = $("//input[@data-test='username']");
  const passWord = $("//input[@data-test='password']");
  const submitBtn = $("//input[@type='submit']");
  await userName.setValue("standard_user");
  await passWord.setValue("secret_sauce");
  await submitBtn.click();
  const productDiv = $("//div[text()='Products']");
  expect(productDiv).toBeDisplayed();
});

Then(/^verify the inventory item (.*)$/, async (noOfProducts) => {
  if (!noOfProducts)
    throw Error(`Invalid inventory products : ${noOfProducts}`);
  const productName = await $$("//div[@class='inventory_item_name']");
  await expect(productName.length).toEqual(parseInt(noOfProducts));
});

Then(/^verify the price values greater than 0$/, async () => {
  const priceArr = $$("//div[@class='inventory_item_price']");
  const priceStrArr = [];
  for (let i = 0; i < (await priceArr.length); i++) {
    let priceStrText = await priceArr[i].getText();
    priceStrArr.push(priceStrText);
  }
  //removing the $ in price element
  let priceNumArr = priceStrArr.map((ele) => parseInt(ele.replace("$", "")));
  //checking the value greater than 0
  let invalidPriceArr = priceNumArr.filter((ele) => ele <= 0);
  expect(invalidPriceArr.length).toEqual(0);
});
