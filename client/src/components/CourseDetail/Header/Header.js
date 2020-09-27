import React from 'react'
import { Navbar, NavLink, Badge } from 'reactstrap';
import { Link } from 'react-router-dom';
import leftArrow from '../../../images/left-arrow.png';
import avatar from '../../../images/avatar.png';
import tick from '../../../images/tick-mark.png';
import styles from './Header.module.css'
import classNames from 'classnames'
const Header = () => {
    return (
        // const button = <Button id="enrol" className={classNames("btn", "btn-lg", "btn-dark", "ml-auto", "pl-4", "pr-3", "py-2", styles.Enrol, styles.Enrolled)}>Enrolled<img src={tick} alt="" /></Button>

        // <Link href="/courses/:id/enrol" className="ml-auto">
        //     <Button className={classNames("btn", "btn-lg", "btn-dark", "ml-auto", "pl-4", "pr-3", "py-2", styles.Enrol)}>Enrol</Button>
        // </Link>

        <header className={classNames("px-3", "pl-lg-3", "pr-lg-5", styles.Header)}>

            <nav className={classNames("navbar", "navbar-light", "d-flex", styles.Navbar)}>


                <span className="mr-auto">
                    <Link to="/courses"><button className={styles.BackButton}><img src={leftArrow} alt="back" /></button></Link>
                    <span className={styles.Dashboard}>Dashboard</span>
                </span>




                <span className="d-none d-sm-inline">Welcome Bacon</span>



                <Link to="/profile">
                    <NavLink className={styles.Avatar}><img src={avatar} alt="avatar" /></NavLink>
                </Link>



            </nav>

            <div class="container-fluid pl-sm-5">
                <h2 className={styles.Title}>course.title</h2>

                <Navbar className="justify-content-start px-0 d-flex">
                    <span className="d-none d-md-inline">
                        <Badge className={classNames("badge-pill", styles.Badge, "badge-light")}>CSS</Badge>
                        <Badge className={classNames("badge-pill", styles.Badge, "badge-light")}>Udemy</Badge>
                        <Badge className={classNames("badge-pill", styles.Badge, "badge-light")}>Bootstrap</Badge>
                        <Badge className={classNames("badge-pill", styles.Badge, "badge-light")}>Javascript</Badge>
                    </span>
                    <div></div>
                </Navbar>
            </div>

        </header>
    )
}

export default Header
