// src/_tests_/NumberOfEvents.test.js

import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
// import { mockData } from "../_support_/mock-data";
// import { extractLocations } from "../_support_/api";

describe('<NumberOfEvents /> component', () => {

  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(
      <NumberOfEvents
        length='2'
        updateEventCount={() => { }} />
    );
  });

  test('render input element', () => {
    expect(NumberOfEventsWrapper.find('.viewNumber')).toHaveLength(1);
  });

  test('renders text input correctly', () => {
    const eventCount = NumberOfEventsWrapper.state('eventCount');
    expect(NumberOfEventsWrapper.find('.viewNumber').prop('value')).toBe(eventCount);
  });

  test('change state when number input changes', () => {
    NumberOfEventsWrapper.setState({
      eventCount: 32
    });
    const eventObject = { target: { value: 17 } };
    NumberOfEventsWrapper.find('.viewNumber').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('eventCount')).toBe(17);
  });

  // test('ensure no call of change state when number input changes', () => {
  //   NumberOfEventsWrapper.setState({
  //     eventCount: 32
  //   });
  //   const eventObject = { target: { value: 17 } };
  //   NumberOfEventsWrapper.find('.viewNumber').simulate('change', eventObject);
  //   expect(NumberOfEventsWrapper.state('eventCount')).toBe(17);
  // });


});



