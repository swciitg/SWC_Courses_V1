import React, { useEffect } from "react";
import DashBoard from "./DashBoard/DashBoard";

const CourseDetail = (props) => {
  const details = { ...props.location.state };

  return (
    <div
      className="p-3 p-sm-4"
      style={{
        backgroundImage:
          "linear-gradient(rgb(255, 224, 49), rgb(255, 229, 83))",
        height: "100%",
      }}
    >
      <DashBoard details={details} />
    </div>
  );
};

export default CourseDetail;
