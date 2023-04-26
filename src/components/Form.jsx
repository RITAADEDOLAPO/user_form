import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom/client';
import axios from "axios";

const Form = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    
    });
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)


  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const userData = {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message
    };
    setData({
      name:"",
      email:"",
      subject:"",
      message:"",
      
    })
    try {
      const response = await axios.post("https://my-json-server.typicode.com/tundeojediran/contacts-api-server/inquiries", userData)
      console.log(response.data)
    } catch (error) {
      console.error(error)
      setError(error.message)
    } 
      setIsLoading(false)
  }
    
  return (
    <div>
      <h1>Login Account</h1>
        
        <form onSubmit={handleSubmit}>

          <label htmlFor="name">Name</label>
          <input type="name" id="name" value={data.name} onChange={handleChange} required/>
        
          <label htmlFor="email">Email</label>
          <input type="email" id="email" value={data.email} onChange={handleChange} required/>
          
          <label htmlFor="subject">Subject</label>
          <input type="subject" id="subject" value={data.subject} onChange={handleChange}/>
        
          <label htmlFor="message">Message</label>
          <input type="message" id="message" value={data.message} onChange={handleChange} required/>
          
          <button type="submit">
            {isLoading ? <div className="spinner-border text-danger"></div> : 'Submit'}
          </button>

          {error && <p>{error}</p>}

        </form>
    </div>
  )
}
export default Form