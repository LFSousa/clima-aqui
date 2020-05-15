[![Netlify Status](https://api.netlify.com/api/v1/badges/5da3dee7-e1f1-4c6d-a66f-672258070114/deploy-status)](https://app.netlify.com/sites/clima-aqui/deploys)

# Clima Aqui

### Visualize o clima em sua região a partir da geolocalização do navegador e dados do [OpenWeather](https://openweathermap.org/)

Acesse o [demo](https://clima-aqui.netlify.app/)

Acesse a [documentação](https://lfsousa.gitbook.io/clima-aqui)

## Configurando o projeto

Você pode configurar as chaves de api do Google Maps e OpenWeather dentro do arquivo `.env` ou chamando as variáveis de ambiente antes do comando `yarn start`

### `.env`

    REACT_APP_OPENWEATER_KEY="ow_api_key"
    REACT_APP_MAPS_KEY="maps_api_key"

### Ou

#### Linux / MacOS

`REACT_APP_OPENWEATER_KEY="ow_api_key" REACT_APP_MAPS_KEY="maps_api_key" yarn start`

#### Windows

`set REACT_APP_OPENWEATER_KEY="ow_api_key"&&set REACT_APP_MAPS_KEY="maps_api_key"&&yarn start`

## Rodando o projeto

### `yarn start`

Roda o app no modo de desenvolvimento

Abra [http://localhost:3000](http://localhost:3000) para visualizar no navegador.

### `yarn build`

Cria a versão de produção do projeto dentro da pasta `build`
