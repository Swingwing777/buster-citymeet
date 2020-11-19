// src/_tests_/Event.test.js

import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
// import { mockData } from '../_support_/mock-data';

describe('<Event /> component', () => {
  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={{
      kind: 'calendar#event',
      summary: 'Learn JavaScript',
      description: 'Have you wondered how you can ask Google to show you the list of the top ten must-see places in London? And how Google presents you the list? How can you submit the details of an application? Well, JavaScript is doing these.',
      location: 'London, UK',
      start: {
        dateTime: '2020-05-19T16:00:00+02:00',
        timeZone: 'Europe/Berlin'
      },
    }
    } />);
  });

  beforeEach(() => {
    EventWrapper.setState({ showDetails: false })
  })

  test('that event parent element exists', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  });
  test('that one button element exists', () => {
    expect(EventWrapper.find('.details-btn')).toHaveLength(1);
  });
  test('that Event state toggles on button click', () => {
    const showDetailsState = EventWrapper.state('showDetails');
    EventWrapper.find('.details-btn').at(0).simulate('click');
    expect(EventWrapper.state('showDetails')).toBe(!showDetailsState);
  });

  test('that event.start/summary/location but not description display always', () => {
    expect(EventWrapper.find('.eventSummary')).toHaveLength(1);
    expect(EventWrapper.find('.eventStart')).toHaveLength(1);
    expect(EventWrapper.find('.eventTimezone')).toHaveLength(1);
    expect(EventWrapper.find('.eventLocation')).toHaveLength(1);
    expect(EventWrapper.find('.eventDetails')).toHaveLength(0);
  });

  test('that event.description displays on first button click, hides on second', () => {
    EventWrapper.find('.details-btn').at(0).simulate('click');
    expect(EventWrapper.find('.eventSummary')).toHaveLength(1);
    expect(EventWrapper.find('.eventStart')).toHaveLength(1);
    expect(EventWrapper.find('.eventTimezone')).toHaveLength(1);
    expect(EventWrapper.find('.eventLocation')).toHaveLength(1);
    expect(EventWrapper.find('.eventDetails')).toHaveLength(1);
    EventWrapper.find('.details-btn').at(0).simulate('click');
    expect(EventWrapper.find('.eventDetails')).toHaveLength(0);
  });
  test('that Event description hidden by default', () => {
    expect(EventWrapper.find('.eventDetails')).toHaveLength(0);
  });
});

