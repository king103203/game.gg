import React from 'react';
import UserboxChampImg from './userboxChampImg';

function Userbox({ user }) {

    let userName = user.summonerName

    function getByte(str) {
        return str
            .split('')
            .map(s => s.charCodeAt(0))
            .reduce((prev, c) => (prev + ((c === 10) ? 2 : ((c >> 7) ? 2 : 1))), 0);
    }

    if (getByte(userName) > 10) {
        userName = userName.substring(0, 4) + '...'
    }
    return (
        <div className='userbox'>
            <UserboxChampImg key={user.championId} championId={user.championId} />
            <span>{userName}</span>
        </div>
    )
}

export default Userbox;
