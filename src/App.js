import './App.css';
import * as lolAPI from './services/lolAPI';
import { useState } from 'react';

function App() {

  const [SummonerName, setSummonerName] = useState('');

  const setSummonerNameState = (e) => {
    setSummonerName(e.target.value);
  }

  return (
    <div className="App">
      <input type="text" onChange={setSummonerNameState} />
      <button onClick={(e) => {
        e.preventDefault()
        console.log(lolAPI.getSummonerInfo(SummonerName))
      }}>받기</button>
    </div>
  );
}

export default App;
