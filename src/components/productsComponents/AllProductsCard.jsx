import React from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import { BsCart2, BsCurrencyDollar } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { addToCart } from "../../utils/reducers/cartSlice";
const AllProductsCard = ({
  products,
  cardWidth,
  cardHeight,
  imageHeight,
  imageWidth,
}) => {
  const dispatch = useDispatch();
  const addToCartFun = (e, _id, name, desc, coverImage, price, quantity) => {
    dispatch(addToCart({ _id, name, desc, coverImage, price, quantity }));
  };
  const productsMap = products ? (
    products.map(({ _id, name, desc, coverImage, price, quantity }) => (
      <Card
        sx={{ height: cardHeight, maxWidth: imageWidth, position: "relative" }}
        className={`my-5 mx-auto flex flex-col  `}
        key={_id}
      >
        <Link to={`/products/${_id}`} state={_id}>
          <CardActionArea sx={{ height: cardHeight }}>
            <CardMedia
              className={` `}
              sx={{
                height: imageHeight,
                width: imageWidth,
                objectFit: "contain",
              }}
              component="img"
              image={coverImage}
              alt="image"
            />
            <CardContent
              className={` bg-gray-50 flex-1  h-52 overflow-hidden   `}
            >
              <Typography
                gutterBottom
                component="h6"
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  direction: "rtl",
                }}
                className={`text-start`}
              >
                {name.length <= 15 ? name : name.slice(0, 15)}
                <span className={`ms-1  `}>...</span>
              </Typography>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{ direction: "rtl" }}
                className={`text-start`}
              >
                {desc.length <= 50 ? desc : desc.slice(0, 50)}
                <span className={`ms-1  `}>...</span>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Link>
        <CardActions
          className={` sticky bottom-0  bg-slate-100  flex flex-col `}
        >
          <Box
            className={`ms-auto bg-yellow-200 flex items-center gap-1 justify-center rounded-sm shadow-slate-200 shadow-sm`}
          >
            <Typography variant="body2">{`${price} `}</Typography>
            {/* <span className={`text-sm text-green-600`}>$</span> */}
            <BsCurrencyDollar className={`text-sm text-green-600`} />
          </Box>
          <button
            type="button"
            className={`flex items-center gap-1 bg-mainColor hover:shadow-sm hover:shadow-yellow-600 duration-150 rounded-md w-26 h-7 justify-center shadow-md me-auto`}
            onClick={(e) =>
              addToCartFun(e, _id, name, desc, coverImage, price, quantity)
            }
          >
            <p
              className={`text-sm px-1 text-slate-50 hover:text-yellow-300 duration-150`}
            >
              Add to cart
            </p>
            <BsCart2 className={`pe-1 text-white shadow-sm  `} />
          </button>
        </CardActions>
      </Card>
    ))
  ) : (
    <Box>loading...</Box>
  );
  return productsMap;
};

export default AllProductsCard;
