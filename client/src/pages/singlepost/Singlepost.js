import { useEffect,useState } from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import './singlepost.css'
export default function Singlepost() {
  const[post,setPost] = useState([])
  const location = useLocation()

  const postid = location.pathname.split('/')[2]

  useEffect(()=>[
    fetch(`/posts/post/${postid}`,{
      method:"GET",
      headers:{
        'Content-Type':"application/json"
      }
    }).then(res=>res.json())
    .then((result)=>{
      setPost(result.post)
    })
  ],[postid])
  return (
    <div className="singlePost">
        <div className="singlePostWrapper">
          <img src="https://www.apimages.com/Images/Ap_Creative_Stock_Header.jpg" alt="" className="singlePostImg"></img>
        <h1 className="singlePostTitle">
            {post.title}
            <div className="singlePostEdit">
              <i className="singlePostIcon far fa-edit"></i>
              <i className="singlePostIcon far fa-trash-alt"></i>
            </div>
        </h1>    
              <div className="singlePostInfo">
                <span className="singlePostAuthor">
                  Author: 
                  <Link to={`/?username=${post.username}`} className='link'>
                  <b>{post.username}</b>
                  </Link>
                  </span>
                <span className="singlePostDate">{new Date(post.createdAt).toDateString()}</span>
              </div>
          <p className="singlePostDesc">
            {post.body}
          </p>
        </div>
        <Sidebar></Sidebar>
    </div>
  )
}
