const path = require("path");
const https = require("https");
const fs = require("fs");
const csv = require("csvtojson");
const express = require("express");
const app = express();

const comunityData = require("./data/comunidadesAutonomas.json");
const towns = require("./data/municipios");
const stream = fs.createWriteStream("./data/resumen.csv");

app.use("/", express.static(path.join(__dirname, "..", "public")));

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "Content-Type");
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

app.get("/api/v1/resume", (req, res) => {
	https.get(
		"https://www.aemet.es/es/eltiempo/observacion/ultimosdatos_comunitat-valenciana_resumen-martes-22.csv?k=val&datos=det&w=1&f=tmax",
		(response) => {
			response.pipe(stream);
			csv({ headers: ["field1"] })
				.fromFile("./data/resumen.csv")
				.then((jsonObj) => res.send(jsonObj));
		}
	);
});

app.get("/api/v1/autonomous_comunity", (req, res) => {
	res.send(comunityData);
});

app.get("/api/v1/towns/:id", (req, res) => {
	console.log(req.params.id);
	const id = req.params.id
	res.send(towns[id]);
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
