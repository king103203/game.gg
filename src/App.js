import './App.css';
import * as lolAPI from './services/lolAPI';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

function App() {

  const [SummonerName, setSummonerName] = useState('');

  const setSummonerNameState = (e) => {
    setSummonerName(e.target.value);
  }

  const dispatch = useDispatch()

  const userdata = useSelector(state => state.user)

  const inputUserData = () => {
    lolAPI.getSummonerInfo(SummonerName, dispatch)
  }

  return (
    <div className="App">
      <input type="text" onChange={setSummonerNameState} />
      <button onClick={(e) => {
        e.preventDefault()
        inputUserData()
      }}>받기</button>

      <button onClick={(e) => {
        e.preventDefault()
        console.log(userdata)
      }}>확인</button>
    </div >
  );
}

export default App;
