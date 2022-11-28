import { useEffect, useState } from "react";
import {
	VechaiProvider,
	Select,
	FormLabel,
	RequiredIndicator,
	Alert,
} from "@vechaiui/react";
import axios from "axios";
import apiRoutes from "./constants/apiRoutes";

function App() {
	const [comunities, setComunities] = useState([]);
	const [towns, setTowns] = useState([]);
	const [hourlyWeather, setHourlyWeather] = useState({});

	const getComunities = async () => {
		const { data } = await axios.get(apiRoutes.autonomous_comunity);
		setComunities(data);
	};

	const getTowns = async (id) => {
		const { data } = await axios.get(apiRoutes.towns(id));
		setTowns(data);
	};

	const getHourlyWeather = async (id) => {
		const { data } = await axios.get(apiRoutes.hourly_weather(id));
		setHourlyWeather(data);
	};

	useEffect(() => {
		getComunities();
	}, []);

	const handleComunity = (e) => {
		getTowns(e.target.value);
	};

	const handleWeahter = (e) => {
		getHourlyWeather(e.target.value);
	};

	return (
		<VechaiProvider className="App">
			<div className="container mx-auto py-24 px-44">
				<div className="py-5">
					<FormLabel>
						Selecciona una comunidad autónoma <RequiredIndicator />
					</FormLabel>
					<Select
						aria-label="Selecciona una comunidad autónoma"
						onChange={handleComunity}
					>
						{comunities.map(({ name, code }) => (
							<option key={code} value={code}>
								{name}
							</option>
						))}
					</Select>
				</div>
				<div className="py-5">
					<FormLabel>
						Selecciona una localidad <RequiredIndicator />
					</FormLabel>
					<Select
						aria-label="Selecciona una localidad"
						disabled={!towns.length}
						onChange={handleWeahter}
					>
						<option value="" defaultValue={"..."} disabled hidden>
							...
						</option>
						{towns.map(({ name, code }) => (
							<option key={code} value={code}>
								{name}
							</option>
						))}
					</Select>
				</div>
				<div className="pt-20">
					{hourlyWeather && !Object.keys(hourlyWeather).length ? (
						<Alert variant="subtle">No existen datos.</Alert>
					) : (
						<div>
							<p>{hourlyWeather.nombre}</p>
							<p>{hourlyWeather.provincia}</p>
						</div>
					)}
				</div>
			</div>
		</VechaiProvider>
	);
}

export default App;
