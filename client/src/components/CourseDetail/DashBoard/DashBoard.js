import React from "react";
import styles from "./DashBoard.module.css";
import classNames from "classnames";
import Aux from "../../hoc/Auxilary";
import Content from "./Content/Content";
import Header from "./Header/Header";

const DashBoard = ({ details }) => {
  return (
    <Aux>
      <div
        className={classNames(
          "container-fluid",
          "p-0",
          "d-flex",
          "flex-column",
          styles.MainBody
        )}
      >
        <Header details={details} />
        <Content details={details} />
      </div>
    </Aux>
  );
};

export default DashBoard;
