import './post.css'
import {Link} from "react-router-dom"
export default function Post({post}) {
   // console.log(post)
  return (
    <div className="post" key={post._id}>
      {post.photo&&<img className="postImg" src="" alt="thisIsImage"></img>}
      <div className="postInfo">
      <div className="postCats">
          {post.categories.map(c=>(
            <Link to={`/?cat=${c}`} className='link' key={c}>
              <span className="postCat">{c}
          </span>
            </Link>
          )) }
      </div>
      <Link className="link" to={`/post/${post._id}`}> 
        <span className="postTitle">
          {post.title}
        </span>
       </Link>
        <hr/>
        <span className="postDate">{new Date(post.createdAt).toDateString()}</span>
      </div>
        <p className="postDesc">
          {post.body}
        </p>
    </div>
  )
}
