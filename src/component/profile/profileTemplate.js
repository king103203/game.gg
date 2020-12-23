import React from 'react';
import UserInfoBox from './userInfoBox'
import RankBox from './rankBox';

function ProfileTemplate({ user, league }) {

    let soloTier = ''
    let teamTier = ''
    let highTier = ''
    let leagueData = [null, null]

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

    switch (league.length) {
        case 0:
            highTier = 'default'
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
            break
        case 2:
            leagueData = league
            soloTier = league[0].tier.toLowerCase()
            teamTier = league[1].tier.toLowerCase()
            highTier = soloTier
            if (getTierScore(teamTier) > getTierScore(soloTier)) highTier = teamTier
            break
        default:
            break
    }

    return (
        <div className='profileTemplate'>
            <UserInfoBox user={user} highTier={highTier} />
            <div className='rankBoxTemplate'>
                <RankBox type='솔로랭크' league={leagueData[1]} />
                <RankBox type='자유 5:5 랭크' league={leagueData[0]} />
            </div>
        </div>
    )
}

export default ProfileTemplate