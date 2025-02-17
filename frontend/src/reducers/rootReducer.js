import { combineReducers } from "@reduxjs/toolkit";
import currentProductReducer from "./currentProductReducer";
import cartReducer from "./cartReducer";

const rootReducer = combineReducers({
    currentProduct : currentProductReducer,
    cart : cartReducer
})

export default rootReducer
