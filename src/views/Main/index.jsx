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
import { selectBackground } from "../../utils/selectBackground";

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
            this.setState({
              weather,
              forecast,
              bgUri: selectBackground(weather.weather[0].id),
              latLng: { lat: latitude, lng: longitude },
            });
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
    const {
      weather,
      forecast,
      bgUri,
      refreshing,
      loading,
      error,
      latLng,
    } = this.state;

    return loading ? (
      // Tela de carregamento
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
      // Tela principal
      <div>
        {!!weather && (
          <div>
            <div className="main-container">
              <div className="md-row sm-col">
                <LocationInfo
                  city={weather?.name}
                  date={weather.dt}
                  latLng={latLng}
                />
                <WeatherCard
                  {...weather?.main}
                  weather={weather?.weather[0]}
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
