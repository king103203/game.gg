import React from 'react';
import lolAPI from '../lolAPI.json'
import { useSelector } from 'react-redux'
import Rankbox from './rankbox';

function UserInfo({ user, league }) {

    const store = useSelector(state => state)

    const version = store.gameData.version

    const today = parseInt((new Date()).getTime() / 1000)
    const revisionDate = parseInt(today - user.revisionDate / 1000)
    let txt_revisionDate = ''
    if (revisionDate > 2592000) txt_revisionDate = parseInt(revisionDate / 2592000) + '달 전'
    else if (revisionDate > 86400) txt_revisionDate = parseInt(revisionDate / 86400) + '일 전'
    else if (revisionDate > 3600) txt_revisionDate = parseInt(revisionDate / 3600) + '시간 전'
    else if (revisionDate > 60) txt_revisionDate = parseInt(revisionDate / 60) + '분 전'
    else txt_revisionDate = revisionDate + '초 전'

    const iconImgUrl = lolAPI.cdnURL + version + '/img/profileicon/' + user.profileIconId + '.png'

    const getTierScore = (tier) => {
        switch (tier) {
            case 'iron':
                return 0
            case 'bronze':
                return 1
            case 'silver':
                return 2
            case 'gold':
                return 3
            case 'platinum':
                return 4
            case 'diamond':
                return 5
            case 'master':
                return 6
            case 'grandmaster':
                return 7
            case 'challenger':
                return 8
            default:
                return 0
        }
    }

    let soloTier = ''
    let teamTier = ''
    let highTier = ''
    let leagueData = [null, null]
    let iconBorderSrc = ''
    switch (league.length) {
        case 0:
            iconBorderSrc = null
            break
        case 1:
            if (league[0].queueType === 'RANKED_FLEX_SR') {
                leagueData[0] = league[0]
                leagueData[1] = null
            } else {
                leagueData[0] = null
                leagueData[1] = league[0]
            }
            highTier = league[0].tier.toLowerCase()
            iconBorderSrc = <img className='iconBorder' src={window.location.origin + '/iconBorder/' + highTier + '.png'} alt={highTier} />
            break
        case 2:
            leagueData = league
            soloTier = league[0].tier.toLowerCase()
            teamTier = league[1].tier.toLowerCase()

            highTier = soloTier
            iconBorderSrc = <img className='iconBorder' src={window.location.origin + '/iconBorder/' + highTier + '.png'} alt={highTier} />
            if (getTierScore(teamTier) > getTierScore(soloTier)) highTier = teamTier
            break
        default:
            break
    }

    return (
        <div className='userTemplate'>
            <div className='profile'>
                <div className='profileIcon'>
                    {iconBorderSrc}
                    <img className='icon' src={iconImgUrl} alt={user.profileIconId} key={user.profileIconId} />
                </div>
                <div className="userInfo">
                    <div className='nickname'>{user.name}</div>
                    <div className='level'>Level {user.summonerLevel}</div>
                    <div className='revisionDate'>최근 갱신 {txt_revisionDate}</div>
                </div>
            </div>
            <div className='userRank'>
                <Rankbox type='솔로랭크' league={leagueData[1]} />
                <Rankbox type='자유 5:5 랭크' league={leagueData[0]} />
            </div>
        </div>
    )
}

export default React.memo(UserInfo);
