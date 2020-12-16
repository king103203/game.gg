import { combineReducers } from 'redux'
import user from './user'
import record from './record'
import gameData from './gameData'

const rootReducer = combineReducers({
    user,
    record,
    gameData
})

export default rootReducer;