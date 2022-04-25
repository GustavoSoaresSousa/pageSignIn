import React, { useState, useEffect } from 'react';
import '../styles/homeStyle.css';
import { FinanceIndex } from '../components/financesComponents/FinanceIndex';
import api from '../services/api';
import { Header } from '../components/header/Header';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { changeUser } from '../redux/userSlice';

const dataFinance = {
  name: '',
  description: '',
  value: '',
}


export function Home() {
  const { user } = useSelector(state => state.user);
  let { firstName, lastName, token, id } = user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [finance, setFinance] = useState(dataFinance);

  function handleInput(e) {
    const { value, name } = e.target;
    setFinance({
      ...finance,
      [name]: value
    })
  }

  async function addFinance(e) {
    e.preventDefault();
    const response = await api.post('/finances/', {
      name: finance.name,
      description: finance.description,
      value: finance.value,
    });
    setFinance(dataFinance);
  }

  useEffect(() => {
    const tokenOfLocalStorage = localStorage.getItem('token');
    const firstNameOfLocalStorage = localStorage.getItem('firstName');
    const lastNameOfLocalStorage = localStorage.getItem('lastName');

    if (firstNameOfLocalStorage || firstNameOfLocalStorage && lastNameOfLocalStorage) {
      dispatch(changeUser({ firstName: JSON.parse(firstNameOfLocalStorage), lastName: JSON.parse(lastNameOfLocalStorage) }));
    }
    if (tokenOfLocalStorage) {
      api.defaults.headers.Authorization = `Bearer ${JSON.parse(tokenOfLocalStorage)}`
    }
  }, [])

  useEffect(() => {
    (async () => {
      const idOfLocalStorage = JSON.parse(localStorage.getItem('id'));
      const response = await api.get(`createAccount/home/${idOfLocalStorage}`);
      api.defaults.headers.Authorization = `Bearer ${token}`
      if (response.status !== 200) return navigate('/login');
    })();
  }, [])

  return (
    <div className="div-home-container">
      <Header />
      <div className="div-finance-container" >
        <div className='content'>
          <button type="button" className="btn btn-dark" data-toggle="modal" data-target="#exampleModalCenter">
            New Finance
          </button>

          <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <form autoComplete="off" onSubmit={addFinance}>
              <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">New Finance</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body div-inputs">
                    <input type="text" placeholder="Name" value={finance.name} onChange={handleInput} name="name" />
                    <input type="text" placeholder="Description" value={finance.description} onChange={handleInput} name="description" />
                    <input type="text" placeholder="Value" value={finance.value} onChange={handleInput} name="value" />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                    <button type="submit" className="btn btn-primary">Save Finance</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <span>User: {firstName}</span>
        </div>
      </div>
      <FinanceIndex />
    </div>
  )
}