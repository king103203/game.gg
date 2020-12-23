import React from 'react';

function GameInfo({ queueId, isWin, creation, duraition }) {

    // 승패 여부
    let txt_isWin = '패배'
    if (isWin) txt_isWin = '승리'

    // 게임 진행시간 구하기
    const duraition_hour = parseInt(duraition / 3600)
    const duraition_min = parseInt(duraition / 60)
    const duraition_sec = duraition % 60
    let txt_duraition = duraition_min + '분 ' + duraition_sec + '초'
    if (duraition_hour > 0) txt_duraition = duraition_hour + '시간 ' + txt_duraition

    // 게임이 생성 후 경과시간 구하기
    const gameCreation = creation + (duraition * 1000)
    const today = parseInt((new Date()).getTime() / 1000)
    const ElapsedTime = parseInt(today - gameCreation / 1000)
    let txt_ElapsedTime = ''
    if (ElapsedTime > 2592000) txt_ElapsedTime = parseInt(ElapsedTime / 2592000) + '달 전'
    else if (ElapsedTime > 86400) txt_ElapsedTime = parseInt(ElapsedTime / 86400) + '일 전'
    else if (ElapsedTime > 3600) txt_ElapsedTime = parseInt(ElapsedTime / 3600) + '시간 전'
    else if (ElapsedTime > 60) txt_ElapsedTime = parseInt(ElapsedTime / 60) + '분 전'
    else txt_ElapsedTime = ElapsedTime + '초 전'

    // 큐타입 구하기
    let txt_queueType = ''
    switch (queueId) {
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

    return (
        <div className='matchInfo'>
            <div>
                <div className='queueType'>{txt_queueType}</div>
                <div className='elapsedTime'>{txt_ElapsedTime}</div>
            </div>
            <div className='line' />
            <div>
                <div className={'isWin ' + isWin}>{txt_isWin}</div>
                <div className='duraition'>{txt_duraition}</div>
            </div>
        </div>
    )
}

export default GameInfo;
