import { useState } from "react";
import axios from 'axios';

export default function App() {
  const [userPayload,setUserPayload]=useState({
    fullnane:'',
    username:'',
    email:'',
    mobile:'',
    password:''
  });
  const [userPayload1,setUserPayload1]=useState({
    fullnane:'',
    username:'',
    email:'',
    mobile:'',
    password:''
  });
  console.log('userPayload',userPayload);
  const handleChange=(evt)=>{
    console.log('evt.target',evt.target.name)
    setUserPayload((prev)=>{
      return {
        ...prev,
        [evt.target.name]:evt.target.value
      }
    })
  }
  const handleLogin=()=>{
    axios.post('https://lobster-app-ddwng.ondigitalocean.app/user/login',
      {
        "login_id":userPayload.email,
        "password":userPayload.password
      },
      {
        headers:{
          api_key : 'Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH'
        }
      })
      .then((res)=>{
        console.log('success login,',res);
        setUserPayload1((prev)=>{
          return {
            ...prev,
        fullnane:res.data?.message?.full_name,
        username:res.data?.message?.username,
        email:res.data?.message?.email_id,
        mobile:res.data?.message?.full_name,
          }
        })
      })
      .catch((err)=>{
        console.log('err',err);
      })
  }
  const handleSignup=()=>{
    axios.post('https://lobster-app-ddwng.ondigitalocean.app/user/register',
    {
      "full_name":userPayload.fullnane,
      "username":userPayload.username,
      "referral_id" :"",
      "email_id":userPayload.email,
      "country_row_id":"101",
      "mobile_number":userPayload.mobile,
      "password":userPayload.password,
    },
    {
      headers:{
        api_key : 'Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH'
      }
    })
    .then((res)=>{
      console.log('res=>>',res.data?.message?.token);
      localStorage.setItem('tokenId',res.data?.message?.token);
    })
    .catch((err)=>{
      console.log('err',err);
    })
  }

  return (
    <div className="App">
      <div>fullnane:<input type="text" name="fullnane" onChange={handleChange} value={userPayload.fullnane} /></div>
      <div>username: <input type="text" name="username" onChange={handleChange} value={userPayload.username} /></div>
      <div>email: <input type="text" name="email" onChange={handleChange} value={userPayload.email} /></div>
      <div>mobile: <input type="text" name="mobile" onChange={handleChange} value={userPayload.mobile} /></div>
      <div>password: <input type="text" name="password" onChange={handleChange} value={userPayload.password} /></div>
      <div onClick={handleLogin}>Login</div>
      <div onClick={handleSignup}>Signup</div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <div>{userPayload1.fullnane}</div>
      <div>{userPayload1.username}</div>
      <div>{userPayload1.mobile}</div>
      <div>{userPayload1.email}</div>
      <div>{userPayload1.password}</div>
     
    </div>
  );
}
