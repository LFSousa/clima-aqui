import React from "react";
import "./styles.scss";
import moment from "moment";

function LocationInfo({ city, date }) {
  return (
    <div className="location-info">
      <span className="city">{city}</span>
      <span className="date">
        {moment(date * 1000).format("dddd[,] D [de] MMMM")}
      </span>
    </div>
  );
}

export default LocationInfo;
