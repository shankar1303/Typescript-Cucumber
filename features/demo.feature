Feature: To search and launch a website from Google
  @demo
  Scenario Outline: To launch Google page, search, and click on the first result
    Given launch Google URL
    When I enter the <word> in search box
    Then I should see the first result and click on it
    Then Verify the <ExpectedURL> is correct


    Examples:
      | TestID   | word     | ExpectedURL               |
      | Demo_001 | WDIO     | https://webdriver.io/     |
      | Demo_002 | Selenium | https://www.selenium.dev/ |


