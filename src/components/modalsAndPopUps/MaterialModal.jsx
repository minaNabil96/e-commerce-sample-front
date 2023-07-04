import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  modalStatus,
  modalMessage,
  modalPayload,
  modalHeadName,
  closeModal,
} from "../../utils/reducers/materialModalSlice";
import { useSelector, useDispatch } from "react-redux";
import { IoMdClose } from "react-icons/io";
const MaterialModal = ({ children }) => {
  // const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();
  const {
    materialModalStatus,
    materialModalMessage,
    materialModalHeadName,
    materialModalPayload,
  } = useSelector((state) => state.materialModalSlice);
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };
  //
  //   const handleClose = () => {
  //     setOpen(false);
  //   };
  return (
    <div>
      {/* <Button variant="outlined" onClick={() => dispatch(modalStatus())}>
        Open form dialog
      </Button> */}
      <Dialog
        open={materialModalStatus}
        onClose={() => dispatch(modalStatus())}
      >
        <DialogTitle className={`flex items-center justify-between`}>
          {materialModalHeadName}
          <IconButton onClick={() => dispatch(modalStatus())}>
            <IoMdClose size={22} />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText> */}
          {children}
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose}>Subscribe</Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MaterialModal;
