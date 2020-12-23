import { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

function Main({ history }) {

    const [SummonerName, setSummonerName] = useState('')

    useEffect(() => {

    }, [])

    const setSummonerNameState = (e) => {
        setSummonerName(e.target.value)
    }

    return (
        <div>

            <input className={'nickname'} type="text" onChange={setSummonerNameState} />

            <button className={'search'} onClick={(e) => {
                e.preventDefault()
            }}>받기</button>
            <button className={'search'} onClick={(e) => {
                e.preventDefault()
                history.push('/result/' + SummonerName)
            }}>확인</button>
        </div>
    )
}
export default withRouter(Main)