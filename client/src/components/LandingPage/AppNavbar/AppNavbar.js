import React, { Component } from 'react'
import { Navbar, NavbarToggler } from 'reactstrap';
import Logo from '../../Logo/Logo';
import SignedIn from '../SignedIn/SignedIn'

class AppNavbar extends Component {
    state = {
        isOpen: false
    };

    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div>
                <Navbar className="navbar navbar-expand-md navbar-light d-flex p-4">
                    <NavbarToggler onClick={this.toggle} />
                    <Logo />
                    <SignedIn />
                </Navbar>
            </div>
        )
    }
}

export default AppNavbar;
