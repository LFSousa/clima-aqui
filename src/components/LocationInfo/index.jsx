import React from "react";
import "./styles.scss";
import moment from "moment";
import { useEffect } from "react";
import { geocodingFromLatLng } from "../../services/maps-api";
import { useState } from "react";

function LocationInfo({ city, date, latLng }) {
  const [address, setAddress] = useState("");

  useEffect(() => {
    geocodingFromLatLng(latLng).then(({ results }) => {
      let _address = results[0]?.formatted_address;
      setAddress(_address);
      console.log(results);
    });
  }, [latLng]);

  return (
    <div className="location-info">
      <span className="date">
        {moment(date * 1000).format("dddd[,] D [de] MMMM")}
      </span>
      <span className="city">{city}</span>
      <span className="address">{address}</span>
    </div>
  );
}

export default LocationInfo;
