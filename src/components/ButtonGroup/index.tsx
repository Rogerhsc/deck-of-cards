import React, { useState, useEffect, useRef } from 'react';
import Button from '../Buttons/Default';

import FloatingButton from '../Buttons/FloatingButton';

import './style.css';

interface IState {
    floatingButton: boolean,
}

const initState = {
    floatingButton: false
}

interface IProps {
    counter: number,
    handleClickNewCard: () => void;
    handleClickShuffleCards: () => void;
}

const ButtonGroup: React.FC<IProps> = ({ counter, handleClickNewCard, handleClickShuffleCards }) => {
    const [state, setState] = useState<IState>(initState);

    const sectionRef = useRef<HTMLDivElement>(null)

    const handleClickFloatinButton = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        handleClickNewCard();
    }

    useEffect(() => {
        if (!sectionRef.current) return;

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.4
        }

        var observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setState({ floatingButton: false });
                } else {
                    setState({ floatingButton: true });
                }
            });
        }, options);

        observer.observe(sectionRef.current);
    }, [sectionRef]);

    return (
        <section className="button__group" ref={sectionRef}>
            <Button onClick={handleClickNewCard} disabled={counter === 0}>Nova Carta: {counter}</Button>
            <Button onClick={handleClickShuffleCards}>Embaralhar</Button>

            <FloatingButton
                disabled={counter === 0}
                visible={state.floatingButton}
                onClick={handleClickFloatinButton}
            >
                <img src="/assets/icon-plus.png" width={25} height={25} />
            </FloatingButton>
        </section>
    );
}

export default ButtonGroup;