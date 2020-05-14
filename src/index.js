import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import Main from "./views/Main";
import moment from "moment";
import "moment/locale/pt-br";
import { WeatherThemeProvider } from "weather-styled-icon";

// Define a linguagem padrão do moment como português
moment.locale("pt-br");

// Define o tema dos icones de clima
const theme = {
  sunColor: "Orange",
  raysColor: "OrangeRed",
};

ReactDOM.render(
  <WeatherThemeProvider theme={theme}>
    <Main />
  </WeatherThemeProvider>,
  document.getElementById("root")
);
