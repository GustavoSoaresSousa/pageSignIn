import React, {useState, useEffect } from 'react';
import '../styles/homeStyle.css';
import api from '../services/api';
import { Header } from '../components/header/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeUser } from '../redux/userSlice';

export function Home() {
  const { user } = useSelector(state => state.user);
  let {firstName, lastName, token, id} = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    const tokenOfLocalStorage = localStorage.getItem('token');
    const firstNameOfLocalStorage = localStorage.getItem('firstName');
    const lastNameOfLocalStorage = localStorage.getItem('lastName');
    console.log(firstNameOfLocalStorage, lastNameOfLocalStorage);
    
    if(firstNameOfLocalStorage || firstNameOfLocalStorage && lastNameOfLocalStorage ) {
      dispatch(changeUser({ firstName: JSON.parse(firstNameOfLocalStorage), lastName: JSON.parse(lastNameOfLocalStorage)}));
    }
    if(tokenOfLocalStorage){
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(tokenOfLocalStorage)}`
    }
  },[])

  useEffect(()=> {
    (async () => {
      const idOfLocalStorage = JSON.parse(localStorage.getItem('id'));
      const response = await api.get(`createAccount/home/${idOfLocalStorage}`);
      api.defaults.headers.Authorization = `Bearer ${token}`
      if(response.status !== 200) return navigate('/login');
    })();
  },[])

  return (
    <div className="div-home-container">
      <Header />
      <div className="div-home-content" >
        <p>Welcome to home {lastName !== ' ' ? `${firstName} ${lastName}` : firstName }, you are logged!</p>
      </div>
    </div>
  )
}