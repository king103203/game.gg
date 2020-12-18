import { withRouter } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import apiKey from './apiKey.json';
import lolAPI from './lolAPI.json';
import * as user_actions from './modules/user'
import * as gameData_actions from './modules/gameData'
import * as record_actions from './modules/record'
import GameboxTemplate from './component/gameboxTemplate'
import UserInfo from './component/userInfo';
import Loading from './component/loading';
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
        setLeague(league)

        setLoadingUserInfo(false)

        //한번에 불러올 게임의 수
        const endIndex = 10

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

        dispatch(user_actions.setUserInfo(user))
        // setMyInfo(<UserInfo user={user} league={league} />)
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
        <div className='userBoard'>
            {LoadingUserInfo ? <Loading /> : <UserInfo user={UserData} league={League} />}
            {LoadingGamebox ? <Loading /> : <GameboxTemplate matches={Matches} />}
            {LoadingMoreGamebox ? <Loading /> : null}
            <div className="findMore" onClick={(e) => {
                e.preventDefault()
                getMoreMatch(1)
            }}>
                <span>더 보기</span>
            </div>
            <button className={'search'} onClick={(e) => {
                e.preventDefault()
                console.log(Matches)
            }}>확인</button>
            <div>
            </div>
        </div>
    )
}
export default withRouter(Result)