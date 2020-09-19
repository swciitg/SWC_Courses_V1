import React from 'react'
import logo from './logo.png'
import styles from './Logo.module.css'
const Logo = () => {
    return (
        <a href="/" class="ml-auto ml-md-0 mr-auto">
            <img src={logo} alt="logo" className={styles.Logo} />
        </a>
    )
}

export default Logo
