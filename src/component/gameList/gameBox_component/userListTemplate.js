import React from 'react';
import UserList from './userList';

function UserListTemplate({ userList }) {

    let userList_0 = []
    let userList_1 = []



    userList.forEach((user, i) => {
        if (i < 5) userList_0.push(user)
        else userList_1.push(user)
    })


    return (
        <div className='userListTemplate'>
            <UserList userList={userList_0} />
            <UserList userList={userList_1} />
        </div>
    )
}

export default UserListTemplate;
