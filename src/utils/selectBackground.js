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

// Trata os tipos de clima para pegar a imagem de fundo correspondente
export function selectBackground(weatherId) {
  if (weatherId >= 200 && weatherId < 300) return backgrounds.thunderstorm;
  if (weatherId >= 300 && weatherId < 400) return backgrounds.drizzle;
  if (weatherId >= 500 && weatherId < 600) return backgrounds.rain;
  if (weatherId >= 600 && weatherId < 700) return backgrounds.snow;
  if (weatherId >= 700 && weatherId < 800) return backgrounds.atmosphere;
  if (weatherId === 800) return backgrounds.clear;
  if (weatherId > 800 && weatherId < 900) return backgrounds.cloud;
}
