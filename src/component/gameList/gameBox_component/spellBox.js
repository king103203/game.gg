import React from 'react';
import { useSelector } from 'react-redux'
import SpellImg from "./spellimg";

function SpellBox({ spells, runes }) {

    const store = useSelector(state => state)
    const gameData = store.gameData

    const spell_1 = gameData.spell[spells[0]]
    const spell_2 = gameData.spell[spells[1]]

    const rune_1 = gameData.rune[runes[0]]
    const rune_2 = gameData.rune[runes[1]]

    return (
        <div className='spellBox'>
            <div className="spell">
                <SpellImg type='spell' data={spell_1} />
                <SpellImg type='spell' data={spell_2} />
            </div>
            <div className="rune">
                <SpellImg type='rune' data={rune_1} />
                <SpellImg type='rune' data={rune_2} />
            </div>
        </div>
    )
}

export default SpellBox;
