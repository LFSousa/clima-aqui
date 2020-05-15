import axios from "axios";

const api = axios.create({
  baseURL: "https://api.openweathermap.org/data/2.5",
});

api.interceptors.request.use((req) => {
  req.params = {
    ...req.params,
    appId: process.env.REACT_APP_OPENWEATER_KEY,
  };
  return req;
});

function weatherFromLatLng(lat, lon) {
  return api
    .get("weather", {
      params: {
        lat,
        lon,
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
        lang: "pt_br",
        units: "metric",
      },
    })
    .then(({ data }) => data);
}

export { weatherFromLatLng, forecastFromLatLng };
