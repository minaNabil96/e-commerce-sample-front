import React, { Fragment } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { FcFullTrash, FcEditImage } from "react-icons/fc";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
} from "../../utils/api/apiSlice";
import LoadingsAndErrors from "../LoadingsAndErrors";
import { useDispatch, useSelector } from "react-redux";
import {
  modalStatus,
  modalMessage,
  modalPayload,
  modalHeadName,
  closeModal,
} from "../../utils/reducers/materialModalSlice";
import useModalHandler from "../../helpers/useModalHandler";
import MaterialModal from "../modalsAndPopUps/MaterialModal";
import EditCategory from "../adminComponents/EditCategory.jsx";
const CategoriesSideMenu = ({ tryToGetId }) => {
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: allCategories,
  } = useGetAllCategoriesQuery({ limit: 16, page: 1 });

  const [deleteCategory, { data: deletedCat }] = useDeleteCategoryMutation();

  const dispatch = useDispatch();
  const { modalOpen, modalClose } = useModalHandler();

  const isAdmin = localStorage.getItem("admin");

  const handleDelete = (e, _id) => {
    deleteCategory(_id)
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
    dispatch(modalHeadName(`edit category`));
    dispatch(modalStatus());
  };

  const allCategoriesMap =
    isSuccess &&
    allCategories &&
    allCategories.allCategories.map(({ name, _id, image }) => (
      <Fragment key={_id}>
        <ListItemButton
          sx={{ ":hover": { backgroundColor: "limegreen" } }}
          divider={true}
          className={`flex flex-row-reverse items-center justify-between group  `}
          onClick={() => tryToGetId(_id)}
        >
          <ListItemText className="text-end">{name}</ListItemText>
          <ListItemIcon
            className={`transform group-hover:rotate-[-360deg] duration-500  `}
          >
            <img className={`h-10 w-10 rounded-full`} src={image} alt={`img`} />
          </ListItemIcon>
        </ListItemButton>
        {isAdmin === "true" && (
          <Box className={`flex items-center justify-around bg-white py-2`}>
            <Tooltip title="Delete">
              <IconButton onClick={(e) => handleDelete(e, _id)}>
                <FcFullTrash />
              </IconButton>
            </Tooltip>
            <p className={`text-[14px]`}>{name}</p>
            <Tooltip title="Edit">
              <IconButton onClick={(e) => handleEdit(e, _id, name)}>
                <FcEditImage />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Fragment>
    ));
  // w-60
  return (
    <Box
      className={` transform duration-700 ${
        isSuccess && allCategories.allCategories.length > 0
          ? ""
          : " sm:-translate-x-72"
      }
       sm:min-h-screen bg-slate-200 border-r border-gray-300 overflow-hidden flex flex-col`}
    >
      {isLoading ? (
        <LoadingsAndErrors>
          <div className={`flex justify-between items-center  `}>wait..</div>
        </LoadingsAndErrors>
      ) : isError && error ? (
        <LoadingsAndErrors>
          <h3 className="text-xl text-red-600 ">{error.status}</h3>
        </LoadingsAndErrors>
      ) : !isError &&
        !error &&
        !isLoading &&
        allCategories.allCategories.length === 0 ? (
        <LoadingsAndErrors>
          <h3 className="me-4 text-xl">there's no items </h3>
        </LoadingsAndErrors>
      ) : (
        <Fragment>
          <List
            disablePadding
            sx={{ transition: "all 500ms" }}
            className={` hidden
           bg-slate-200 border-r border-gray-300  sm:flex flex-col`}
          >
            {allCategoriesMap}
          </List>
          <List
            disablePadding
            sx={{ transition: "all 500ms", overflow: "auto" }}
            className={` sm:hidden
           bg-slate-200 border-r border-gray-300 h-44`}
          >
            {allCategoriesMap}
          </List>
        </Fragment>
      )}
      {/* <MaterialModal> */}
      {/*   <EditCategory /> */}
      {/* </MaterialModal> */}
    </Box>
  );
};

export default CategoriesSideMenu;
