// src/App.js

import React, { Component } from 'react';
import './App.css';
import "./nprogress.css";
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import ChartScatter from './charts/ChartScatter';
import ChartPie from './charts/ChartPie';
// import EventGenre from './charts/EventGenre';
import { Container, Row, Col } from 'react-bootstrap';
import { getEvents, extractLocations, extractGenres } from './_support_/api';


class App extends Component {
  state = {
    events: [],
    locations: [],
    showEventCount: 32,
    userFilter: [],
    genres: [],
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

  getGenres = () => {
    const genres = this.state.genres;
    const data = [
      { name: 'AngularJS', value: genres[0] },
      { name: 'JavaScript', value: genres[1] },
      { name: 'jQuery', value: genres[2] },
      { name: 'Nodejs', value: genres[3] },
      { name: 'React', value: genres[4] },
    ];
    console.log(data[2]); // answer should be an object {name: 'jQuery', value: 1 }
    return data;
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events), genres: extractGenres(events) });
        console.log('Genres [2] is: ' + this.state.genres[2])  // answer should be 1 (if localhost)
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
    //const data = this.getGenres()
    console.log('App state - genres: ' + this.state.genres);
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
          <Row>
            <Col>
              <h4>Subjects by Availability</h4>
              <ChartPie
                locations={this.state.locations}
                events={this.state.events} />
            </Col>
            <Col>
              <h4>Events in Each City</h4>
              <ChartScatter
                // getData (whole function) exported to ChartScatter as props
                getData={this.getData} />
            </Col>
          </Row>

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
