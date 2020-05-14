import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

function weatherFromLatLng(lat, lon) {
  return api
    .get("weather", {
      params: {
        lat,
        lon,
        appId: process.env.REACT_APP_OPENWEATER_KEY,
        lang: "pt_br",
        units: "metric",
      },
    })
    .then(({ data }) => data);
}

function forecastFromLatLng(lat, lon) {
  return api
    .get("forecast", {
      params: {
        lat,
        lon,
        appId: process.env.REACT_APP_OPENWEATER_KEY,
        lang: "pt_br",
        units: "metric",
      },
    })
    .then(({ data }) => data);
}

export { weatherFromLatLng, forecastFromLatLng };
