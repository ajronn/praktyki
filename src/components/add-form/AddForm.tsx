import React, { useState } from 'react'

import { Button } from '../../ui'

import { Player } from '../main/Main'

import styles from './addform.css'

interface Props {
    addPlayer: (e: Player) => void;
}

const AddForm = ({ addPlayer }: Props) => {
    const [player, setPlayer] = useState({ id: 0, name: '', position: '', skill: 0 });
    let status = [false, false, false];

    const setName = (e: string) => {
        let obj = {
            id: player.id,
            name: e,
            position: player.position,
            skill: player.skill
        };
        setPlayer(obj);
    }

    const setPosition = (e: string) => {
        let obj = {
            id: player.id,
            name: player.name,
            position: e,
            skill: player.skill
        };
        setPlayer(obj);
    }

    const setSkill = (e: number) => {
        let obj = {
            id: player.id,
            name: player.name,
            position: player.position,
            skill: e
        };
        setPlayer(obj);
    }

    const validate = () => {
        player.name.length < 2 ? status[0] = false : status[0] = true;
        player.position === '' ? status[1] = false : status[1] = true;

        if (player.skill < 1 ||
            player.skill > 10) {
            status[2] = false;
        } else {
            status[2] = true;
        }

        if (status[0] === false || status[1] === false || status[2] === false) {
            return false;
        }

        return true;
    }

    const send = () => {
        if (!validate()) {
            let err = ''
            if (!status[0]) err += '>Name (min 2 signs)\n';
            if (!status[1]) err += '>Position (choose position)\n';
            if (!status[2]) err += '>Skill lvl (range 1-10)\n';
            alert(err + "   is invalid")
            return;
        }
        addPlayer(player);
    }

    return (
        <div className={styles.form}>
            <form>
                <fieldset>
                    <input type='text' placeholder='name' onChange={(e) => setName(e.target.value)} />
                    <label>
                        <img
                            width={23}
                            src="https://www.flaticon.com/svg/static/icons/svg/846/846093.svg" />
                    </label>
                </fieldset>

                <fieldset>
                    <select onChange={(e) => setPosition(e.target.value)}>
                        <option value="">position</option>
                        <option value="goalkeeper">goalkeeper</option>
                        <option value="defender">defender</option>
                        <option value="midfielder">midfielder</option>
                        <option value="forward">forward</option>
                    </select>
                    <label>
                        <img
                            width={23}
                            src="https://www.flaticon.com/svg/static/icons/svg/1165/1165187.svg" />
                    </label>
                </fieldset>

                <fieldset>
                    <input min='1' max='10' type='number' placeholder='skill lvl [1-10]' onChange={(e) => setSkill(parseInt(e.target.value))} />
                    <label>
                        <img
                            width={23}
                            src="https://www.flaticon.com/svg/static/icons/svg/3103/3103277.svg" />
                    </label>
                </fieldset>
                <Button theme='dark' onClick={send}>Add player</Button>
            </form>
        </div>
    )
}

export default AddForm;