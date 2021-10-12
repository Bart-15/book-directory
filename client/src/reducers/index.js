import { combineReducers } from "redux";

import bookReducer from "./bookReducer"
import errorReducer from "./errorReducer"
export default combineReducers({
    book: bookReducer,
    errors: errorReducer
})