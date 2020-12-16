import './App.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import apiKey from './apiKey.json';
import lolAPI from './lolAPI.json';
import * as user_actions from './modules/user'
import * as record_actions from './modules/record'
import GameboxTemplate from './component/gameboxTemplate'
import { version } from 'react-dom';

function App() {

  const [SummonerName, setSummonerName] = useState('')
  const [Matches, setMatches] = useState([]);

  let champion = ''
  let item = ''
  let spell = ''

  const cdn_url = 'http://ddragon.leagueoflegends.com/cdn/'

  useEffect(() => {
    getAssetData()
  })

  const getAssetData = async () => {
    const version = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
      .then((response) => { return response.data[0] })

    axios.get(cdn_url + version + '/data/ko_KR' + '/champion.json')
      .then((response) => { champion = response.data.data })
    item = axios.get(cdn_url + version + '/data/ko_KR' + '/item.json')
      .then((response) => { item = response.data.data })
    spell = axios.get(cdn_url + version + '/data/ko_KR' + '/summoner.json')
      .then((response) => { spell = response.data.data })
  }

  const dispatch = useDispatch()

  const setSummonerNameState = (e) => {
    setSummonerName(e.target.value)
  }

  const getSummonerData = async () => {

    // 유저정보 가져오기
    const user = await axios.get(lolAPI.summoner + SummonerName, { params: apiKey })
      .then((data) => { return data.data })

    // 유저정보 스토어에 저장
    dispatch(user_actions.setUserInfo(user))

    // 가져온 유저정보로 매치리스트 가져오기
    const matchlist = await axios.get(lolAPI.matchlist + user.accountId, {
      params: {
        "beginIndex": 0,
        "endIndex": 1,
        "api_key": apiKey.api_key
      }
    }).then((data) => { return data.data.matches })
    console.log(matchlist)

    // 매치리스트에 있는 gameId로 각 게임기록 가져오기
    const matches = await Promise.all(
      matchlist.map(async (match) => {
        const response = await axios.get(lolAPI.matches + match.gameId, { params: apiKey });
        return response.data;
      })
    )

    setMatches(matches)
  }

  return (
    <div className="App">
      <div>
        <input className={'nickname'} type="text" onChange={setSummonerNameState} />
        <button className={'search'} onClick={(e) => {
          e.preventDefault()
          getSummonerData()
        }}>받기</button>

        <button onClick={(e) => {
          e.preventDefault()
          console.log(Matches)
        }}>확인</button>

      </div>
      <GameboxTemplate matches={Matches} />
    </div >
  );
}

export default App;
