// src/_features_/showHideAnEventsDetails.test.js

import React from 'react';
import { mount } from 'enzyme';
import App from '../App';
import { loadFeature, defineFeature } from 'jest-cucumber';

const feature = loadFeature('./src/_features_/showHideAnEventsDetails.feature');

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {

    let AppWrapper;
    given('that a list of collapsed events has been displayed', () => {
      AppWrapper = mount(<App />);
    });

    when('user has not clicked on Show Details for an event',
      () => { }
    );

    then('all events are collapsed by default', () => {
      expect(AppWrapper.find('.eventDetails')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, when, then }) => {
    let AppWrapper;
    given('that a list of collapsed events has been displayed', () => {
      AppWrapper = mount(<App />);
    });

    when('user clicks on Show Details for an event', () => {
      AppWrapper.update();
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });

    then('the event expands to show details', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.eventDetails').hostNodes()).toHaveLength(1);
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let AppWrapper;
    given('that an event has been expanded to show details', () => {
      AppWrapper = mount(<App />);
    });

    when('the user clicks on Hide Details to collapse the event', () => {
      //Click twice and update to show and hide details
      AppWrapper.update()
      AppWrapper.find('.details-btn').at(0).simulate('click');
      AppWrapper.find('.details-btn').at(0).simulate('click');
    });

    then('the event collapses to hide its details', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.eventDetails')).toHaveLength(0);
    });
  });
});