import React from 'react';
import Userbox from './userbox';

function UserList({ userlist }) {

    let userbox_0 = []
    let userbox_1 = []

    userlist.forEach((user, i) => {
        if (i < 5) userbox_0.push(<Userbox key={user.summonerName + user.chmapionId} user={user} />)
        else userbox_1.push(<Userbox key={user.summonerName + user.chmapionId} user={user} />)
    })


    return (
        <div className='userList'>
            <div>
                {userbox_0}
            </div>
            <div>
                {userbox_1}
            </div>
        </div>
    )
}

export default UserList;
