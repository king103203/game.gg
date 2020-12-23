import lolAPI from '../../../lolAPI.json'
import { useState } from 'react';
import { TooltipBoxSpell } from './tooltipbox'
import { useSelector } from 'react-redux'

function SpellImg({ type, data }) {

    const store = useSelector(state => state)
    const gameData = store.gameData
    const version = gameData.version

    const [Tooltip, setTooltip] = useState(false)

    const ImgSrc = () => {
        if (type === 'spell')
            return lolAPI.cdnURL + version + '/img/spell/' + data.id + '.png'
        else if (type === 'rune')
            return lolAPI.cdnURL + 'img/' + data.icon
    }

    return (
        <div className='spellImg' onMouseEnter={(e) => {
            e.preventDefault()
            setTooltip(true)
        }}
            onMouseLeave={(e) => {
                e.preventDefault()
                setTooltip(false)
            }}>
            <img src={ImgSrc(data)} alt={data.name} />
            {Tooltip ? <TooltipBoxSpell type={type} data={data} /> : null}
        </div>
    )
}

export default SpellImg