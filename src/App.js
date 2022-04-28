import React,{useEffect,useState} from "react";
import './App.css';

import {useDispatch,useSelector} from "react-redux";
import {getAllProducts} from "./redux/actions/index.action";
import FacebookLogin from "react-facebook-login";

import {GoogleLogin} from "react-google-login";
function App() {

const [fbUser,setFbUser] = useState();
const [googleUser,setGoogleUser] = useState();
const [isLogin,setIsLogin] = useState(false);
const products = useSelector(state => state.products)
const dispatch = useDispatch();
const googleLoginSuccess = (res) => {
	alert(JSON.stringify(res.profileObj))
	setGoogleUser(res.profileObj)
}
const googleLoginFailure = () => {}
function componentClicked(){
	
}
function responseFacebook(response){
	setFbUser(response)
	setIsLogin(true)
	alert(JSON.stringify(response));
}
useEffect(() =>{
  dispatch(getAllProducts());
},[])
useEffect(() =>{
  alert(JSON.stringify(products))
},[])
  return (
<>

</>
 );
}

export default App;
