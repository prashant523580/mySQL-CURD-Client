import {combineReducers} from "redux"
import productReducer from "./product.reducer"
const rootReducers = combineReducers({
	products:productReducer

})
export default rootReducers;
