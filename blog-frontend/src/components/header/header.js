import { ControlPanel, Logo } from "./components";
import styled from "styled-components";

const Description = styled.div`
	font-style: italic;
`;

const HeaderContainter = ({ className }) => (
	<header className={className}>
		<Logo />
		<Description>
			Веб-технологии <br /> Написание кода <br /> Разбор ошибок
		</Description>
		<ControlPanel />
	</header>
);
export const Header = styled(HeaderContainter)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	position: fixed;
	top: 0;
	width: 1000px;
	background-color: #fff;
	height: 120px;
	padding: 20px 40px;
	box-shadow: -1px 5px 6px 0px rgba(135, 135, 135, 1);
	z-index: 10;
`;
