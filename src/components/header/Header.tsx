import React from 'react'

import { Menu } from './menu'

import './header.css'

const Header = () => {
    return (
        <div className='header'>
            <p>Team management</p>
            <Menu />
        </div>
    )
}

export default Header;