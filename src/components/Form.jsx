import React, { useEffect, useState } from "react";
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
  const [formSubmitted, setFormSubmitted] = useState('')


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
      .then(() => {
        setFormSubmitted('Success! Thank You For Submitting this Form')
      })
    } catch (error) {
      console.error(error)
      setError(error.message)
    } 
      setIsLoading(false)
    }
    
  return (
    <div>
      <h1>Contact Us</h1>
        
        <form onSubmit={handleSubmit} className="container-fluid">

          <label htmlFor="name">Name</label> 
          <div class="input-group mb-3">
          <input type="name" className="form-control" id="name" value={data.name} onChange={handleChange} required/>
          <span class="input-group-text">John Doe</span>
          </div>

          <label htmlFor="email">Email</label>
          <div class="input-group mb-3">
          <input type="email" className="form-control" id="email" value={data.email} onChange={handleChange} required/>
          <span class="input-group-text">@example.com</span>
          </div>
          
          <label htmlFor="subject">Subject</label>
          <textarea type="subject" className="form-control" rows="2" id="subject" value={data.subject} onChange={handleChange}> </textarea>
        
          <label htmlFor="message">Message</label>
          <textarea type="message" className="form-control" rows="5" id="message" value={data.message} onChange={handleChange} required> </textarea>
          
          <button type="submit" className="btn ">
            {isLoading ? <div className="spinner-border text-danger"></div> : 'Submit'}
          </button>

          {error && <p>{error}</p>}

          {formSubmitted && <p className="alert alert-success">{formSubmitted}</p>}
        </form>
        
    </div>
  )
}
export default Form