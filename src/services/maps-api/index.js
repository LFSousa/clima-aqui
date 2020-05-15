import axios from "axios";

const api = axios.create({
  baseURL: "https://maps.googleapis.com/maps/api",
});

api.interceptors.request.use((req) => {
  req.params = {
    ...req.params,
    key: process.env.REACT_APP_MAPS_KEY,
  };
  return req;
});

function geocodingFromLatLng(latLng) {
  return api
    .get("geocode/json", {
      params: {
        address: `${latLng.lat},${latLng.lng}`,
      },
    })
    .then(({ data }) => data);
}

export { geocodingFromLatLng };
