import React, { useEffect, useState } from 'react'
import './sidebar.css'
import me from '../../images/g.jpg'
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function Sidebar() {
    const [cat, setCat] = useState([]);

    useEffect(()=>{
        const getCat = async ()=>{
            const res = await axios.get('http://localhost:5000/api/category');
            console.log(res);
            setCat(res.data);
        }
        getCat();
    },[])
    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src={me} alt="" />
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing
                    elit. Praesentium, distinctio ut hic quos
                    cumque quasi est aut optio corrupti neque.</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORIES</span>
                <ul className="sidebarList">

                    { cat && cat.map((item)=>{
                        return <Link to={`/?cat=${item.name}`} className='link'>
                        <li className="sidebarListItem">{item.name}</li>
                        </Link>
                    })}
                    
                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebarIcon fa-brands fa-facebook-f"></i>
                    <i className="sidebarIcon fa-brands fa-twitter"></i>
                    <i className="sidebarIcon fa-brands fa-instagram"></i>
                    <i className="sidebarIcon fa-brands fa-whatsapp"></i>
                </div>
            </div>
        </div>
    )
}
