import React, { useState, useEffect, Fragment } from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import {
  useGetAllCategoriesQuery,
  useGetSubCategoriesByCategoryQuery,
} from "../../utils/api/apiSlice";
import {
  MdExpandMore,
  MdExpandLess,
  MdArrowBack,
  MdArrowForward,
} from "react-icons/md";
import { Box } from "@mui/system";
import { Divider } from "@mui/material";
import { IconButton } from "@mui/material";
import {
  menuStatus,
  menuSmallStatus,
} from "../../utils/reducers/sideMenuSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const SideMenu = () => {
  // const [open, setOpen] = useState(true);
  // const [openSmallScreens, setOpenSmallScreens] = useState(false);
  const [clickedCategory, setClickedCategory] = useState({
    name: "",
    id: "",
    index: "",
  });

  const dispatch = useDispatch();
  const { sideMenuStatus, sideMenuSmallStatus } = useSelector(
    (state) => state.sideMenuSlice
  );

  const {
    data: allCategories,
    isLoading: isLoading2,
    isSuccess: isSuccess2,
    isError: isError2,
    error: error2,
  } = useGetAllCategoriesQuery({ page: 1, limit: 16 });
  // const { data: allSubCategories } = useGetAllSubCategoriesQuery();
  const {
    data: allSubCategories,
    isLoading,
    isSuccess,
    isError,
    error,
    isFetching,
    refetch,
  } = useGetSubCategoriesByCategoryQuery(clickedCategory.id);

  const handleClick = (e, idx, _id, name) => {
    setClickedCategory({ id: _id, index: idx, name: name });
    dispatch(menuStatus());
  };
  const allSubCategoriesMap =
    allSubCategories &&
    allSubCategories.map(({ name, _id, category }, idx) => (
      <Collapse
        className={`${category._id === clickedCategory.id ? "" : "hidden"}`}
        key={_id}
        in={sideMenuStatus}
        timeout="auto"
        unmountOnExit
      >
        <List component="div" disablePadding>
          <Link to={`/products-sortby-subcategories`} state={_id}>
            <Box
              className={`bg-green-50 hover:bg-green-200/70 p-2 rounded-sm `}
            >
              <p className={`text-center p-1`}>{name}</p>
            </Box>
          </Link>
          <Divider className={`bg-green-400`} />
        </List>
      </Collapse>
    ));

  const allCategoriesMap =
    allCategories &&
    allCategories.allCategories.map(({ name, _id }, idx) => (
      <Box
        key={_id}
        sx={{ transition: "all 100ms" }}
        className={`  sm:opacity-100 sm:visible sm:block tranform ${
          sideMenuSmallStatus
            ? ""
            : " opacity-0 invisible -translate-x-20 sm:translate-x-0 "
        } left-0  `}
      >
        <Box
          className={` cursor-pointer bg-green-300/80 hover:bg-green-600/70 focus-visible:bg-green-600/70  p-2 duration-150`}
          onClick={(e) => handleClick(e, idx, _id, name)}
        >
          <p className={`text-end pt-2 font-semibold text-[15px] pe-2 `}>
            {name}
          </p>
          {sideMenuStatus &&
          idx === clickedCategory.index &&
          allSubCategories ? (
            <MdExpandLess />
          ) : (
            <MdExpandMore />
          )}
        </Box>
        <Divider className={`bg-black`} />
        {idx === clickedCategory.index && (
          <div
            className={`${
              idx === clickedCategory.index &&
              allSubCategories &&
              allSubCategories.length > 0
                ? ""
                : "hidden"
            } `}
          >
            {allSubCategoriesMap}
          </div>
        )}
      </Box>
    ));
  return (
    <List
      sx={{
        transition: "all 500ms",
        zIndex: "20",
      }}
      className={`sm:w-[100%] overflow-visible relative bg-white h-[93vh] sm:min-h-[900px]  sm:max-w-[360px]  sm:min-w-[275px] ${
        !sideMenuSmallStatus ? "w-[0vw] sm:w-auto " : "w-[75vw] sm:w-auto"
      }`}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader
          sx={{
            transition: "all 100ms",
            backgroundColor: "rgb(21 170 61)",
            color: "white",
          }}
          className={`sm:opacity-100 sm:visible transform  ${
            sideMenuSmallStatus
              ? ""
              : "  -translate-x-20 sm:translate-x-0 opacity-0 invisible"
          }  `}
          component="div"
          id="nested-list-subheader"
        >
          التصنيفات
        </ListSubheader>
      }
    >
      {isLoading2 ? (
        <Box className={`flex items-center justify-center`}>wait..</Box>
      ) : isError2 && error2 ? (
        <Box className={`flex items-center justify-center`}>
          {error2.status}
        </Box>
      ) : (
        <Box className={`border `}>
          <Box className={`sm:hidden  `}>
            <IconButton
              className={`sm:hidden ${
                sideMenuSmallStatus ? "-right-4" : "-right-9"
              }  z-50`}
              onClick={() => dispatch(menuSmallStatus())}
              sx={{
                width: " fit-content",
                position: "absolute",
                top: "15rem",
              }}
            >
              {/* <MdArrowBack */}
              {/*   size={`40`} */}
              {/*   className={`sm:hidden bg-green-500 rounded-full text-black transition-all ${ */}
              {/*     !sideMenuSmallStatus ? "hidden" : "" */}
              {/*   }   `} */}
              {/* /> */}
              <MdArrowForward
                size={`40`}
                className={` transition-all sm:hidden bg-green-600 rounded-full text-black ${
                  sideMenuSmallStatus ? "hidden" : ""
                }   `}
              />
            </IconButton>
          </Box>
          {allCategoriesMap}
        </Box>
      )}
    </List>
  );
};

export default SideMenu;
