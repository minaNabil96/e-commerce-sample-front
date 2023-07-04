import React from "react";
import { Container } from "@mui/system";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography, Badge } from "@mui/material";
import { BsTrash, BsPlusCircleFill, BsMinus } from "react-icons/bs";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import {
  removeFromCart,
  addToCart,
  increament,
  decrement,
} from "../../utils/reducers/cartSlice";
import LoadingsAndErrors from "../LoadingsAndErrors";

const headerTitles = [
  "حذف",
  "الكمية",
  "سعر المنتج",
  "اسم المنتج",
  "صورة المنتج",
];
const Cart = () => {
  const header = headerTitles.map((title, idx) => (
    <TableCell
      key={idx}
      className={` border-mainColor bg-black border-y-2 border-x-2 border-b-2 `}
      align="right"
    >
      <Typography component={`p`} variant={`body2`} className={`text-white`}>
        {title}
      </Typography>
    </TableCell>
  ));
  const tableWidth = "950px";
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cartSlice);
  const deleteFromCart = (e, _id) => {
    dispatch(removeFromCart(_id));
  };

  const totalPrice = cart.reduce(
    (acc, { price, required }) => (acc += price * required),
    0
  );
  const cartContent =
    cart &&
    cart.length >= 1 &&
    cart.map(({ _id, name, price, coverImage, quantity, required }) => (
      <TableRow
        key={_id}
        //   sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
      >
        <TableCell
          className={` border-yellow-700 bg-mainColor flex items-center justify-center border-y-2 border-s-2 border-b-2 `}
          align="center"
          component="th"
          scope="row"
        >
          <IconButton
            sx={{ paddingX: "20px" }}
            onClick={(e) => deleteFromCart(e, _id)}
          >
            <BsTrash
              size={22}
              className="text-red-600 text-center hover:text-white transition-all"
            />
          </IconButton>
        </TableCell>
        <TableCell
          className={` border-yellow-700  bg-mainColor border-y-2 border-s-2 border-b-2 text-white w-32 `}
          align="center"
          component="th"
          scope="row"
        >
          <Box
            // sx={{ fontSize: "22px" }}
            // component={`div`}
            // variant={`body2`}
            className={` flex items-center justify-center bg-slate-600  rounded-md `}
          >
            <IconButton onClick={() => dispatch(decrement(_id))}>
              <AiFillMinusCircle
                size={20}
                className={`text-white me-2 hover:text-red-400 duration-150 `}
              />
            </IconButton>
            <Typography
              className={`text-white w-[17px]    `}
              sx={{ fontSize: "21px", marginX: "0.25rem" }}
              component={`div`}
            >
              {required}
            </Typography>
            <IconButton onClick={() => dispatch(increament({ _id: _id }))}>
              <AiFillPlusCircle
                size={20}
                className={`text-white ms-2 hover:text-green-400 duration-150`}
              />
            </IconButton>
          </Box>
        </TableCell>
        <TableCell
          className={` border-yellow-700  bg-mainColor border-y-2 border-s-2 border-b-2 text-white w-32 `}
          align="center"
          component="th"
          scope="row"
        >
          <Typography
            sx={{ fontSize: "18px" }}
            component={`div`}
            variant={`body2`}
            className={`text-white flex flex-row items-center justify-center `}
          >
            <span className="ms-1 text-white">{price}</span>
            <span className="ms-1 text-green-400">$</span>
          </Typography>
        </TableCell>
        <TableCell
          className={` border-yellow-700 bg-mainColor border-y-2 border-s-2 border-b-2 text-white `}
          align="right"
          component="th"
          scope="row"
        >
          <Typography
            component={`p`}
            variant={`body2`}
            className={`text-white text-right`}
            sx={{ direction: "rtl", fontSize: "16px" }}
          >
            {name && name.length >= 150 ? name.slice(0, 150) : name}
            <span className={`${name && name.length >= 150 ? "" : "hidden"}`}>
              ...
            </span>
          </Typography>
        </TableCell>
        <TableCell
          className={` border-yellow-700 bg-mainColor border-y-2 border-s-2 border-b-2 w-32  `}
          align="center"
          component="th"
          scope="row"
        >
          <Box className={`bg-slate-50 w-fit h-fit rounded-md`}>
            <img
              src={coverImage}
              className={`w-24 h-20 rounded-md object-contain  ms-auto`}
              alt={`productImage`}
            />
          </Box>
        </TableCell>
      </TableRow>
    ));
  return (
    <Container
      className={` flex justify-center items-center overflow-x-auto overflow-y-auto min-h-screen`}
    >
      {cart.length >= 1 ? (
        <TableContainer
          className={` ${cart.length >= 1 ? "" : "hidden"} my-10 mx-auto`}
          sx={{ width: tableWidth }}
          component={Paper}
        >
          <Table
            sx={{ width: tableWidth }}
            className={`bg-black`}
            aria-label="simple table"
          >
            <TableHead
              className={` border-mainColor bg-black border-y-2 border-x-2 border-b-2 `}
            >
              <TableRow>{header}</TableRow>
            </TableHead>
            <TableBody
              className={` border-mainColor border-y-2 border-x-2 border-b-2 `}
            >
              {cartContent}
            </TableBody>
            <TableFooter
              className={` w-full  border-mainColor  border-y-2 border-x-2 border-b-2 `}
              align="right"
            >
              <TableRow className={`w-full  `}>
                <TableCell
                  className={` border-mainColor  bg-black border-y-2 border-x-2 border-b-2 `}
                  align="center"
                >
                  <Typography
                    component={`div`}
                    variant={`body2`}
                    className={`text-white flex flex-row items-center justify-center w-24 `}
                  >
                    <span>{totalPrice.toFixed(2)}</span>
                    <span className="ms-1 text-green-400">$</span>
                  </Typography>
                </TableCell>
                <TableCell
                  className={` border-mainColor bg-black border-y-2 border-x-2 border-b-2 `}
                  align="center"
                >
                  <Typography
                    component={`div`}
                    variant={`body2`}
                    className={`text-white flex flex-row items-center justify-center  `}
                  >
                    إجمالي السعر
                  </Typography>
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      ) : (
        <LoadingsAndErrors>
          <Box
            className={`flex flex-col space-y-8 items-center justify-center`}
          >
            <Typography variant="h5" component={`h5`}>
              السلة فارغة
            </Typography>
            <Typography variant="h5" component={`h5`}>
              !لم يتم إضافة اي منتج
            </Typography>
          </Box>
        </LoadingsAndErrors>
      )}
    </Container>
  );
};

export default Cart;
