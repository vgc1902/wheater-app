import { useContext, useEffect, useState } from "react";
import { VechaiProvider } from "@vechaiui/react";
import axios from "axios";
import apiRoutes from "./constants/apiRoutes";
import { SelectUI } from "./components/Select";
import { TodayWeather } from "./views/todayWeather";
import { LoadingContext } from "./context/loading/loadingProvider";
import SpinnerUI from "./components/Spinner";

function App() {
	const [comunities, setComunities] = useState([]);
	const [towns, setTowns] = useState([]);
	const [hourlyWeather, setHourlyWeather] = useState({});
	const [currentTown, setCurrentTown] = useState(" ");
	const { loading, showLoading, closeLoading } = useContext(LoadingContext);

	const getComunities = async () => {
		const { data } = await axios.get(apiRoutes.autonomous_comunity);
		setComunities(data);
	};

	const getTowns = async (id) => {
		const { data } = await axios.get(apiRoutes.towns(id));
		setTowns(data);
	};

	const getHourlyWeather = async (id) => {
		showLoading();
		const { data } = await axios.get(apiRoutes.hourly_weather(id));
		setHourlyWeather(data);
		closeLoading();
	};

	useEffect(() => {
		getComunities();
	}, []);

	const handleComunity = (e) => {
		getTowns(e.target.value);
	};

	const handleWeahter = (e) => {
		setCurrentTown(e.target.value);
		getHourlyWeather(e.target.value);
	};

	const handleReload = () => {
		getHourlyWeather(currentTown);
	};

	return (
		<VechaiProvider className="App">
			<div className="container mx-auto py-24 px-72">
				<SelectUI
					label="Selecciona una comunidad autonoma"
					options={comunities}
					handleChange={handleComunity}
					isRequired
				/>
				<SelectUI
					label="Selecciona una localidad"
					options={towns}
					handleChange={handleWeahter}
					defaultOption="..."
					isDisabled={!towns.length}
					isRequired
				/>
				{!loading ? (
					<TodayWeather weather={hourlyWeather} reload={() => handleReload} />
				) : (
					<SpinnerUI />
				)}
			</div>
		</VechaiProvider>
	);
}

export default App;
