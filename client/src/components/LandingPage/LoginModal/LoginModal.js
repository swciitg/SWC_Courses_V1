import React, { Component } from 'react'
import { Form, FormGroup, Label, Input, Button, Modal, ModalHeader, ModalBody } from 'reactstrap';

class LoginModal extends Component {
    state = {
        modal: false,
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
            email: this.state.email,
            password: this.state.password
        }

        console.log(userData);

        this.toggle();
    }
    render() {
        return (
          <div>
          <a href="/api/auth/outlook" class="button">Login</a>
            </div>
        )
    }
}

export default LoginModal;
