import axios from 'axios'
import React, { useState } from 'react'

function ValidateOtp() {
    const[email,setEmail]=useState("")
    const[otp,setOtp]=useState("")
    const[message,setMessage]=useState("")
    function one(e){
        setEmail(e.target.value)
}
function two(e){
    setOtp(e.target.value)
}
function three(e){
    e.preventDefault()
    axios.post("http://localhost:5000/validate/otp",{email,otp})
    .then((response)=>{
        console.log(response.data)
        setMessage("otp is valid")
    })
    .catch((error)=>{
        console.log(error)
        setMessage("invalid otp")
    })
}
  return (
    <div>
        <form onSubmit={three}>
        <label>Email:</label>
        <input type="text" placeholder="enter your email" required onChange={one} value={email}/>
        <label>otp:</label>
        <input type="text" placeholder="enter your email" required onChange={two} value={otp}/>
 <button type="submit">validate</button>
        </form>
        {message && <h3>{message}</h3>}
           </div>
  )
}

export default ValidateOtp;