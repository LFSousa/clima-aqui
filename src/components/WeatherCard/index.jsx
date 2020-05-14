import React from "react";
import "./styles.scss";
import iconsMap from "../../icons_map.json";
import refreshIcon from "../../assets/refresh.svg";

function WeatherCard({
  temp,
  feels_like,
  humidity,
  weatherId,
  onRefresh,
  refreshing,
}) {
  return (
    <div className="weather-card">
      <div className="title">
        <span>Clima atual</span>
        <button onClick={onRefresh}>
          Atualizar
          <img
            src={refreshIcon}
            alt="Atualizar"
            className={refreshing ? "refreshing" : ""}
          />
        </button>
      </div>
      <div className="content">
        <div className="weather">
          <span className="temp">{temp}º</span>
          <span>Sensação térmica: {feels_like}º</span>
          <span>Humidade: {humidity}%</span>
        </div>
        <div className="icon">
          <i className={`wi wi-${iconsMap[weatherId]}`} />
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
