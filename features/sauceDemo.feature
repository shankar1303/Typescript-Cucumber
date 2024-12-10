Feature: Saucedemo page

    Scenario: Product verification in saucedemo
        Given launch and login with saucedemo credentials
        Then verify the inventory item <count>
        Then verify the price values greater than 0

        Examples:
            | SauceID     | count |
            | SauceID_001 | 6     |