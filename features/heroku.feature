Feature: Heroku website

    Background: Heroku website
        Given Launch the Internet herokuapp website

    Scenario: Dropdown validation
        When clickon the Dropdown menu
        Then verify and select dropdown options

    Scenario: Checkbox selection
        When clickon the Checkboxmenu
        Then select the checkboxes that are unselected and vice versa

    Scenario: File upload
        When the uploading file is selected and uploaded
        Then Verify the navigation and success msg
