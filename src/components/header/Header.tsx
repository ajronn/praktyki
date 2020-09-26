import React from 'react'

import { Menu } from './menu'

import styles from './header.css'

const Header = () => {
    return (
        <div className={styles.header}>
            <p>Team management</p>
            <Menu />
        </div>
    )
}

export default Header;