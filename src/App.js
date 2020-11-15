// src/App.js

import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { Container } from 'react-bootstrap';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          <CitySearch />
          <EventList />
          <NumberOfEvents />
        </Container>
      </div >
    );
  }
}

export default App;
