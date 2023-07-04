// imports
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AddBrand from "./AddBrand";
import AddCatagory from "./AddCatagory";
import AddProduct from "./AddProduct";
import AddSubCatagory from "./AddSubCategory";
import AddOffer from "./AddOffer.jsx";
// end imports

// start functionality
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `horizontal-tab-${index}`,
    "aria-controls": `horizontal-tabpanel-${index}`,
  };
}

// end functionality
// start main component
function SiteControl() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabNames = [
    { name: "Add Brand" },
    { name: "Add Category" },
    { name: "Add Product" },
    { name: "Add SubCategory" },
    { name: "Add Offer" },
  ];

  const tabNamesMap = tabNames.map(({ name }, idx) => (
    <Tab
      label={`${name}`}
      {...a11yProps(`${idx}`)}
      className={` hover:bg-gray-800 hover:text-white transition-all `}
      key={idx}
      sx={{
        paddingY: 3,
        paddingX: 3,
        fontWeight: 600,
        fontSize: 14,
      }}
    />
  ));

  const screens = useMemo(
    () => [
      { component: <AddBrand /> },
      { component: <AddCatagory /> },
      { component: <AddProduct /> },
      { component: <AddSubCatagory /> },
      { component: <AddOffer /> },
    ],
    []
  );

  const screensMap = screens.map(({ component }, idx) => (
    <TabPanel value={value} index={idx} key={idx}>
      <Box className={`overflow-scroll sm:overflow-auto`}>{component}</Box>
    </TabPanel>
  ));

  return (
    <Box
      className={`w-full overflow-hidden`}
      sx={{
        bgcolor: "background.paper",
      }}
    >
      <Tabs
        className=" w-full"
        orientation="horizontal"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="horizontal tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
      >
        {tabNamesMap}
      </Tabs>
      {screensMap}
    </Box>
  );
}

export default SiteControl;
