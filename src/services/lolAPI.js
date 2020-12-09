import axios from 'axios';
import apiKey from './apiKey.json';
import user, * as actions from '../modules/user'

export function getSummonerInfo(summonerName, dispatch) {

    axios.get('https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName, { params: apiKey }).then(
        (user) => {
            dispatch(actions.setUserInfo(
                user.data
            ))
            axios.get('https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/' + user.data.accountId, {
                params: {
                    "beginIndex": 0,
                    "endIndex": 20,
                    "api_key": apiKey.api_key
                }
            }).then(
                (matchlist) => {
                    console.log(matchlist.data.matches)
                }
            )
        }
    )
}
