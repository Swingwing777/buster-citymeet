Feature: Show/hide an events details.

  Scenario: An event element is collapsed by default
    Given that the user has not selected an event
    When he/she opens the app
    Then all events are collapsed by default

  Scenario: User can expand an event to see its details
    Given that a list of collapsed events has been displayed
    When he/she selects an event
    Then the event expands to show details

  Scenario: User can collapse an event to hide its details
    Given that an event has been expanded to show details
    When he/she clicks to collapse the event
    Then the event collapses to hide its details