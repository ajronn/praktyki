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
            {/* <table>
                <tr>
                    <th colSpan={3} >Players</th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>Position</th>
                    <th>Skill</th>
                </tr>
                {data}
            </table> */}
            <Table data={storage} header="Players" />
        </div>
    )
}

export default Home;