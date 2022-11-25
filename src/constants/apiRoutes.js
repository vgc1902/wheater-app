const apiURL = import.meta.env.VITE_API_URL;

const apiRoutes = {
	autonomous_comunity: `${apiURL}/autonomous_comunity`,
	towns: (id) => `${apiURL}/towns/${id}`,
};

export default apiRoutes;
