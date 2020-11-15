import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';
import { mockData } from '../_support_/mock-data';

describe('<EventList /> component', () => {
  test('render correct number of events', () => {
    const EventListWrapper = shallow(<EventList events={mockData} />);
    expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
  });
});