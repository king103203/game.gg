import React from 'react';

function Rankbox({ type, league }) {

    if (league !== null) {
        const winRate = Math.round(league.wins / (league.wins + league.losses) * 100)
        const LpGraphRate = parseInt(league.leaguePoints * 0.8)
        return (
            <div className='rankbox'>
                <div className="tier">
                    <img className='emblem' src={window.location.origin + '/Emblem_img/Emblem_' + league.tier + '.png'} alt={league.tier} />
                </div>
                <div className="tierInfo">
                    <div className="queueType">{type}</div>
                    <div className="tierRank">{league.tier + ' ' + league.rank}</div>
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
            <div className='rankbox'>
                <div className="tier">
                    <img className='emblem' src={window.location.origin + '/Emblem_img/default.png'} alt='default' />
                </div>
                <div className="tierInfo">
                    <div className="queueType">{type}</div>
                    <div className="tierRank">Unranked</div>
                </div>
            </div>
        )
}

export default Rankbox;
