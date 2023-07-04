import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FcFullTrash, FcEditImage } from "react-icons/fc";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import {
  useGetSubCategoriesByCategoryQuery,
  useGetAllSubCategoriesQuery,
  useDeleteSubCategoryMutation,
} from "../../utils/api/apiSlice";
import LoadingsAndErrors from "../LoadingsAndErrors";
import EditSubCategory from "../adminComponents/EditSubCategory";
import MaterialModal from "../modalsAndPopUps/MaterialModal";
import { useDispatch, useSelector } from "react-redux";
import {
  modalStatus,
  modalMessage,
  modalPayload,
  modalHeadName,
  closeModal,
} from "../../utils/reducers/materialModalSlice";
import useModalHandler from "../../helpers/useModalHandler";
const SelectedSubCategoriesShow = ({ selectedCategoryId }) => {
  const [clickedIdx, setClickedIdx] = useState("");
  const { data: allSubCategories, isLoading: isLoading2 } =
    useGetSubCategoriesByCategoryQuery(selectedCategoryId);
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: allSubCategoriesFirst,
  } = useGetAllSubCategoriesQuery();

  const [deleteSubCategory, { data: deletedSub }] =
    useDeleteSubCategoryMutation();
  const dispatch = useDispatch();
  const { modalOpen, modalClose } = useModalHandler();

  const isAdmin = localStorage.getItem("admin");

  const handleDelete = (e, _id) => {
    deleteSubCategory(_id)
      .unwrap()
      .then((res) => {
        console.log(res);
        if (res.status.includes("success")) {
          modalOpen("info", "successfully deleted");
          modalClose();
        }
      })
      .catch((err) => {
        console.log(err);
        modalOpen("error", "error");
        modalClose();
      });
  };

  const handleEdit = (e, _id, name) => {
    dispatch(modalPayload(_id));
    dispatch(modalHeadName(`edit subcategory`));
    dispatch(modalStatus());
  };
  const allSubCategoriesMap =
    isSuccess &&
    allSubCategoriesFirst &&
    allSubCategoriesFirst.allSubCategories.map(
      ({ name, _id, category, image }) => (
        <Box
          className={`flex flex-col items-center justify-center my-4 `}
          key={_id}
        >
          {isAdmin === "true" && (
            <Box className={`flex items-center justify-between`}>
              <Tooltip title="Delete">
                <IconButton onClick={(e) => handleDelete(e, _id)}>
                  <FcFullTrash />
                </IconButton>
              </Tooltip>

              <Tooltip title="Edit">
                <IconButton onClick={(e) => handleEdit(e, _id, name)}>
                  <FcEditImage />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          <Link to={`/products-sortby-subcategories`} state={_id}>
            <Box className={`my-4 `}>
              <Typography
                className={`hover:text-yellow-600 transition-all `}
                align="center"
                variant="subtitle1"
              >
                {name}
              </Typography>
            </Box>
          </Link>
          <Link to={`/products-sortby-subcategories`} state={_id}>
            <Box className="rounded-md shadow-md">
              <img
                src={image}
                alt={`img`}
                className={`w-40 h-40 object-cover hover:object-left duration-500 rounded-md `}
              />
            </Box>
          </Link>
        </Box>
      )
    );
  const selectedSubCategoriesMap =
    selectedCategoryId &&
    allSubCategories &&
    allSubCategories.map(({ name, _id, category, image }) => (
      <Box
        className={`flex flex-col items-center justify-center my-4 `}
        key={_id}
      >
        {isAdmin === "true" && (
          <Box className={`flex items-center justify-between`}>
            <Tooltip title="Delete">
              <IconButton onClick={(e) => handleDelete(e, _id)}>
                <FcFullTrash />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit">
              <IconButton onClick={(e) => handleEdit(e, _id, name)}>
                <FcEditImage />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Link to={`/products-sortby-subcategories`} state={_id}>
          <Box className={`my-4`}>
            <Typography
              className={`hover:text-yellow-600 transition-all `}
              align="center"
              variant="subtitle1"
            >
              {name}
            </Typography>
          </Box>
        </Link>
        <Link to={`/products-sortby-subcategories`} state={_id}>
          <Box className="rounded-md shadow-md">
            <img
              src={image}
              alt={`img`}
              className={`w-40 h-40 object-cover hover:object-left duration-500 rounded-md `}
            />
          </Box>
        </Link>
      </Box>
    ));
  return (
    <Box className={`min-h-screen   `}>
      {isLoading ? (
        <LoadingsAndErrors>
          <div className={`flex justify-between items-center  `}>
            <h3 className="me-4 text-xl text-green-700">Loading </h3>
            <CircularProgress color="success" />
          </div>
        </LoadingsAndErrors>
      ) : isError && error ? (
        <LoadingsAndErrors>
          <h3 className="text-xl text-red-600 ">{error.status}</h3>
        </LoadingsAndErrors>
      ) : !error &&
        !isLoading &&
        isSuccess &&
        allSubCategoriesFirst.allSubCategories.length === 0 ? (
        <LoadingsAndErrors>
          <h3 className="me-4 text-xl">there's no items </h3>
        </LoadingsAndErrors>
      ) : (
        <>
          <Box className={`  grid sm:grid-2  md:grid-cols-2 lg:grid-cols-4`}>
            {selectedCategoryId
              ? selectedSubCategoriesMap
              : allSubCategoriesMap}
          </Box>
          {/* <MaterialModal> */}
          {/*   <EditSubCategory /> */}
          {/* </MaterialModal> */}
        </>
      )}
    </Box>
  );
};

export default SelectedSubCategoriesShow;
