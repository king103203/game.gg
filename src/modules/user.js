const SET_USERINFO = "SET_USERINFO";

export const setUserInfo = (user) => ({
    type: SET_USERINFO,
    user
})

const userInitState = {
    user: {}
}

export default function user(state = userInitState, action) {
    switch (action.type) {
        case SET_USERINFO:
            return {
                ...state,
                user: action.user
            };
        default:
            return state;
    }
}