// src/OTPValidation.js
import React, { useState } from 'react';
import axios from 'axios';

function OTPValidation() {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/validate-otp', { email, otp });
            setMessage("otp successfull");
        } catch (error) {
            setMessage('Invalid OTP');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>
                <label>
                    OTP:
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                </label>
                <button type="submit">Validate OTP</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default OTPValidation;