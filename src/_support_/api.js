// src/_support_/api.js

import { mockData } from "./mock-data";

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;
};

export const getEvents = async () => {
  // further code to be added later
  return mockData;
};