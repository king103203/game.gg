import React from 'react';
import { withRouter } from 'react-router-dom';
import UserBox from './userBox';

function UserList({ userList }) {

    let userBox = userList.map((user) => {
        return <UserBox key={user.summonerName + user.chmapionId} user={user} />
    })

    return (
        <div className='userList'>
            {userBox}
        </div>
    )
}

export default withRouter(UserList);
