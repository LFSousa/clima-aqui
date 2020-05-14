import React, { Component } from "react";
import {
  weatherFromLatLng,
  forecastFromLatLng,
} from "../../services/weather-api";
import LocationInfo from "../../components/LocationInfo";
import WeatherCard from "../../components/WeatherCard";
import "./styles.scss";
import Forecast from "../../components/Forecast";
import ReactLoading from "react-loading";

const backgrounds = {
  thunderstorm: "https://media.giphy.com/media/j69Ma1PlscvTO/giphy.gif",
  atmosphere: "https://i.imgur.com/ubvQIxi.gif",
  snow:
    "http://bestanimations.com/Nature/winter/winter-snow-nature-animated-gif-11.gif",
  drizzle:
    "http://bestanimations.com/Nature/Water/rain/rain-nature-animated-gif-20.gif",
  rain: "https://media.giphy.com/media/5PjafLZFxMWc/giphy.gif",
  clear: "https://thumbs.gfycat.com/PlumpBrightArgusfish-size_restricted.gif",
  cloud: "https://i.imgur.com/bwTjjL4.gif",
};

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      weather: null,
      forecast: null,
      loading: true,
    };
  }

  requestData() {
    this.setState({ refreshing: true });
    // Pega a localização aproximada do usuário usando a API Geolocation do navegador
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        // Efetua as requisições para o OpenWeather para obter os dados de clima atual e previsão do tempo
        Promise.all([
          weatherFromLatLng(latitude, longitude),
          forecastFromLatLng(latitude, longitude),
        ])
          .then(([weather, forecast]) => {
            const weatherId = weather.weather[0].id;
            let bgUri = "";

            // Trata os tipos de clima para pegar a imagem de fundo correspondente
            if (weatherId >= 200 && weatherId < 300)
              bgUri = backgrounds.thunderstorm;
            if (weatherId >= 300 && weatherId < 400)
              bgUri = backgrounds.drizzle;
            if (weatherId >= 500 && weatherId < 600) bgUri = backgrounds.rain;
            if (weatherId >= 600 && weatherId < 700) bgUri = backgrounds.snow;
            if (weatherId >= 700 && weatherId < 800)
              bgUri = backgrounds.atmosphere;
            if (weatherId === 800) bgUri = backgrounds.clear;
            if (weatherId > 800 && weatherId < 900) bgUri = backgrounds.cloud;

            this.setState({ weather, forecast, bgUri });
          })
          .catch((e) => {
            console.error("API ERROR", e);
            this.setState({ error: "api" });
          })
          .finally(() => {
            this.setState({ refreshing: false, loading: false });
          });
      },
      (error) => {
        console.error("GEOLOCATION ERROR", error);
        this.setState({ error: "geolocation" });
      }
    );
  }

  // Chama a função `requestData` assim que o componente é iniciado
  componentDidMount() {
    this.requestData();
  }

  render() {
    const { weather, forecast, bgUri, refreshing, loading, error } = this.state;

    return loading ? (
      <div className="loading">
        {!error ? (
          <>
            <ReactLoading
              type="bubbles"
              color="white"
              width={100}
              height={100}
            />
            <div>Buscando sua localização</div>
          </>
        ) : (
          <div>
            Não consegui encontrar onde você está.
            <br />
            Verifique se você permitiu que o navegador compartilhe sua
            localização.
          </div>
        )}
      </div>
    ) : (
      <div>
        {!!weather && (
          <div>
            <div className="main-container">
              <div className="md-row sm-col">
                <LocationInfo city={weather?.name} date={weather.dt} />
                <WeatherCard
                  {...weather?.main}
                  weatherId={weather?.weather[0].id}
                  onRefresh={() => this.requestData()}
                  refreshing={refreshing}
                />
              </div>
              {!!forecast && <Forecast data={forecast.list} />}
            </div>
            <div
              className="blur"
              style={{
                backgroundImage: `url(${bgUri})`,
              }}
            />
            <div className="backdrop" />
          </div>
        )}
      </div>
    );
  }
}
