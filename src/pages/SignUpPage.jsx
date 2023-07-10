import React, { useState } from "react";
import { Box } from "@mui/system";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { IoIosCloudDone, IoMdCloudDone } from "react-icons/io";
import { imagesUploader } from "../helpers/imagesUploader";
import useModalHandler from "../helpers/useModalHandler";
import { useDispatch } from "react-redux";
import { useUserSignUpMutation } from "../utils/api/apiSlice";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState({
    userName: "",
    identicalUsername: "",
    validUsername: false,
  });
  const [password, setPassword] = useState({
    password: "",
    identicalPassword: "",
    validPassword: false,
  });
  const [email, setEmail] = useState({
    email: "",
    identicalEmail: "",
    validEmail: false,
  });
  const [isImageSelected, setIsImageSelected] = useState({
    status: false,
    imageShowing: "",
    imageForUpload: "",
  });

  const [userSignUp, { isLoading, isSuccess, data, isError, error }] =
    useUserSignUpMutation();
  const { modalOpen, modalClose } = useModalHandler(5000);
  const dispatch = useDispatch();

  const usernameHandler = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id === "re-enter-username" && value.length > 3) {
      if (value === userName.userName) {
        setUserName({
          ...userName,
          identicalUsername: value,
          validUsername: true,
        });
      } else {
        setUserName({
          ...userName,
          identicalUsername: value,
          validUsername: false,
        });
      }
    }
    if (id === "username" && value.length > 3) {
      setUserName({ ...userName, userName: value });
    }
  };

  const passwordHandler = (e) => {
    const id = e.target.id;
    const value = e.target.value;

    if (id === "re-enter-password" && value.length > 3) {
      if (value === password.password) {
        setPassword({
          ...password,
          identicalPassword: value,
          validPassword: true,
        });
      } else {
        setPassword({
          ...password,
          identicalPassword: value,
          validPassword: false,
        });
      }
    }

    if (id === "password" && value.length > 3) {
      setPassword({ ...password, password: value });
    }
  };

  const emailHandler = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id === "re-enter-email") {
      setEmail({ ...email, identicalEmail: value });
    }

    if (id === "enteredEmail") {
      const validEmail = value.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi);
      if (validEmail) {
        // setEmail({ ...email, validEmail: true });
        setEmail({ ...email, validEmail: true, email: value });
      } else {
        setEmail({ ...email, validEmail: false, email: value });
      }
    }
  };
  const selectImageHandler = (e) => {
    const fileForUpload = e.target.files[0];
    const selectedFile = URL.createObjectURL(e.target.files[0]);
    if (selectedFile) {
      setIsImageSelected({
        ...isImageSelected,
        status: true,
        imageShowing: selectedFile,
        imageForUpload: fileForUpload,
      });
    } else
      selectedFile({
        ...isImageSelected,
        status: false,
        imageShowing: "",
        imageForUpload: "",
      });
  };

  const addUserHandler = async (e) => {
    const identicalUsername = userName.userName === userName.identicalUsername;
    const identicalPassword = password.password === password.identicalPassword;
    const identicalEmail = email.email === email.identicalEmail;

    if (
      !identicalUsername ||
      !identicalPassword ||
      !identicalEmail ||
      !isImageSelected.imageForUpload ||
      !userName.validUsername ||
      !password.validPassword ||
      !email.validEmail
    ) {
      modalOpen("info", "error, please re-enter your info");
      modalClose();
    } else {
      const profilePreset = process.env.REACT_APP_CLOUDUPLOADPRESET_PROFILE;
      const { imageUrl } = await imagesUploader(
        isImageSelected.imageForUpload,
        profilePreset
      );
      if (imageUrl) {
        userSignUp({
          username: userName.userName,
          password: password.password,
          email: email.email,
          image: imageUrl,
        })
          .unwrap()
          .then((res) => {
            console.log(res);

            if (res.status === "congratulation") {
              modalOpen(
                "signup",
                `congratulation, you will receive an e-mail with a confirmation link.`
              );
              modalClose(6000);
            } else {
              modalOpen("info", res.data.status);
              modalClose();
            }
          })
          .catch((error) => {
            console.log(error);
            modalOpen("info", error.data.status);
            modalClose(5000);
          });
      }
    }
  };
  return (
    <Box className={` bg-green-50 flex items-start justify-center `}>
      <Box
        className={`  py-6 md:w-[800px]   `}
        sx={{ border: "solid 1px black" }}
      >
        {/* start email */}
        <Divider>username</Divider>

        <Box
          sx={{
            "& .MuiTextField-root": {
              m: 2,
              // textAlign: "end",
              // direction: "rtl",
              width: "250px",
            },
          }}
          className={` flex flex-wrap items-center justify-around my-6 rounded-sm `}
        >
          <Box className={`flex flex-col items-center justify-center`}>
            <TextField
              error={
                userName.userName && userName.userName.length <= 6
                  ? true
                  : false
              }
              id="username"
              label="username"
              // helperText="Incorrect entry."
              variant="standard"
              onChange={(e) => usernameHandler(e)}
            />
            <Typography
              sx={{ fontSize: "14px" }}
              className={` ${
                userName.userName && userName.userName.length <= 6
                  ? "visible"
                  : "invisible"
              } ms-auto `}
            >
              username must be more than 6 char
            </Typography>
          </Box>
          <Box className={`flex flex-col items-center justify-center`}>
            <TextField
              error={
                userName.userName &&
                userName.identicalUsername &&
                !userName.validUsername
                  ? true
                  : false
              }
              id="re-enter-username"
              label="re-enter username"
              // helperText={`${ userName.identicalUsername &&
              //   userName.identicalUsername !== userName.userName ? "Incorrect entry.":""} `}
              variant="standard"
              onChange={(e) => usernameHandler(e)}
            />
            <Typography
              sx={{ fontSize: "14px" }}
              className={`${
                userName.userName &&
                userName.identicalUsername &&
                !userName.validUsername
                  ? "visible"
                  : "invisible"
              } ms-auto `}
            >
              not identical
            </Typography>
          </Box>
        </Box>
        {/* end email */}
        {/* start password */}
        <Divider>password</Divider>
        <Box
          sx={{
            "& .MuiTextField-root": {
              m: 2,
              // textAlign: "end",
              // direction: "rtl",
              width: "250px",
            },
          }}
          className={` flex flex-wrap items-center justify-around my-6 rounded-sm `}
        >
          <Box className={`flex flex-col items-center justify-center`}>
            <TextField
              id="password"
              label="password"
              error={
                password.password && password.password.length <= 6
                  ? true
                  : false
              }
              variant="standard"
              type={`${showPassword ? "text" : "password"}`}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position={`end`}>
                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                      <MdVisibilityOff
                        className={` ${
                          showPassword ? "" : "hidden"
                        } text-[14px]`}
                      />
                      <MdVisibility
                        className={`  ${
                          !showPassword ? "" : "hidden"
                        } text-[16px]`}
                      />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => passwordHandler(e)}
            />
            <Typography
              sx={{ fontSize: "14px" }}
              className={` ${
                password.password && password.password.length <= 6
                  ? "visible"
                  : "invisible"
              } ms-auto `}
            >
              password must be more than 6 char
            </Typography>
          </Box>

          <Box className={`flex flex-col items-center justify-center`}>
            <TextField
              error={
                password.identicalPassword.length >= 6 &&
                password.identicalPassword !== password.password
                  ? true
                  : false
              }
              id="re-enter-password"
              label="re-enter password"
              // helperText="Incorrect entry."
              variant="standard"
              type={`password`}
              autoComplete="current-password"
              onChange={(e) => passwordHandler(e)}
            />
            <Typography
              sx={{ fontSize: "14px" }}
              className={`${
                password.identicalPassword.length >= 6 &&
                password.identicalPassword !== password.password
                  ? "visible"
                  : "invisible"
              } ms-auto `}
            >
              not identical
            </Typography>
          </Box>
        </Box>

        {/* end password */}
        {/* start email */}
        <Divider>e-mail</Divider>

        <Box
          sx={{
            "& .MuiTextField-root": {
              m: 2,
              // textAlign: "end",
              // direction: "rtl",
              width: "250px",
            },
          }}
          className={` flex flex-wrap items-center justify-around my-6 rounded-sm `}
        >
          <Box className={`flex flex-col items-center justify-center`}>
            <TextField
              error={email.email.length > 6 && !email.validEmail ? true : false}
              id="enteredEmail"
              label="email"
              variant="standard"
              type="email"
              onChange={(e) => emailHandler(e)}
            />
            <Typography
              sx={{ fontSize: "14px" }}
              className={` ${
                email.email.length > 6 && email.validEmail === false
                  ? "visible"
                  : "invisible"
              } ms-auto `}
            >
              please enter a valid email
            </Typography>
          </Box>

          <Box className={`flex flex-col items-center justify-center`}>
            <TextField
              error={
                email.identicalEmail.length >= 6 &&
                email.identicalEmail !== email.email
                  ? true
                  : false
              }
              id="re-enter-email"
              label="re-enter email"
              variant="standard"
              type="email"
              onChange={(e) => emailHandler(e)}
            />
            <Typography
              sx={{ fontSize: "14px" }}
              className={`${
                email.identicalEmail.length >= 6 &&
                email.identicalEmail !== email.email
                  ? "visible"
                  : "invisible"
              } ms-auto `}
            >
              not identical
            </Typography>
          </Box>
        </Box>
        {/* end email */}
        {/* start profile image */}
        <Divider>profile image</Divider>

        <Box className={`flex items-center justify-center py-8`}>
          <Box className={` rounded-lg`}>
            <InputLabel
              sx={{ fontSize: "14px", marginX: "3px" }}
              variant="standard"
            >
              profileImage *
            </InputLabel>

            <Box
              component={"div"}
              className={`flex items-center justify-between   border-blue-400 bg-slate-100 w-[200px] sm:h-10   rounded-md border`}
            >
              <label
                htmlFor="upload1"
                className="w-20 h-full bg-blue-600 flex cursor-pointer rounded-md  "
              >
                <Button
                  variant="contained"
                  id="profileImage"
                  component="div"
                  className=""
                  onChange={(e) => selectImageHandler(e)}
                >
                  <input
                    id="upload1"
                    type="file"
                    accept="image/*"
                    hidden
                    className=" cursor-pointer"
                  />
                  upload
                </Button>
              </label>
              <img
                alt="img"
                src={isImageSelected.imageShowing}
                className={`${
                  isImageSelected.imageShowing ? "" : "hidden"
                }  w-16 h-9`}
              />
              <IoMdCloudDone
                className={`${
                  isImageSelected.status ? "" : "hidden"
                } text-green-600 text-[24px]  mx-3 transition-all shadow-sm rounded-sm`}
              />
            </Box>
          </Box>
        </Box>
        {/* end profile image */}
        <Divider>confirm and signup</Divider>

        <Button
          sx={{
            backgroundColor: "limegreen",
            ":hover": { backgroundColor: "green" },
            marginY: "2rem",
            marginLeft: "4rem",
          }}
          variant="contained"
          onClick={(e) => addUserHandler(e)}
        >
          signup
        </Button>
      </Box>
    </Box>
  );
};

export default SignUpPage;
