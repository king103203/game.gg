import './App.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import apiKey from './apiKey.json';
import lolAPI from './lolAPI.json';
import * as user_actions from './modules/user'
import * as record_actions from './modules/record'
import GameboxTemplate from './component/gameboxTemplate'

function App() {

  const [SummonerName, setSummonerName] = useState('')
  const [MatchList, setMatchList] = useState('')

  const dispatch = useDispatch()
  const State = useSelector(state => state)

  const setSummonerNameState = (e) => {
    setSummonerName(e.target.value)
  }

  const setMatchListState = () => {
    setMatchList(State.record.matches)
  }

  const getSummonerData = () => {
    axios.get(lolAPI.summoner + SummonerName, { params: apiKey }).then(
      (userData) => {
        dispatch(user_actions.setUserInfo(userData.data))
        axios.get(lolAPI.matchlist + userData.data.accountId, {
          params: {
            "beginIndex": 0,
            "endIndex": 2,
            "api_key": apiKey.api_key
          }
        }).then(
          (matchlistData) => {
            matchlistData.data.matches.forEach((matches) => {
              axios.get(lolAPI.matches + matches.gameId, { params: apiKey }).then(
                (matchesData) => {
                  dispatch(record_actions.inputMatches(matchesData.data))
                }
              )
            })
          }
        )
      }
    )
  }

  return (
    <div className="App">
      <input type="text" onChange={setSummonerNameState} />
      <button onClick={(e) => {
        e.preventDefault()
        getSummonerData()
      }}>받기</button>

      <button onClick={(e) => {
        e.preventDefault()
        setMatchListState()
      }}>확인</button>

      <GameboxTemplate matchlist={MatchList} />
    </div >
  );
}

export default App;
