Feature: Web interactions

  Background: launch parabank url
    Given launch automation test url

  Scenario Outline: Input field test
    When I clickon the mail icon under Welcome ParaBank
    Then I should see the CustomerCare fields
    Then I enter the <Name> <Email> <Phone> <Message>
    Then Proceed to clickon the submit button

    Examples:
      | ID      | Name        | Email          | Phone      | Message    |
      | Web_001 | Shankar     | test@gmail.com | 1212121212 | Sample Msg |
      | Web_002 | @1212112Sha | !tegmail.com   | sdgdhgh    |            |

  Scenario Outline: Dropdown options
    When clickon the "AdminPage" in the menu
    Then I could see the "Administration" fields
    Then scroll down to the "Application settings" header
    Then change the "JMS" from the "Loan provider" dropdown
    Then Proceed to submit and verify the confirmation msg