import React from "react";
import { Button } from "@mui/material";

export const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "20px",
        border: "1px solid red",
        borderRadius: "8px",
        background: "#ffe6e6",
      }}
    >
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <Button variant="contained" color="primary" onClick={resetErrorBoundary}>
        Try Again
      </Button>
    </div>
  );
};
