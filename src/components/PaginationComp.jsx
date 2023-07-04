import React from "react";
import { Pagination, PaginationItem, Box } from "@mui/material";
const PaginationComp = ({ pages, selectedPage, curruntActivePage }) => {
  const currentPage = (e, value) => {
    selectedPage(e, value);
  };
  return (
    <Pagination
      onChange={(e, value) => currentPage(e, value)}
      count={pages}
      page={curruntActivePage}
      shape="rounded"
    />
  );
};

export default PaginationComp;
