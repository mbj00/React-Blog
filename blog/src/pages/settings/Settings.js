import React, { useContext, useState } from 'react'
import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Comtext'
import axios from 'axios';

export default function Settings() {
    const PF = "http://localhost:5000/images/";
    const { user, dispatch } = useContext(Context);

    const [file, setFile] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const[success, setSuccess] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({type:"UPDATE_START"});
        const updateUser = {
            userId: user._id,
            username, 
            email, 
            password
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() +  "-" + file.name;
            data.append("name", fileName)
            data.append("file", file);
            updateUser.profilepic = fileName;

            try {
                await axios.post("http://localhost:5000/api/upload", data)
            } catch (error) {
                console.log(error)
            }
        }

        try {
            const res = await axios.put("http://localhost:5000/api/users/"+user._id, updateUser);
            setSuccess(true);
            dispatch({type:"UPDATE_SUCCESS", payload : res.data});
        } catch (error) {
            dispatch({type:"UPDATE_FAILURE"});
            console.log(error)
        }
    }


    return (
        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update your Account</span>
                    <span className="settingsDeleteTitle">Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={ file ? URL.createObjectURL(file) : (PF + user.profilepic) } alt="" srcset="" />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input type="file" name="" id="fileInput" style={{ display: "none" }} onChange={(e)=>setFile(e.target.files[0])}/>
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={(e)=>setUsername(e.target.value)}/>
                    <label>E-mail</label>
                    <input type='email' placeholder={user.email} onChange={(e)=>setEmail(e.target.value)}/>
                    <label>Password</label>
                    <input type="password" onChange={(e)=>setPassword(e.target.value)}/>
                    <button className="settingsSubmit" type='submit'>Update</button>
                    {
                        success && <span style={{color: "green"}}>Profile has been updated</span>
                    }
                </form>
            </div>
            <Sidebar />
        </div>
    )
}
