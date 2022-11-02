import React, { useState } from 'react';

import Button from '../../components/Buttons/Default';
import InputText from '../../components/Inputs/InputText';

import { USU_NAME } from '../../constants/ApplicationConstants';

import './style.css';

interface IState {
    name: string,
    error: boolean,
    errorMsg: string,
}

const initState = {
    name: '',
    errorMsg: '',
    error: false,
}

const Home: React.FC = () => {
    const [state, setState] = useState<IState>(initState);

    const handleClickButton = () => {
        if (state.name.length <= 3) {
            setState({ ...state, error: true, errorMsg: 'Necessário ter mais de 3 letras' });
            return;
        }

        localStorage.setItem(USU_NAME, state.name);
        window.location.href = "/deck";
    }

    const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => setState({
        ...state,
        error: false,
        name: event.target.value.replace(/[^a-z]/gi, '')
    });

    return (
        <section className="home">
            <h1>Baralho de Gatos</h1>

            <InputText
                error={state.error}
                errorMsg={state.errorMsg}
                onChange={handleChangeText}
                placeholder="Insira seu nome"
            />

            <Button onClick={handleClickButton}>
                Iniciar
            </Button>
        </section>
    );
}

export default Home;