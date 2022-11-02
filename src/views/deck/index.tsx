import React, { useEffect, useState, useMemo } from 'react';

import Utils from '../../utilities/utils';

import Card from '../../components/Card';
import ButtonGroup from '../../components/ButtonGroup';

import CatsService, { ICats } from '../../services/CatsService';

import { USU_NAME } from '../../constants/ApplicationConstants';

import './style.css';

interface IState {
    error: boolean,
    cards: ICats[],
    loading: boolean,
    position: number,
}

const initState = {
    cards: [],
    position: 5,
    error: false,
    loading: false
}

const Deck = () => {
    const [state, setState] = useState<IState>(initState);

    const $CatsService = new CatsService();

    const usuName: string = useMemo(() => {
        return localStorage.getItem(USU_NAME) || '';
    }, []);

    const handleClickBack = () => window.location.href = "/";
    const shuffleArray = () => setState({ ...state, cards: Utils.shuffleArray(state.cards) });

    const cardsRange = (): ICats[] => {
        if (!state.cards.length) return [];

        return state.cards.slice(0, state.position);
    };

    const showNewCard = () => setState((crrState) => {
        const newState = {
            ...crrState,
            position: state.position + 1
        }
        if (state.position === state.cards.length - 1) {
            return {
                ...newState,
                loading: true,
            };
        }

        return newState;
    });

    const fetchRandomCats = async (limit?: number) => {
        if (state.loading) return;

        try {
            const res = await $CatsService.randomCats(limit);
            setState({
                ...state,
                error: false,
                loading: false,
                cards: [...state.cards, ...res],
            });

        } catch {
            setState({
                ...state,
                error: true,
                loading: false
            });
        }
    }

    useEffect(() => {
        if (!state.cards.length) return;
        fetchRandomCats(1);
    }, [state.position]);

    useEffect(() => {
        fetchRandomCats(10);
    }, []);

    const renderContent = () => (
        <React.Fragment>
            <ButtonGroup
                counter={8 - state.position}
                handleClickNewCard={showNewCard}
                handleClickShuffleCards={shuffleArray}
            />

            <div className="deck__cards">
                {cardsRange().map((card) => (
                    <Card
                        key={card.id}
                        image={card.url}
                        name={card.breeds[0].name}
                        description={card.breeds[0].description}
                    />
                ))}
            </div>
        </React.Fragment>
    );

    return (
        <section className="deck">
            <h1>
                <img src="/assets/arrow-back-dark.svg" onClick={handleClickBack} />
                {usuName}
            </h1>

            {state.cards.length > 0
                ? renderContent()
                : <img src="/assets/loader-default.svg" />
            }
        </section>
    );
}

export default Deck;
