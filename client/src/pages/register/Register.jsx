import "./register.css"
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Login from "../login/Login"


export default function Register() {

  const [username,setUsername] =useState("")
  const [email,setEmail] =useState("")
  const [password,setPassword] =useState("")
  const [error,setError] =useState(false)

  const handleSubmit= async(e)=>{
    e.preventDefault()
    setError(false)
   try{ 
    
    const res= await axios.post("http://localhost:5000/server/auth/register",{
      username,
      email,
      password,
    })
    res.data && window.location.replace("/newsSelect")
  }
    catch(err){
      console.log(err)
      setError(true)
    }
   
  }

const containerNew = document.getElementById('containerNew');


const handleClick2= async(e)=>{
  e.preventDefault()
  containerNew.classList.add('right-panel-active');
}
const handleClick1= async(e)=>{
  e.preventDefault()
  containerNew.classList.remove('right-panel-active');

}


  return (
    <div className="body">
    <div class="containerNew" id="containerNew">
    <div class="form-container sign-up-container">
    
   <form  className="registerForm" onSubmit={handleSubmit} >
   <h1>Create Account</h1>
        <label >Username</label>
        <input 
        type="text" 
        className="registerInput" 
        placeholder="Enter your username..."
        onChange={(e)=>setUsername(e.target.value)}
        ></input>


        <label >Email</label>
        <input type="text" className="registerInput" placeholder="Enter your email..."         onChange={(e) =>setEmail(e.target.value)}
></input>


        <label >Password</label>
        <input 
        type="password" 
        className="registerInput"  
        placeholder="Enter your password..."
        onChange={(e) =>setPassword(e.target.value)}
></input>


      <button className="registerButton" type="submit">Register</button>
      
      {/* <button className="registerLoginButton">
        <Link to="/login" className="link">Login</Link>
      </button> */}
      {error && <span className="errBtn">Something went wrong</span>}
      </form>
    </div>
    <Login />
    <div class="overlay-container">
            <div class="overlay">
                <div class="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info and keep shopping.</p>
                    <button class="ghost" id="signIn" onClick={handleClick1}>  Sign In</button>
                </div>
                <div class="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and get updated with our latest news</p>
                    <button class="ghost" id="signUp" onClick={handleClick2}>Sign Up</button>
                </div>
            </div>
        </div>
    
    </div>
</div>
  )
}
