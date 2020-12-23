import React from 'react';

function RankBox({ type, league }) {

    if (league !== null) {
        const winRate = Math.round(league.wins / (league.wins + league.losses) * 100)
        let LpGraphRate = parseInt(league.leaguePoints * 0.8)
        if (LpGraphRate > 80) LpGraphRate = 80
        return (
            <div className='rankBox'>
                <div className="tierIcon">
                    <img className='emblem' src={window.location.origin + '/Emblem_img/Emblem_' + league.tier + '.png'} alt={league.tier} />
                </div>
                <div className="tierInfo">
                    <div className="queueType">{type}</div>
                    <div className="tierRankText">{league.tier + ' ' + league.rank}</div>
                    <div className="winRate">
                        <div>{league.wins + '승 ' + league.losses + '패 '}</div>
                        <div>{'승률 ' + winRate + '%'}</div>
                    </div>
                    <div className='LpRate'>
                        <span>{league.leaguePoints + ' LP'}</span>
                        <div className="LP" style={{ width: LpGraphRate + 'px' }}></div>
                    </div>
                </div>
            </div>
        )
    }
    else if (league === null)
        return (
            <div className='rankBox'>
                <div className="tierIcon">
                    <img className='emblem' src={window.location.origin + '/Emblem_img/default.png'} alt='default' />
                </div>
                <div className="tierInfo">
                    <div className="queueType">{type}</div>
                    <div className="tierRankText">Unranked</div>
                </div>
            </div>
        )
}

export default RankBox;
