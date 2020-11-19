// src/_features_/specifyNumberOfEvents.test.js

import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/_features_/specifyNumberofEvents.feature');

defineFeature(feature, test => {

  test('When user has not specified a number, 32 is the default.', ({ given, when, then }) => {

    let AppWrapper;
    given('that a list of events has been displayed', () => {
      AppWrapper = mount(<App />);
    });

    when('user has not selected a number to display', () => {
      // No action
    });

    then('32 events will be displayed by default', () => {
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      expect(NumberOfEventsWrapper.state('eventCount')).toEqual(32);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper;
    given('that the user has not selected a number of events to display', () => {
      AppWrapper = mount(<App />);
      AppWrapper.setState({ showEventCount: 32 })
    });

    when('the user selects a different number of events to display', () => {
      AppWrapper.update()
      const eventObject = { target: { value: 10 } };
      // const AppEventsState = AppWrapper.state('showEventCount');
      const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
      NumberOfEventsWrapper.find('.viewNumber').simulate('change', eventObject);
    });

    then('the selected number of events will be displayed', () => {
      AppWrapper.update()
      const AppEventsState = AppWrapper.state('showEventCount');
      expect(AppEventsState).not.toEqual(undefined);
      expect(AppWrapper.state('showEventCount')).toEqual(10);
    });
  });
});
