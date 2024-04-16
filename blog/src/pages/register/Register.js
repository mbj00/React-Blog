import React, { useState } from 'react'
import './register.css'
import { Link } from 'react-router-dom'
import axios from 'axios';

export default function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [noData, setNodata] = useState(false);

  const handleSubmit = async (e)=>{
    e.preventDefault();

    try {
      if(username && email && password){
        const res = await axios.post('http://localhost:5000/api/auth/register', {username, email, password});
      // console.log(res);
      res.data && window.location.replace('/login')
      }else{
        setNodata(true);
      }
    } catch (error) {
      console.log(error);
      setError(true)
    }
   
  }
  return (
    <div className='register'>
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
      <label htmlFor="">Username</label>
        <input type="text" onChange={(e)=>setUsername(e.target.value)} className="registerInput" placeholder='Enter your Username...' />
        <label htmlFor="">E-maail</label>
        <input type="text" onChange={(e)=>setEmail(e.target.value)} className="registerInput" placeholder='Enter your E-mail...' />
        <label htmlFor="">Password</label>
        <input type="password" onChange={(e)=>setPassword(e.target.value)} className="registerInput" placeholder='Enter your Password...' />
        <button className='registerButton' type='Submit'>Register</button>
        {error && <span style={{color: "red"}}>Something went wrong!</span>}
        {noData && <span style={{color: "red"}}>Please fill all the details...</span>}     
      </form>
      <button className="registerLoginButton">
        <Link to="/login" className='link'>Login</Link>
      </button>
    </div>
  )
}
