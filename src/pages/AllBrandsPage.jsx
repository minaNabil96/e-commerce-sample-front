import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FcFullTrash, FcEditImage } from "react-icons/fc";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";
import {
  useGetAllBrandsQuery,
  useDeleteBrandMutation,
} from "../utils/api/apiSlice";
import LoadingsAndErrors from "../components/LoadingsAndErrors";
import MaterialModal from "../components/modalsAndPopUps/MaterialModal";
import { useDispatch, useSelector } from "react-redux";
import {
  modalStatus,
  modalMessage,
  modalPayload,
  modalHeadName,
  closeModal,
} from "../utils/reducers/materialModalSlice";
import useModalHandler from "../helpers/useModalHandler";
import EditBrand from "../components/adminComponents/EditBrand";
const AllBrandsPage = () => {
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: allBrands,
  } = useGetAllBrandsQuery({ limit: 16, page: 1 });
  const [deleteBrand, { data: deletedBrand }] = useDeleteBrandMutation();

  const dispatch = useDispatch();
  const {
    materialModalStatus,
    materialModalMessage,
    materialModalHeadName,
    materialModalPayload,
  } = useSelector((state) => state.materialModalSlice);
  const { modalOpen, modalClose } = useModalHandler();

  const isAdmin = localStorage.getItem("admin");

  const handleDelete = (e, _id) => {
    deleteBrand(_id)
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
    dispatch(modalHeadName(`edit brand`));
    dispatch(modalStatus());
  };

  const allBrandsMap =
    allBrands &&
    allBrands.allBrands &&
    allBrands.allBrands.map(({ name, _id, image }) => (
      <Box
        className={`flex flex-col items-center justify-center my-4 `}
        key={_id}
      >
        {isAdmin === "true" && (
          <Box className={`flex items-center justify-between `}>
            <Tooltip title="Delete">
              <IconButton
                sx={{ marginX: "0.5rem" }}
                onClick={(e) => handleDelete(e, _id)}
              >
                <FcFullTrash />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit">
              <IconButton
                sx={{ marginX: "0.5rem" }}
                onClick={(e) => handleEdit(e, _id, name)}
              >
                <FcEditImage />
              </IconButton>
            </Tooltip>
          </Box>
        )}
        <Link to={`/products-sortby-brand`} state={_id}>
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
        <Link to={`/products-sortby-brand`} state={_id}>
          <Box className="rounded-md shadow-md">
            <img
              src={image}
              alt={`img`}
              className={`w-48 h-28 object-cover hover:object-left hover:shadow-md hover:shadow-blue-200 duration-500 rounded-md `}
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
        allBrands.allBrands.length === 0 ? (
        <LoadingsAndErrors>
          <h3 className="me-4 text-xl">there's no items </h3>
        </LoadingsAndErrors>
      ) : (
        <>
          <Box className={`  grid sm:grid-2  md:grid-cols-2 lg:grid-cols-4`}>
            {allBrandsMap && allBrandsMap}
          </Box>
          {materialModalHeadName === "edit brand" && (
            <MaterialModal>
              <EditBrand />
            </MaterialModal>
          )}
        </>
      )}
    </Box>
  );
};

export default AllBrandsPage;
