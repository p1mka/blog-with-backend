import { Link } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "../../../../components";

const LargeText = styled.div`
	font-size: 40px;
	font-weight: 600;
	line-height: 48px;
`;
const SmallText = styled.div`
	margin-top: -5px;
	font-size: 18px;
	font-weight: bold;
`;

const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Icon id="fa-code" size="70px" margin="-10px 10px 0 0" />
		<div>
			<LargeText>Блог</LargeText>
			<SmallText>веб-разработчика</SmallText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	margin-top: -6px;
`;
