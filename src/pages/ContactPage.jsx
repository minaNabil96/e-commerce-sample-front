import React, { useState } from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useContactMutation } from "../utils/api/apiSlice.js";
import useModalHandler from "../helpers/useModalHandler.js";
function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [
    contact,
    { isSuccess, isLoading, isError, error, data: messageStatus },
  ] = useContactMutation();

  const { modalOpen, modalClose } = useModalHandler(4000);

  const contactHandler = () => {
    if (name && email && phone && message) {
      const validEmail = email.match(/[^\s@]+@[^\s@]+\.[^\s@]+/gi);
      if (!validEmail) {
        modalOpen("info", "please enter a valid email");
        modalClose();
      } else {
        contact({
          name,
          email,
          phone,
          message,
        })
          .unwrap()
          .then((res) => {
            console.log(res);
            if (res.status === "success") {
              modalOpen("info", "success");
              modalClose();
            } else {
              modalOpen(
                "info",
                "sorry an error occurred, please try again later."
              );
              modalClose();
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } else {
      modalOpen("info", "please complete your info.");
      modalClose();
    }
  };
  return (
    <Box
      className={`min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-500 to-green-300`}
    >
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
          required
          id="name"
          label="Name"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          id="e-mail"
          label="e-mail"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          id="phone"
          label="phone"
          onChange={(e) => setPhone(e.target.value)}
        />
        <TextField
          required
          id="message"
          label="message"
          rows={5}
          multiline
          onChange={(e) => setMessage(e.target.value)}
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
          onClick={(e) => contactHandler(e)}
        >
          <p className={`py-1`}>send</p>
        </Button>
      </Box>
    </Box>
  );
}

export default ContactPage;
