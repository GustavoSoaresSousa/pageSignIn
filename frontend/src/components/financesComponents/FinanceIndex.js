import React, { useState, useEffect } from 'react';
import './Finance.css';
import api from '../../services/api'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import {Chart, GoogleDataTableColumnRoleType} from 'react-google-charts'
  import _ from 'lodash';

const dataFinanceEdited = {
  name: '',
  description: '',
  value: '',
}

export function FinanceIndex() {
  const [allFinances, setAllFinances] = useState([]);
  const [financeToEdit, setFinanceToEdit] = useState(dataFinanceEdited);

  useEffect(() => {
    async function getAllFinances() {
      const response = await api.get('/finances/')
      setAllFinances(response.data);
    }
    getAllFinances();
  }, [allFinances]);

  async function deleteFinance(id) {
    const response = await api.delete(`/finances/${id}`);
  }

  function handleInput(e) {
    const { value, name } = e.target;

    setFinanceToEdit({
      ...financeToEdit,
      [name]: value
    })
  }

  async function editFinance(id) {
      const response = await api.put(`/finances/${id}`, {
      name: financeToEdit.name,
      description: financeToEdit.description,
      value: financeToEdit.value
    });
    setFinanceToEdit(dataFinanceEdited);
  }

  return (
    <div className="div-finance-container-extra">
      <div className="div-finance-content col-md-12">
          <table className="table table-boderless table-striped">
            <thead className="thead-ligth">
              <tr>
                <td>Name</td>
                <td>Description</td>
                <td>Value</td>
                <td>Actions</td>
              </tr>
            </thead>

            <tbody>
              {
                allFinances.map( data => {
                  return <tr key={data._id}>
                    <td>{data.name}</td>
                    <td>{data.description}</td>
                    <td>{data.value}</td>
                    <td className='td-functions'>
                      <a onClick={() => deleteFinance(data._id)}><AiOutlineDelete /></a> 
                      <a>
                        <AiOutlineEdit />
                      </a>
                    </td>
                  </tr>
                })
              }
            </tbody>
          </table>
      </div>
    </div>

  )
}