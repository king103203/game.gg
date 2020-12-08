import axios from 'axios';
import apiKey from './apiKey.json';

export function getSummonerInfo(summonerName) {
    return axios.get('https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + summonerName, { params: apiKey });
}