import React from 'react';

import '../styles/createAccountStyle.css';

export  function Login() {
  return (
    <div className="app">
      <div className="container">
        <main className="main-container">
          <div className="intro">
            <h3>START FOR FREE</h3>
            <h1>Login Account</h1>
            <p>don't have an account?<a href="#">Create Account</a></p>
          </div>
            <div className="form-container-login">
              <form>
                  <div className="input-group">
                  <input type="email" placeholder="Email"  className="input" />
                  <input type="password" placeholder="Password"  className="input-password" />
                  </div>
                  <button className="button-create">Create account</button>
              </form>
            </div>
        </main>
        <aside className="aside-container">
        </aside>
      </div>
    </div>
  )
}