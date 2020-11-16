// src/App.test.js

import React from 'react';

// Do not use React 17.0 if using mount from enzyme.  Must roll back to react 16.14.0
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList';
import CitySearch from '../CitySearch';
import NumberOfEvents from '../NumberOfEvents';
import { mockData } from '../_support_/mock-data';
import { extractLocations, getEvents } from '../_support_/api';

describe('<App /> component', () => {
  let AppWrapper;
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test('render list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });
});

describe('<App /> integration', () => {

  test('App passes "events" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('get list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('App passes "showEventCount" state as a prop to EventList', () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({ showEventCount: 10 });
    const AppEventsState = AppWrapper.state('showEventCount');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().showEventCount).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('get correct number of events as selected by the user', () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    const eventObject = { target: { value: 14 } };
    NumberOfEventsWrapper.find('.viewNumber').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('eventCount')).toBe(14);
    expect(AppWrapper.state('showEventCount')).toEqual(NumberOfEventsWrapper.state('eventCount'));
    AppWrapper.unmount();
  });

});

// Add additional test to test for console.log(err) on line 37 of App.js
// https://stackoverflow.com/questions/49096093/how-do-i-test-a-jest-console-log

// describe("Some logging behavior", () => {
//   const log = console.log; // save original console.log function
//   beforeEach(() => {
//     console.log = jest.fn(); // create a new mock function for each test
//   });
//   afterAll(() => {
//     console.log = log; // restore original console.log after all tests
//   });
//   test("no log", () => {
//     // TODO: test something that should not log
//     expect(console.log).not.toHaveBeenCalled();
//   });
//   test("some log", () => {
//     // TODO: test something that should log
//     expect(console.log).toHaveBeenCalled();
//     const message = console.log.mock.calls[0][0]; // get log message
//     expect(message).toEqual(expect.stringContaining('something')); // assert on the message content
//     log(message); // actually log out what the mock was called with
//   });
// });
