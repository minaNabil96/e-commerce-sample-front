import React, { useState } from "react";
import { Link } from "react-router-dom";
import LandingCard1 from "../components/landingComponents/LandingCard1";
import {
  Container,
  Grid,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  useGetAllProductsQuery,
  useGetAllBrandsQuery,
  useGetOffersQuery,
} from "../utils/api/apiSlice";
import LoadingsAndErrors from "../components/LoadingsAndErrors";
import SideMenu from "../components/landingComponents/SideMenu";
import { useSelector, useDispatch } from "react-redux";
import { menuSmallStatus } from "../utils/reducers/sideMenuSlice";
import Backdrop from "@mui/material/Backdrop";
import PortalComponent from "../components/PortalComponent";
import SwiperComponent from "../components/SwiperComponent";
import { useMediaQuery } from "@mui/material";

function LandingPage() {
  const [card1State, setCard1State] = useState({
    height1: `auto`,
    height2: 440,
    imageSize1: 200,
  });
  // const smDetect = useMediaQuery(`(min-width: 640px)`, { NoSsr: true });
  const dispatch = useDispatch();
  const { sideMenuSmallStatus } = useSelector((state) => state.sideMenuSlice);
  const {
    data: allProducts,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetAllProductsQuery({
    limit: 16,
    page: 1,
    sort: "",
    term: "",
  });
  const { data: offers } = useGetOffersQuery({ page: 1, limit: 3 });

  const {
    isLoading: isloading2,
    isError: isError2,
    error: error2,
    isSuccess: isSuccess2,
    data: allBrands,
  } = useGetAllBrandsQuery({ limit: 18, page: 1 });
  const allBrandsMap =
    allBrands &&
    allBrands.allBrands.map(({ _id, name, image }) => (
      <Box
        className={`flex flex-col items-center justify-center my-4 mx-4`}
        key={_id}
      >
        {/* <Link to={`/products-sortby-subcategories`} state={_id}> */}
        <Box className="rounded-md shadow-md">
          <img
            src={image}
            alt={`img`}
            className={`w-60 h-20 object-cover hover:object-left duration-500 rounded-md `}
          />
        </Box>
        {/* </Link> */}
        {/* <Link to={`/products-sortby-subcategories`} state={_id}> */}
        <Box className={`my-4 `}>
          <Typography
            className={`hover:text-yellow-600 transition-all `}
            align="center"
            variant="subtitle1"
          >
            {name}
          </Typography>
        </Box>
        {/* </Link> */}
      </Box>
    ));

  return (
    <Box className={`flex bg-slate-50`}>
      <PortalComponent>
        <Backdrop
          className="h-screen sm:hidden"
          sx={{
            color: "#fff",
            zIndex: "5",
          }}
          open={sideMenuSmallStatus}
          onClick={() => dispatch(menuSmallStatus())}
        />
      </PortalComponent>
      <Box
        className={`hidden h-fit  lg:block border-r-[1px] border-b-[1px] border-secColor-sec`}
      >
        <SideMenu />
      </Box>
      <Container>
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
        ) : isSuccess && allProducts.products ? (
          <>
            {/* big screens menu */}
            <Grid container spacing={2}>
              {/* end big screens menu */}
              {/* amall screens menu */}
              <Box
                className={` sm:hidden fixed z-10   left-0 top-[64px] h-full m-0 p-0 `}
              >
                <SideMenu />
              </Box>
              {/* end small screens menu */}

              <Grid item xs={12} md={12} lg={12}>
                {/* <LandingCard1
                  cardHeight={card1State.height2}
                  imageHeight={card1State.imageSize1}
                  products={firstSmallCards}
                /> */}
                <Box
                  className={`flex items-center justify-end mt-14 border-b border-secColor`}
                >
                  <Typography
                    sx={{ fontWeight: "600" }}
                    variant={`h6`}
                    className={`text-green-700 py-4`}
                  >
                    أحدث العروض
                  </Typography>
                </Box>
                <Box className={` shadow-sm mb-14`}>
                  <Box className={`sm:w-[600px]  mx-auto`}>
                    <SwiperComponent
                      images={
                        offers &&
                        offers.allOffers &&
                        offers.allOffers.map(({ image }) => image)
                      }
                      imagesStyle={` h-[300px] w-[700px] mx-auto my-6 py-4 object-cover `}
                      auto={true}
                      arrows={false}
                    />
                  </Box>
                </Box>
                <Box
                  className={`flex items-center justify-end my-14 border-b border-secColor`}
                >
                  <Typography
                    sx={{ fontWeight: "600" }}
                    variant={`h6`}
                    className={`text-green-700 py-4`}
                  >
                    الماركات الأكثر شهرة
                  </Typography>
                </Box>
                <Box className={`   shadow-sm my-14`}>
                  <Box className={`sm:w-[600px]  mx-auto `}>
                    <Link to={`/all-brands`}>
                      <SwiperComponent
                        notSimple={allBrandsMap}
                        slideNum={`3`}
                        imagesStyle={` h-[200px] mx-auto my-6 py-4 object-cover`}
                        auto={false}
                        arrows={false}
                      />
                    </Link>
                  </Box>
                </Box>
              </Grid>
              <Box
                className={`w-full flex items-center justify-end my-14 border-b border-secColor `}
              >
                <Typography
                  sx={{ fontWeight: "600" }}
                  variant={`h6`}
                  className={`text-green-700 py-4 `}
                >
                  المنتجات المضافة حديثًا
                </Typography>
              </Box>
            </Grid>
            <Box
              className={`grid grid-cols-2  sm:grid-cols-3  lg:grid-cols-4 my-4 gap-4`}
            >
              <LandingCard1
                cardHeight={card1State.height2}
                imageHeight={card1State.imageSize1}
                products={allProducts && allProducts.products}
              />
            </Box>
          </>
        ) : (
          <LoadingsAndErrors>
            <h3 className="me-4 text-xl">there's no items </h3>
          </LoadingsAndErrors>
        )}
      </Container>
    </Box>
  );
}

export default LandingPage;
