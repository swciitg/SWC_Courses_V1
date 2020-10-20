import React, { Component } from "react";
import Aux from "../../../../hoc/Auxilary";
import LoginModal from "../LoginModal/LoginModal";
import SignUpModal from "../SignUpModal/SignUpModal";
class SignedIn extends Component {
  render() {
    return (
      <Aux>
        <LoginModal />
        <SignUpModal />
      </Aux>
    );
  }
}

export default SignedIn;
