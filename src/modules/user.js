const SET_USERINFO = "SET_USERINFO";

export const setUserInfo = (user) => ({
    type: SET_USERINFO,
    user
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
                accountId: action.user.accountId,
                id: action.user.id,
                name: action.user.name,
                profileIconId: action.user.profileIconId,
                puuid: action.user.puuid,
                revisionDate: action.user.revisionDate,
                summonerLevel: action.user.summonerLevel
            };
        default:
            return state;
    }
}