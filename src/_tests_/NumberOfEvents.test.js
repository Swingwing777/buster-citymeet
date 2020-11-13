// src/_tests_/NumberOfEvents.test.js

import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';
// import { mockData } from "../_support_/mock-data";
// import { extractLocations } from "../_support_/api";

describe('<NumberOfEvents /> component', () => {

  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents length='2' />);  // This limits total to 2
  });

  test('render input element', () => {
    expect(NumberOfEventsWrapper.find('.viewNumber')).toHaveLength(1);
  });

  test('renders text input correctly', () => {
    const numEvents = NumberOfEventsWrapper.state('numEvents');
    expect(NumberOfEventsWrapper.find('.viewNumber').prop('value')).toBe(numEvents);
  });

  test('change state when number input changes', () => {
    NumberOfEventsWrapper.setState({
      numEvents: 32
    });
    const eventObject = { target: { value: 17 } };
    NumberOfEventsWrapper.find('.viewNumber').simulate('change', eventObject);
    expect(NumberOfEventsWrapper.state('numEvents')).toBe(17);
  });

});



