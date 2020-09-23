import React from 'react'

import { Player } from '../main/Main'

import { Button } from '../../ui'

import './teams.css'

interface Props {
    storage: Player[];
}

const Teams = ({ storage }: Props) => {

    const selectPlayers = (position: string) => {
        return storage.filter(e => e.position === position).sort((a, b) => (a.skill > b.skill) ? -1 : 1);
    }

    const goalkeepers = selectPlayers('goalkeeper');
    const defenders = selectPlayers('defender');
    const midfielders = selectPlayers('midfielder');
    const forwards = selectPlayers('forward');


    return (
        <div><Button onClick={() => console.log(goalkeepers)}>Teams</Button></div>
    )
}

export default Teams;