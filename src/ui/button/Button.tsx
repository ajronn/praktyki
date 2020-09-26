import React from 'react'

import './button.css'

interface Props {
    variant?: 'default' | 'icon';
    theme?: 'light' | 'dark';
    children?: string;
    onClick?: ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
}

const Button = ({ variant = 'default', theme = 'light', children, onClick }: Props) => {
    return (
        <button onClick={onClick} className={theme}>{children}</button>
    )
}

export default Button;