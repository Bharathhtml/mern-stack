// src/pages/VerifyOTP.js
/* import React, { useState } from 'react';
import axios from 'axios';


const VerifyOTP = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post("http://localhost:5000/student/postemail", {
        email, 
        otp  // Make sure both email and otp are defined and set correctly in your state
      });
  
      console.log(response.data);
      setMessage("Thanks for logging in");
    } catch (error) {
      console.error(error);  // Log the error for debugging purposes
      setMessage("Error occurred during login");
    }
  };

  return (
    <div>
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Verify OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default VerifyOTP;  */