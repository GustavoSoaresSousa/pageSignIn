import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { CreateAccount } from './pages/CreateAccount';
import { Login } from './pages/Login'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CreateAccount />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
