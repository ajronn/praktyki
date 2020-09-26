import React, { useState, useEffect } from 'react'

import { Player } from '../main/Main'

import { Button, Table } from '../../ui'

import styles from './teams.css'

interface Props {
    storage: Player[];
}

const Teams = ({ storage }: Props) => {
    const [goalkeepers, setGoalkeepers] = useState([]);
    const [defenders, setDefenders] = useState([]);
    const [midfielders, setMidfielders] = useState([]);
    const [forwards, setForwards] = useState([]);
    const [teams, setTeams] = useState([]);
    const [reset, setReset] = useState(false)
    const GOALKEEPERS_NUMBER = 1;
    const DEFENDERS_NUMBER = 3;
    const MIDFIELDERS_NUMBER = 2;
    const FORWARDS_NUMBER = 1;

    useEffect(() => {
        setGoalkeepers(selectSortPlayers('goalkeeper'));
        setDefenders(selectSortPlayers('defender'));
        setMidfielders(selectSortPlayers('midfielder'));
        setForwards(selectSortPlayers('forward'));
        setTeams([]);
    }, [storage, reset])

    const toggleReset = () => setReset(!reset);

    const generateTeams = () => {
        if (!validate()) {
            alert('Not enough players');
            return;
        }

        const goalkeepersArray = selectPlayers(goalkeepers, GOALKEEPERS_NUMBER);
        const defendersArray = selectPlayers(defenders, DEFENDERS_NUMBER);
        const midfieldersArray = selectPlayers(midfielders, MIDFIELDERS_NUMBER);
        const forwardsArray = selectPlayers(forwards, FORWARDS_NUMBER);

        setGoalkeepers(filterPlayers(goalkeepers, goalkeepersArray));
        setDefenders(filterPlayers(defenders, defendersArray));
        setMidfielders(filterPlayers(midfielders, midfieldersArray));
        setForwards(filterPlayers(forwards, forwardsArray));

        const team = [...goalkeepersArray, ...defendersArray, ...midfieldersArray, ...forwardsArray];

        const result = [];
        teams.map((arr: Player[]) => {
            result.push(arr);
        })
        result.push(team);

        setTeams(result)
    }

    const filterPlayers = (firstArray: Player[], secondArray: Player[]): Player[] => {
        const result: Player[] = [];
        for (let i = 0; i < firstArray.length; i++) {
            if (!inArray(secondArray, firstArray[i])) result.push(firstArray[i]);
        }
        return result;
    }

    const inArray = (array: Player[], obj: Player): boolean => {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === obj.id) {
                return true;
            }
        }
        return false;
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
        <div className={styles.teamsContainer}>
            <div className={styles.tables}>
                <Table data={goalkeepers} header={`Available goalkeepers (${avgGoalkeepers})`} />
                <Table data={defenders} header={`Available defenders (${avgDefenders})`} />
                <Table data={midfielders} header={`Available midfielders (${avgMidfielders})`} />
                <Table data={forwards} header={`Available forwards (${avgForwards})`} />
            </div>
            <div className={styles.teams}>
                <div className={styles.control}>
                    <Button onClick={() => generateTeams()}>Generate teams</Button>
                    <Button onClick={() => toggleReset()}>Reset</Button>
                </div>
                <div className={styles.teamsTables}>
                    {teams.map((arr: Player[]) => {
                        return <Table data={arr} header={'Team skill: ' + average(arr)} />
                    })}
                </div>
            </div>
        </div>
    )
}

export default Teams;