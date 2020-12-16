import React from 'react';
import lolAPI from '../lolAPI.json'
import { useSelector } from 'react-redux'

function PlayerChampion({ playerInfo, duraition, totalKill }) {

    const store = useSelector(state => state)
    const gameData = store.gameData
    const version = gameData.version

    const Champion = gameData.champion[playerInfo.championId]
    const champImgSrc = lolAPI.cdnURL + version + '/img/champion/' + Champion.id + '.png'

    const spell_1 = gameData.spell[playerInfo.spell1Id]
    const spell_2 = gameData.spell[playerInfo.spell2Id]

    const rune_1 = gameData.rune[playerInfo.stats.perk0]
    const rune_2 = gameData.rune[playerInfo.stats.perkSubStyle]

    const spellImgSrc = (spell) => {
        return lolAPI.cdnURL + version + '/img/spell/' + spell.id + '.png'
    }
    const runeImgSrc = (rune) => {
        return lolAPI.cdnURL + 'img/' + rune.icon
    }

    const kills = playerInfo.stats.kills
    const deaths = playerInfo.stats.deaths
    const assists = playerInfo.stats.assists
    const KDA_rate = Math.round((kills + assists) / deaths * 100) / 100

    const totalCS = playerInfo.stats.neutralMinionsKilled + playerInfo.stats.totalMinionsKilled
    const CSperMin = Math.round(totalCS / parseInt(duraition / 60) * 10) / 10
    const involvedkill = Math.round((kills + assists) / totalKill * 100)
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

    return (
        <>
            <div className='playerChampion'>
                <div className="playerImg">
                    <img className='ChampImg' src={champImgSrc} alt={Champion.name} />
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
        </>
    )
}

export default PlayerChampion;
