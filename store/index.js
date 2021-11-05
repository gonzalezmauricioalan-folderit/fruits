import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import fruits from './fruits'

const reducer = combineReducers({
    fruits
})
const store = configureStore({
  reducer,
})
export default store;