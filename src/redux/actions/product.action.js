import {productConstants} from "./constants";
import axios from "../../helpers/axios";
export const getAllProducts =() => {
   return async dispatch =>{
	dispatch({
	    type: productConstants.GET_PRODUCT_REQUEST
	})
	let res = await axios.get("/");
	alert(JSON.stringify(res.data));
   }
}
