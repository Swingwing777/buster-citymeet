import React from 'react';
import { shallow } from 'enzyme';
import EventList from '../EventList';
import Event from '../Event';
import { mockData } from '../_support_/mock-data';
// import { extractLocations } from '../_support_/api';

describe('<EventList /> component', () => {
  test('render correct number of events', () => {
    const EventListWrapper = shallow(<EventList events={mockData} />);

    // find() creates an array. Its length needs to match mockData.length
    expect(EventListWrapper.find(Event)).toHaveLength(mockData.length);
  });
});
