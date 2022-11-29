import { Image, Button } from "@vechaiui/react";
import locationUrl from "/assets/icons/location.svg";
import reloadUrl from "/assets/icons/reload.svg";
export const TodayWeather = ({ weather = {}, reload }) => (
	<div className="py-20">
		{!Object.keys(weather).length ? (
			<p className="text-center">
				Para consultar los datos del tiempo selecciona una comunidad autónoma y
				una localidad.
			</p>
		) : (
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
		)}
	</div>
);
