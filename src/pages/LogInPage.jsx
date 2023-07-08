import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Container from "@mui/material/Container";
import { Box, Typography, TextField, Button } from "@mui/material";
import {
  useUserLoginMutation,
  useUserResetPasswordMutation,
} from "../utils/api/apiSlice";
import { useDispatch, useSelector } from "react-redux";
import { isLoggedIn, isLoggedOut, isAdmin } from "../utils/reducers/authSlice";
import { useNavigate } from "react-router-dom";
import useModalHandler from "../helpers/useModalHandler";
import LoadingsAndErrors from "../components/LoadingsAndErrors";
function LogInPage() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [errorState, setErrorState] = useState({
    usernameStatus: false,
    passwordStatus: false,
    emailStatus: false,
  });
  const [forgotPasswordStatus, setForgotPasswordStatus] = useState(false);

  useEffect(() => {
    setForgotPasswordStatus(false);
  }, []);

  const loggedInStatus = localStorage.getItem("isLoggedIn");
  const haveToken = localStorage.getItem("accessToken");
  const errorStatus = (e) => {
    if (e.target.id === "password") {
      setPassword(e.target.value);
      e.target.value === ""
        ? setErrorState({ ...errorState, passwordStatus: true })
        : setErrorState({ ...errorState, passwordStatus: false });
    } else if (e.target.id === "username") {
      setUserName(e.target.value);
      e.target.value === ""
        ? setErrorState({ ...errorState, usernameStatus: true })
        : setErrorState({ ...errorState, usernameStatus: false });
    } else if (e.target.id === "email") {
      setEmail(e.target.value);
      e.target.value === ""
        ? setErrorState({ ...errorState, emailStatus: true })
        : setErrorState({ ...errorState, emailStatus: false });
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userLogin, { isLoading, isSuccess, data, isError, error }] =
    useUserLoginMutation();
  const [userResetPassword, { data: resetPasswordData }] =
    useUserResetPasswordMutation();

  const { modalOpen, modalClose } = useModalHandler(
    forgotPasswordStatus && 5000
  );
  const loginHandler = (e) => {
    if (!username || !password) {
      modalOpen("login", `please enter your login info!`);
      modalClose();
    } else if (username && password) {
      userLogin({ username, password })
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
              navigate("/user-profile");
            }
          } else {
            modalOpen("login", `${res.data.message}`);
            modalClose();
            dispatch(isAdmin());
          }
        })
        .catch((err) => {
          modalOpen("login", `${err.data.message}`);
          modalClose();
        });
    }
  };

  const resetPasswordHandler = (e) => {
    if (username && email) {
      userResetPassword({
        email,
        username,
      })
        .unwrap()
        .then((res) => {
          console.log(res);
          if (res.status && res.status.includes("link")) {
            modalOpen("login", `${res.status}`);
            modalClose();
          }
        })
        .catch((err) => {
          console.log(err);
          modalOpen("login", `${err.data.message}`);
          modalClose();
        });
    } else {
      modalOpen("info", `please enter your info first!`);
      modalClose();
    }
  };

  return (
    <Box className=" bg-gradient-to-br from-slate-300 to-green-400/90   ">
      <Box
        className={` min-h-screen flex items-center justify-center flex-col  `}
      >
        {loggedInStatus === "true" ||
        (haveToken && haveToken.split(" ")[0] === "Bearer") ? (
          <LoadingsAndErrors>
            <Box className={`flex items-center justify-center`}>
              <Typography className={`text-black`} variant={`h4`}>
                already logged in
              </Typography>
            </Box>
          </LoadingsAndErrors>
        ) : forgotPasswordStatus ? (
          <Box
            className={` flex items-center justify-center flex-col bg-white  rounded `}
            component="form"
            sx={{
              "& .MuiTextField-root": {
                marginX: "1rem",
                marginY: "1rem",
                // paddingY: "5px",
                width: "300px",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              error={errorState.usernameStatus}
              onChange={(e) => errorStatus(e)}
              onKeyUp={(e) =>
                e.key === "Enter" ? resetPasswordHandler(e) : null
              }
              required
              id="username"
              label="your username"
              // color={`secondary`}
            />
            <TextField
              type={`email`}
              error={errorState.emailStatus}
              onChange={(e) => errorStatus(e)}
              onKeyUp={(e) =>
                e.key === "Enter" ? resetPasswordHandler(e) : null
              }
              required
              id="email"
              label="your email"
              // color={`secondary`}
            />
            <Button
              sx={{
                marginTop: "0.50rem",
                // paddingBottom: "0.25rem",
                width: "100%",
                backgroundColor: " midnightblue",
                ":hover": { backgroundColor: "darkblue" },
              }}
              variant="contained"
              // color={"success"}
              onClick={(e) => resetPasswordHandler(e)}
            >
              <p className={`py-1`}>ok</p>
            </Button>
          </Box>
        ) : (
          <Box
            className={` flex items-center justify-center flex-col bg-white  rounded `}
            component="form"
            sx={{
              "& .MuiTextField-root": {
                marginX: "1rem",
                marginY: "1rem",
                // paddingY: "5px",
                width: "300px",
              },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              error={errorState.usernameStatus}
              onChange={(e) => errorStatus(e)}
              onKeyUp={(e) => (e.key === "Enter" ? loginHandler(e) : null)}
              required
              id="username"
              label="User Name"
              // color={`secondary`}
            />
            <TextField
              type={`password`}
              error={errorState.passwordStatus}
              onChange={(e) => errorStatus(e)}
              onKeyUp={(e) => (e.key === "Enter" ? loginHandler(e) : null)}
              required
              id="password"
              label="Password"
              // color={`secondary`}
            />
            <Box className={`flex items-center justify-center space-x-4`}>
              <Button
                sx={{
                  marginTop: "0.50rem",
                  // paddingBottom: "0.25rem",

                  backgroundColor: " aquamarine",
                  ":hover": { backgroundColor: "cyan" },
                  color: "black",
                  paddingX: "0.50rem",
                }}
                variant="contained"
                // color={"success"}
                onClick={() => setForgotPasswordStatus(true)}
              >
                <p className={`py-1`}>forgot password ?</p>
              </Button>
              <Link to={`/signup`}>
                <Button
                  sx={{
                    marginTop: "0.50rem",
                    // paddingBottom: "0.25rem",

                    backgroundColor: " aquamarine",
                    ":hover": { backgroundColor: "cyan" },
                    color: "black",
                    paddingX: "0.50rem",
                  }}
                  variant="contained"
                >
                  <p className={`py-1`}>new user ?</p>
                </Button>
              </Link>
            </Box>
            <Button
              sx={{
                marginTop: "0.50rem",
                // paddingBottom: "0.25rem",
                width: "100%",
                backgroundColor: " midnightblue",
                ":hover": { backgroundColor: "darkblue" },
              }}
              variant="contained"
              // color={"success"}
              onClick={(e) => loginHandler(e)}
            >
              <p className={`py-1`}>login</p>
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
}

export default LogInPage;
