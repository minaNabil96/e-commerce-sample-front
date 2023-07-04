import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";

function Footer() {
  const footerArray = [
    { item: `footer1` },
    { item: `footer2` },
    { item: `footer3` },
    { item: `footer4` },
  ];
  const footerArrayMap = footerArray.map(({ date, item }, idx) => (
    <Typography color="white" variant="subtitle1" key={idx}>
      {`${item}`}
    </Typography>
  ));
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        paddingY: "2rem",
        zIndex: "100",
      }}
      className={`bg-gradient-to-tr from-mainColor to-green-700 `}
    >
      <Container sx={{ paddingY: "1rem" }} maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="white" variant="h5" marginTop={2}>
              Laconic E-commerce Footer
            </Typography>
          </Grid>
          <Box className={`flex items-center content-center gap-4  my-4`}>
            {footerArrayMap}
          </Box>
          <Box
            className={`flex items-center flex-row-reverse content-center gap-4  my-1`}
          >
            <Typography color="white" variant="subtitle1">
              {`${new Date().getFullYear()}`}
            </Typography>
            <Typography color="white" variant="subtitle1">
              {`By: Mina Nabil`}
            </Typography>
          </Box>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
