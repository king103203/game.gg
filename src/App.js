import './App.css';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import lolAPI from './lolAPI.json';
import * as gameData_actions from './modules/gameData'
import Main from './main'
import Result from './result'
import { Route } from 'react-router-dom';

function App() {

  const dispatch = useDispatch()

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

    const gameData = await Promise.all([champion, item, spell, rune, version])
      .then((result) => { return result })
    console.log('gameData', gameData)
    dispatch(gameData_actions.inputGameData(gameData))
  }

  useEffect(() => {
    getAssetData()
  }, [getAssetData])

  return (
    <div className="App">
      <Route exact path="/" component={Main} />
      <Route path="/result/:username" component={Result} />
    </div >
  );
}

export default App;
