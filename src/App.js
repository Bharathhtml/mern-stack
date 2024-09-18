import React, { useEffect, useState } from "react";
import axios from 'axios';

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [emailError, setEmailError] = useState(""); // State for email error
  const [nameError, setNameError] = useState(""); // State for name error
  const [ageError, setAgeError] = useState(""); // State for age error
  const[backendError,setBackendError]=useState("")

  // Handlers for form inputs
  function one(e) {
    setName(e.target.value);
    validateName(e.target.value);  // Validate name on input change
  }
  function two(e) {
    setAge(e.target.value);
    validateAge(e.target.value);  // Validate age on input change
  }
  function three(e) {
    setCity(e.target.value);
  }
  function five(e) {
    setEmail(e.target.value);
    validateEmail(e.target.value);  // Validate email on input change
  }

  // Function to validate name (should contain only letters)
  function validateName(name) {
    const nameRegex = /^[A-Za-z\s]+$/; // Regex to allow only alphabets and spaces
    if (!nameRegex.test(name)) {
      setNameError("Name must contain only letters"); // Set error message if invalid
    } else {
      setNameError(""); // Clear error message if valid
    }
  }

  // Function to validate age (should contain only numbers)
  function validateAge(age) {
    const ageRegex = /^[0-9]+$/; // Regex to allow only numbers
    if (!ageRegex.test(age)) {
      setAgeError("Age must be a number"); // Set error message if invalid
    } else {
      setAgeError(""); // Clear error message if valid
    }
  }

  // Function to validate email using regex
  function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Invalid email format"); // Set error message if invalid
    } else {
      setEmailError(""); // Clear error message if valid
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Prevent submission if there are validation errors
    if (emailError || nameError || ageError) {
      return;
    }

    if (isEditing) {
      axios.put(`http://localhost:5000/student/update/${editId}`, { name, email, age, city })
        .then((response) => {
          console.log(response.data);
          bharath();
          setIsEditing(false);
          setEditId(null);
        })
        .catch((error) => {
          console.log("error", error);
        });
    } else {
      axios.post("http://localhost:5000/student/post", { name, email, age, city })
        .then((response) => {
          console.log(response.data);
          bharath();
        })
        .catch((error) => {
        if(error.response && error.response.data.message==="email already exists"){
          setEmailError("email already exists, enter new email")
        }else{
          setBackendError("email already exists,please enter new email")
          setEmail(email)
          setAge(age)
          setName(name)
          setCity(city)
          
        }





        });
    }

    setName("");
    setAge("");
    setEmail("");
    setCity("");
    setBackendError("")
  }

  // Fetch the list of products (students) from the backend
  async function bharath() {
    const response = await fetch("http://localhost:5000/student/get");
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    bharath();
  }, []);

  // Function to delete a record
  function Delete(id) {
    fetch(`http://localhost:5000/student/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        bharath();
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  // Function to edit a record
  function handleEdit(item) {
    setName(item.name);
    setAge(item.age);
    setEmail(item.email);
    setCity(item.city);
    setEditId(item._id);
    setIsEditing(true);
  }

  return (
    <div className="container">
      <center>
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <label>Name:</label>
            <input
              onChange={one}
              type="text"
              className="form-control"
              value={name}
              required
            />
            {/* Display name error message */}
            {nameError && (
              <p className="text-danger">{nameError}</p>
            )}
          </div>
          <div className="col-md-6">
            <label>Age:</label>
            <input
              onChange={two}
              type="text"
              className="form-control"
              value={age}
              required
            />
            {/* Display age error message */}
            {ageError && (
              <p className="text-danger">{ageError}</p>
            )}
          </div>
          <div className="col-md-6">
            <label>Email:</label>
            <input
              onChange={five}
              type="text"
              className="form-control"
              value={email}
              required
            />
            {/* Display email error message */}
            {emailError && (
              <p className="text-danger">{emailError}</p>
            )}
              {backendError && (
                <p className="text-danger">{backendError}</p>
            )}
          </div>
          <div className="col-md-6">
            <label>City:</label>
            <input
              onChange={three}
              type="text"
              className="form-control"
              value={city}
              required
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-success w-100">
              {isEditing ? "Update" : "Submit"}
            </button>
          </div>
        </form>

        <div className="table-responsive mt-4">
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Name</th>
                <th>Age</th>
                <th>Email</th>
                <th>City</th>
                <th>Options</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 && <tr><td colSpan="5">No users found</td></tr>}
              {products.map((items) => (
                <tr key={items._id}>
                  <td>{items.name}</td>
                  <td>{items.age}</td>
                  <td>{items.email}</td>
                  <td>{items.city}</td>
                  <td>
                    <button className="btn btn-primary btn-sm me-2" onClick={() => handleEdit(items)}>Edit</button>
                    <button className="btn btn-danger btn-sm" onClick={() => Delete(items._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </center>
    </div>
  );
}

export default App;
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 /* import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';

const ImageUpload = () => {
  const [image, setImage] = useState(null);
  const [name, setName] = useState('');
  const [products, setProducts] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(res.data);
      // Fetch the images again after uploading
      fetchImages();
    } catch (err) {
      console.error('Error uploading image:', err);
    }
  };

  // Fetch images from the backend
  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images on component mount
  }, []);
function Delete(id){
  axios.delete(`http://localhost:5000/delete/${id}`)
  .then((response)=>{
    console.log(response.data)
    fetchImages()
  })
  .catch((error)=>{
    console.log(error)
  })
}
  

  return (
    <div>
      <h2>Upload an Image</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="Image Name"
          required
        />
        <input type="file" onChange={handleImageChange} required />
        <button type="submit">Upload</button>
      </form>

      <h2>Uploaded Images</h2>
      <div>
        {products.map((item) => (
          <div key={item._id}>
            <h4>Name: {item.name}</h4>
            <img
              src={`data:${item.img.contentType};base64,${Buffer.from(item.img.data).toString('base64')}`}
              alt={item.name}
              style={{ width: '300px', height: '300px' }}
            />
 <button onClick={()=>Delete(item._id)}>delete</button>           
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;  */


/* import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("")
  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const[product,setProducts]=useState([])
  function one(e) {
    setName(e.target.value);
  }
  function two(e) {
    setAge(e.target.value);
  }
  function three(e) {
    setCity(e.target.value);
  }
  
  function five(e){
    setEmail(e.target.value)
  }
  function six(e){
    setPassword(e.target.value)
  }
  function ten(e){
    e.preventDefault()

    axios.post("http://localhost:5000/student/post",{name,age,email,city,password})
    .then((response)=>{
      console.log(response.data)
      bharath()
    })
    .catch((error)=>{
      console.log("error in posting data",error)
    })
    setAge("")
    setEmail("")
    setPassword("")
    setCity("")
    setName("")
  }

    function bharath(){
axios.get("http://localhost:5000/student/get")
.then((response)=>{
  console.log(response.data)
  setProducts(response.data)
})
.catch((error)=>{
  console.log(error)
})
 }
  
useEffect(()=>{
  bharath()
},[])
function Delete(id){
  axios.delete(`http://localhost:5000/student/delete/${id}`)
  .then((response)=>{
    console.log(response.data)
    bharath()
  })
  .catch((error)=>{
    console.log("error in deleting data",error)
  })
}
 function GetItems(){
  axios.get("http://localhost:5000/student/getitems")
  .then((response)=>{
    console.log(response.data)
  })
  .catch((error)=>{
    console.log(error)
  })
 }
 useEffect(()=>{
  GetItems()
 },[])

  
  return (
    <div>
      <center>
      <form onSubmit={ten}>
          <label>name:</label>
          <input
            onChange={one}
            type="text"
            className="form-control"
            value={name}
            required
          />
          <label>age:</label>
          <input
            onChange={two}
            type="text"
            className="form-control"
            value={age}
            required
          />
          <label>email:</label>
          <input
            onChange={five}
            type="text"
            className="form-control"
            value={email}
            required
          />
  
          <label>city:</label>
          <input
            onChange={three}
            type="text"
            className="form-control"
            value={city}
            required
          />
          
          
          <label>password:</label>
          <input
            onChange={six}
            type="text"
            className="form-control"
            value={password}
            required
          />
          <button type="submit" className="btn btn-success mt-2">
            submit
          </button>
        </form>
       {
        product.map((items)=>{
          return(
<div key={items._id}>
<h3>{items.name}</h3>
<h3>{items.age}</h3>
<h3>{items.number}</h3>
<h3>{items.email}</h3>
<h3>{items.password}</h3>
<button onClick={()=>Delete(items._id)}>delete</button>


</div>
          )
        })
       }
<button onClick={GetItems}>click me</button>
      </center>
    </div>
  );
}

export default App; */

// src/App.js
/* import React from 'react';
import OTPRequest from './OTPRequest';
import OTPValidation from './OTPValidation';

function App() {
    return (
        <div>
            <h1>OTP System</h1>
            <OTPRequest />
            <OTPValidation />
        </div>
    );
}

export default App;  */

 