import React, { Component } from 'react'
import AppNavbar from './AppNavbar/AppNavbar'
import HomeScreen from './HomeScreen/HomeScreen'
import styles from './LandingPage.module.css';

class LandingPage extends Component {
    render() {
        return (
            <div className={styles.App}>
                <AppNavbar />
                <HomeScreen />
            </div>
        )
    }
}

export default LandingPage;
