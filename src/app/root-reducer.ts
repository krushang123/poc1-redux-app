import { combineReducers } from "redux"

import searchReducer from "components/searchSlice"

export default combineReducers({
  search: searchReducer,
})
