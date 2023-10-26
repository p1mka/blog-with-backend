import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CLOSE_MODAL, openModal, removePostAsync } from "../../../../actions";
import { Icon } from "../../../../components";
import { checkAccess } from "../../../../utils";
import { ROLE } from "../../../../constants";
import { selectUserRole } from "../../../../selectors";
import { styled } from "styled-components";

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch();

	const navigate = useNavigate();
	const userRole = useSelector(selectUserRole);

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: "Удалить статью?",
				onConfirm: () => {
					dispatch(removePostAsync(id)).then(() => navigate(`/`));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			})
		);
	};

	const isAdmin = checkAccess([ROLE.ADMIN], userRole);

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && (
					<Icon
						inactive={true}
						id="fa-calendar-o"
						size="18px"
						margin="0 7px 0 0"
					/>
				)}
				{publishedAt}
			</div>

			{isAdmin && (
				<div className="buttons">
					{editButton}
					{publishedAt && (
						<Icon
							id="fa-trash-o"
							size="21px"
							onClick={() => onPostRemove(id)}
						/>
					)}
				</div>
			)}
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin: ${({ margin }) => margin};
	& .published-at {
		display: flex;
	}
	& .buttons {
		display: flex;
	}
	& i {
		position: relative;
		top: -1px;
	}
`;

SpecialPanel.propTypes = {
	id: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
	editButton: PropTypes.node.isRequired,
};
