import React from 'react';
import GameBox from './gameBox';
import GameList from './gameList';

function GameListTemplate({ matches }) {

    const gameBox = matches.map((match) => {
        return <GameBox key={match.gameId} match={match} />
    })


    return (
        <div className='gameListTemplate'>
            <GameList>
                {gameBox}
            </GameList>
        </div>
    )
}

export default React.memo(GameListTemplate);
