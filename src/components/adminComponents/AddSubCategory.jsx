import React, { useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  useGetAllCategoriesQuery,
  useAddSubCategoryMutation,
} from "../../utils/api/apiSlice";
import { useDispatch } from "react-redux";
import useModalHandler from "../../helpers/useModalHandler";
import { imagesUploader } from "../../helpers/imagesUploader";
import { IoMdCloudDone } from "react-icons/io";
import { MdSend } from "react-icons/md";

// end imports
function AddSubCatagory() {
  const [errorState, setErrorState] = useState({
    subCategoryName: false,
  });
  const [subCategoryName, setSubCategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState({});
  const [isImageSelected, setIsImageSelected] = useState({
    status: false,
    imageShowing: "",
    imageForUpload: "",
  });
  // form handler
  const dispatch = useDispatch();

  const errorStatus = (e) => {
    setSubCategoryName(e.target.value);
    e.target.value === "" && e.target.id === "subCategoryName"
      ? setErrorState({ ...errorState, subCategoryName: true })
      : setErrorState({
          ...errorState,
          subCategoryName: false,
        });
  };

  // start rtk query
  const { data: allCategories } = useGetAllCategoriesQuery({
    page: 1,
    limit: 4,
  });

  const categoriesMap =
    allCategories &&
    allCategories.allCategories.map(({ name, _id }) => (
      <MenuItem
        value={_id}
        onClick={() => setSelectedCategory({ name, _id })}
        key={_id}
      >
        {name}
      </MenuItem>
    ));

  const [addSubCategory] = useAddSubCategoryMutation();

  // end rtk query
  // start add Subcategory
  const { modalOpen, modalClose } = useModalHandler();

  const handleAddSubCategory = async () => {
    if (
      !subCategoryName ||
      !isImageSelected.imageForUpload ||
      !selectedCategory._id
    ) {
      modalOpen(`Info`, `Please enter subCategory info..!`);
      modalClose();
    } else if (
      subCategoryName &&
      isImageSelected.imageForUpload &&
      selectedCategory
    ) {
      const { imageUrl } = await imagesUploader(isImageSelected.imageForUpload);
      if (imageUrl) {
        addSubCategory({
          name: subCategoryName,
          image: imageUrl,
          category: selectedCategory._id,
        })
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

  // end add subcategory
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
        Add SubCategory
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
          error={errorState.subCategoryName}
          onChange={(e) => errorStatus(e)}
          required
          id="subCategoryName"
          label="SubCatagory Name"
        />
        <FormControl className={``}>
          <InputLabel
            className="ms-2 mx-1"
            variant="filled"
            id={selectedCategory.name || "name"}
          >
            Product Category *
          </InputLabel>
          <Select
            value={selectedCategory._id || ""}
            variant="standard"
            required
            // labelId={name}
            id={selectedCategory.name || "name"}
            className={`w-52 mx-3 my-2 pt-3 h-[47px]   `}
          >
            {categoriesMap}
          </Select>
        </FormControl>
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
          onClick={() => handleAddSubCategory()}
          endIcon={<MdSend />}
        >
          Add
        </Button>
      </Box>
    </Box>
  );
}

export default AddSubCatagory;
