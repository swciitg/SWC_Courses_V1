import React, { Component } from 'react';
import Logo from '../../Logo/Logo';
import { Navbar, Nav, NavLink, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import styles from './AppNavbar.module.css';
import avatar from '../../../images/avatar.png'
class AppNavbar extends Component {


    render() {
        return (
            <Navbar className="navbar navbar-expand-lg navbar-light bg-transparent d-flex pt-4 px-4">
                <Logo />
                <Nav className={styles.Nav}>
                    <NavItem>
                        <Link to="/courses"><NavLink className={styles.NavLink}>Courses</NavLink></Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/logout"><NavLink className={styles.NavLink}>Logout</NavLink></Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/profile"><NavLink className={styles.NavLink}>Bacon</NavLink></Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/profile"><NavLink><img src={avatar} alt="avatar" /></NavLink></Link>
                    </NavItem>
                </Nav>
            </Navbar>

        )
    }
}

export default AppNavbar;