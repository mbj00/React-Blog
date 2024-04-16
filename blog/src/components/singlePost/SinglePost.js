import React, { useContext, useEffect, useState } from 'react'
import './singlePost.css'
import { Link, useLocation } from 'react-router-dom'
import axios from 'axios';
import { Context } from '../../context/Comtext';

export default function SinglePost() {
    const [post, setPost] = useState({});
    const location = useLocation('');
    const PF = "http://localhost:5000/images/";
    const { user } = useContext(Context)
    const path = location.pathname.split('/')[2];

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [updateMode, setUpdateMode] = useState(false);


    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get('http://localhost:5000/api/posts/' + path);
            console.log(res);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    }, [path]);

    const handleDelete = async () => {
        try {
            const res = await axios.delete("http://localhost:5000/api/posts/" + post._id,
                { data: { username: user.username } }
            )
            alert("Your post has been deleted");
            window.location.replace("/");
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdate = async ()=>{
        try {
            await axios.put("http://localhost:5000/api/posts/" + post._id,
                { username: user.username, title, desc }
            )
            alert("Your post has been updated");
            //window.location.reload();
            setUpdateMode(false);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo && <img src={PF + post.photo} alt="" className="singlePostImage" />
                }
                {
                    updateMode ? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e)=>setTitle(e.target.value)}/> :
                        (
                            <h1 className="singlePostTitle">
                                {title}
                                {post.username === user?.username && (
                                    <div className="singlePostEdit">
                                        <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={(e) => setUpdateMode(true)}></i>
                                        <i className="singlePostIcon fa-regular fa-trash-can" onClick={handleDelete}></i>
                                    </div>
                                )}

                            </h1>
                        )
                }

                <div className="singlePostInfo">
                    <span className='singlePostAuthor'>
                        Author :
                        <Link to={`/?user=${post.username}`} className='link'>
                            <b>{post.username}</b>
                        </Link>
                    </span>
                    <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
                </div>
                {updateMode ? <input type="text" value={desc} className='singlePostDescInput' onChange={(e)=>setDesc(e.target.value)}/> : (
                    <p className='singlePostDesc'>
                        {desc}
                    </p>
                )}
                {
                  updateMode &&  <button className='singlePostButton' onClick={handleUpdate}>Update</button>
                }

            </div>
        </div>
    )
}
