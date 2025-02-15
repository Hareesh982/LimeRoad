import { combineReducers } from "@reduxjs/toolkit";
import currentProductReducer from "./currentProductReducer";

const rootReducer = combineReducers({
    currentProduct : currentProductReducer,
})

export default rootReducer
