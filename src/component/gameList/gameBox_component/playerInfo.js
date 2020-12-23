import React from 'react';
import { useSelector } from 'react-redux'
import ItemTemplate from './itemTemplate';
import ChampionImg from './championImg';
import SpellBox from './spellBox';

function PlayerInfo({ playerInfo, duraition, totalKill }) {

    const store = useSelector(state => state)
    const gameData = store.gameData
    const Champion = gameData.champion[playerInfo.championId]

    const kills = playerInfo.stats.kills
    const deaths = playerInfo.stats.deaths
    const assists = playerInfo.stats.assists

    let KDA_rate = ((kills + assists) / deaths).toFixed(2)
    if (KDA_rate === Infinity) KDA_rate = 'Perfect'
    else if (isNaN(KDA_rate) || KDA_rate === 0) KDA_rate = '0.00'

    const totalCS = playerInfo.stats.neutralMinionsKilled + playerInfo.stats.totalMinionsKilled
    const CSperMin = Math.round(totalCS / parseInt(duraition / 60) * 10) / 10
    let involvedkill = Math.round((kills + assists) / totalKill * 100)
    if (isNaN(involvedkill)) involvedkill = 0

    let txt_largestMultiKill = ''
    switch (playerInfo.stats.largestMultiKill) {
        case 2:
            txt_largestMultiKill = '더블킬'
            break
        case 3:
            txt_largestMultiKill = '트리플킬'
            break
        case 4:
            txt_largestMultiKill = '쿼드라킬'
            break
        case 5:
            txt_largestMultiKill = '펜타킬'
            break
        default:
            break
    }

    const getItems = () => {
        let items = []
        for (let i = 0; i < 7; i++) {
            items.push(playerInfo.stats['item' + i])
        }
        return items
    }

    return (
        <>
            <div className='playerInfo'>
                <div className="playerImg">
                    <ChampionImg championKey={playerInfo.championId} />
                    <SpellBox spells={[playerInfo.spell1Id, playerInfo.spell2Id]}
                        runes={[playerInfo.stats.perk0, playerInfo.stats.perkSubStyle]} />
                </div>
                <div className='championName'>{Champion.name}</div>
            </div>
            <div className="playerKDA">
                <div>
                    <span className='kill'>{kills} / </span>
                    <span className='death'>{deaths}</span>
                    <span className='assist'> / {assists}</span>
                </div>
                <div className="KDA_rate">
                    {KDA_rate}:1 평점
                </div>
                <div className='largestMultiKill'>
                    {txt_largestMultiKill}
                </div>
            </div>
            <div className="playerStat">
                <div className='level'>레벨{playerInfo.stats.champLevel}</div>
                <div className='totalCS'>{totalCS} ({CSperMin}) CS</div>
                <div className='involvedKill'>킬관여 {involvedkill}%</div>
            </div>
            <div className='playerItems'>
                <ItemTemplate type='double' items={getItems()} />
                <div className="wardCount">
                    제어 와드 {playerInfo.stats.visionWardsBoughtInGame}
                </div>
            </div>

        </>
    )
}

export default PlayerInfo;
