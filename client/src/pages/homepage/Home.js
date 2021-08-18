import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts.jsx";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const {search} = useLocation()
  useEffect(()=>{
    fetch('/posts'+search,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
    })
    .then(res=>res.json())
    .then(result=>{
      setPosts(result.posts)
    }).catch(err=>{
      console.log(err)
    })
  },[search])
  console.log(search)
return (
    <>
      <Header />
      <div className="home">
        <Posts post={posts}></Posts>
        <Sidebar />
      </div>
    </>
  );
}