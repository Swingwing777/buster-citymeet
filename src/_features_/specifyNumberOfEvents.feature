Feature: Specify Number Of Events.

  Scenario: When user has not specified a number, 32 is the default.
    Given that a list of events has been displayed
    When user has not selected a number to display
    Then 32 events will be displayed by default

  Scenario: User can change the number of events they want to see
    Given that the user has not selected a number of events to display
    When the user selects a different number of events to display
    Then the selected number of events will be displayed
