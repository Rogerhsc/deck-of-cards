import React from 'react';

import './style.css';

interface IProps extends React.HTMLAttributes<HTMLInputElement> {
    error: boolean,
    errorMsg: string
}

const InputText: React.FC<IProps> = ({ error, errorMsg, ...props }) => (
    <div className={`input__text ${error && 'input__text--error'}`} data-error={error}>
        <input
            {...props}
            type="text"
        />

        <span>
            <span>{errorMsg}</span>
        </span>
    </div>

);

export default InputText;