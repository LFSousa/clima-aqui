import React from "react";
import "./styles.scss";
import moment from "moment";
import iconsMap from "../../icons_map.json";

function Forecast({ data }) {
  return (
    <div className="forecasts">
      {data.map((forecast, index) => (
        <div className="forecast" key={index}>
          <div className="date">
            {moment(forecast.dt * 1000).format("D ddd")}
          </div>
          <div className="time">{moment(forecast.dt * 1000).format("LT")}</div>
          <i className={`wi wi-${iconsMap[forecast.weather[0].id]}`} />
          <div className="temp">
            {Math.round(forecast.main.temp_min)}º/
            {Math.round(forecast.main.temp_max)}º
          </div>
          <div className="info">{forecast.weather[0].description}</div>
        </div>
      ))}
    </div>
  );
}

export default Forecast;
