import React from 'react';
import lolAPI from '../../lolAPI.json'
import { useSelector } from 'react-redux'

function UserInfo({ user, highTier }) {

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

    let iconBorderSrc = ''
    if (highTier !== 'default')
        iconBorderSrc = <img className='iconBorder' src={window.location.origin + '/iconBorder/' + highTier + '.png'} alt={highTier} />

    return (
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
    )
}

export default React.memo(UserInfo);
