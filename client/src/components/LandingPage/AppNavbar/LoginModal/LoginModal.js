import React, { useState } from "react";
import axios from "axios";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { useHistory } from "react-router-dom";

const LoginModal = (props) => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const history = useHistory();

  const toggle = () => {
    setModal(!modal);
  };

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: email,
      password: password,
    };

    console.log(userData);
    // axios
    //   .post("/api/login", userData)
    //   .then((res) => {
    //     console.log(res);
    //     history.push("/profile");
    //   })
    //   .catch((err) => console.error(err));

    toggle();
  };

  return (
    <div>
      <Button
        outline
        onClick={toggle}
        name="loginModal"
        className="btn btn-outline-dark btn-lg px-5"
        style={{ margin: "9px" }}
      >
        Login
      </Button>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login to existing account</ModalHeader>
        <ModalBody toggle={toggle}>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                onChange={onChangeEmail}
              />
              <small className="form-text text-muted">
                Enter your registered IITG email with @iitg.ac.in
              </small>
            </FormGroup>
            <FormGroup>
              <Label for="item">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={onChangePassword}
              />
              <Button block color="dark" style={{ margin: "2rem 0" }}>
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LoginModal;
