import React from 'react';
import Gamebox from './gamebox';

function gameboxTemplate(props) {

    const gameboxList = props.matchlist.map((match) => {
        return <Gamebox key={match.gameId} match={match} />
    })

    return (
        <ul>
            {gameboxList}
        </ul>
    )
}

export default React.memo(gameboxTemplate);
