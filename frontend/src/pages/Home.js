import React from 'react';
import '../styles/homeStyle.css';
import { Header } from '../components/header/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export function Home() {
  const { user } = useSelector(state => state.user);
  //const navigate = useNavigate();
  
  const {firstName, lastName, token} = user;
  return (
    <div className="div-home-container">
      <Header />
      <div className="div-home-content" >
        <p>Welcome to home {lastName !== ' ' ? `${firstName} ${lastName}` : firstName }, you are logged!</p>
      </div>
    </div>
  )
}