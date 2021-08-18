import { Link,useHistory } from "react-router-dom";
import { useState } from "react";
import "./register.css";
import { ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
export default function Register() {
  const[username,setUsername]=useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const history = useHistory()
  const handleSubmit=(e)=>{
    e.preventDefault()
    if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
      toast.error('Enter Correct Email',{
        className:"error-toast",
        position: toast.POSITION.TOP_CENTER,
      })
    }
    else{fetch('/auth/register',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({
        username,
        email,
        password
      })
    }).then(res=>res.json())
    .then(result=>{
      if(result.error){
        toast.error(result.error,{
          className:"error-toast",
          position: toast.POSITION.TOP_CENTER,
        })
      }else{        
        toast.success(result.message,{
          className:"error-toast",
          position: toast.POSITION.TOP_CENTER,
          autoClose:2000
        })
        history.push('/signin')  
      }
    }).catch(err=>{
      console.log(err)
    })}
  }
  return (
    <div className="register">
      <>
      <ToastContainer draggable={false} autoClose={3500}/>
      </>
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input className="registerInput" type="text" placeholder="Enter your username..." onChange={event=>setUsername(event.target.value)} />
        <label>Email</label>
        <input className="registerInput" type="text" placeholder="Enter your email..."  onChange={event=>setEmail(event.target.value)}/>
        <label>Password</label>
        <input className="registerInput" type="password" placeholder="Enter your password..."  onChange={event=>setPassword(event.target.value)}/>
        <button className="registerButton" >Register</button>
      </form>
        <button className="loginRegisterButton">
          <Link to="/login" className="link"> Login</Link></button>
    </div>
  );
}