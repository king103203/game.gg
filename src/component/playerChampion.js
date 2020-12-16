import React from 'react';
import lolAPI from '../lolAPI.json'
import { useSelector } from 'react-redux'

function PlayerChampion({ playerInfo }) {

    const store = useSelector(state => state)
    const gameData = store.gameData
    const version = gameData.version

    const Champion = gameData.champion[playerInfo.championId]
    const champImgSrc = lolAPI.cdnURL + version + '/img/champion/' + Champion.id + '.png'

    const spell_1 = gameData.spell[playerInfo.spell1Id]
    const spell_2 = gameData.spell[playerInfo.spell2Id]

    const spellImgSrc = (spell) => {
        return lolAPI.cdnURL + version + '/img/spell/' + spell.id + '.png'
    }

    return (
        <div className='playerChampion'>
            <img className='playerChampImg' src={champImgSrc} alt={Champion.name} />
            <img className='spell' src={spellImgSrc(spell_1)} alt={spell_1.name} />
            <img className='spell' src={spellImgSrc(spell_2)} alt={spell_2.name} />
            {/* <img className='perk' src={} alt={}/>
            <img className='perk' src={} alt={}/> */}
        </div>
    )
}

export default PlayerChampion;
