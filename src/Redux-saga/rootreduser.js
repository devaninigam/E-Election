import { combineReducers } from 'redux'
import ElectionReducer from '../Redux-saga/Admin_Code/Admin/Election/reducer/reducer'
import PartyReducer from '../Redux-saga/Admin_code/Admin/Partys/reducer/reducer'
import PartyConnectReducer from '../Redux-saga/Admin_code/Admin/PartyConnect/reducer/reducer'
import TotalCountReducer from '../Redux-saga/Admin_code/Admin/TotalCount/reducer/reducer'

// VOTE REDUCER
import voteReducer from './User_code/voting/reducer'

const RootReducer = combineReducers({
  // ELECTION IMPORT REDUCER 
  ElectionReducer,
  PartyReducer,
  PartyConnectReducer,
  TotalCountReducer,

  // VOTE REDUCER
  voteReducer
})
export default RootReducer