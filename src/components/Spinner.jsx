import React, { useContext } from "react";
import { Spinner } from "@vechaiui/react";
import { LoadingContext } from "../context/loading/loadingProvider";

const SpinnerUI = () => {
	const { loading } = useContext(LoadingContext);

	return (
		<div className="flex justify-center py-24">
			{loading && <Spinner size="md" />}
		</div>
	);
};

export default SpinnerUI;
