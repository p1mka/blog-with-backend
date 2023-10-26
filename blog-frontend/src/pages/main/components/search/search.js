import PropTypes from "prop-types";
import { styled } from "styled-components";
import { Icon, Input } from "../../../../components";

const SearchContainer = ({ className, searchPhrase, onChange }) => {
	return (
		<div className={className}>
			<Input
				placeholder="Поиск по заголовкам"
				value={searchPhrase}
				onChange={onChange}
			/>
			<Icon inactive={true} id="fa-search" size="21px" />
		</div>
	);
};

export const Search = styled(SearchContainer)`
	display: flex;
	width: 340px;
	height: 40px;
	margin: 40px auto 0;
	position: relative;
	& > input {
		padding: 10px 32px 10px 10px;
	}
	& > div {
		position: absolute;
		top: 5px;
		right: 9px;
	}
`;

Search.propTypes = {
	searchPhrase: PropTypes.string.isRequired,
	onChange: PropTypes.func.isRequired,
};
