import React, { useState, useEffect } from 'react';
import './Finance.css';
import api from '../../services/api'
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';

const dataFinanceEdited = {
  name: '',
  description: '',
  value: '',
}

export function FinanceIndex() {
  const [allFinances, setAllFinances] = useState([]);
  const [financeToEdit, setFinanceToEdit] = useState(dataFinanceEdited);
  const [idToEdit, setIdToEdit] = useState('');

  useEffect(() => {
    async function getAllFinances() {
      const response = await api.get('/finances/')
      setAllFinances(response.data);
    }
    getAllFinances();
  }, [allFinances]);

  function handleInput(e) {
    const { value, name } = e.target;

    setFinanceToEdit({
      ...financeToEdit,
      [name]: value
    })
  }

  async function deleteFinance(id) {
    const response = await api.delete(`/finances/${id}`);
  }

  async function editFinance(data) {
    const response = await api.put(`/finances/${data._id}`, {
      name: financeToEdit.name,
      description: financeToEdit.description,
      value: financeToEdit.value
    });
    setFinanceToEdit(dataFinanceEdited)
  }

  return (
    <div className="div-finance-container-extra">
      <div className="div-finance-content">
        <div className="info-finance">
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Description</td>
                <td>Value</td>
                <td>Actions</td>
              </tr>
            </thead>

            <tbody>
              {
                Object.keys(allFinances).map(data => {
                  return <><tr className="tr-datas" key={allFinances[data].id}>
                    <td>{allFinances[data].name}</td>
                    <td>{allFinances[data].description}</td>
                    <td>{allFinances[data].value}</td>
                    <td className="td-functions">
                      {/* <a type="button"data-toggle="modal" data-target="#exampleModal">
                        <AiOutlineEdit />
                      </a>
                      <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <form autoComplete="off">
                        <div className="modal-dialog" role="document">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5 className="modal-title" id="exampleModalLabel">Update finance</h5>
                              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                              </button>
                            </div>
                            <div className="modal-body">
                              <input type="text" placeholder="Name" value={allFinances[data].name} name="name" onChange={handleInput} />
                              <input type="text" placeholder="Description" value={allFinances[data].description} name="description" onChange={handleInput} />
                              <input type="text" placeholder="Value"  value={allFinances[data].value} name="value" onChange={handleInput} />
                            </div>
                            <div className="modal-footer">
                              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                              <button onClick={() => {editFinance(allFinances[data].id)}} type="submit" className="btn btn-primary">Update finances</button>
                            </div>
                          </div>
                        </div>
                        </form>

                      </div>*/}
                      <a onClick={() => deleteFinance(allFinances[data]._id)}><AiOutlineDelete /></a> 
                    </td>
                  </tr></>
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}