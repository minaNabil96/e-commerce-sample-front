import React from "react";
import LoadingsAndErrors from "../LoadingsAndErrors";
const UsersGuard = ({ children }) => {
  const loggedIn = localStorage.getItem("isLoggedIn");
  const token = localStorage.getItem("accessToken").split(" ")[0];
  const userId = localStorage.getItem("userId");

  return (
    <>
      {loggedIn === "true" && token === "Bearer" && userId ? (
        children
      ) : (
        <LoadingsAndErrors>
          <h3 className="text-xl text-red-600 ">{`can't access`}</h3>
        </LoadingsAndErrors>
      )}
    </>
  );
};

export default UsersGuard;
