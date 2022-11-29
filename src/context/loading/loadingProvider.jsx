import { createContext, useState } from "react";

export const LoadingContext = createContext({
	loading: false,
	showLoading: () => {},
	closeLoading: () => {},
});

const LoadingProvider = ({ children }) => {
	const [loading, setLoading] = useState(false);

	return (
		<LoadingContext.Provider
			value={{
				loading: loading,
				showLoading: () => setLoading(true),
				closeLoading: () => setLoading(false),
			}}
		>
			{children}
		</LoadingContext.Provider>
	);
};

export default LoadingProvider;
