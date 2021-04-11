import React from "react";
import img404 from "../../images/new404.png";
import { Link } from "react-router-dom";

const My404Component = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
      }}
      className="flex-column flex-sm-row"
    >
      <img src={img404} alt="404 page not found" style={{ width: "50vw" }} />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <h4 style={{ color: "#999" }} className="text-center text-sm-left">
          Here are a few suggested pages...
        </h4>
        <Link
          to={{ pathname: "/courses" }}
          className="text-center text-sm-left"
        >
          <span
            style={{
              color: "#777",
              fontSize: "2rem",
              fontWeight: "500",
              margin: "5px 0",
            }}
            className="font-weight-normal font-weight-sm-bold"
          >
            BACK TO HOME
          </span>
        </Link>
        <Link
          to={{ pathname: "/courses/courses" }}
          className="text-center text-sm-left"
        >
          <span
            style={{
              color: "#777",
              fontSize: "2rem",
              fontWeight: "500",
              margin: "5px 0",
            }}
            className="font-weight-normal"
          >
            EXPLORE COURSES
          </span>
        </Link>
      </div>
    </div>
  );
};

export default My404Component;
