import { $, browser, expect } from "@wdio/globals";

export class HerokuPage {

  // Dropdown Menu
  private dropdownMenuLink = $("//a[text()='Dropdown']");
  private dropdownSelector = $("select");

  // Checkbox Menu
  private checkboxMenuLink = $("//a[text()='Checkboxes']");
  private checkboxList = $$("//form//input[@type='checkbox']");

  get fileUploadInput() {
    return $("#file-upload");
  }

  get fileSubmitButton() {
    return $("#file-submit");
  }

  get fileLocation() {
    return "C:/Users/ACER/Downloads/samplefile.pdf";
  }

  get successMessage() {
    return $('//h3'); // Update this with the correct locator for the success message element
  }

  // Open the Heroku Internet homepage
  async open() {
    await browser.url("https://the-internet.herokuapp.com/");
    await expect(browser).toHaveUrl(expect.stringContaining("the-internet.herokuapp.com"));
  }

  // Navigate to Dropdown menu page
  async goToDropdownMenu() {
    await this.dropdownMenuLink.click();
    await browser.pause(2000); // Wait for the page to load
  }

  // Select options from the dropdown menu
  async selectDropdownOptions() {
    const options = await $$("//select/option");
    for (let option of options) {
      await this.dropdownSelector.selectByVisibleText(await option.getText());
    }
  }

  // Navigate to Checkbox menu page
  async goToCheckboxMenu() {
    await this.checkboxMenuLink.click();
  }

  // Select or unselect checkboxes
  async toggleCheckboxes() {
    for (let checkbox of this.checkboxList) {
      await expect(checkbox).toBeDisplayed();
  
      if (!(await checkbox.isSelected())) {
        await checkbox.click(); // Select if not selected
      } else {
        await checkbox.click(); // Unselect if selected
      }
    }
  }

  async verifyFileUploadSuccess() {
    await expect(this.successMessage).toBeDisplayed();
    await expect(this.successMessage).toHaveText("File Uploaded!");
  }

 
}
