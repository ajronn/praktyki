import React, { useState } from 'react'

import { Link } from "react-router-dom";

import { Button } from '../../../ui'

import styles from './menu.css'

const Menu = () => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);

    return (
        <div>
            <div className={styles.menuTrigger} onClick={toggleMenu}>&bull;&bull;&bull;</div>
            <div className={open ? `${styles.open} ${styles.menu}` : styles.menu}>
                <Link to='/'><Button>Home</Button></Link>
                <Link to='/form'><Button>Form</Button></Link>
                <Link to='/teams'><Button>Teams</Button></Link>
            </div>
        </div>
    )
}

export default Menu;