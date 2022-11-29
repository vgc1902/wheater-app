export const TodayWeather = ({ weather = {} }) => (
	<div className="pt-20">
		{!Object.keys(weather).length ? (
			<p className="text-center">
				Para consultar los datos del tiempo selecciona una comunidad autónoma y
				una localidad.
			</p>
		) : (
			<div>
				<span>
					{weather.nombre}, {weather.provincia}
				</span>
			</div>
		)}
	</div>
);
