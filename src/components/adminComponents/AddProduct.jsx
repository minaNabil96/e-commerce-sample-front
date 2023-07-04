import React, { useState, useMemo, useCallback } from "react";
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
import useModalHandler from "../../helpers/useModalHandler";
import { useDispatch, useSelector } from "react-redux";
import {
  useAddProductMutation,
  useGetAllSubCategoriesQuery,
} from "../../utils/api/apiSlice";
import {
  useGetAllCategoriesQuery,
  useGetSubCategoriesByCategoryQuery,
  useGetOffersQuery,
} from "../../utils/api/apiSlice";
import { useGetAllBrandsQuery } from "../../utils/api/apiSlice";
import { IoIosCloudDone, IoMdCloudDone } from "react-icons/io";
import { imagesUploader } from "../../helpers/imagesUploader";
import {
  modalStatus,
  modalMessage,
  modalPayload,
  modalHeadName,
  closeModal,
} from "../../utils/reducers/materialModalSlice";
import MaterialModal from "../modalsAndPopUps/MaterialModal";
import { MdSend } from "react-icons/md";

const newInitialFields = {
  requiredTextFileds: [
    {
      name: "Product Name",
      required: true,
      type: "text",
      status: false,
      value: "",
    },
    {
      name: "Product Desc",
      required: true,
      type: "text",
      status: false,
      value: "",
    },
    {
      name: "Product Price",
      required: true,
      type: "text",
      status: false,
      value: "",
    },

    {
      name: "Product Quantity",
      required: true,
      type: "text",
      status: false,
      value: "",
    },
  ],
  unrequiredTextFields: [
    { name: "Product Discount", required: false, type: "text", value: "" },
  ],
  requiredSelectFileds: [
    {
      name: "Product Category",
      required: true,
      type: "select",
      status: false,
      value: "",
    },
  ],
  unrequiredSelectFileds: [
    {
      name: "Product Brand",
      required: false,
      type: "select",
      status: false,
      value: "",
    },
    {
      name: "Product Offer",
      required: false,
      type: "select",
      status: false,
      value: "",
    },

    { name: "Product SubCategory", required: false, type: "select", value: [] },
  ],
  uploadFileds: [
    {
      name: "Product CoverImage",
      required: true,
      type: "upload",
      status: false,
      value: "",
    },
    { name: "Product Images", required: false, type: "upload", value: [] },
  ],
  multiFileds: [
    { name: "Avilable Versions", required: false, type: "multi", value: [] },
    { name: "Details", required: false, type: "multi", value: [] },
  ],
};
// main component
const AddProduct = () => {
  const [readyProductImages, setReadyProductImages] = useState([]);
  const [readyCoverImage, setReadyCoverImage] = useState("");
  const [errorState, setErrorState] = useState(newInitialFields);
  const [textFieldsValues, setTextFieldsValues] = useState({
    "Product Name": "",
    "Product Desc": "",
    "Product Price": "",
    "Product Quantity": "",
    "Product Discount": "",
    offer: "",
  });
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectedSubCategory, setSelectedSubCategory] = useState({});
  const [selectedOffer, setSelectedOffer] = useState({});
  const [selectedBrand, setSelectedBrand] = useState({});
  const [productDetails, setProductDetails] = useState([]);
  const [productVersionsEntries, setProductVersionsEntries] = useState("");
  const [productVersions, setProductVersions] = useState([]);
  const [productDetailsEntries, setProductDetailEntries] = useState({
    name: "",
    value: "",
  });
  const [isImageSelected, setIsImageSelected] = useState({
    status: false,
    imageShowing: "",
    imageForUpload: "",
    imagesShowing: [],
    imagesForUpload: [],
  });
  const dispatch = useDispatch();
  const { materialModalHeadName, materialModalPayload } = useSelector(
    (state) => state.materialModalSlice
  );
  const { modalOpen, modalClose } = useModalHandler();
  const [
    addProduct,
    { isLoading, isError, error, isSuccess, data: addedProduct },
  ] = useAddProductMutation();
  const { data: allCategories } = useGetAllCategoriesQuery({
    page: 1,
    limit: 16,
  });
  const { data: allBrands } = useGetAllBrandsQuery({ page: 1, limit: 16 });
  const { data: allSubCategories } = useGetSubCategoriesByCategoryQuery(
    selectedCategory._id
  );
  const { data: allOffers } = useGetOffersQuery({ page: 1 });
  const errorStatus = useCallback(
    (e, name) => {
      const nameInid = e.target.id;
      const value = e.target.value;
      const error = errorState.requiredTextFileds.map((obj) => {
        if (obj.name === nameInid && value === "") {
          return { ...obj, status: true };
        }
        return { ...obj, status: false };
      });

      setErrorState({ ...errorState, requiredTextFileds: error });
      setTextFieldsValues({ ...textFieldsValues, [nameInid]: value });
    },
    [errorState, textFieldsValues]
  );
  const requiredTextFileds = useMemo(
    () =>
      errorState &&
      errorState.requiredTextFileds.map(({ name, status }, idx) => (
        <TextField
          sx={{ direction: "rtl" }}
          key={name}
          multiline
          maxRows={3}
          error={status}
          onChange={(e) => errorStatus(e, name)}
          required
          id={name}
          label={name}
        />
      )),

    [errorState, errorStatus]
  );

  const requiredSelectFileds = useMemo(
    () =>
      errorState.requiredSelectFileds.map(({ name, status }, idx) => (
        <FormControl key={idx} className={``}>
          <InputLabel className="ms-2 mx-1" variant="filled" id={name}>
            Product Category *
          </InputLabel>
          <Select
            value={selectedCategory._id || ""}
            variant="standard"
            error={status}
            onChange={(e) => errorStatus(e, name)}
            required
            // labelId={name}
            id={name}
            className={`w-48 mx-3 my-2 pt-3 h-[47px]   `}
          >
            {allCategories &&
              allCategories.allCategories.map(({ name, _id }) => (
                <MenuItem
                  value={_id}
                  onClick={() => setSelectedCategory({ name, _id })}
                  key={_id}
                >
                  {name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )),

    [errorState, errorStatus, allCategories, selectedCategory._id]
  );

  const unrequiredTextFields = useMemo(
    () =>
      errorState.unrequiredTextFields.map(({ name, status }, idx) => (
        <TextField
          sx={{ direction: "rtl" }}
          maxRows={3}
          key={name}
          multiline
          error={status}
          onChange={(e) => errorStatus(e, name)}
          id={name}
          label={name}
        />
      )),

    [errorState, errorStatus]
  );

  const unrequiredSelectFileds = useMemo(
    () =>
      errorState.unrequiredSelectFileds.map(({ name, status }, idx) => {
        if (name === "Product Brand") {
          return (
            <FormControl key={idx}>
              <InputLabel className="ms-2 mx-1" variant="filled" id={name}>
                Product Brand
              </InputLabel>
              <Select
                value={selectedBrand._id || ""}
                variant="standard"
                onChange={(e) => errorStatus(e, name)}
                // labelId={name}
                id={name}
                className={`w-48 mx-3 my-2 pt-3 h-[47px]   `}
              >
                {allBrands &&
                  allBrands.allBrands.map(({ name, _id }) => (
                    <MenuItem
                      value={_id}
                      onClick={() => setSelectedBrand({ name, _id })}
                      key={_id}
                    >
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          );
        } else if (name === "Product SubCategory") {
          return (
            <FormControl key={idx}>
              <InputLabel className="ms-2 mx-1" variant="filled" id={name}>
                Product SubCategory
              </InputLabel>
              <Select
                value={selectedSubCategory._id || ""}
                variant="standard"
                onChange={(e) => errorStatus(e, name)}
                // labelId={name}
                id={name}
                className={`w-48 mx-3 my-2 pt-3 h-[47px]   `}
              >
                {allSubCategories &&
                  allSubCategories.map(({ name, _id }) => (
                    <MenuItem
                      value={_id}
                      onClick={() => setSelectedSubCategory({ name, _id })}
                      key={_id}
                    >
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          );
        } else if (name === "Product Offer") {
          return (
            <FormControl key={idx}>
              <InputLabel className="ms-2 mx-1" variant="filled" id={name}>
                Product Offer
              </InputLabel>
              <Select
                value={selectedOffer._id || ""}
                variant="standard"
                onChange={(e) => errorStatus(e, name)}
                // labelId={name}
                id={name}
                className={`w-48 mx-3 my-2 pt-3 h-[47px]   `}
              >
                {allOffers &&
                  allOffers.allOffers.map(({ name, _id }) => (
                    <MenuItem
                      value={_id}
                      onClick={() => setSelectedOffer({ name, _id })}
                      key={_id}
                    >
                      {name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          );
        } else return null;
      }),

    [
      errorState,
      errorStatus,
      allBrands,
      allOffers,
      allSubCategories,
      selectedBrand._id,
      selectedSubCategory._id,
      selectedOffer._id,
    ]
  );

  const selectImageHandler = useCallback(
    (e) => {
      const nameInid = e.target.id;
      if (nameInid === "upload1") {
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
      } else if (nameInid === "upload2") {
        const filesForUpload = e.target.files;
        const convertToArray = Object.keys(filesForUpload).map(
          (key) => filesForUpload[key]
        );
        const selectedFile = convertToArray.map((img) =>
          URL.createObjectURL(img)
        );
        if (selectedFile) {
          setIsImageSelected({
            ...isImageSelected,
            imagesStatus: true,
            imagesShowing: selectedFile,
            imagesForUpload: convertToArray,
          });
        } else
          selectedFile({
            ...isImageSelected,
            imagesStatus: false,
            imagesShowing: [],
            imagesForUpload: [],
          });
      }
    },
    [isImageSelected]
  );
  const uploadFileds = useMemo(
    () =>
      errorState.uploadFileds.map(({ required, name, status }, idx) => {
        if (required) {
          return (
            <Box key={idx} className={`my-4 sm:my-1 ms-[7px] me-3 rounded-lg`}>
              <InputLabel
                sx={{ fontSize: "14px", marginX: "3px" }}
                variant="standard"
              >
                coverImage *
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
                    id={name}
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
          );
        } else {
          return (
            <Box key={idx} className={`my-4 sm:my-1 ms-[7px] me-3 rounded-lg`}>
              <InputLabel
                sx={{ fontSize: "14px", marginX: "3px" }}
                variant="standard"
              >
                otherImages
              </InputLabel>
              <Box
                component={"div"}
                className={`flex items-center justify-between  border-blue-400 bg-slate-100 w-[200px] sm:h-10 rounded-md border`}
              >
                <label
                  htmlFor="upload2"
                  className="w-20 h-full bg-blue-600 flex cursor-pointer rounded-md  "
                >
                  <Button
                    variant="contained"
                    id={name}
                    component="div"
                    className=""
                    onChange={(e) => selectImageHandler(e)}
                  >
                    <input
                      multiple
                      id="upload2"
                      type="file"
                      accept="image/*"
                      hidden
                      className=" cursor-pointer"
                    />
                    upload
                  </Button>
                </label>
                <p>
                  {isImageSelected &&
                    isImageSelected.imagesShowing.length > 0 &&
                    `${isImageSelected.imagesShowing.length} files`}
                </p>
                <IoMdCloudDone
                  className={`${
                    isImageSelected.imagesStatus ? "" : "hidden"
                  } text-green-600 text-[24px]  mx-3 transition-all shadow-sm rounded-sm`}
                />
              </Box>
            </Box>
          );
        }
      }),

    [errorState, isImageSelected, selectImageHandler]
  );

  const handleMultiFiledsModal = useCallback(
    (e, name) => {
      e.preventDefault();

      dispatch(modalHeadName(name));
      dispatch(modalStatus());
    },
    [dispatch]
  );

  const handleMultiFiledsEntries = (e) => {
    const value = e.target.value;
    const filedName = e.target.id;
    if (materialModalHeadName === "Details") {
      filedName === "name"
        ? setProductDetailEntries({ ...productDetailsEntries, name: value })
        : setProductDetailEntries({ ...productDetailsEntries, value: value });
    } else {
      setProductVersionsEntries(value);
    }
  };
  const handleMultiFiledsAdd = (e, clear) => {
    const name = materialModalHeadName;
    e.preventDefault();
    if (name === "Avilable Versions") {
      if (productVersionsEntries === "") {
        modalOpen(`info`, `please enter a version first`);
        modalClose();
      } else {
        setProductVersions((prev) => [...prev, productVersionsEntries]);
        if (clear) {
          setProductVersions([]);
        }
      }
    } else if (name === "Details") {
      if (
        productDetailsEntries.name === "" ||
        productDetailsEntries.value === ""
      ) {
        modalOpen(`info`, `please enter a name & value first`);
        modalClose();
      } else {
        setProductDetails((prev) => [...prev, productDetailsEntries]);
        if (clear) {
          setProductDetails([]);
        }
      }
    }
  };
  const multiFileds = useMemo(
    () =>
      errorState.multiFileds.map(({ name, status }, idx) => {
        if (name === "Avilable Versions") {
          return (
            <Box key={idx} className={`my-4 sm:my-1 ms-[7px] me-3 rounded-lg`}>
              <InputLabel sx={{ fontSize: "14px", marginX: "3px" }}>
                {name}
              </InputLabel>
              <Box
                className={`border flex items-center justify-between relative border-blue-700  w-[200px] h-10  rounded-md`}
              >
                <Button
                  sx={{
                    // position: "absolute",
                    bottom: "0",
                    height: "100%",
                  }}
                  variant="contained"
                  onClick={(e) => handleMultiFiledsModal(e, name)}
                >
                  add
                </Button>
                <Typography
                  className={` pr-4  ${
                    materialModalHeadName === "Avilable Versions" ||
                    materialModalHeadName === "Details"
                      ? ""
                      : "hidden"
                  }`}
                  variant="body1"
                >
                  {productVersions && productVersions.length !== 0
                    ? `${productVersions.length} added`
                    : `0 added`}
                </Typography>
              </Box>
            </Box>
          );
        } else {
          return (
            <Box key={idx} className={`my-4 sm:my-1 ms-[7px] me-3  rounded-lg`}>
              <InputLabel sx={{ fontSize: "14px", marginX: "3px" }}>
                {name}
              </InputLabel>
              <Box
                className={`border flex items-center justify-between relative border-blue-700  w-[200px] h-10  rounded-md`}
              >
                <Button
                  sx={{
                    // position: "absolute",
                    bottom: "0",
                    height: "100%",
                  }}
                  variant="contained"
                  onClick={(e) => handleMultiFiledsModal(e, name)}
                >
                  add
                </Button>
                <Typography
                  className={` pr-4  ${
                    materialModalHeadName === "Avilable Versions" ||
                    materialModalHeadName === "Details"
                      ? ""
                      : "hidden"
                  }`}
                  variant="body1"
                >
                  {productDetails && productDetails.length !== 0
                    ? `${productDetails.length} added`
                    : `0 added`}
                </Typography>
              </Box>
            </Box>
          );
        }
      }),

    [
      errorState,
      handleMultiFiledsModal,
      materialModalHeadName,
      productDetails,
      productVersions,
    ]
  );
  // end error handler
  const handleAddProduct = async (e) => {
    let productObj = {
      name: textFieldsValues["Product Name"],
      desc: textFieldsValues["Product Desc"],
      quantity: textFieldsValues["Product Quantity"],
      price: textFieldsValues["Product Price"],
      priceAfterDiscount: textFieldsValues["Product Discount"],
      category: selectedCategory._id,
      subCategory: selectedSubCategory._id,
      brand: selectedBrand._id,
      coverImage: "",
      images: [],
      avilableVerions: productVersions.length > 0 ? productVersions : undefined,
      details: productDetails.length > 0 ? productDetails : undefined,
      offer: selectedOffer._id,
    };
    if (
      !productObj.name ||
      !productObj.desc ||
      !productObj.quantity ||
      !productObj.price ||
      !productObj.category
    ) {
      modalOpen(`info`, `please complete the required fields`);
      modalClose();
    } else {
      if (isImageSelected.imageForUpload) {
        if (!readyCoverImage || !readyProductImages) {
          const uploadImages = await Promise.all(
            isImageSelected.imagesForUpload.map(async (img) => {
              const { imageUrl } = await imagesUploader(img);

              productObj.images.push(imageUrl);
            })
          );

          const { imageUrl } = await imagesUploader(
            isImageSelected.imageForUpload
          );
          productObj.coverImage = await imageUrl;
        }

        let productObjCopy = { ...productObj };
        let filterdProductObj = Object.keys(productObjCopy).forEach(
          (fieldKey) => {
            if (
              productObj[fieldKey] === "" ||
              productObj[fieldKey] === undefined
            ) {
              delete productObjCopy[fieldKey];
            }
          }
        );

        if (productObjCopy.coverImage && productObjCopy.images) {
          addProduct(productObjCopy)
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
      } else {
        let productObjCopy = { ...productObj };
        let filterdProductObj = Object.keys(productObjCopy).forEach(
          (fieldKey) => {
            if (
              productObj[fieldKey] === "" ||
              productObj[fieldKey] === undefined
            ) {
              delete productObjCopy[fieldKey];
            }
          }
        );

        const { imageUrl } = await imagesUploader(
          isImageSelected.imageForUpload
        );
        setReadyCoverImage(imageUrl);
        addProduct(productObjCopy)
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
  return (
    <Box className={`w-fit `}>
      <Typography variant="h6" component={`span`} color={`primary`}>
        Add Product
      </Typography>
      <Box
        className={`w-64 sm:w-full mt-4 flex-grow h-96 sm:h-full `}
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, textAlign: "end", direction: "rtl" },
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
        noValidate
        autoComplete="off"
      >
        {requiredTextFileds}
        {unrequiredTextFields}
        {requiredSelectFileds}
        {unrequiredSelectFileds}
        {uploadFileds}
        {multiFileds}
        <Box className={`flex items-end justify-center `}>
          <Button
            className={`   h-10`}
            sx={{ margin: "0.35rem" }}
            variant="contained"
            onClick={() => handleAddProduct()}
            endIcon={<MdSend />}
          >
            Add
          </Button>
        </Box>
        {/* start Category */}
        {/* end Category */}
      </Box>
      <MaterialModal>
        <Box
          className={`flex-col `}
          component={`form`}
          sx={{
            "& .MuiTextField-root": { m: 1 },
            display: "flex",
            flexWrap: "wrap",
          }}
          noValidate
          autoComplete="off"
        >
          <Box
            className={`flex flex-row justify-around my-4`}
            sx={{ marginY: "4px" }}
          >
            <Button
              sx={{ width: "20px" }}
              variant="contained"
              onClick={(e) => handleMultiFiledsAdd(e)}
            >
              add
            </Button>
            <Button
              sx={{
                width: "20px",
                backgroundColor: "red",
                ":hover": { backgroundColor: "red" },
              }}
              variant="contained"
              onClick={(e) => handleMultiFiledsAdd(e, "clear")}
            >
              clear
            </Button>
          </Box>
          <Box
            sx={{
              display: `${materialModalHeadName === "Details" ? "" : "none"}`,
            }}
            className={`flex flex-col sm:flex-row my-4`}
          >
            <TextField
              maxRows={3}
              sx={{ direction: "rtl" }}
              multiline
              onChange={(e) => handleMultiFiledsEntries(e)}
              id={`name`}
              label={`name`}
            />
            <TextField
              maxRows={3}
              sx={{ direction: "rtl" }}
              multiline
              onChange={(e) => handleMultiFiledsEntries(e)}
              id={`value`}
              label={`value`}
            />
          </Box>
          <TextField
            sx={{
              display: `${materialModalHeadName === "Details" ? "none" : ""}`,
              direction: "rtl",
            }}
            maxRows={3}
            multiline
            onChange={(e) => handleMultiFiledsEntries(e)}
            id={`version`}
            label={`version`}
          />
          <Typography
            className={`text-center  ${
              materialModalHeadName === "Avilable Versions" ||
              materialModalHeadName === "Details"
                ? ""
                : "hidden"
            }`}
            variant="body1"
          >
            {materialModalHeadName === "Avilable Versions"
              ? `${productVersions.length} added`
              : `${productDetails.length} added`}
          </Typography>
        </Box>
      </MaterialModal>
    </Box>
  );
};

export default AddProduct;
