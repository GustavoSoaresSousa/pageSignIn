import React from 'react';

import '../styles/createAccountStyle.css';

export  function CreateAccount() {
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
              <form>
                  <div className="name-inputs">
                    <input type="text" placeholder="First Name" className="input" />
                    <input type="text" placeholder="Last Name"  className="input" />
                  </div>
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