import { useState,useEffect } from 'react'
import {Link} from 'react-router-dom'
import './sidebar.css'

export default function Sidebar() {
  const[state,setState] = useState([])
  useEffect(() => {
    fetch('/category/',{
      method:"GET",
      headers:{
        'Content-Type':'application/json'
      }
    }).then(res=>res.json())
    .then(result=>{
      setState(result.category)
    })
  }, [])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle"> ABOUT ME</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
      <p>lorem duf sfiuhif dsifhdfi sodfjsdf sdfoei dsfijhsfid soifjif sofijie soifjisdf</p>
      </div>
      <div className="sidebarItem"></div>
        <span className="sidebarTitle"> CATEGORIES</span>
        <ul className="sideBarList">
          {
            state.map(c=>(
              <Link to={`/?cat=${c.name}`} className='link' key={c._id}>
                <li className="sidebarListItem">{c.name}</li>
              </Link>
            ))
          }
        </ul>
        <div className="sidebarItem">
          <span className="sidebarTitle">FOLLOW US</span>
          <div className="sidebarSocial">
              <i className="sidebarIcon fab fa-facebook-square"></i>
              <i className="sidebarIcon fab fa-instagram-square"></i>
              <i className="sidebarIcon fab fa-pinterest-square"></i>
              <i className="sidebarIcon fab fa-twitter-square"></i>            
          </div>
        </div>
    </div>
  )
}
