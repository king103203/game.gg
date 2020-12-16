import React from 'react';
import Gamebox from './gamebox';
// import { useState } from 'react';

function GameboxTemplate({ matches }) {

    // const [Gamebox, setGamebox] = useState([]);

    const gamebox = matches.map((match) => {
        return <Gamebox key={match.gameId} match={match} />
    })


    return (
        <ul className={'gameboxTemplate'}>
            {gamebox}
        </ul>
    )
}

export default React.memo(GameboxTemplate);
