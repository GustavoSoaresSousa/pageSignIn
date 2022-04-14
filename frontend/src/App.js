import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { CreateAccount } from './pages/CreateAccount';
import { Login } from './pages/Login';
import { Home } from './pages/Home'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
