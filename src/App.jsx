import { useEffect, useState } from "react";
import { VechaiProvider, Select } from "@vechaiui/react";
import axios from "axios";
import apiRoutes from "./constants/apiRoutes";

function App() {
	const [comunities, setComunities] = useState([]);

	const getComunities = async () => {
		const { data } = await axios.get(apiRoutes.autonomous_comunity);
		setComunities(data);
	};

	useEffect(() => {
		getComunities();
	}, []);

	return (
		<VechaiProvider className="App">
			<div className="container mx-auto py-24 px-5">
				<Select>
					{comunities.map(({ name, code }) => (
						<option key={code}>{name}</option>
					))}
				</Select>
			</div>
		</VechaiProvider>
	);
}

export default App;
