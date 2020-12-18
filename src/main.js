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
import { withRouter } from 'react-router-dom';
function Main({ location, match, history }) {

    const [SummonerName, setSummonerName] = useState('')
    // const [Matches, setMatches] = useState([]);
    // const [LoadingIndicator, setLoadingIndicator] = useState(false);
    // const [MyInfo, setMyInfo] = useState();
    // const [LoadedMatchCount, setLoadedMatchCount] = useState(0);
    // const [User, setUser] = useState();
    // const [League, setLeague] = useState();

    // const store = useSelector(state => state)

    useEffect(() => {

    }, [])

    // const dispatch = useDispatch()

    const setSummonerNameState = (e) => {
        setSummonerName(e.target.value)
    }

    const test = () => {
        history.push('/result/' + SummonerName)
    }

    return (
        <div>

            <input className={'nickname'} type="text" onChange={setSummonerNameState} />

            <button className={'search'} onClick={(e) => {
                e.preventDefault()
                // getSummonerData()
            }}>받기</button>
            <button className={'search'} onClick={(e) => {
                e.preventDefault()
                // console.log(store)
                test()
            }}>확인</button>
            {/* {LoadingIndicator === true ? <Loading /> : null} */}
        </div>
    )
}
export default withRouter(Main)