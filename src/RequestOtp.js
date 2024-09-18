import React, { useState } from 'react'
import axios from 'axios'

function RequestOtp() {
    const[email,setEmail]=useState("")
    const[message,setMessage]=useState("")
    
    function one(e){
        setEmail(e.target.value)
    }
    function two(e){
        e.preventDefault()
        axios.post("http://localhost:5000/request/otp",{email})
        .then((response)=>{
            console.log(response.data)
            setMessage("otp sent successfully")
        })
        .catch((error)=>{
            console.log(error)
            setMessage("error in sending otp")
        })
        
    }

  return (
    <div>
        <form onSubmit={two}>
        <label>Email:</label>    
    <input type="text" placeholder="enter your email" required onChange={one} value={email}/>&nbsp;
    <button>sent otp</button>
        </form>
        {message && <h3>{message}</h3>}
     
    </div>
  )
}

export default RequestOtp