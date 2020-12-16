import { useSelector } from 'react-redux'

function Gamebox({ match }) {

    const user = useSelector(state => state.user)

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
    let txt_isWin = '패배'
    if (isWin) txt_isWin = '승리'

    // 게임 진행시간 구하기
    const duraition_hour = parseInt(match.gameDuration / 3600)
    const duraition_min = parseInt(match.gameDuration / 60)
    const duraition_sec = match.gameDuration % 60
    let txt_duraition = duraition_min + '분 ' + duraition_sec + '초'
    if (duraition_hour > 0) txt_duraition = duraition_hour + '시간 ' + txt_duraition

    // 게임이 생성 후 경과시간 구하기
    const gameCreation = match.gameCreation + (match.gameDuration * 1000)
    const today = parseInt((new Date()).getTime() / 1000)
    const ElapsedTime = parseInt(today - gameCreation / 1000)
    let txt_ElapsedTime = ''
    if (ElapsedTime > 2592000) txt_ElapsedTime = parseInt(ElapsedTime / 2592000) + '달 전'
    else if (ElapsedTime > 86400) txt_ElapsedTime = parseInt(ElapsedTime / 86400) + '일 전'
    else if (ElapsedTime > 3600) txt_ElapsedTime = parseInt(ElapsedTime / 3600) + '시간 전'
    else if (ElapsedTime > 60) txt_ElapsedTime = parseInt(ElapsedTime / 60) + '분 전'
    else txt_ElapsedTime = ElapsedTime + '초 전'

    let txt_queueType = ''
    switch (match.queueId) {
        case 420:
            txt_queueType = '솔로랭크'
            break
        case 430:
            txt_queueType = '일반'
            break
        case 440:
            txt_queueType = '팀랭크'
            break
        case 450:
            txt_queueType = '칼바람나락'
            break
        default:
            txt_queueType = '기타'
            break
    }

    console.log(match)

    console.log('ElapsedTime', txt_ElapsedTime)
    console.log('duraition', txt_duraition)
    console.log('playerIndex', playerIndex)
    console.log('playerTeam', playerTeam)
    console.log('isWin', txt_isWin)
    console.log('queueType', txt_queueType)

    return (
        <div className='gamebox'>
            <div className='matchInfo'>
                <div>{txt_queueType}</div>
                <div>{txt_ElapsedTime}</div>
                <div>{txt_isWin}</div>
                <div>{txt_duraition}</div>
            </div>
            <div className="championInfo">
                <div className="championInfo_image">

                </div>
                <div className="championInfo_name">

                </div>
            </div>
        </div>
    )
}

export default Gamebox;
