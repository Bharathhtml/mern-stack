// src/OTPRequest.js
import React, { useState } from 'react';
import axios from 'axios';

function OTPRequest() {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/request-otp', { email });
            setMessage('OTP sent to your email');
        } catch (error) {
            setMessage('Error sending OTP');
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
                <button type="submit">Request OTP</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
}

export default OTPRequest;