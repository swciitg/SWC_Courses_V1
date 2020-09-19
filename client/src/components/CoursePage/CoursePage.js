import React, { Component } from 'react'
import AppNavbar from './AppNavbar/AppNavbar';
import styles from './CoursePage.module.css'
class CoursePage extends Component {
    render() {
        return (
            <div className={styles.Body}>
                <AppNavbar />
            </div>
        )
    }
}

export default CoursePage