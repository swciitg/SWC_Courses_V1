import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

class SignUpModal extends Component {
    state = {
        modal: false,
        name: '',
        email: '',
        password: ''
    }

    toggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }

        console.log(userData);

        this.toggle();
    }
    render() {
        return (
            <div>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Create Account
                    </ModalHeader>
                    <ModalBody toggle={this.toggle}>
                        <Form onSubmit={this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Name</Label>
                                <Input type="text" name="name" id="name" onChange={this.onChange} />
                                <small className="form-text text-muted">Enter your full name</small>
                            </FormGroup>
                            <FormGroup>
                                <Label for="item">Email</Label>
                                <Input type="email" name="email" id="email" onChange={this.onChange} />
                                <small className="form-text text-muted">Enter your registered IITG email with @iitg.ac.in</small>
                            </FormGroup>
                            <FormGroup>
                                <Label for="item">Password</Label>
                                <Input type="password" name="password" id="password" onChange={this.onChange} />
                                <small className="form-text text-muted">Password must be atleast 8 characters in length</small>
                            </FormGroup>
                            <FormGroup>
                                <Button
                                    block
                                    color="dark"
                                    style={{ margin: '2rem 0' }}
                                >Sign Up</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                </Modal>
                <Button outline onClick={this.toggle} className="btn btn-outline-dark btn-lg px-5 home-nav-button d-none d-md-inline" style={{ 'margin': '9px' }}>Sign Up</Button>
            </div>
        )
    }
}

export default SignUpModal;
