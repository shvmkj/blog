import "./posts.css"
import Post from "../post/Post"
export default function Posts({post}) {
 
  return (
    <div className="posts">
      {
        post.map(p=>(
          <Post post={p} key={p._id}/>
        ))
      }
    </div>
  )
}
