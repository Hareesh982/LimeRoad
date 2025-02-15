import { configureStore } from "@reduxjs/toolkit";
import rootReducer from './reducers/rootReducer'

let store = configureStore({reducer : rootReducer})

export default store;