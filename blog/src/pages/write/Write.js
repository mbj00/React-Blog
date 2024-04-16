import React, { useContext, useState } from 'react'
import './write.css'
import writeImg from '../../images/b.png'
import { Context } from '../../context/Comtext';
import axios from 'axios';

export default function Write() {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [category, setCategory] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title :title,
            desc: desc,
            categories : category
        };
        if (file) {
            const data = new FormData();
            const fileName = Date.now() +  "-" + file.name;
            data.append("name", fileName)
            data.append("file", file);
            newPost.photo = fileName;

            try {
                await axios.post("http://localhost:5000/api/upload", data)
            } catch (error) {
                console.log(error)
            }
        }

        try {
            const res = await axios.post("http://localhost:5000/api/posts", newPost);
            console.log(res)
            window.location.replace("/post/" + res.data._id)
        } catch (error) {
            console.log(error)
        }


    }

    return (
        <div className='write'>
            {
                file && <img src={URL.createObjectURL(file)} className="writeImg" alt="post_image" />
            }

            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="fileInput">
                        <i className="writeIcon fa-regular fa-square-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                    <input type="text" placeholder='Title' className='writeInput' autoFocus={true} onChange={(e)=>setTitle(e.target.value)}/>
                    <select name="category" id="" onChange={(e)=> setCategory(e.target.value)} className='categoryInput'>
                        <option value="" selected="selected">Category</option>
                        <option value="Tech">Tech</option>
                        <option value="Travel">Travel</option>
                        <option value="Music">Music</option>
                        <option value="Life">Life</option>
                        <option value="Nature">Nature</option>
                        <option value="Education">Education</option>
                        <option value="Business">Business</option>
                        <option value="Health">Health</option>
                    </select>
                </div>
                <div className="writeFormGroup">
                    <textarea placeholder='Tell your story...' type="text" className='writeInput writeText' onChange={(e)=>setDesc(e.target.value)}>
                    </textarea>
                </div>
                <button className="writeSubmit" type='submit'>Publish</button>
            </form>
        </div>
    )
}
