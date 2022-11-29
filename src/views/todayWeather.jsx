import { Image, Button, Alert } from "@vechaiui/react";
import locationUrl from "/assets/icons/location.svg";
import reloadUrl from "/assets/icons/reload.svg";
export const TodayWeather = ({ weather = {}, reload }) => {
	const getTemperatureFromHour = () => {
		const now = new Date();
		const timeNow = now.getHours().toString();
		const temperature = weather.temperatura.find(
			({ hour }) => timeNow === hour
		);

		return temperature.value;
	};
	return (
		<div className="py-20">
			{!Object.keys(weather).length ? (
				<p className="text-center">
					Para consultar los datos del tiempo selecciona una comunidad autónoma
					y una localidad.
				</p>
			) : (
				<>
					<div className="flex justify-between">
						<div>
							<div className="flex">
								<Image
									alt="location"
									htmlWidth={15}
									htmlHeight={15}
									src={locationUrl}
								/>
								<span className="font-medium pl-1">{weather.nombre},</span>
							</div>
							<span className="text-xs text-slate-500 pl-5">
								{weather.provincia}
							</span>
						</div>
						<div>
							<Button onClick={reload()}>
								<Image
									alt="reload"
									htmlWidth={15}
									htmlHeight={15}
									src={reloadUrl}
								/>
							</Button>
						</div>
					</div>
					<div className="pt-20">
						{weather.temperatura ? (
							getTemperatureFromHour()
						) : (
							<Alert
								variant="solid"
								color="primary"
								className="flex justify-center"
							>
								Algo ha ido mal. Puedes volver a consultar los datos de nuevo
								pulsando el botón de actualizar.
							</Alert>
						)}
					</div>
				</>
			)}
		</div>
	);
};
