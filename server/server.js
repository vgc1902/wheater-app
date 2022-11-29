const path = require("path");
const https = require("https");
const parser = require("xml2json");
const fs = require("fs");
const assetsRouter = require("./assets-router");
const express = require("express");
const app = express();

const comunityData = require("./data/comunidadesAutonomas.json");
const towns = require("./data/municipios");

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

app.use("/src", assetsRouter);

app.use("/", express.static(path.join(__dirname, "..", "public")));

app.get("/api/v1/autonomous_comunity", (req, res) => {
	res.send(comunityData);
});

app.get("/api/v1/towns/:id", (req, res) => {
	const id = req.params.id;
	res.send(towns[id]);
});

app.get("/api/v1/hourly_weather/:id", (req, res) => {
	const stream = fs.createWriteStream(path.join(__dirname, "resumen.xml"));
	const id = req.params.id;
	const url = `https://www.aemet.es/xml/municipios_h/localidad_h_${id}.xml`;
	https.get(url, (response) => {
		response.setEncoding("latin1");
		response.pipe(stream);
		fs.readFile(path.join(__dirname, "resumen.xml"), (err, data) => {
			const dataXML = data.toString("utf-8");
			const json = JSON.parse(parser.toJson(dataXML));
			const { nombre, provincia, prediccion } = json.root;
			const parserData = {
				nombre,
				provincia,
				temperatura: prediccion?.dia[0]?.temperatura.map((temp) => {
					return { hour: temp.periodo, value: temp["$t"] };
				}),
			};
			res.send(parserData);
		});
	});
});

app.get("/*", (_req, res) => {
	res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

const { PORT = 5000 } = process.env;
app.listen(PORT, () => {
	console.log();
	console.log(`  App running in port ${PORT}`);
	console.log();
	console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
});
