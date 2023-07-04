// imports
import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import SiteControl from "../components/adminComponents/SiteControl";
import AddBrand from "../components/adminComponents/AddBrand";
import AddCatagory from "../components/adminComponents/AddCatagory";
// end imports

// start functionality
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 1 }}>{children}</Box>}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

// end functionality

// start main component
function AdminDashboard() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabNames = [{ name: "Site Control" }, { name: "Users Control" }];

  const tabNamesMap = tabNames.map(({ name }, idx) => (
    <Tab
      label={`${name}`}
      {...a11yProps(`${idx}`)}
      className={` hover:bg-gray-800 hover:text-white transition-all  `}
      key={idx}
      sx={{
        paddingY: 3,
        fontWeight: 600,
        fontSize: 14,
      }}
    />
  ));

  const screens = useMemo(
    () => [{ component: <SiteControl /> }, { component: <AddCatagory /> }],
    []
  );

  const screensMap = useMemo(
    () =>
      screens.map(({ component }, idx) => (
        <TabPanel value={value} index={idx} key={idx} className={`flex-grow`}>
          <Box>{component}</Box>
        </TabPanel>
      )),
    [screens, value]
  );

  return (
    <Grid
      className="overflow-hidden sm:overflow-y-auto"
      container
      sx={{
        bgcolor: "background.paper",
        height: 600,
      }}
    >
      <Grid item xs={3} md={2} lg={2}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider", minHeight: "100%" }}
        >
          {tabNamesMap}
        </Tabs>
      </Grid>
      <Grid item xs={9} md={10} lg={10}>
        {screensMap}
      </Grid>
    </Grid>
  );
}

export default AdminDashboard;
