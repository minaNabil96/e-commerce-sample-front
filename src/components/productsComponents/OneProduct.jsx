import React, { Fragment, useState, useEffect, useRef } from "react";
import { Button, useMediaQuery } from "@mui/material";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  useGetSpecificProductQuery,
  useDeleteProductMutation,
} from "../../utils/api/apiSlice";
import LoadingsAndErrors from "../../components/LoadingsAndErrors";
import SwiperComponent from "../../components/SwiperComponent";
import { Box } from "@mui/system";
import {
  Typography,
  Container,
  Grid,
  CircularProgress,
  Divider,
  TextField,
  Rating,
  IconButton,
} from "@mui/material";
import useModalHandler from "../../helpers/useModalHandler";
import Comments from "../Comments";
import useGetRatingsAndCommentsProductQuery from "../../utils/api/apiSlice";
import { IoMdCloudDone } from "react-icons/io";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromCart,
  addToCart,
  increament,
  decrement,
} from "../../utils/reducers/cartSlice";
const OneProduct = () => {
  const [detectScreen, setDetectScreen] = useState(false);
  const [selectedVersion, setSelectedVersion] = useState({
    version: "",
    selectedIdx: "",
  });
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const { state } = useLocation();
  const isAdmin = localStorage.getItem("admin");
  const loggedUserImage = localStorage.getItem("userImage");
  const loggedUserId = localStorage.getItem("userId");

  const dispatch = useDispatch();
  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: product,
  } = useGetSpecificProductQuery(state);
  const [deleteProduct, { data: deletedProduct }] = useDeleteProductMutation();
  const smDetect = useMediaQuery(`(min-width: 640px)`, { NoSsr: true });
  useEffect(() => {
    smDetect ? setDetectScreen(true) : setDetectScreen(false);
  }, [smDetect]);
  // const directionDetect = !detectScreen ? "column-reverse" : "row";
  const { modalOpen, modalClose } = useModalHandler();
  const handleDelete = (e, _id) => {
    deleteProduct(_id)
      .unwrap()
      .then((res) => {
        if (res.status.includes("success")) {
          modalOpen(`info`, `success`);
          modalClose();
          setTimeout(() => {
            navigate(`/`);
          }, 3000);
        } else {
          modalOpen(`info`, `faild`);
          modalClose();
        }
      })
      .catch((err) => {
        console.log(err);
        modalOpen(`info`, `faild`);
        modalClose();
      });
  };
  const addToCartWithInc = (_id, name, desc, coverImage, price, quantity) => {
    if (count <= 1) {
      dispatch(addToCart({ _id, name, desc, coverImage, price, quantity }));
    }
    if (count < quantity) {
      setCount(count + 1);
      if (count > 1) {
        dispatch(increament({ _id: _id }));
      }
    }
  };

  const decrementFun = (_id) => {
    if (count > 1) {
      dispatch(decrement(_id));
      setCount(count - 1);
    }
    if (count === 1) {
      dispatch(removeFromCart(_id));
      setCount(count - 1);
    }
  };

  const productMap =
    product &&
    product.map(
      ({
        _id,
        name,
        coverImage,
        desc,
        details,
        images,
        avilableVerions,
        quantity,
        price,
        ratingsAverage,
        offer,
        priceAfterDiscount,
      }) => (
        <Fragment key={_id}>
          <Grid item className={` my-10`} sm={12} md={6} lg={6}>
            <Box
              className={` ${
                isAdmin === "true" ? "" : "hidden"
              } flex items-center justify-end my-4 py-4`}
            >
              <Button
                sx={{
                  backgroundColor: "darkorange",
                  ":hover": {
                    backgroundColor: "red",
                    transform: "all 150ms",
                  },
                }}
                variant="contained"
                onClick={(e) => handleDelete(e, _id)}
              >
                حذف اﻟﻤﻨﺘﺞ
              </Button>
            </Box>
            <Typography
              className={` bg-gradient-to-tr from-mainColor to-green-700 text-white py-4 px-1  rounded-sm text-center shadow-md border-[1px] border-white`}
              sx={{ fontSize: "20px", marginY: "1.47rem", fontWeight: "bold" }}
            >
              {`ﺗﻔﺎﺻﻴﻞ اﻟﻤﻨﺘﺞ`}
            </Typography>
            <Box
              sx={{ direction: "rtl", lineHeight: "2" }}
              className={` bg-white px-2 py-2  text-start shadow-md border-[1px] border-mainColor`}
              variant={`body1`}
            >
              <Typography
                component={`div`}
                sx={{ fontSize: "18px", fontWeight: "bold" }}
                className=" text-start py-4  border-b border-black "
              >
                {`وصف المنتج`}
              </Typography>
              <Typography
                variant={`body1`}
                sx={{ direction: "rtl", lineHeight: "2" }}
                className={`py-4`}
              >
                {desc}
              </Typography>
            </Box>

            <Divider variant="inset" />
            <Box
              // sx={{ backgroundColor: "limegreen" }}
              className={`bg-white my-8  shadow-md`}
            >
              <Box
                className={`flex items-center border-black border justify-between px-4 py-4`}
              >
                <Rating
                  className={`bg-blue-400 p-1`}
                  size="small"
                  name="half-rating-read"
                  defaultValue={ratingsAverage}
                  precision={0.5}
                  readOnly
                />

                <Typography
                  className={`bg-yellow-300 px-2 py-1 rounded-sm`}
                  sx={{ fontSize: "18px" }}
                >
                  التقييم
                </Typography>
              </Box>
              <Box
                className={`  py-4 ${
                  offer ? "" : "hidden"
                } flex items-center justify-between px-4 border-black border `}
              >
                <Typography
                  className={`bg-yellow-300 py-1 px-2 rounded-sm`}
                  sx={{ fontSize: "17px" }}
                >{`${offer && offer.discount}  %   خصم`}</Typography>
                <Typography
                  className={`bg-red-300 py-1 px-2 rounded-sm`}
                  sx={{ fontSize: "18px", color: "black" }}
                >
                  {offer && offer.name}
                </Typography>
              </Box>
              <Box
                className={`  py-4 flex items-center justify-between px-4 border-black border`}
              >
                <Typography
                  className={`bg-green-400 py-1 px-2 rounded-sm text-start`}
                  sx={{ fontSize: "18px", color: "black", direction: "rtl" }}
                >
                  {`${price} جنيه`}
                </Typography>
                <Typography
                  className={`bg-blue-400 py-1 px-2 rounded-sm`}
                  sx={{ fontSize: "17px" }}
                >{`السعر`}</Typography>
              </Box>
              <Box
                className={` ${
                  priceAfterDiscount && priceAfterDiscount > 0 ? "" : "hidden"
                } py-4 flex items-center justify-between px-4 border-black border`}
              >
                <Typography
                  className={`bg-green-400 py-1 px-2 rounded-sm text-start border-red-500 border`}
                  sx={{ fontSize: "18px", color: "black", direction: "rtl" }}
                >
                  {`${priceAfterDiscount && priceAfterDiscount} جنيه`}
                </Typography>
                <Typography
                  className={`bg-blue-400 border-red-500 border py-1 px-2 rounded-sm`}
                  sx={{ fontSize: "17px" }}
                >{`السعر بعد الخصم`}</Typography>
              </Box>
            </Box>
            <Box
              className={` ${
                isAdmin === "true" ? "hidden" : ""
              } bg-white shadow-sm  my-8`}
            >
              <Typography
                className={` text-center py-4 border-b border-black`}
                variant={`h6`}
              >{`أشتري الأن`}</Typography>
              <Box
                className={`flex items-center justify-end py-4 border-b border-black`}
              >
                <Typography
                  sx={{ direction: "rtl", paddingX: "0.25rem" }}
                  variant={`body1`}
                >
                  {quantity}
                </Typography>
                <Typography
                  sx={{ direction: "rtl", paddingX: "0.25rem" }}
                  variant={`body1`}
                >
                  {`عدد القطع المتاحة : `}
                </Typography>
              </Box>
              <Typography
                className={`  ${
                  avilableVerions && avilableVerions.length > 0 ? "" : "hidden"
                } text-center py-4`}
                variant={`body1`}
              >{`تحديد النسخة`}</Typography>
              <Box
                className={` ${
                  avilableVerions && avilableVerions.length > 0 ? "" : "hidden"
                } flex items-center justify-center`}
              >
                {avilableVerions &&
                  avilableVerions.map((version, idx) => (
                    <Box
                      key={idx}
                      className={`flex items-center justify-center flex-col`}
                    >
                      <Button
                        sx={{
                          margin: "0.50rem",
                          color: "white",
                          transation: "all 200ms",
                          backgroundColor: `${
                            idx === selectedVersion.selectedIdx
                              ? "limegreen"
                              : "slateblue"
                          }`,
                          oultline: `${
                            idx === selectedVersion.selectedIdx && "red 2px"
                          }`,
                          ":hover": {
                            backgroundColor: `${
                              idx === selectedVersion.selectedIdx
                                ? "green"
                                : "darkslateblue"
                            }`,
                            // border: "red",
                            oultline: "none",
                          },
                        }}
                        variant={`outlined`}
                        onClick={() =>
                          setSelectedVersion({
                            ...selectedVersion,
                            selectedIdx: idx,
                            version: version,
                          })
                        }
                      >
                        {version}
                      </Button>
                      {idx === selectedVersion.selectedIdx && (
                        <IoMdCloudDone
                          className={`text-green-400 duration-200`}
                        />
                      )}
                    </Box>
                  ))}
              </Box>
              <Box className={`flex items-center justify-center py-4 `}>
                <Typography variant={`h6`}>{`أضف للعربة`}</Typography>
              </Box>
              <Box
                // sx={{ fontSize: "22px" }}
                // component={`div`}
                // variant={`body2`}
                className={` flex items-center justify-center bg-slate-600  `}
              >
                <IconButton onClick={() => decrementFun(_id)}>
                  <AiFillMinusCircle
                    size={20}
                    className={`text-white me-2 hover:text-red-400 duration-150 `}
                  />
                </IconButton>
                <Typography
                  className={`text-white `}
                  sx={{ fontSize: "21px", marginX: "0.25rem" }}
                  component={`div`}
                >
                  {count}
                </Typography>
                <IconButton
                  onClick={() =>
                    addToCartWithInc(
                      _id,
                      name,
                      desc,
                      coverImage,
                      price,
                      quantity
                    )
                  }
                >
                  <AiFillPlusCircle
                    size={20}
                    className={`text-white ms-2 hover:text-green-400 duration-150`}
                  />
                </IconButton>
              </Box>
            </Box>

            <Comments productId={state} />

            {/* <Box className={`grid md:grid-cols-2 `}> */}
            {/*   <Comments productId={state} /> */}
            {/* </Box> */}
          </Grid>
          <Grid item className={` my-10`} sm={12} md={6} lg={6}>
            <Typography
              component={`h4`}
              className={` font-Marhey rounded-b-md bg-gradient-to-tr from-mainColor to-green-700 text-white my-10 px-4 py-4 text-start border-[1px] border-white shadow-md`}
              sx={{ fontSize: "18px", direction: "rtl", marginY: "1.5rem" }}
            >
              {name}
            </Typography>
            <Box
              className={`bg-white rounded-sm my-8 py-8 shadow-md border-[1px] border-mainColor w-[92vw] sm:w-auto`}
            >
              {/* <img
                className={`h-80 w-80 mx-auto my-6 object-contain`}
                src={coverImage}
                alt={`coverImg`}
              /> */}
              <SwiperComponent
                images={
                  images.length > 0 ? [coverImage, ...images] : [coverImage]
                }
                imagesStyle={`h-96 w-96 mx-auto my-6 py-8 object-contain`}
                arrows={true}
              />
            </Box>
            <Box
              className={` ${
                avilableVerions.length > 0 ? "" : "hidden"
              } bg-white px-2 py-4 my-6 shadow-md border-[1px] border-mainColor `}
            >
              <Typography
                component={`div`}
                sx={{ fontSize: "18px", fontWeight: "bold" }}
                className={` text-end py-4 `}
              >
                {`اﻟﻨﺴﺦ اﻟﻤﺘﺎﺣﺔ`}
              </Typography>
              <Box className={`flex items-center justify-end`}>
                {avilableVerions &&
                  avilableVerions.map((version, idx) => (
                    <Typography
                      component={`div`}
                      key={idx}
                      sx={{
                        fontWeight: "bold",
                        border: "1px solid black",
                        paddingX: "1rem",
                        paddingY: "0.25rem",
                        marginX: "0.50rem",
                      }}
                      className={`rounded-sm`}
                      variant="body1"
                    >
                      {version}
                    </Typography>
                  ))}
              </Box>
            </Box>
            <Box
              className={` ${
                details.length > 0 ? "" : "hidden"
              } bg-white shadow-md border-[1px] border-mainColor my-6 `}
            >
              <Typography
                component={`div`}
                sx={{ fontSize: "18px", fontWeight: "bold" }}
                className="text-end px-2 py-4 "
              >
                {`المواصفات`}
              </Typography>
              {details &&
                details.map(({ name, value }, idx) => (
                  <Box key={idx} className={` grid grid-cols-3  my-3 py-1 `}>
                    <Typography
                      component={`div`}
                      className=" bg-yellow-200 col-span-2 rounded-sm text-end px-2 py-2 border border-black"
                    >
                      {value}
                    </Typography>
                    <Typography
                      component={`div`}
                      className=" bg-green-200 text-end px-2 py-2 border border-black"
                    >
                      {name}
                    </Typography>
                  </Box>
                ))}
            </Box>
          </Grid>
        </Fragment>
      )
    );
  return (
    <Container>
      {isLoading || !state ? (
        <LoadingsAndErrors>
          <div className={`flex justify-between items-center  `}>
            <h3 className="me-4 text-xl text-green-700">Loading </h3>
            <CircularProgress color="success" />
          </div>
        </LoadingsAndErrors>
      ) : isError && error && state ? (
        <LoadingsAndErrors>
          <h3 className="text-xl text-red-600 ">{error.status}</h3>
        </LoadingsAndErrors>
      ) : (
        <>
          <Grid
            container
            spacing={4}
            direction={!detectScreen ? "column-reverse" : "row"}
            className={`min-h-screen `}
          >
            {productMap}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default OneProduct;
