Feature: Heroku website

    Background: Heroku website
        Given Launch the Internet herokuapp website

    Scenario Outline: Dropdown validation
        When clickon the Dropdown menu
        Then verify and select dropdown options

@current
    Scenario Outline: Checkbox selection
        When clickon the Checkboxmenu
        Then select the checkboxes that are unselected and vice versa
