const INPUT_GAMEDATA = "INPUT_GAMEDATA";

export const inputGameData = (data) => ({
    type: INPUT_GAMEDATA,
    data
})

export default function gamedata(state = null, action) {
    switch (action.type) {
        case INPUT_GAMEDATA:
            return {
                ...state,
                champion: action.data[0],
                item: action.data[1],
                spell: action.data[2],
                rune: action.data[3],
                version: action.data[4]
            };
        default:
            return state;
    }
}