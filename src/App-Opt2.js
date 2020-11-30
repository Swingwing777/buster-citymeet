// src/App.js

import React, { Component } from 'react';
import './App.css';
import "./nprogress.css";
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { Container } from 'react-bootstrap';
import { getEvents, extractLocations } from './_support_/api';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';


class App extends Component {
  state = {
    events: [],
    locations: [],
    showEventCount: 32,
    userFilter: [],
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const showEventCount = this.state.showEventCount;

      const locationEvents = (location === 'all')
        ? events
        : events.filter((event) => event.location === location);

      const filteredEvents = locationEvents.slice(0, showEventCount)

      this.setState({
        // new array matching locations and showEventCount filter.
        events: filteredEvents
      });
    });
  }

  updateEventCount = (number) => {
    this.setState({
      showEventCount: number
    });
  };

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location).length
      const city = location.split(',').shift()
      return { city, number };
    })
    return data;
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    })
      .catch((err) => {
        console.log(err);
      });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <h1>CityMeet Calendar</h1>
        <h4>Choose your nearest city</h4>
        <Container>
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents} />
          <NumberOfEvents
            updateEventCount={this.updateEventCount}
          />
          <EventList
            events={this.state.events}
            showEventCount={this.state.showEventCount}
          />
          <h4>Events in each city</h4>
          <ResponsiveContainer height={400} >
            <ScatterChart
              margin={{
                top: 20, right: 20, bottom: 20, left: 20,
              }}
            >
              <CartesianGrid />
              <XAxis
                type="category"
                dataKey="city"
                name="city" />
              <YAxis
                type="number"
                dataKey="number"
                name="number of events"
                allowDecimals={false} />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter
                name="Events by Location"
                data={this.getData()}
                fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </Container>
      </div >
    );
  }
}

export default App;
