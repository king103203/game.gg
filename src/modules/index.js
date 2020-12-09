import { combineReducers } from 'redux'
import user from './user'
import record from './record'

const rootReducer = combineReducers({
    user,
    record
})

export default rootReducer;