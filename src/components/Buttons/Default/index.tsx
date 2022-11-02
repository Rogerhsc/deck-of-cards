import React from 'react';

import './style.css';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const Button: React.FC<IProps> = (props) => (
    <button {...props} className="button__default">
        {props.children}
    </button>
);

export default Button;