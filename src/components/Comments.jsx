import React, { Fragment, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/system";
import {
  Typography,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Rating,
} from "@mui/material";
import { BsFillStarFill } from "react-icons/bs";
import {
  useGetRatingsAndCommentsProductQuery,
  useRateAndCommentProductMutation,
} from "../utils/api/apiSlice";
import useModalHandler from "../helpers/useModalHandler";
import PaginationComp from "../components/PaginationComp";
const Comments = ({ productId }) => {
  const ref = useRef(false);

  const [commentFocus, setCommentFocus] = useState(false);
  const [userCommentWithRate, setUserCommentWithRate] = useState({
    comment: "",
    userRate: "",
  });
  const [selected, setSelected] = useState(1);

  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("userId");
  const haveToken = localStorage.getItem("accessToken");

  const {
    isLoading,
    isError,
    error,
    isSuccess,
    data: usersComments,
  } = useGetRatingsAndCommentsProductQuery({ productId, page: selected });
  const [rateAndCommentProduct, { data: added }] =
    useRateAndCommentProductMutation();

  console.log(usersComments);

  const { modalOpen, modalClose } = useModalHandler();
  const userId = localStorage.getItem("userId");
  const commentWithRateHandler = (e, rateValue) => {
    const id = e.target.id;
    const value = e.target.value;
    if (id === "comment") {
      setUserCommentWithRate({ ...userCommentWithRate, comment: value });
    } else {
      setUserCommentWithRate({ ...userCommentWithRate, userRate: rateValue });
    }
  };
  const commentFocusHandler = (e) => {
    if (e.type === "click") {
      ref.current.focus();
    }
    e.type === "focus" || e.type === "click"
      ? setCommentFocus(true)
      : setCommentFocus(false);
  };

  const addCommentWithRate = () => {
    if (!isLoggedIn || !haveToken) {
      modalOpen("info", `please login first`);
      modalClose();
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } else {
      if (
        !userCommentWithRate.comment ||
        !userCommentWithRate.userRate ||
        userCommentWithRate.userRate < 1
      ) {
        modalOpen("info", `please complete the comment with rate`);
        modalClose();
      } else {
        rateAndCommentProduct({
          userRateWithComment: {
            ...userCommentWithRate,
            productId,
            userId,
          },
        })
          .unwrap()
          .then((res) => {
            console.log(res);
            modalOpen("success", `${res}`);
            modalClose();
          })
          .catch((err) => {
            console.log(err);
            modalOpen("error", `error`);
            modalClose();
          });
      }
    }
  };
  const commentsSectionMap =
    usersComments &&
    usersComments.ratingsAndComments.map(
      ({ userId, comment, userRate, date, _id }, idx, fullArray) => (
        <Box className={`bg-slate-300/90 rounded-sm `} key={_id}>
          <Divider />
          <Box key={_id} className={`  my-2  rounded-md  `}>
            <Box className={`relative flex items-center justify-end`}>
              <BsFillStarFill
                className={`text-yellow-200 mt-[0.17rem] mx-1 shadow-sm text-[13px]`}
              />
              <Typography
                element={`div`}
                sx={{ direction: "rtl", fontSize: "13px" }}
                className={` text-slate-600 ps-3 pt-[0.27rem]  `}
                // variant={`body2`}
              >
                {userRate}
              </Typography>
              <Typography
                element={`div`}
                sx={{ direction: "rtl", fontSize: "13px" }}
                className={` text-slate-600 ps-3 pt-1  `}
                // variant={`body2`}
              >
                {userId.username + "  /"}
              </Typography>
              <img
                className={`h-10 w-10 z-10 absolute top-0 left-0 mx-3  rounded-full  ring ring-blue-300 object-cover`}
                src={userId.image}
                alt="img"
              />
            </Box>
            <Box
              className={`flex relative   items-center py-4  justify-between `}
            >
              {/* <img */}
              {/*   className={`h-12 w-12 absolute top-0 left-0 mx-3 mb-4 rounded-full  ring ring-blue-300 object-cover`} */}
              {/*   src={userId.image} */}
              {/*   alt="img" */}
              {/* /> */}
              <Box
                sx={{ direction: "rtl" }}
                className={`bg-blue-50/80 flex-grow rounded-md mx-2 my-2 text-start `}
              >
                <Typography
                  sx={{ direction: "rtl" }}
                  className={`px-2 py-3 text-start  `}
                  variant={`body2`}
                >
                  {comment}
                </Typography>
              </Box>
              <Typography
                element={`div`}
                sx={{ direction: "rtl", fontSize: "12px" }}
                className={`   absolute left-16   -bottom-1 text-slate-600 `}
                // variant={`body2`}
              >
                {date}
              </Typography>
            </Box>
            <Divider
              sx={{
                paddingY: `${idx === fullArray.length ? "" : "0.25rem"}`,
              }}
            />
          </Box>
        </Box>
      )
    );

  return (
    <Box>
      <Box className={` bg-slate-300 my-4 py-1 rounded-md  `}>
        <Box
          className={`flex flex-row-reverse mx-2 items-center justify-between bg-green-600/50 rounded-md p-1 w-44 ms-auto`}
        >
          <Typography sx={{ fontSize: "13px" }} component="legend">
            ﺗﻘﻴﻴﻢ اﻟﻤﻨﺘﺞ
          </Typography>
          <Rating
            precision={0.5}
            size={`small`}
            name="simple-controlled"
            value={Number(userCommentWithRate.userRate)}
            onChange={
              (e, rateValue) => commentWithRateHandler(e, rateValue)
              // setValue(newValue);
            }
          />
        </Box>
        <Box className={`flex relative  items-center py-1  justify-between `}>
          <Box
            className={`bg-slate-100 flex-grow flex items-center justify-end rounded-md mx-8  my-3  `}
          >
            <TextField
              inputRef={ref}
              variant="outlined"
              multiline
              sx={{
                direction: "rtl",
                position: "relative",
                height: "100%",
                width: "100%",
                fontSize: "13px",
              }}
              className={` text-start`}
              id="comment"
              onFocus={(e) => commentFocusHandler(e)}
              onBlur={(e) => commentFocusHandler(e)}
              onChange={(e) => commentWithRateHandler(e)}

              // label="add comment"
            />
            <span
              className={`absolute text-slate-500/95 duration-150 ${
                commentFocus || userCommentWithRate.comment ? "hidden" : ""
              } text-sm pe-4`}
              onClick={(e) => commentFocusHandler(e)}
            >
              ... أضف ﺗﻌﻠﻴﻘًﺎ
            </span>
          </Box>
        </Box>
        <Button
          sx={{ backgroundColor: "cornflowerblue", color: "black" }}
          variant={`contained`}
          className={`absolute bottom-0 left-5 `}
          onClick={(e) => addCommentWithRate(e)}
        >
          ok
        </Button>

        {/* end comments section */}
      </Box>
      {/* start users section */}
      {isLoading ? (
        <Box>wait...</Box>
      ) : isError && error ? (
        <Box>{error.status}</Box>
      ) : (
        <>
          {commentsSectionMap}
          <div
            className={` ${
              usersComments.ratingsAndComments.length > 0 &&
              usersComments.pagination.numOfAllPages > 1
                ? ""
                : "hidden"
            } flex justify-center items-center my-8`}
          >
            <PaginationComp
              pages={usersComments.pagination.numOfAllPages}
              selectedPage={(e, value) => {
                setSelected(value);
              }}
              curruntActivePage={selected}
            />
          </div>
        </>
      )}
    </Box>
  );
};

export default Comments;
