import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import { fruitReducer } from './fruits'

const reducer = combineReducers({
  fruits: fruitReducer
})
const store = configureStore({
  reducer,
})
export default store;