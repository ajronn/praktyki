import React from 'react'

import { Player } from '../main/Main'

import { Table } from '../../ui'

import './home.css'

interface Props {
    storage: Player[];
}

const Home = ({ storage }: Props) => {

    const data = storage.map(e => {
        return (
            <tr>
                <th>{e.name}</th>
                <th>{e.position}</th>
                <th>{e.skill}</th>
            </tr>
        )
    })

    return (
        <div className='home'>
            <Table data={storage} header="Players" />
        </div>
    )
}

export default Home;