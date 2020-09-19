import React, { Component } from 'react';
import Logo from '../../Logo/Logo';
import { Navbar, Nav, NavLink, NavItem } from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
import styles from './AppNavbar.module.css';

class AppNavbar extends Component {
    render() {
        return (
            <Navbar className="navbar navbar-expand-lg navbar-light bg-transparent d-flex pt-4 px-4">
                <Logo />
                <Nav className={styles.Nav}>
                    <NavItem>
                        <RouterNavLink to="/courses"><NavLink className={styles.NavLink}>Courses</NavLink></RouterNavLink>
                    </NavItem>
                    <NavItem>
                        <RouterNavLink to="/logout"><NavLink className={styles.NavLink}>Logout</NavLink></RouterNavLink>
                    </NavItem>
                    <NavItem>
                        <RouterNavLink to="/profile"><NavLink className={styles.NavLink}>Bacon</NavLink></RouterNavLink>
                    </NavItem>
                    <NavItem>
                        <RouterNavLink to="/courses"><NavLink><img src="/images/avatar.png" alt="avatar" /></NavLink></RouterNavLink>
                    </NavItem>
                </Nav>
            </Navbar>

        )
    }
}

export default AppNavbar;