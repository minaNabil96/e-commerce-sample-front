import React from "react";
import { Container, Box } from "@mui/material";
import { useLocation } from "react-router-dom";
import ProductsBySubCategory from "../components/productsComponents/ProductsBySubCategory";
import AllProductsControllerNav from "../components/productsComponents/AllProductsControllerNav";
const AllProductsBySubCategoryPage = () => {
	let { state } = useLocation();

	return (
		<Container className={`min-h-screen`}>
			<Box className=" flex justify-center items-center my-4">
				<AllProductsControllerNav />
			</Box>
			<ProductsBySubCategory subCategoryId={state} />
		</Container>
	);
};

export default AllProductsBySubCategoryPage;
