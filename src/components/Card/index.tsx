import React from 'react';

import './style.css';

interface IProps {
    name: string,
    image: string,
    description: string,
}

const Card: React.FC<IProps> = ({ name, image, description }) => {
    const cardPoints = React.useMemo(() => Math.floor(Math.random() * 10) + 1, []);

    return (
        <div className="card__container">
            <span>{cardPoints}</span>
            <img src={image} />
            <p>{name}</p>
            <p>{description}</p>
        </div>
    );
}

export default Card;