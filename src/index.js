import React from "react";
import ReactDOM from "react-dom";
import "./styles.scss";
import Main from "./views/Main";
import moment from "moment";
import "moment/locale/pt-br";

// Define a linguagem padrão do moment como português
moment.locale("pt-br");

ReactDOM.render(<Main />, document.getElementById("root"));
