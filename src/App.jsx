import { useEffect, useState } from "react";
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
		<div className="App">
			<ul>
				{comunities.map(({ name, code }) => (
					<li key={code}>{name}</li>
				))}
			</ul>
		</div>
	);
}

export default App;
