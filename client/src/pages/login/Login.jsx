import "./login.css"
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { useContext, useRef } from "react";
import { Context } from "../../context/Context";
import axios from "axios";

export default function Login() {

  const  userRef=useRef();
  const passwordRef=useRef();
  const {dispatch,isFetching} =useContext(Context)

  const handleSubmit= async(e) =>{
    e.preventDefault()
    dispatch({type:"LOGIN_START"})
    try{
      const res=await axios.post("http://localhost:5000/server/auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value,
      })
      console.log(res.data);
      localStorage.setItem("userId", res.data._id);
      dispatch({type:"LOGIN_SUCCESS",payload: res.data}) 
      window.location.href='newsSelect'
    
  
    }
    catch(err){
      dispatch({type:"LOGIN_FAILURE"})
    }
  }
  console.log(isFetching)

  return (
    <div className=".body">
    <div className="form-container sign-in-container">
    
      <form  className="loginForm form"  onSubmit={handleSubmit}>
      <h1 className="h1">Sign in</h1>
        <label >Username</label>
        <input 
        type="text" 
        className="loginInput input" 
        placeholder="Enter your username..."
        ref={userRef}
        ></input>
        <label >Password</label>
        <input type="password"className="loginInput"  placeholder="Enter your password..." ref={passwordRef}></input>
      <button className="loginButton button"  type="submit" disabled={isFetching}>Login</button>
      </form>
      <button className="loginRegisterButton button">
      <Link to="/register" className="link">Register</Link></button>
      
      </div>
    </div>
  )
}
