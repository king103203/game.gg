import { withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import apiKey from './apiKey.json';
import lolAPI from './lolAPI.json';
import * as user_actions from './modules/user'
import * as gameData_actions from './modules/gameData'
import * as record_actions from './modules/record'
import GameListTemplate from './component/gameList/gameListTemplate'
import ProfileTemplate from './component/profile/profileTemplate';
import Loading from './component/loading';

import Chartbox from './component/chartbox';
import RecentMeetTemplate from './component/recentMeet/recentMeetTemplate';

function Result({ match }) {

    // 유저의 닉네임
    const [UserName, setUserName] = useState(match.params.username)
    // 현재 페이지에 보여지고있는 게임기록 수
    const [LoadedMatchCount, setLoadedMatchCount] = useState(0);
    // 현재 유저의 데이터
    const [UserData, setUserData] = useState();
    // 게임기록들 저장
    const [Matches, setMatches] = useState([]);
    // 현재유저의 리그정보
    const [League, setLeague] = useState();
    // 로딩 여부
    const [LoadingUserInfo, setLoadingUserInfo] = useState(true);
    const [LoadingGamebox, setLoadingGamebox] = useState(true);
    const [LoadingMoreGamebox, setLoadingMoreGamebox] = useState(false);

    const [Meet, setMeet] = useState({});

    const dispatch = useDispatch()
    const store = useSelector(state => state)

    useEffect(() => {
        pageInit(UserName)
    }, [])

    const pageInit = async (name) => {

        // 유저정보 가져오기
        const user = await axios.get(lolAPI.summoner + name, { params: apiKey })
            .then((data) => { return data.data })

        // 현재 유저의 리그정보 받기
        const league = await axios.get(lolAPI.league + user.id, { params: apiKey })
            .then((data) => { return data.data })

        setUserData(user)
        dispatch(user_actions.setUserInfo(user))
        setLeague(league)

        setLoadingUserInfo(false)

        //한번에 불러올 게임의 수
        const endIndex = 2

        // 가져온 유저정보로 매치리스트 가져오기
        const matchlist = await axios.get(lolAPI.matchlist + user.accountId, {
            params: {
                "beginIndex": 0,
                "endIndex": endIndex,
                "api_key": apiKey.api_key
            }
        }).then((data) => { return data.data.matches })
        setLoadedMatchCount(endIndex)

        // 매치리스트에 있는 gameId로 각 게임기록 가져오기
        const matches = await Promise.all(
            matchlist.map(async (data) => {
                const response = await axios.get(lolAPI.matches + data.gameId, { params: apiKey });
                return response.data;
            })
        )
        setMatches(matches)
        setLoadingGamebox(false)

        let meet = {}
        matches.forEach((match) => {
            match.participantIdentities.forEach((participant) => {
                const summonerName = participant.player.summonerName

                let playerIndex = 0
                for (let i = 0; i < 10; i++) {
                    if (summonerName === store.user.name) {
                        playerIndex = i
                        break
                    }
                }
                if (summonerName === store.user.name) {
                    return false
                }
                // 현재 플레이어 팀
                let playerTeam = 0
                if (playerIndex > 5) playerTeam = 1

                // 팀의 승패 확인
                let isWin = false
                if (match.teams[playerTeam].win === 'Win') isWin = true
                let win = 0
                let lose = 0
                if (isWin) win += 1
                else lose += 1

                if (meet[summonerName] === undefined) {
                    meet[summonerName] = {
                        name: summonerName,
                        count: 1,
                        win: win,
                        lose: lose
                    }
                } else {
                    meet[summonerName].count += 1
                    meet[summonerName].win += win
                    meet[summonerName].lose += lose
                }
            })
        })

        setMeet(meet)
    }

    const getMoreMatch = async (count) => {
        setLoadingMoreGamebox(true)
        const user = UserData

        // 가져온 유저정보로 매치리스트 가져오기
        const matchlist = await axios.get(lolAPI.matchlist + user.accountId, {
            params: {
                "beginIndex": LoadedMatchCount,
                "endIndex": LoadedMatchCount + count,
                "api_key": apiKey.api_key
            }
        }).then((data) => { return data.data.matches })

        setLoadedMatchCount(LoadedMatchCount + count)

        // 매치리스트에 있는 gameId로 각 게임기록 가져오기
        const matches = await Promise.all(
            matchlist.map(async (data) => {
                const response = await axios.get(lolAPI.matches + data.gameId, { params: apiKey });
                return response.data;
            })
        )
        setMatches(Matches.concat(matches))
        setLoadingMoreGamebox(false)
    }

    return (
        <div className='board'>
            <div className="board_Side">
                <RecentMeetTemplate meet={Meet} />
                {LoadingGamebox ? <Loading /> : <Chartbox matches={Matches} />}
            </div>
            <div className='board_Main'>
                {LoadingUserInfo ? <Loading /> : <ProfileTemplate user={UserData} league={League} />}
                {LoadingGamebox ? <Loading /> : <GameListTemplate matches={Matches} />}
                {LoadingMoreGamebox ? <Loading /> : null}
                <div className="findMore" onClick={(e) => {
                    e.preventDefault()
                    // getMoreMatch(1)
                }}>
                    <span>더 보기</span>
                </div>
            </div>
        </div>
    )
}
export default withRouter(Result)