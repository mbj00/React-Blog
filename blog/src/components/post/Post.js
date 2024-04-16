import React from 'react'
import './post.css'
import postImg from '../../images/r.jpg'
import { Link } from 'react-router-dom'

export default function Post({ post }) {
  // console.log(post)
  const PF = "http://localhost:5000/images/"
  return (
    <div className='post'>
      {post.photo &&
        <img className="postImg" src={PF + post.photo} alt="" />
      }
      {/* <img className="postImg" src={postImg} alt="" />   Needs to be removed */}
      <div className="postInfo">
        <div className="postCats">
          {
            post.categories && post.categories.map((item) => {
              return <span className="postCat">{item}</span>
            })
          }
        </div>
        <Link to={`/post/${post._id}`} className='link'>
          <span className='postTitle'>{post.title}</span>
        </Link>
        <hr />
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <p className="postDesc">
        {post.desc}
      </p>
    </div>
  )
}
