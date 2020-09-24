import React, { useState, useEffect } from 'react'

import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { Header, Home, AddForm, Teams } from '..';

export interface Player {
    id: number;
    name: string;
    position: string;
    skill: number;
}

const Main = () => {
    const [storage, setStorage] = useState<Player[]>([]);

    useEffect(() => {
        let players: Player[] = [];
        const data = localStorage.getItem('data');

        if (data !== null) {
            JSON.parse(data).map((e: Player) => {
                players.push({ id: e.id, name: e.name, position: e.position, skill: e.skill });
            })
            setStorage([...players]);
            return;
        }

        const positions = ['goalkeeper', 'defender', 'midfielder', 'forward'];
        const names = ['John', 'George', 'William', 'Connor', 'James', 'Martin', 'Peter', 'Ethan'];

        for (let i = 0; i < 200; i++) {
            let name = names[Math.floor(Math.random() * Math.floor(8))];
            let position = positions[Math.floor(Math.random() * Math.floor(4))];
            let player: Player = { id: i, name: name, position: position, skill: (Math.floor(Math.random() * Math.floor(10)) + 1) };
            players.push(player);
        }
        localStorage.setItem('data', JSON.stringify([...players]));
        setStorage([...players]);
    }, [])

    const addPlayer = (player: Player) => {
        player.id = storage[storage.length - 1].id + 1;
        const data = JSON.stringify([...storage, player]);
        localStorage.setItem('data', data);
        setStorage([...storage, player]);
    }

    return (
        <Router>
            <div className='container'>
                <Header />
                <Switch>
                    <Route path='/teams'><Teams storage={storage} /></Route>
                    <Route path='/form'><AddForm addPlayer={addPlayer} /></Route>
                    <Route path='/'><Home storage={storage} /></Route>
                </Switch>
            </div>
        </Router>
    )
}

export default Main;