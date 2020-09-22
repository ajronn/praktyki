import React, { useState } from 'react'

import { Link } from "react-router-dom";

import { Button } from '../../../ui'

import './menu.css'

const Menu = () => {
    const [open, setOpen] = useState(false);

    const toggleMenu = () => setOpen(!open);

    return (
        <div>
            <div className='menuTrigger' onClick={toggleMenu}>&#9660;</div>
            <div className={open ? 'menu open' : 'menu'}>
                <Link to='/'><Button>Home</Button></Link>
                <Link to='/form'><Button>Form</Button></Link>
            </div>
        </div>
    )
}

export default Menu;