import React from 'react';
import lolAPI from '../../../lolAPI.json'
import { useSelector } from 'react-redux'

function ChampionImg({ championKey }) {

    const store = useSelector(state => state)
    const gameData = store.gameData
    const version = gameData.version

    const championId = gameData.champion[championKey].id
    const championName = gameData.champion[championKey].name

    const champImgSrc = lolAPI.cdnURL + version + '/img/champion/' + championId + '.png'


    return (
        <img className='championImg' src={champImgSrc} alt={championName} />
    )
}

export default ChampionImg;
