import React, { useState, useLayoutEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Box } from "@mui/system";
import Typography from "@mui/material/Typography";
import LoadingsAndErrors from "../LoadingsAndErrors";
import { useGetProductsWithSubQuery } from "../../utils/api/apiSlice";
import { CircularProgress } from "@mui/material";
import AllProductsCard from "./AllProductsCard";
import PaginationComp from "../PaginationComp";
import { useSelector, useDispatch } from "react-redux";
import { subNavSearch } from "../../utils/reducers/subNavSlice.js";
const ProductsBySubCategory = ({ subCategoryId }) => {
  const [selected, setSelected] = useState(1);
  const dispatch = useDispatch();
  const { state } = useLocation();
  const { sorted, termForSearch } = useSelector((state) => state.subNavSlice);
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: productsBySub,
  } = useGetProductsWithSubQuery({
    limit: 16,
    page: selected,
    subCategoryId,
    sort: sorted,
    term: termForSearch,
  });
  const cardState = {
    height1: `auto`,
    cardHight: 330,
    imageHeight: 145,
    gridRows: 5,
    imageWidth: 220,
  };
  useLayoutEffect(() => {
    dispatch(subNavSearch(""));
  }, [dispatch]);
  return (
    <Box className={`min-h-screen  `}>
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
      ) : isSuccess && productsBySub.productsBySubCategory.length === 0 ? (
        <LoadingsAndErrors>
          <h2 className="me-4 text-2xl">there's no items </h2>
        </LoadingsAndErrors>
      ) : (
        <>
          <Box className={`  grid sm:grid-cols-4 my-8`}>
            <AllProductsCard
              cardHeight={cardState.cardHight}
              imageHeight={cardState.imageHeight}
              imageWidth={cardState.imageWidth}
              products={productsBySub.productsBySubCategory}
            />
          </Box>
          <Box className={`flex flex-col justify-center items-center my-8 `}>
            <PaginationComp
              pages={productsBySub.pagination.numOfAllPages}
              selectedPage={(e, value) => {
                setSelected(value);
              }}
              curruntActivePage={selected}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default ProductsBySubCategory;
