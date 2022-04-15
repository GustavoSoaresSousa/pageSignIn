import React, { useState } from 'react';

import '../styles/createAccountStyle.css';

import api  from '../services/api';
import { useNavigate } from 'react-router-dom'

const userData = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

export  function CreateAccount() {
  const [user, setUser] = useState(userData);
  const navigate = useNavigate();

  function handleInput(e) {
    const { value, name } = e.target
    setUser({
      ...user, 
      [name]: value
    })
  }

  async function handleSubmit(e){
    e.preventDefault();

    if(!user.firstName || !user.email || !user.password) return alert('Please fill in all fields')

    const response = await api.post('/createAccount', {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      passwordVirtual: user.password
    });
    console.log(response)
    setUser(userData);
    navigate('/')
  }

  return (
    <div className="app">
      <div className="container">
        <main className="main-container">
          <div className="intro">
            <h3>START FOR FREE</h3>
            <h1>CREATE NEW ACCOUNT.</h1>
            <p>Already A Member?<a href="#">Log In</a></p>
          </div>
            <div className="form-container">
              <form onSubmit={handleSubmit}>
                  <div className="name-inputs">
                    <input type="text" placeholder="First Name" className="input" name="firstName"  required value={user.firstName} onChange={handleInput} />
                    <input type="text" placeholder="Last Name"  className="input" name="lastName" value={user.lastName}  onChange={handleInput} />
                  </div>
                  <div className="input-group">
                  <input type="email" placeholder="Email"  className="input" name="email" required value={user.email}  onChange={handleInput} />
                  <input type="password" placeholder="Password"  className="input-password" name="password" required value={user.password}  onChange={handleInput} />
                  </div>
                  <button type='submit' className="button-create">Create account</button>
              </form>
            </div>
        </main>
        <aside className="aside-container">
        </aside>
      </div>
    </div>
  )
}