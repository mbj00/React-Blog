import React, { useContext } from 'react'
import './navbar.css'
import topImg from '../../images/q.jpg'
import { Link } from 'react-router-dom';
import { Context } from '../../context/Comtext';

export default function Navbar() {
  const { user, dispatch } = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  }

  const PF = "http://localhost:5000/images/";
  return (
    <div className='top'>

      <div className="topleft">
        <i className="topIcon fa-brands fa-facebook-f"></i>
        <i className="topIcon fa-brands fa-twitter"></i>
        <i className="topIcon fa-brands fa-instagram"></i>
        <i className="topIcon fa-brands fa-whatsapp"></i>
      </div>

      <div className="topcenter">

        <ul className="toplist">
          <li className='toplistItem'>
            <Link to='/' className='link'>HOME</Link>
          </li>
          <li className='toplistItem'>
            <Link to='/about' className='link'>ABOUT</Link>
          </li>
          <li className='toplistItem'>
            <Link to='/contact' className='link'>CONTACT</Link>
          </li>
          <li className='toplistItem'>
            <Link to='/write' className='link'>WRITE</Link>
          </li>
          <li className='toplistItem'>
            <Link to='/' className='link' onClick={handleLogout}>
              {user && "LOGOUT"}
            </Link>
          </li>
        </ul>
      </div>

      <div className="topright">
        {user ?
          <Link to="/settings" className='.link'>
            <img className="topImg" src={PF + user.profilepic} alt="not found" />
          </Link>
          :
          (<ul className="toplist">
            <li className='toplistItem'><Link to='/login' className='link'>LOGIN</Link></li>
            <li className='toplistItem'><Link to='/register' className='link'>REGISTER</Link></li>
          </ul>)}

        <i className="topSearhIcon fa-solid fa-magnifying-glass"></i>
      </div>

    </div>
  )
}
