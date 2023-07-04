import React from "react";
import LoadingsAndErrors from "../LoadingsAndErrors";
const AdminsGuard = ({ children }) => {
  const loggedIn = localStorage.getItem("isLoggedIn");
  const admin = localStorage.getItem("admin");

  return (
    <>
      {loggedIn === "true" && admin === "true" ? (
        children
      ) : (
        <LoadingsAndErrors>
          <h3 className="text-xl text-red-600 ">{`can't access`}</h3>
        </LoadingsAndErrors>
      )}
    </>
  );
};

export default AdminsGuard;
