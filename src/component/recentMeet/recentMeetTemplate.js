import React from 'react';
import RecentMeetTable from './recentMeetTable';

function RecentMeetTemplate({ meet }) {

    return (
        <div className='recentMeetTemplate'>
            <RecentMeetTable meet={meet} />
        </div>
    )
}

export default React.memo(RecentMeetTemplate)