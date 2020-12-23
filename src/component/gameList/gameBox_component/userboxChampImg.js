import React from 'react';
import { useSelector } from 'react-redux'
import lolAPI from '../../../lolAPI.json'

function UserboxChampImg({ championId }) {

    const store = useSelector(state => state)
    const version = store.gameData.version

    const champ = store.gameData.champion[championId]
    const champImgSrc = lolAPI.cdnURL + version + '/img/champion/' + champ.id + '.png'

    return (
        <div className='userboxChampImg'>
            <img src={champImgSrc} alt={champ.name} />
        </div>
    )
}

export default UserboxChampImg;
