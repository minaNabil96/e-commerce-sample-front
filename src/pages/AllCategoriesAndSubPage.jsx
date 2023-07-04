import React, { Fragment, useState } from "react";
import { Box } from "@mui/system";
import CategoriesSideMenu from "../components/categoriesandsubcomponents/CategoriesSideMenu";
import SelectedSubCategoriesShow from "../components/categoriesandsubcomponents/SelectedSubCategoriesShow";
import { Container } from "@mui/material";
import MaterialModal from "../components/modalsAndPopUps/MaterialModal";
import EditSubCategory from "../components/adminComponents/EditSubCategory";
import EditCategory from "../components/adminComponents/EditCategory";
import { useSelector } from "react-redux";
const AllCategoriesAndSubPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const getSelectedCategoryId = (id) => {
    setSelectedCategoryId(id);
  };

  const { materialModalStatus, materialModalHeadName } = useSelector(
    (state) => state.materialModalSlice
  );

  return (
    <Box
      className={`min-h-screen grid sm:grid-cols-3 lg:grid-cols-5 bg-blue-50`}
    >
      <Box className={`lg:col-span-1`}>
        <CategoriesSideMenu tryToGetId={getSelectedCategoryId} />
      </Box>
      <Box
        sx={{ direction: "rtl" }}
        className={`  sm:col-span-2 lg:col-span-4 `}
      >
        <SelectedSubCategoriesShow selectedCategoryId={selectedCategoryId} />
      </Box>
      {materialModalHeadName === "edit subcategory" && materialModalStatus && (
        <MaterialModal>
          <EditSubCategory />
        </MaterialModal>
      )}
      {materialModalHeadName === "edit category" && materialModalStatus && (
        <MaterialModal>
          <EditCategory />
        </MaterialModal>
      )}
    </Box>
  );
};

export default AllCategoriesAndSubPage;
