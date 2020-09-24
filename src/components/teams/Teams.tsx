import React, { useState, useEffect } from 'react'

import { Player } from '../main/Main'

import { Button, Table } from '../../ui'

import './teams.css'

interface Props {
    storage: Player[];
}

const Teams = ({ storage }: Props) => {
    const [goalkeepers, setGoalkeepers] = useState<Player[]>([]);
    const [defenders, setDefenders] = useState<Player[]>([]);
    const [midfielders, setMidfielders] = useState<Player[]>([]);
    const [forwards, setForwards] = useState<Player[]>([]);
    const [teams, setTeams] = useState<Player[][]>([]);

    useEffect(() => {
        setGoalkeepers(selectSortPlayers('goalkeeper'));
        setDefenders(selectSortPlayers('defender'));
        setMidfielders(selectSortPlayers('midfielder'));
        setForwards(selectSortPlayers('forward'));
    }, [storage])

    const generateTeams = () => {
        if (goalkeepers.length < 1 || defenders.length < 3 || midfielders.length < 2 || forwards.length < 1) {
            alert('Not enough players');
            return;
        }

        const goalkeepersArray = selectPlayers(goalkeepers, 1);
        const defendersArray = selectPlayers(defenders, 3);
        const midfieldersArray = selectPlayers(midfielders, 2);
        const forwardsArray = selectPlayers(forwards, 1);

        const team = [...goalkeepersArray, ...defendersArray, ...midfieldersArray, ...forwardsArray];
        const result = [];
        teams?.map((arr: Player[]) => {
            result.push(arr);
        })
        result.push(team);
        setTeams(result)
    }

    const selectPlayers = (players: Player[], n: number): Player[] => {
        const playersCount = players.length;
        const result: Player[] = [];
        let nums = [];

        do {
            nums = [];
            for (let i = 0; i < n; i++) {
                nums.push(randNumber(players.length));
            }
        } while (repeatNums(nums))

        nums.map(i => {
            result.push(players[i]);
        })

        return result;
    }

    const repeatNums = (arr: number[]): boolean => {
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {
                if (i !== j) {
                    if (arr[i] === arr[j]) return true
                }
            }
        }
        return false;
    }

    const randNumber = (range: number) => {
        return Math.floor(Math.random() * Math.floor(range));
    }


    const selectSortPlayers = (position: string) => {
        return storage.filter(e => e.position === position).sort((a, b) => (a.skill > b.skill) ? -1 : 1);
    }

    const average = (data: Player[]) => {
        let result = 0;
        data.map(e => {
            result += e.skill;
        })
        return Math.ceil(result / data.length);
    }

    const validate = (): boolean => {
        if (goalkeepers.length < 1) return false;
        if (defenders.length < 3) return false;
        if (midfielders.length < 2) return false;
        if (forwards.length < 1) return false;

        return true;
    }


    const avgGoalkeepers = average(goalkeepers);
    const avgDefenders = average(defenders);
    const avgMidfielders = average(midfielders);
    const avgForwards = average(forwards);

    return (
        <div className="teamsContainer">
            <div className="tables">
                <Table data={goalkeepers} header={`Available goalkeepers (${avgGoalkeepers})`} />
                <Table data={defenders} header={`Available defenders (${avgDefenders})`} />
                <Table data={midfielders} header={`Available midfielders (${avgMidfielders})`} />
                <Table data={forwards} header={`Available forwards (${avgForwards})`} />
            </div>
            <div className="teams">
                <Button onClick={generateTeams}>Generate teams</Button>
                {teams.map((arr: Player[]) => {
                    return <Table data={arr} header={'Team skill: ' + average(arr)} />
                })}
            </div>



        </div>
    )
}

export default Teams;