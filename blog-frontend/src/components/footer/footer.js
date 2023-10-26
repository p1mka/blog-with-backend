import { useEffect, useState } from "react";
import styled from "styled-components";

const FooterContainter = ({ className }) => {
	const [city, setCity] = useState("");
	const [temperature, setTemperature] = useState("");
	const [weather, setWeather] = useState("");

	useEffect(() => {
		fetch(
			"https://api.openweathermap.org/data/2.5/weather?q=Moscow&lang=ru&units=metric&appid=e3d189f7db1b726b9ed6964cbef557c3"
		)
			.then((res) => res.json())
			.then(({ main, name, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);

	return (
		<div className={className}>
			<div>
				<div>Блог веб-разработчика</div>
				<div>web@developer.ru</div>
			</div>
			<div>
				<div>
					{city},{" "}
					{new Date().toLocaleString("ru", {
						day: "numeric",
						month: "long",
					})}
				</div>
				<div>
					{temperature}º, {weather}
				</div>
			</div>
		</div>
	);
};

export const Footer = styled(FooterContainter)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	// position: fixed;
	// bottom: 0;
	width: 1000px;
	height: 120px;
	background-color: #fff;
	padding: 20px 40px;
	box-shadow: 0px -3px 6px 0px rgba(135, 135, 135, 1);
	font-weight: bold;
`;
