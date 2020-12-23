import React from 'react';
import UserboxChampImg from './userboxChampImg';
import { withRouter } from 'react-router-dom';

function UserBox({ user }) {

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
        <div className='userBox' onClick={(e) => {
            e.preventDefault()
            window.location.replace('/result/' + user.summonerName)
        }}>
            <UserboxChampImg key={user.championId} championId={user.championId} />
            {userName}
        </div>
    )
}

export default withRouter(UserBox);
