import './App.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';
import apiKey from './apiKey.json';
import lolAPI from './lolAPI.json';
import * as user_actions from './modules/user'
import * as gameData_actions from './modules/gameData'
import * as record_actions from './modules/record'
import GameboxTemplate from './component/gameboxTemplate'

function App() {

  const [SummonerName, setSummonerName] = useState('')
  const [Matches, setMatches] = useState([]);

  const store = useSelector(state => state)

  let gameData = []

  useEffect(() => {
    getAssetData()
  })

  const getAssetData = async () => {

    const version = await axios.get('https://ddragon.leagueoflegends.com/api/versions.json')
      .then((response) => { return response.data[0] })

    const champion = axios.get(lolAPI.cdnURL + version + '/data/ko_KR/champion.json')
      .then((response) => {
        const json = response.data.data
        const new_json = {}

        for (let key in json) {
          new_json[json[key].key] = json[key]
        }

        return new_json
      })

    const spell = axios.get(lolAPI.cdnURL + version + '/data/ko_KR/summoner.json')
      .then((response) => {
        const json = response.data.data
        const new_json = {}

        for (let key in json) {
          new_json[json[key].key] = json[key]
        }

        return new_json
      })

    const item = axios.get(lolAPI.cdnURL + version + '/data/ko_KR/item.json')
      .then((response) => { return response.data.data })

    const rune = axios.get(lolAPI.cdnURL + version + '/data/ko_KR/runesReforged.json')
      .then((response) => {
        const json = response.data
        const new_json = {}

        for (let big of json) {

          new_json[big.id] = {
            icon: big.icon,
            id: big.id,
            key: big.key,
            name: big.name
          }

          for (let middle of big.slots) {
            for (let small of middle.runes) {
              new_json[small.id] = small
            }
          }
        }
        return new_json
      })

    gameData = await Promise.all([champion, item, spell, rune, version])
      .then((result) => { return result })

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
    if (store.gameData === null)
      dispatch(gameData_actions.inputGameData(gameData))


    // 가져온 유저정보로 매치리스트 가져오기
    const matchlist = await axios.get(lolAPI.matchlist + user.accountId, {
      params: {
        "beginIndex": 0,
        "endIndex": 1,
        "api_key": apiKey.api_key
      }
    }).then((data) => { return data.data.matches })

    // 매치리스트에 있는 gameId로 각 게임기록 가져오기
    const matches = await Promise.all(
      matchlist.map(async (match) => {
        const response = await axios.get(lolAPI.matches + match.gameId, { params: apiKey });
        return response.data;
      })
    )

    dispatch(user_actions.setUserInfo(user))
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
          console.log(store)
          console.log(Matches)
        }}>확인</button>

      </div>
      <GameboxTemplate matches={Matches} />
    </div >
  );
}

export default App;
