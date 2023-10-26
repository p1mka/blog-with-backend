import { useForm } from "react-hook-form";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AuthFormError, Button, H2, Input } from "../../components";
import { setUser } from "../../actions";
import { useResetForm } from "../../hooks";
import { selectUserRole } from "../../selectors";
import styled from "styled-components";
import { ROLE } from "../../constants";
import { request } from "../../utils";

const regFormSchema = yup.object().shape({
	login: yup
		.string()
		.required("Заполните логин")
		.matches(
			/\w+$/,
			"Неверно заполнен логин. Допускаются только буквы и цифры"
		)
		.min(3, "Неверно заполнен логин. Должно быть минимум 3 символа")
		.max(15, "Неверно заполнен логин. Должно быть максимум 15 символов"),
	password: yup
		.string()
		.required("Заполните пароль")
		.matches(
			/^[\w#%]+$/,
			"Неверно заполнен пароль. Допустимые символы: буквы, цифры и символы # и %"
		)
		.min(6, "Неверно заполнен пароль. Должно быть минимум 6 символов")
		.max(30, "Неверно заполнен пароль. Должно быть максимум 30 символов"),
	passcheck: yup
		.string()
		.required("Заполните повтор пароля")
		.oneOf([yup.ref("password"), null], "Введенные пароли не совпадают"),
});

const RegistrationContainer = ({ className }) => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: {
			login: "",
			password: "",
			passcheck: "",
		},
		resolver: yupResolver(regFormSchema),
	});

	const [serverError, setServerError] = useState(null);
	const dispatch = useDispatch();
	const roleId = useSelector(selectUserRole);

	useResetForm(reset);

	const onSubmit = ({ login, password }) => {
		request("/register", "POST", { login, password }).then(
			({ error, user }) => {
				if (error) {
					setServerError(`Ошибка запроса: ${error}`);
					return;
				}

				dispatch(setUser(user));
				sessionStorage.setItem("userData", JSON.stringify(user));
			}
		);
	};
	const formError =
		errors?.login?.message ||
		errors?.password?.message ||
		errors?.passcheck?.message;
	const errorMessage = formError || serverError;

	if (roleId !== ROLE.GUEST) {
		return <Navigate to="/" />;
	}

	return (
		<div className={className}>
			<H2>Регистрация</H2>
			<form onSubmit={handleSubmit(onSubmit)}>
				<Input
					type="text"
					placeholder="Логин..."
					{...register("login", {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Пароль..."
					{...register("password", {
						onChange: () => setServerError(null),
					})}
				/>
				<Input
					type="password"
					placeholder="Проверка пароля..."
					{...register("passcheck", {
						onChange: () => setServerError(null),
					})}
				/>
				<Button type="submit" disabled={!!formError}>
					Зарегистрироваться
				</Button>
				{errorMessage && <AuthFormError>{errorMessage}</AuthFormError>}
			</form>
		</div>
	);
};

export const Registration = styled(RegistrationContainer)`
	display: flex;
	flex-direction: column;
	align-items: center;

	& > form {
		display: flex;
		flex-direction: column;
		width: 260px;
	}
`;
