import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import {
  BsSearch,
  BsFillArrowUpCircleFill,
  BsArrowDownCircleFill,
} from "react-icons/bs";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux/es/exports";
import {
  subNavExpand,
  subNavClose,
  subNavSort,
  subNavSearch,
} from "../utils/reducers/subNavSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const BsSearchWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const BigScreensSubNav = ({ sortBy }) => {
  // const [navExpand, setNavExpand] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [clickedSearch, setClickedSearch] = useState({
    searchGrow: false,
    searchIcon: false,
  });
  const [featuresExpandIdx, setFeaturesExpandIdx] = useState("");
  const [featuresExpandStatus, setFeaturesExpandIdxStatus] = useState(false);
  const [sortFeature, setSortFeature] = useState({
    price: { value: "", checked: false, idx: "", arabicName: "" },
    ratingsAverage: { value: "", checked: false, idx: "", arabicName: "" },
    sold: { value: "", checked: false, idx: "", arabicName: "" },
  });
  const [queryState, setQueryState] = useState({
    price: "",
    ratingsAverage: "",
    sold: "",
  });

  //
  const expandView = (idx) => {
    setFeaturesExpandIdx(idx);
    setFeaturesExpandIdxStatus(!featuresExpandStatus);
    if (idx !== featuresExpandIdx) {
      setTimeout(() => {
        setFeaturesExpandIdxStatus(true);
      }, 200);
    }
  };
  // rtk
  const dispatch = useDispatch();
  const { navExpand, navClose } = useSelector((state) => state.subNavSlice);
  useEffect(() => {
    navClose
      ? setFeaturesExpandIdx("")
      : setFeaturesExpandIdx(featuresExpandIdx);
  }, [navClose, featuresExpandIdx, navExpand]);

  const expandHandler = () => {
    dispatch(subNavExpand());
    setFeaturesExpandIdx("");
  };

  //
  const filterdQuery = Object.values(queryState).filter(
    (val) => val !== "" && val !== undefined
  );
  const isOk = (e) => {
    e.preventDefault();
    if (searchTerm) {
      dispatch(subNavSearch(searchTerm));
    } else {
      dispatch(subNavSort(filterdQuery));
    }
  };

  const searchTermUse = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === "") {
      dispatch(subNavSearch(""));
    }
  };
  const featuresSort = (e, name, value, idx, arabicName) => {
    e.preventDefault();

    if (name && value.includes("price")) {
      if (
        sortFeature.price.value === value &&
        sortFeature.price.arabicName === arabicName
      ) {
        setSortFeature({
          ...sortFeature,
          price: { value: "", checked: false, idx: "", arabicName: "" },
        });
        setQueryState({ ...queryState, price: "" });
      } else {
        setSortFeature({
          ...sortFeature,
          price: { value: value, checked: true, idx, arabicName },
        });
        setQueryState({ ...queryState, price: value });
      }

      // const query = new FeaturesApi(value).sortFeature();
      // console.log(query);
    } else if (name && name.includes("ratingsAverage")) {
      if (
        sortFeature.ratingsAverage.value === value &&
        sortFeature.ratingsAverage.arabicName === arabicName
      ) {
        setSortFeature({
          ...sortFeature,
          ratingsAverage: {
            value: "",
            checked: false,
            idx: "",
            arabicName: "",
          },
        });
        setQueryState({ ...queryState, ratingsAverage: "" });
      } else {
        setSortFeature({
          ...sortFeature,
          ratingsAverage: { value: value, checked: true, idx, arabicName },
        });
        setQueryState({ ...queryState, ratingsAverage: value });
      }
    } else if (name && name.includes("sold")) {
      if (
        sortFeature.sold.value === value &&
        sortFeature.sold.arabicName === arabicName
      ) {
        setSortFeature({
          ...sortFeature,
          sold: { value: "", checked: false, idx: "", arabicName: "" },
        });
        setQueryState({ ...queryState, sold: "" });
      } else {
        setSortFeature({
          ...sortFeature,
          sold: { value: value, checked: true, idx, arabicName },
        });
        setQueryState({ ...queryState, sold: value });
      }
    }
  };
  // "h-28 " : "h-12 "
  const features = sortBy.map(({ title, children }, idx) => (
    <div
      key={idx}
      className={` transform ${
        idx === featuresExpandIdx && featuresExpandStatus ? "h-28 " : "h-12 "
      } ${
        idx === featuresExpandIdx - 1 && featuresExpandStatus
          ? "border-yellow-500"
          : "border-blue-500"
      } bg-black text-white border-b-[1px]  transition-all rounded-sm relative flex items-end flex-col overflow-hidden`}
    >
      <Typography
        variant="subtitle1"
        className={`text-white bg-slate-900 text-end py-2 pe-4 w-full `}
        onClick={() => expandView(idx)}
      >
        {title}
      </Typography>
      <div className="absolute mt-14 flex ">
        {children &&
          children.map(({ name, value, arabicName }, idx) => (
            <div key={idx} className={`mb-2 me-5  `}>
              <FormControlLabel
                className={`text-white`}
                control={
                  <Checkbox
                    checked={
                      sortFeature[name] &&
                      arabicName === sortFeature[name].arabicName &&
                      sortFeature[name].checked === true
                        ? true
                        : false
                    }
                    onClick={(e) =>
                      featuresSort(e, name, value, idx, arabicName)
                    }
                    sx={{ color: "blue", "&.Mui-checked": { color: "white" } }}
                    size="small"
                  />
                }
                label={`${arabicName}`}
              />
            </div>
          ))}
      </div>
    </div>
  ));
  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <AppBar
        className={` rounded-md`}
        position={"static"}
        sx={{ backgroundColor: "black", flexDirection: "column-reverse" }}
      >
        <Button
          variant="outlined"
          // sx={{
          //   backgroundColor: "red",
          //   width: "100%",
          //   height: "100%",
          //   marginX: "auto",
          // }}
          // onClick={() => setNavExpand(!navExpand)}
          onClick={() => expandHandler()}
        >
          <BsFillArrowUpCircleFill
            className={`${navExpand ? "" : "transition-all hidden"}`}
            fontSize={"20px"}
          />
          <BsArrowDownCircleFill
            className={`${
              navExpand ? "transition-all hidden" : ""
            } transition-all`}
            fontSize={"20px"}
          />
        </Button>
        <Box
          sx={{ transition: "all 500ms" }}
          className={` overflow-hidden bg-slate-600  ${
            navExpand && !navClose ? "h-auto" : " h-0"
          }`}
        >
          <div className={`h-full  bg-slate-700`}>{features}</div>
        </Box>
        <Toolbar
          sx={{ position: "relative", overflow: "hidden" }}
          className={`flex items-center justify-center`}
        >
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <BsSearch size={20} />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            className={` ${
              filterdQuery.length === 0 && !searchTerm ? "" : "hidden"
            } flex-grow text-center py-auto`}
          >
            التحكم في عرض المنتجات
          </Typography>
          <span
            className={`${
              filterdQuery.length > 0 || searchTerm ? "" : "hidden"
            } bg-blue-800 rounded-full   active:bg-blue-500 mx-12 px-4 py-auto  cursor-pointer `}
            onClick={(e) => isOk(e)}
          >
            ok
          </span>
          <div
            className={`${
              clickedSearch.searchGrow ? `right-[-50px]` : `right-[-150px]`
            } absolute flex items-center justify-center transition-all overflow-hidden `}
            // onClick={() => setClickedSearch(!clickedSearch)}
            onMouseEnter={() =>
              setClickedSearch({
                ...clickedSearch,
                searchGrow: true,
              })
            }
            onMouseLeave={() =>
              setClickedSearch({
                ...clickedSearch,
                searchGrow: false,
                searchIcon: false,
              })
            }
            onInput={(e) =>
              e.target.value !== ""
                ? setClickedSearch({
                    ...clickedSearch,
                    searchGrow: true,
                    searchIcon: true,
                  })
                : setClickedSearch({
                    ...clickedSearch,
                    searchGrow: false,
                    searchIcon: false,
                  })
            }
          >
            <Search
              className={` flex items-center justify-start overflow-hidden  h-10`}
            >
              <BsSearchWrapper>
                <BsSearch
                  className={` ${clickedSearch.searchIcon ? "hidden" : ""}  ${
                    clickedSearch.searchGrow ? "text-black" : "text-yellow-400"
                  } z-20  ${
                    clickedSearch.searchGrow && searchTerm !== ""
                      ? "hidden"
                      : "block"
                  }`}
                />
              </BsSearchWrapper>
              <TextField
                id="outlined-basic"
                className={`rounded-md  ${
                  clickedSearch.searchGrow ? "bg-slate-200" : "bg-slate-600 "
                }   `}
                placeholder={`${
                  clickedSearch.searchIcon || clickedSearch.searchGrow
                    ? ""
                    : "         search..."
                }`}
                variant="outlined"
                onChange={(e) => searchTermUse(e)}
                onFocus={() =>
                  setClickedSearch({ ...clickedSearch, searchIcon: true })
                }
              />
            </Search>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default BigScreensSubNav;
