import React, { useState, useRef } from "react";
import { Box, TextField, Typography, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import {
  modalStatus,
  modalHeadName,
  modalMessage,
} from "../../utils/reducers/headlessModalSlice";
import useModalHandler from "../../helpers/useModalHandler";
import { useDispatch } from "react-redux";
import { useAddBrandMutation } from "../../utils/api/apiSlice";
import { imagesUploader } from "../../helpers/imagesUploader";
import { BsCamera } from "react-icons/bs";
import { IoIosCloudDone, IoMdCloudDone } from "react-icons/io";
import { MdSend } from "react-icons/md";

function AddBrand() {
  const [brandName, setBrandName] = useState("");
  // const [brandImage, setBrandImage] = useState("");
  const [errorState, setErrorState] = useState({
    brandName: false,
    brandImage: false,
  });
  const [isImageSelected, setIsImageSelected] = useState({
    status: false,
    imageShowing: "",
    imageForUpload: "",
  });

  const { modalOpen, modalClose } = useModalHandler();
  const dispatch = useDispatch();
  const [addBrand, { isLoading, isError, error, isSuccess, data: addedBrand }] =
    useAddBrandMutation();

  const errorStatus = (e) => {
    setBrandName(e.target.value);
    e.target.value === "" && e.target.id === "brandName"
      ? setErrorState({ ...errorState, brandName: true })
      : setErrorState({ ...errorState, brandImage: false, brandName: false });
  };

  const handleAddBrand = async () => {
    if (!brandName || !isImageSelected.imageForUpload) {
      modalOpen(`Info`, `Please enter brand info..!`);
      modalClose();
    } else if (brandName && isImageSelected.imageForUpload) {
      const { imageUrl } = await imagesUploader(isImageSelected.imageForUpload);
      if (imageUrl) {
        addBrand({ name: brandName, image: imageUrl })
          .unwrap()
          .then((res) => {
            console.log(res);
            if (res.message === "success") {
              modalOpen("info", "successfully added");
              modalClose();
            }
          })
          .catch((err) => {
            console.log(err);
            modalOpen("error", "error");
            modalClose();
          });
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
  return (
    <Box className={`w-fit`}>
      <Typography variant="h6" component={`span`} color={`primary`}>
        Add Brand
      </Typography>

      <Box
        className={`w-64 mt-4 `}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, textAlign: "end", direction: "rtl" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-read-only-input"
          label="Admin Name"
          defaultValue={`${localStorage.getItem("userName")}`}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          error={errorState.brandName}
          onChange={(e) => errorStatus(e)}
          required
          id="brandName"
          label="Brand Name"
        />
        <Box
          component={"div"}
          className={`flex items-center justify-between my-2 ms-[7px] me-3  border-blue-400 bg-slate-100  rounded-md border`}
        >
          <label
            htmlFor="upload"
            className="w-20 h-full bg-blue-600 flex cursor-pointer rounded-md  "
          >
            <Button
              variant="contained"
              component="div"
              className=""
              onChange={(e) => selectImageHandler(e)}
            >
              <input
                id="upload"
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
        <Button
          sx={{ margin: "15px" }}
          variant="contained"
          onClick={() => handleAddBrand()}
          endIcon={<MdSend />}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
}

export default AddBrand;
