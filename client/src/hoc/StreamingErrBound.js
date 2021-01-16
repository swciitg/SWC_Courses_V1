import React, { Component } from "react";
import oops from "../images/404.png";

class StreamingErrBound extends Component {
  state = {
    hasError: false,
    errorMsg: "",
  };

  componentDidCatch = (error, info) => {
    this.setState({ hasError: true, errorMsg: error });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            backdropFilter: "blur(10px)",
            padding: "20px 0",
            margin: "0% 10%",
            borderRadius: "15px",
          }}
        >
          <h3 style={{ margin: "0", color: "#595429" }}>
            {this.state.errorMsg}
          </h3>
          <img
            src={oops}
            alt="error"
            width="200px"
            height="120px"
            style={{
              padding: "10px",
            }}
          />
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}

export default StreamingErrBound;
