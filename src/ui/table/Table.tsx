import { render } from '@testing-library/react';
import React, { useEffect, useState } from 'react';

import './table.css'

interface Props {
    data: Object[],
    header?: string
}

const Table = ({ data, header = '' }: Props) => {
    const [renderHeaders, setRenderHeaders] = useState([]);
    const [renderCells, setRenderCells] = useState([]);
    const [numberOfColumns, setNumberOfColumns] = useState();

    const selectHeaders = (obj: Object): string[] => {
        const headers: string[] = [];
        for (const [key, value] of Object.entries(obj)) {
            let header = key + '';
            header = header.charAt(0).toUpperCase() + header.substring(1).toLowerCase()
            headers.push(header)
        }
        return headers;
    }

    const selectCells = (objArray: Object[]): string[] => {
        const cells: string[] = [];
        objArray.map(obj => {
            for (const [key, value] of Object.entries(obj)) {
                cells.push(value + '');
            }
        })
        return cells;
    }

    const generateHeaders = (headers: string[]) => {
        const result = headers.map((h, index) => {
            return <th key={index}>{h}</th>
        })
        return result;
    }

    const generateCells = (cells: string[], headers: string[], numberOfKeys: number) => {
        const result = [];
        for (let i = 0; i < cells.length; i += numberOfKeys) {
            result.push(
                <tr key={i}>
                    {headers.map((e, index) => {
                        return <th key={i + index}>{cells[i + index]}</th>
                    })}
                </tr>
            )
        }
        return result;
    }

    useEffect(() => {
        if (data.length === 0) return;
        const numberOfKeys = Object.keys(data[0]).length;
        const headers = selectHeaders(data[0]);
        const cells = selectCells(data);

        setRenderHeaders(generateHeaders(headers));
        setRenderCells(generateCells(cells, headers, numberOfKeys));
        setNumberOfColumns(numberOfKeys);

    }, [data])

    return (
        data.length === 0
            ? ""
            :
            <table>
                <tbody>
                    {header === ''
                        ? ''
                        : <tr>
                            <th colSpan={numberOfColumns}>{header}</th>
                        </tr>}
                    <tr>
                        {renderHeaders}
                    </tr>
                    {renderCells}
                </tbody>
            </table>
    )
}

export default Table;