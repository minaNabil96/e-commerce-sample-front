import React, { useState, useLayoutEffect } from "react";
import { Box, Container } from "@mui/system";
import AllProductsCard from "../components/productsComponents/AllProductsCard";
import LoadingsAndErrors from "../components/LoadingsAndErrors";
import { CircularProgress } from "@mui/material";
import PaginationComp from "../components/PaginationComp";
import AllProductsControllerNav from "../components/productsComponents/AllProductsControllerNav";
import { useDispatch, useSelector } from "react-redux";
import {
  subNavExpand,
  subNavClose,
  subNavSort,
  subNavSearch,
} from "../utils/reducers/subNavSlice";
import {
  useGetProductsWithFeaturesMutation,
  useGetAllProductsQuery,
} from "../utils/api/apiSlice";

const AllProducts = () => {
  const [selected, setSelected] = useState(1);
  const limit = 12;

  const cardState = {
    height1: `auto`,
    cardHight: 330,
    imageHeight: 145,
    gridRows: 5,
    imageWidth: 220,
  };
  // rtk
  const dispatch = useDispatch();
  const { sorted, termForSearch } = useSelector((state) => state.subNavSlice);
  const {
    data: allProducts,
    isSuccess,
    isLoading,
    isError,
    error,
    isUninitialized,
  } = useGetAllProductsQuery({
    limit: limit,
    page: selected,
    sort: sorted,
    term: termForSearch,
  });
  useLayoutEffect(() => {
    dispatch(subNavSearch(""));
  }, [dispatch]);
  // main component
  return (
    <Container>
      <div className=" flex justify-center items-center my-8">
        <AllProductsControllerNav />
      </div>
      {allProducts &&
        allProducts.pagination &&
        allProducts.products.length > 0 && (
          <div className=" flex justify-center items-center my-8">
            <PaginationComp
              pages={allProducts.pagination.numOfAllPages}
              selectedPage={(e, value) => {
                setSelected(value);
              }}
              curruntActivePage={selected}
            />
          </div>
        )}
      {isLoading || isUninitialized ? (
        <LoadingsAndErrors>
          <div className={`flex justify-between items-center  `}>
            <h3 className="me-4 text-xl text-green-700">Loading </h3>
            <CircularProgress color="success" />
          </div>
        </LoadingsAndErrors>
      ) : isError && error ? (
        <LoadingsAndErrors>
          <h3 className="text-xl text-red-600">{error.status}</h3>
        </LoadingsAndErrors>
      ) : isSuccess && allProducts && allProducts.products.length !== 0 ? (
        <>
          <Box
            className={`grid grid-cols-2  md:grid-cols-3  lg:grid-cols-4  gap-2 mx-auto my-4 `}
            onClick={() => dispatch(subNavClose())}
          >
            <AllProductsCard
              cardHeight={cardState.cardHight}
              imageHeight={cardState.imageHeight}
              imageWidth={cardState.imageWidth}
              products={allProducts.products ? allProducts.products : ""}
            />
          </Box>
        </>
      ) : (
        <LoadingsAndErrors>
          <h3 className="me-4 text-xl">there's no items </h3>
        </LoadingsAndErrors>
      )}
      {allProducts &&
        allProducts.pagination &&
        allProducts.products.length > 0 && (
          <div className=" flex justify-center items-center my-8">
            <PaginationComp
              pages={allProducts.pagination.numOfAllPages}
              selectedPage={(e, value) => {
                setSelected(value);
              }}
              curruntActivePage={selected}
            />
          </div>
        )}
    </Container>
  );
};

export default AllProducts;
