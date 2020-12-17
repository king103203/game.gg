import React from 'react';
import { useSelector } from 'react-redux'
import lolAPI from '../lolAPI.json'

function Itembox({ item }) {

    const store = useSelector(state => state)
    const gameData = store.gameData
    const version = gameData.version

    const itemImgSrc = lolAPI.cdnURL + version + '/img/item/' + item + '.png'

    return (
        <div className='item'>
            <img src={itemImgSrc} alt={gameData.item[item].name} />
        </div>
    )
}

export default Itembox;