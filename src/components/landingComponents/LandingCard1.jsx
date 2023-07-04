import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Box,
  Button,
  CardActionArea,
  CardActions,
  Rating,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../utils/reducers/cartSlice";
import { BsCart2, BsCurrencyDollar } from "react-icons/bs";
import { AiOutlinePlus } from "react-icons/ai";
import { useAddFavoritesMutation } from "../../utils/api/apiSlice";
import useModalHandler from "../../helpers/useModalHandler";
function LandingCard1({
  products,
  cardWidth,
  cardHeight,
  imageHeight,
  images,
}) {
  const [hoverEffect, setHoverEffect] = useState(false);
  const [hoverIdx, setHoverIdx] = useState("");

  const userId = localStorage.getItem("userId");
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const token = localStorage.getItem("accessToken");

  const dispatch = useDispatch();

  const { modalOpen, modalClose } = useModalHandler();
  const [addFavorites, { data: addedToFavorites }] = useAddFavoritesMutation();

  const addToCartFun = (e, _id, name, desc, coverImage, price, quantity) => {
    dispatch(addToCart({ _id, name, desc, coverImage, price, quantity }));
  };
  const addToFavorite = (_id) => {
    if (
      userId &&
      isLoggedIn === "true" &&
      token &&
      token.split(" ")[0] === "Bearer"
    ) {
      addFavorites({ id: userId, productId: _id })
        .unwrap()
        .then((res) => {
          console.log({ res });
          if (res.status === "success") {
            modalOpen(`info`, `added to your favorites`);
            modalClose();
          }
        })
        .catch((err) => {
          console.log(err);
          if (err.data.message && err.data.message.includes("already")) {
            modalOpen(`info`, `already in your favorites`);
            modalClose();
          }
          if (err.data.message && err.data.message.includes("more")) {
            modalOpen(`info`, `${err.data.message}`);
            modalClose();
          }
        });
    } else {
      modalOpen(`info`, `please login first`);
      modalClose();
    }
  };

  const hoverHandler = (e, idx) => {
    setHoverIdx(idx);
    e.type === "mouseenter" || e.type === "touchstart"
      ? setHoverEffect(true)
      : setHoverEffect(false);
  };
  const productsMap = products ? (
    products.map(
      (
        {
          _id,
          slug,
          name,
          desc,
          coverImage,
          price,
          quantity,
          ratingsAverage,
          ratingsQuantity,
          priceAfterDiscount,
        },
        idx
      ) => (
        <Box
          className={`relative rounded-sm  `}
          key={_id}
          onMouseEnter={(e) => hoverHandler(e, idx)}
          onMouseLeave={(e) => hoverHandler(e, idx)}
          onTouchStart={(e) => hoverHandler(e, idx)}
          onTouchEnd={(e) => hoverHandler(e, idx)}
        >
          <Box
            className={`absolute flex  items-end justify-around overflow-hidden ${
              idx === hoverIdx && hoverEffect
                ? ` opacity-100 h-[200px]`
                : " opacity-20 h-[0%]"
            } duration-500 bg-green-600/90 w-full  rounded-sm z-10`}
          >
            <Box
              sx={{
                // display: `${idx === hoverIdx && hoverEffect ? "" : "none"}`,
                opacity: `${idx === hoverIdx && hoverEffect ? "1" : "0"}`,
                visability: `${
                  idx === hoverIdx && hoverEffect ? "" : "hidden"
                }`,
                transition: "all 300ms",
                margin: "0.50rem",
              }}
              className={`flex flex-col-reverse sm:flex-row items-center overflow-hidden justify-around w-full`}
            >
              <Box className={`flex items-end  justify-center `}>
                <Rating
                  className={``}
                  sx={{
                    opacity: `${idx === hoverIdx && hoverEffect ? "1" : "0"}`,
                    visability: `${
                      idx === hoverIdx && hoverEffect ? "" : "hidden"
                    }`,
                  }}
                  size="small"
                  name="half-rating-read"
                  defaultValue={ratingsAverage}
                  precision={0.5}
                  readOnly
                />
              </Box>
              <Typography variant="body2" className={`text-white`}>
                {ratingsQuantity}
              </Typography>
              <span className={`text-[12px] text-secColor`}>
                تم التقييم بواسطة
              </span>
            </Box>
          </Box>{" "}
          {/* <Box */}
          {/*   className={`   flex items-center justify-center  h-full bg-red-300`} */}
          {/* > */}
          {/*   <Typography variant={`body2`}>hi</Typography> */}
          {/* </Box> */}
          <Card
            sx={{
              width: cardWidth,
              height: cardHeight,
              position: "relative",
            }}
            className={` flex flex-col shadow-sm  `}
          >
            <Link to={`products/${_id}`} state={_id}>
              <CardActionArea className={``}>
                <CardMedia
                  className={` cursor-default`}
                  sx={{
                    height: imageHeight,
                    objectFit: "contain",
                    transition: "all 700ms",
                  }}
                  component="img"
                  image={coverImage}
                  alt="image"
                />

                <CardContent className={` bg-gray-50 h-60  overflow-hidden   `}>
                  <Typography
                    className="text-start   overflow-hidden"
                    gutterBottom
                    component="div"
                    sx={{ fontSize: "15px", direction: "rtl" }}
                  >
                    {name.length <= 30 ? name : name.slice(0, 30)}
                    <span
                      className={`ms-1 ${name.length <= 30 ? "hidden" : ""}  `}
                    >
                      ...
                    </span>
                  </Typography>
                  <Typography
                    className="text-start"
                    color="text.secondary"
                    component="div"
                    sx={{ direction: "rtl", fontSize: "14px" }}
                  >
                    {desc.length <= 30 ? desc : desc.slice(0, 30)}
                    <span
                      className={`ms-1 ${desc.length <= 30 ? "hidden" : ""} `}
                    >
                      ...
                    </span>
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Link>
            <CardActions
              className={` bg-slate-100 sticky bottom-0  flex  flex-col-reverse `}
            >
              <Button
                variant="contained"
                size="small"
                onClick={() => addToFavorite(_id)}
                sx={{
                  backgroundColor: "gold",
                  ":hover": { backgroundColor: "goldenrod" },
                  marginY: "0.25rem",
                  alignSelf: "flex-end",
                  marginX: "0.25rem",
                }}
              >
                <p className={`text-[10px] md:text-[13px] text-black`}>
                  favorites
                </p>
                <AiOutlinePlus
                  className={`ps-1 text-[14px] md:text-[19px] text-black shadow-sm  `}
                />
              </Button>
              <Button
                variant="contained"
                size="small"
                color="success"
                onClick={(e) =>
                  addToCartFun(e, _id, name, desc, coverImage, price, quantity)
                }
                sx={{
                  marginY: "0.25rem",
                  alignSelf: "flex-start",
                }}
              >
                <p className={`text-[10px] md:text-[13px]`}> Add to cart</p>
                <BsCart2
                  className={`ps-1 text-[14px] md:text-[19px] text-white shadow-sm  `}
                />
              </Button>
              <Box
                className={`ms-auto px-1 ${
                  priceAfterDiscount ? "bg-blue-200" : "bg-yellow-200"
                }  bg-yellow-200 flex items-center  justify-center rounded-sm shadow-slate-200 shadow-sm`}
              >
                <Typography variant="body2">{`${price} `}</Typography>
                {/* <span className={`text-sm text-green-600`}>$</span> */}
                <BsCurrencyDollar className={`text-sm text-green-600`} />
              </Box>
            </CardActions>
          </Card>
        </Box>
      )
    )
  ) : (
    <Box>loading...</Box>
  );
  return productsMap;
}

export default LandingCard1;
