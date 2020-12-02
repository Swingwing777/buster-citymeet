// src/App.js

import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';
import ChartPie from './charts/ChartPie';
import ChartScatter from './charts/ChartScatter';
import CitySearch from './CitySearch';
import EventList from './EventList';
import "./nprogress.css";
import NumberOfEvents from './NumberOfEvents';
import { extractLocations, getEvents } from './_support_/api';
import citymeet from './_support_/citymeet-512.png';


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
        <div>
          <img id="citymeet_logo" src={citymeet} alt="CityMeet app logo" />
          <h1>CityMeet Calendar</h1>
        </div>

        <h4>Choose your nearest city</h4>
        <Container>
          <CitySearch
            locations={this.state.locations}
            updateEvents={this.updateEvents} />
          <NumberOfEvents
            updateEventCount={this.updateEventCount}
          />
          <div className="div-vis-wrapper">
            <ChartPie
              events={this.state.events} />
            <ChartScatter
              getData={this.getData} />
          </div>
          <EventList
            events={this.state.events}
            showEventCount={this.state.showEventCount}
          />
        </Container>
      </div >
    );
  }
}

export default App;
