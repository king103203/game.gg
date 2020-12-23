import React from 'react';
import { useSelector } from 'react-redux'
import lolAPI from '../../../lolAPI.json'
import { useState } from 'react';
import { TooltipBoxItem } from './tooltipbox'

function Itembox({ item }) {

    const store = useSelector(state => state)
    const gameData = store.gameData
    const version = gameData.version

    const [Tooltip, setTooltip] = useState(false)

    if (item !== 0) {
        const itemImgSrc = lolAPI.cdnURL + version + '/img/item/' + item + '.png'

        return (
            <div className='item'
                onMouseEnter={(e) => {
                    e.preventDefault()
                    setTooltip(true)
                }}
                onMouseLeave={(e) => {
                    e.preventDefault()
                    setTooltip(false)
                }}>
                <img src={itemImgSrc} alt={gameData.item[item].name} />
                {Tooltip ? <TooltipBoxItem item={item} /> : null}
            </div>
        )
    } else {
        return (
            <div className='itemBlank' />
        )
    }

}

export default Itembox;