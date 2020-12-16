import { useSelector } from 'react-redux'
import MatchInfo from './matchInfo'
import PlayerChapion from './playerChampion'

function Gamebox({ match }) {

    const store = useSelector(state => state)
    const user = store.user


    // 플레이어 인덱스 구하기
    let playerIndex = 0
    for (let i = 0; i < 10; i++) {
        if (match.participantIdentities[i].player.summonerName === user.name) {
            playerIndex = i
            break
        }
    }

    // 현재 플레이어 팀
    let playerTeam = 0
    if (playerIndex > 5) playerTeam = 1

    // 팀의 승패 확인
    let isWin = false
    if (match.teams[playerTeam].win === 'Win') isWin = true

    return (
        <div className='gamebox'>
            <MatchInfo
                queueType={match.queueType}
                isWin={isWin}
                creation={match.gameCreation}
                duraition={match.gameDuration} />
            <PlayerChapion
                playerInfo={match.participants[playerIndex]}
            />
        </div>
    )
}

export default Gamebox;
