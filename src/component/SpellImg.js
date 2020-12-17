import React from 'react';
import lolAPI from '../lolAPI.json'
import { useSelector } from 'react-redux'

function SpellImg({ spells, runes }) {

    const store = useSelector(state => state)
    const gameData = store.gameData
    const version = gameData.version

    const spell_1 = gameData.spell[spells[0]]
    const spell_2 = gameData.spell[spells[1]]

    const rune_1 = gameData.rune[runes[0]]
    const rune_2 = gameData.rune[runes[1]]

    console.log(runes[0])

    const spellImgSrc = (spell) => {
        return lolAPI.cdnURL + version + '/img/spell/' + spell.id + '.png'
    }
    const runeImgSrc = (rune) => {
        return lolAPI.cdnURL + 'img/' + rune.icon
    }

    return (
        <div className='SpellImg'>
            <div className="spell">
                <img src={spellImgSrc(spell_1)} alt={spell_1.name} />
                <img src={spellImgSrc(spell_2)} alt={spell_2.name} />
            </div>
            <div className="rune">
                <img src={runeImgSrc(rune_1)} alt={rune_1.name} />
                <img src={runeImgSrc(rune_2)} alt={rune_2.name} />
            </div>
        </div>
    )
}

export default SpellImg;
