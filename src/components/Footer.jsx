import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { FaSquareFacebook, FaLinkedin } from "react-icons/fa6";
import { FaTwitterSquare } from "react-icons/fa";
const Footer = () => {
  // const footerArray = [
  //   { item: `footer1` },
  //   { item: `footer2` },
  //   { item: `footer3` },
  //   { item: `footer4` },
  // ];
  // const footerArrayMap = footerArray.map(({ date, item }, idx) => (
  //   <Typography color="white" variant="subtitle1" key={idx}>
  //     {`${item}`}
  //   </Typography>
  // ));

  const links = [
    { name: "facebook", icon: <FaSquareFacebook />, link: "#" },
    { name: "linkedin", icon: <FaLinkedin />, link: "#" },
    { name: "twitter", icon: <FaTwitterSquare />, link: "#" },
  ];

  const linksMap = links.map(({ name, icon, link }) => (
    <li key={name}>
      <Link
        className={` text-[30px] ${
          name === "facebook"
            ? "text-blue-600"
            : name === "linkedin"
            ? "text-blue-500"
            : "text-blue-400"
        } `}
        to={link}
      >
        {icon}
      </Link>
    </li>
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
        <Box className={`grid grid-cols-2 max-lg:grid-cols-1 `}>
          <Box className={`flex flex-col items-center justify-center `}>
            <Typography color="white" variant="h5" marginTop={2}>
              Laconic E-commerce Footer
            </Typography>
            <ul className={`flex items-center content-center gap-4  my-4`}>
              {linksMap}
            </ul>
            <Box
              className={`flex items-center flex-row-reverse content-center gap-4  my-1`}
            >
              <Typography color="white" variant="subtitle1">
                {`${new Date().getFullYear()}`}
              </Typography>
              <h2 className={`text-white text-center `}>
                Created By:
                <Link
                  to={`https://mina-nabil-portfolio.vercel.app/`}
                  relative={`path`}
                >
                  <span className={`text-yellow-500 text-center px-2`}>
                    Mina Nabil
                  </span>
                </Link>
              </h2>
            </Box>
          </Box>
          <Box className={`flex flex-col items-center justify-center my-4 `}>
            <Typography
              className={`max-lg:text-center text-end py-4 px-2 max-lg:border-l border-r border-slate-500 `}
              color="white"
              variant="body1"
            >
              نموذج لموقع تجارة إلكترونية متكامل يمكن اضافة منتجات والتحكم في كل
              شيء مع لوحة خاصة للأدمنز ولوحة خاصة بالعضو ونظام تسجيل دخول محكم
              مرتبط بقاعدة البيانات يمكن تعديل وطلب اضافة وحذف أي شيء
            </Typography>
            <Box
              className={`flex items-center justify-center flex-row-reverse p-1 `}
            >
              <Typography
                className={`max-lg:text-center text-end my-2 `}
                color="white"
                variant="body1"
              >
                للتواصل والشراء
              </Typography>
              <Link to={`/contact`}>
                <Button
                  sx={{
                    backgroundColor: "limegreen",
                    ":hover": { backgroundColor: "green" },
                    marginX: "0.50rem",
                    paddingX: "0.50rem",
                  }}
                  className={`duration-150 `}
                  variant={`contained`}
                >
                  إضغط هنا{" "}
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
