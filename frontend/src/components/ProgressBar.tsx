import React, { useState, useEffect } from "react";

export const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#e0e0e0",
        borderRadius: "8px",
        overflow: "hidden",
        height: "20px",
        marginTop: "10px",
      }}
    >
      <div
        style={{
          width: `${progress}%`,
          backgroundColor: "#28a745", // Green progress
          height: "100%",
          transition: "width 0.5s ease-in-out",
        }}
      ></div>
    </div>
  );
};

