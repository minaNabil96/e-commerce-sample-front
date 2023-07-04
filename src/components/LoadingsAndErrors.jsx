import React from "react";

const LoadingsAndErrors = ({ children }) => {
  return (
    <div className={`h-screen flex items-center justify-center`}>
      {children}
    </div>
  );
};

export default LoadingsAndErrors;
