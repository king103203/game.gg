import { useSelector } from 'react-redux'
import GameInfo from './gameBox_component/gameInfo'
import PlayerInfo from './gameBox_component/playerInfo'
import UserListTemplate from './gameBox_component/userListTemplate';

function GameBox({ match }) {

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

    // 같은팀 내에 총 킬수
    let totalKill = 0
    for (let i = 0 + (playerTeam * 5); i < 5 + (playerTeam * 5); i++) {
        totalKill += match.participants[i].stats.kills
    }

    let userlist = []
    for (let i = 0; i < 10; i++) {
        userlist.push(
            {
                summonerName: match.participantIdentities[i].player.summonerName,
                championId: match.participants[i].championId
            }
        )
    }

    return (
        <li className={'gameBox ' + match.teams[playerTeam].win}>
            <GameInfo
                queueId={match.queueId}
                isWin={isWin}
                creation={match.gameCreation}
                duraition={match.gameDuration} />
            <PlayerInfo
                playerInfo={match.participants[playerIndex]}
                duraition={match.gameDuration}
                totalKill={totalKill}
            />
            <UserListTemplate userList={userlist} />
        </li>
    )
}

export default GameBox;
