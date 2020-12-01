// src/_support_/api.js

import { mockData } from './mock-data'
import axios from 'axios';
import NProgress from 'nprogress';

export const extractLocations = (events) => {
  var extractLocations = events.map((event) => event.location);
  var locations = [...new Set(extractLocations)];
  return locations;  // An array of locations
};

export const extractGenres = (events) => {
  var countAng = [];
  var countjQ = [];
  var countJS = [];
  var countNode = [];
  var countReact = [];
  var extractGenres = events.map((event) => event.summary);
  extractGenres.forEach((genre) => {
    if (genre.indexOf("Angular") !== -1) {
      countAng.push(genre)
    }
    if (genre.indexOf("jQuery") !== -1) {
      countjQ.push(genre)
    }
    if (genre.indexOf("JavaScript") !== -1) {
      countJS.push(genre)
    }
    if (genre.indexOf("Node") !== -1) {
      countNode.push(genre)
    }
    if (genre.indexOf("React") !== -1) {
      countReact.push(genre)
    }
  });

  var genres = [
    countAng.length,
    countjQ.length,
    countJS.length,
    countNode.length,
    countReact.length
  ];

  // console.log('Api.js exported genres: ' + genres);
  return genres; // Array of genre.lengths in alphabetical order
}

const checkToken = async (accessToken) => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then((res) => res.json())
    .catch((error) => error.json());

  return result;
};

export const getEvents = async () => {
  NProgress.start();

  if (window.location.href.startsWith("http://localhost")) {
    NProgress.done();
    return mockData;
  }

  if (!navigator.onLine) {
    const eventsString = localStorage.getItem("lastEvents");
    const eventsParsed = JSON.parse(eventsString);
    NProgress.done();
    return eventsParsed.events;
  };

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = `https://9a81gfiskk.execute-api.eu-central-1.amazonaws.com/dev/api/get-events/${token}`;
    const result = await axios.get(url);
    if (result.data) {
      var locations = extractLocations(result.data.events);
      localStorage.setItem("lastEvents", JSON.stringify(result.data));
      localStorage.setItem("locations", JSON.stringify(locations));
    }
    NProgress.done();
    return result.data.events;
  }
};

const removeQuery = () => {
  if (window.history.pushState && window.location.pathname) {
    var newurl =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const { access_token } = await fetch(
    `https://9a81gfiskk.execute-api.eu-central-1.amazonaws.com/dev/api/token/${encodeCode}`
  )
    .then((res) => {
      return res.json();
    })
    .catch((error) => error);

  access_token && localStorage.setItem("access_token", access_token);

  return access_token;
};

export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');

  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = await searchParams.get("code");

    if (!code) {
      const results = await axios.get(
        "https://9a81gfiskk.execute-api.eu-central-1.amazonaws.com/dev/api/get-auth-url"
      );
      const { authUrl } = results.data;
      return (window.location.href = authUrl);
    }

    return code && getToken(code);
  }

  return accessToken;
}