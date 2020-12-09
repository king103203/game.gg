const INPUT_MATCHLIST = "INPUT_MATCHLIST";
const INPUT_MATCHES = "INPUT_MATCHES";

export const inputMatchList = (matchlist) => ({
    type: INPUT_MATCHLIST,
    matchlist
})

export const inputMatches = (matches) => ({
    type: INPUT_MATCHES,
    matches
})

const matchlistInitState = {
    matchlist: {},
    matches: []
}

export default function record(state = matchlistInitState, action) {
    switch (action.type) {
        case INPUT_MATCHLIST:
            return {
                ...state,
                matchlist: action.matchlist
            };
        case INPUT_MATCHES:
            return {
                ...state,
                matches: state.matches.concat(action.matches)
            };
        default:
            return state;
    }
}