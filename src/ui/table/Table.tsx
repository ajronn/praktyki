import React from 'react';

import './table.css'

interface Props {
    data: Object[],
    header: string
}

const Table = ({ data, header }: Props) => {

    const renderFun = (): string[] => {
        let items: string[] = [];
        data.map((e: Object) => {
            for (const [key, value] of Object.entries(e)) {
                items.push(value)
            }
        })

        return items;
    }

    const render = renderFun();

    return (
        data.length === 0
            ? <p>no data</p>
            :

            <ul>
                {render.map((e) => {
                    return <li>{e}</li>
                })}
            </ul>

    )
}

export default Table;