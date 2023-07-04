import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
} from "../../utils/api/apiSlice";
import { useDispatch } from "react-redux";
import useModalHandler from "../../helpers/useModalHandler";
import { imagesUploader } from "../../helpers/imagesUploader";
import { IoMdCloudDone } from "react-icons/io";
import { MdSend } from "react-icons/md";

// end imports
function AddCatagory() {
  const [errorState, setErrorState] = useState({
    categoryName: false,
  });
  const [categoryName, setCategoryName] = useState("");
  const [isImageSelected, setIsImageSelected] = useState({
    status: false,
    imageShowing: "",
    imageForUpload: "",
  });
  // form handler
  const { modalOpen, modalClose } = useModalHandler();
  const dispatch = useDispatch();

  const errorStatus = (e) => {
    setCategoryName(e.target.value);
    e.target.value === "" && e.target.id === "categoryName"
      ? setErrorState({ ...errorState, categoryName: true })
      : setErrorState({
          ...errorState,
          brandImage: false,
          categoryName: false,
        });
  };

  // start rtk query
  // const { data: allCategories } = useGetAllCategoriesQuery({
  //   page: 1,
  //   limit: 4,
  // });

  const [addCategory] = useAddCategoryMutation();

  // end rtk query

  // end map on all categories
  // start add category
  const handleAddCategory = async () => {
    if (!categoryName || !isImageSelected.imageForUpload) {
      modalOpen("Info", `Please enter category info..!`);
      modalClose();
    } else if (categoryName && isImageSelected.imageForUpload) {
      const { imageUrl } = await imagesUploader(isImageSelected.imageForUpload);
      if (imageUrl) {
        addCategory({ name: categoryName, image: imageUrl })
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

  // end add category
  // end rtk query
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
    <Box className={``}>
      <Typography variant="h6" component={`span`} color={`primary`}>
        Add Category
      </Typography>
      <Box
        className={`w-64 mt-4`}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, textAlign: "end", direction: "rtl" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="adminName"
          label="Admin Name"
          defaultValue={`${localStorage.getItem("userName")}`}
          InputProps={{
            readOnly: true,
          }}
        />
        <TextField
          error={errorState.categoryName}
          onChange={(e) => errorStatus(e)}
          required
          id="categoryName"
          label="Catagory Name"
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
          onClick={() => handleAddCategory()}
          endIcon={<MdSend />}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
}

export default AddCatagory;
