import React from 'react';
import './Header.css';
import { AiOutlineHome } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';

import {Link, useNavigate} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logOut } from '../../redux/userSlice'

export function Header(){
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logOut());
    navigate('/login')
  }
  return (
    <header className="header-container">
      <div className="div-header-content">
        <div><AiOutlineHome><Link to="/home"></Link></AiOutlineHome></div>
        <div><button onClick={handleLogOut}><FiLogOut><Link to="#"></Link></FiLogOut></button></div>
      </div>
    </header>
  )
}