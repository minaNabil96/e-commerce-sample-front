import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import {
	useUserSignUpConfirmMutation,
	useUserEditPasswordMutation,
} from "../utils/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn, isLoggedOut, isAdmin } from "../utils/reducers/authSlice";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import useModalHandler from "../helpers/useModalHandler";
import LoadingsAndErrors from "../components/LoadingsAndErrors";
const UserConfrimPage = () => {
	const [username, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	const [userSignUpConfirm, { isLoading, isSuccess, data, isError, error }] =
		useUserSignUpConfirmMutation();
	const [userEditPassword, { data: passwordResetData }] =
		useUserEditPasswordMutation();
	const location = useLocation();
	const { modalOpen, modalClose } = useModalHandler(5000);
	const confirmToken = useParams().confirmToken;
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const resetPasswordPage = location.pathname.split("/");
	console.log(resetPasswordPage[2]);
	const usernameHandler = (e) => {
		setUserName(e.target.value);
	};

	const passwordHandler = (e) => {
		setPassword(e.target.value);
	};
	const passwordConfirmHandler = (e) => {
		setPasswordConfirm(e.target.value);
	};
	const loginHandler = (e) => {
		if (!username || !password) {
			modalOpen("login", `please enter your login info!`);
			modalClose();
		} else if (username && password) {
			userSignUpConfirm({
				username,
				password,
				token: confirmToken.slice(7),
			})
				.unwrap()
				.then((res) => {
					if (
						res.isLoggedIn === true &&
						res.accessToken.split(" ")[0] === "Bearer"
					) {
						localStorage.setItem("isLoggedIn", true);
						localStorage.setItem("userId", res.userId);
						localStorage.setItem("userName", res.username);
						localStorage.setItem("userImage", res.image);
						localStorage.setItem("admin", res.admin);
						localStorage.setItem("accessToken", res.accessToken);
						dispatch(isLoggedIn());
						if (res.admin === true) {
							dispatch(isAdmin());
							navigate("/admin-dashboard");
						} else {
							navigate("/");
						}
					} else {
						modalOpen("signup", `${res.data.message}`);
						modalClose();
						dispatch(isAdmin());
					}
				})
				.catch((err) => {
					modalOpen("signup", `${err.data.message}`);
					modalClose();
				});
		}
	};

	const passwordReset = (e) => {
		if (password !== passwordConfirm) {
			modalOpen("info", `passwords are not identical!`);
			modalClose();
		}
		if (!password || !passwordConfirm) {
			modalOpen("info", `please enter passwords`);
			modalClose();
		}
		userEditPassword({
			newPassword: password,
			token: confirmToken.slice(7),
		})
			.unwrap()
			.then((res) => {
				if (res.status && res.status.includes("success")) {
					modalOpen(
						"info",
						`congratulation your password has been reset.`
					);
					modalClose();
					setTimeout(() => {
						navigate("/login");
					}, 5500);
				}
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
				modalOpen("info", `${error.data.message}`);
				modalClose();
			});
	};

	return (
		<Box className=" bg-gradient-to-br from-slate-400 to-green-500/90  ">
			<Box
				className={`h-screen flex items-center justify-center flex-col `}
			>
				{!confirmToken || confirmToken.split("-")[0] !== "Bearer" ? (
					<LoadingsAndErrors>
						<Box className={`flex items-center justify-center`}>
							<Typography
								className={`text-red-500`}
								variant={`h5`}
							>
								Error
							</Typography>
						</Box>
					</LoadingsAndErrors>
				) : resetPasswordPage &&
				  resetPasswordPage[2] === "reset-password" ? (
					<Box
						className={` flex items-center justify-center flex-col bg-slate-200  rounded `}
						component="form"
						sx={{
							"& .MuiTextField-root": {
								marginX: "1rem",
								marginY: "1rem",
								paddingY: "5px",
								width: "300px",
							},
						}}
						noValidate
						autoComplete="off"
					>
						<TextField
							onChange={(e) => passwordHandler(e)}
							onKeyUp={(e) =>
								e.key === "Enter" ? passwordReset(e) : null
							}
							id="newPassword"
							label="new password"
						/>
						<TextField
							type={`password`}
							onChange={(e) => passwordConfirmHandler(e)}
							onKeyUp={(e) =>
								e.key === "Enter" ? passwordReset(e) : null
							}
							id="confirmPassword"
							label="confirm password"
						/>
						<Button
							sx={{ marginY: "5px" }}
							variant="contained"
							color={"success"}
							onClick={(e) => passwordReset(e)}
						>
							confirm
						</Button>
					</Box>
				) : (
					<Box
						className={` flex items-center justify-center flex-col bg-slate-200  rounded `}
						component="form"
						sx={{
							"& .MuiTextField-root": {
								marginX: "1rem",
								marginY: "1rem",
								paddingY: "5px",
								width: "300px",
							},
						}}
						noValidate
						autoComplete="off"
					>
						<TextField
							onChange={(e) => usernameHandler(e)}
							onKeyUp={(e) =>
								e.key === "Enter" ? loginHandler(e) : null
							}
							id="username"
							label="User Name"
						/>
						<TextField
							type={`password`}
							onChange={(e) => passwordHandler(e)}
							onKeyUp={(e) =>
								e.key === "Enter" ? loginHandler(e) : null
							}
							id="password"
							label="Password"
						/>
						<Button
							sx={{ marginY: "5px" }}
							variant="contained"
							color={"success"}
							onClick={(e) => loginHandler(e)}
						>
							confirm
						</Button>
					</Box>
				)}
			</Box>
		</Box>
	);
};

export default UserConfrimPage;
