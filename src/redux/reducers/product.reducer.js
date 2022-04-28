import {productConstants} from "../actions/constants";


const initState = {
  products: [],
  loading: false,
  error : null
}


const productReducer = (state=initState,action) => {
      switch(action.type){
	case productConstants.GET_PRODUCT_REQUEST:
	     state={
		...state,
		loading: true
		}
	     break;
	case productConstants.GET_PRODUCT_SUCCESS:
	     state={
		...state,
		products: action.payload.products,
		loading: false
	     }
	    break;
	case productConstants.GET_PRODUCT_FAILURE:
	    state={
		...state,
		loading: false,
		error:action.payload.error
	    };
	    break;
	default:
	    state={...initState}
	    break;
      }
 return state;
}

export default productReducer;
