# Weather Aemet ![image](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E) ![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) 
---

Herramienta donde podrás consultar los datos del tiempo de las estaciones meteorológicas de cada Comunidad Autónoma. Los datos son extraídos de la página oficial de [Aemet](https://www.aemet.es/) y en ellos podrás consultar datos como la Temperatura máxima(°C), rachas de viento, humedad y mucho más.

## Setup

Antes que nada, debes instalar el paquete _concurrently_ a través de npm, el cuál te permite ejecutar comandos al mismo tiempo. Para más detalle [concurrently](https://www.npmjs.com/package/concurrently)

```
$ npm i -g concurrently
```

Para levantar el proyecto desde local, instala el proyecto utilizando _npm_:

```
$ cd weather-app
$ npm install
$ nvm use
$ npm run dev
```