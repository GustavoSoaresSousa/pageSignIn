import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import '../styles/createAccountStyle.css';
import { changeUser } from '../redux/userSlice';

const userData = {
  email: '',
  password: ''
}

export function Login() {
  const [user, setUser] = useState(userData);
  const [userLogged, setUserLogged] = useState({ token: '', firstName: '', lastName: ''});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleInput(e) {
    const { value, name } = e.target;
    setUser({
      ...user,
      [name]: value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!user.email || !user.password) return alert('Please fill in all fields')

    const response = await api.post('/createAccount/login', {
      email: user.email,
      passwordVirtual: user.password
    });
    const data = response.data
    if (response) {
      setUserLogged({
        firstName: data.firstName,
        lastName: data.lastName,
        token: data.token,
      })
      dispatch(changeUser({firstName: data.firstName, lastName: data.lastName, token: data.token}));
    }
    setUser(userData);
    navigate('/home')
  }

  return (
    <div className="app">
      <div className="container">
        <main className="main-container">
          <div className="form-container-login">
            <div className="intro">
            <h1>Login Account</h1>
            <p>don't have an account?<a href="/">Create Account</a></p>
          </div>
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <input type="email" placeholder="Email" className="input" required name="email" value={user.email} onChange={handleInput} />
                <input type="password" placeholder="Password" className="input-password" required name="password" value={user.password} onChange={handleInput} />
              </div>
              <button type="submit" className="button-create">Login in</button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}