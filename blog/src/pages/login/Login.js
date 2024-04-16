import React, { useContext, useRef } from 'react'
import './login.css'
import { Link } from "react-router-dom";
import { Context } from '../../context/Comtext';
import axios from "axios";
// import { LoginSuccess, LoginStart, LoginFailure} from '../../context/Actions';

export default function Login() {
 
  const userRef = useRef();
  const passwordRef = useRef();
  const {user, dispatch, isFetching} = useContext(Context)

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({type: "LOGIN_START"});
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username : userRef.current.value,
        password : passwordRef.current.value
      });
      // console.log(res.data);
      dispatch({type: "LOGIN_SUCCESS", payload : res.data});
      // window.location.replace("/")
    } catch (error) {
      console.log("eror occured")
      dispatch({type: "LOGIN_FAILURE"});
    }
  }
  console.log(user);
  console.log(isFetching)
  return (
    <div className='login'>
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <input type="text" className="loginInput" placeholder='Enter your Username...' ref={userRef}/>
        <label htmlFor="">Password</label>
        <input type="password" className="loginInput" placeholder='Enter your Password...' ref={passwordRef}/>
        <button className='loginButton' type='Submit' disabled={isFetching}>Login</button>
      </form>
      <button className="loginRegisterButton">
        <Link to='/register' className='link'>Register</Link>
      </button>
    </div>
  )
}
