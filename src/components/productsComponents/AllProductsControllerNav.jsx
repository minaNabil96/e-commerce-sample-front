import React, { useState, useLayoutEffect } from "react";
import BigScreensSubNav from "../BigScreensSubNav";
import SmallScreensSubNav from "../SmallScreensSubNav";
import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/material";
const AllProductsControllerNav = ({ children }) => {
  const [detectScreen, setDetectScreen] = useState(false);

  const smDetect = useMediaQuery(`(min-width: 640px)`, { NoSsr: true });
  useLayoutEffect(() => {
    smDetect ? setDetectScreen(false) : setDetectScreen(true);
  }, [smDetect]);

  const sortBy = [
    {
      title: "السعر",
      children: [
        { name: "price", arabicName: "الأعلى سعرًا", value: "-price" },
        { name: "price", arabicName: "الأقل سعرًا", value: "price" },
      ],
    },
    {
      title: "التقييم",
      children: [
        {
          name: "ratingsAverage",
          arabicName: "الأعلى تقييمًا",
          value: "-ratingsAverage",
        },
        {
          name: "ratingsAverage",
          arabicName: "الأقل تقييمًا",
          value: "ratingsAverage",
        },
      ],
    },
    // {
    //   title: "العلامة التجارية",
    //   children: brandsNames, value:"brand"
    // },
    {
      title: "البيع",
      children: [{ name: "sold", arabicName: "الأكثر طلبًا", value: "sold" }],
    },
  ];

  return (
    <Box className="w-full">
      {!detectScreen && <BigScreensSubNav sortBy={sortBy} />}
      {detectScreen && <SmallScreensSubNav sortBy={sortBy} />}
    </Box>
  );
};

export default AllProductsControllerNav;
