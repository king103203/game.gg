const SET_USERINFO = "SET_USERINFO";

export const setUserInfo = (accountId, id, name, profileIconId, puuid, revisionDate, summonerLevel) => ({
    type: SET_USERINFO,
    accountId,
    id,
    name,
    profileIconId,
    puuid,
    revisionDate,
    summonerLevel
})

const userInitState = {
    accountId: "",
    id: "",
    name: "",
    profileIconId: 0,
    puuid: "",
    revisionDate: 0,
    summonerLevel: 0
}

export default function user(state = userInitState, action) {
    switch (action.type) {
        case SET_USERINFO:
            return {
                ...state,
                accountId: action.accountId,
                id: action.id,
                name: action.name,
                profileIconId: action.profileIconId,
                puuid: action.puuid,
                revisionDate: action.revisionDate,
                summonerLevel: action.summonerLevel
            };
        default:
            return state;
    }
}