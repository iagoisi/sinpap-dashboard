import React, { useEffect, useState, useRef } from 'react';
// import { Link } from 'react-router-dom';
import './Users.css';
import Pagination from '../../components/Pagination';
import SelectPagination from '../../components/SelectPagination';
import { FiPlus } from "react-icons/fi";

import * as Yup from 'yup';

import { Form } from '@unform/web';
import Input from '../../components/Form/Input';

import api from '../../../services/api';

import Titulo from '../../components/Texto/Titulo';

import Modal from '../../components/Modal';



export default function Users() {
    
    useEffect(() => {
      getUsers();
    }, []);

    const [itens, setUsers] = useState([]);
    
    // Pagination
    const [itensPerPage, setItensPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    const pages = Math.ceil(itens.length / itensPerPage);
    const startIndex = currentPage * itensPerPage;
    const endIndex = startIndex + itensPerPage;
    const currentItens = itens.slice(startIndex, endIndex)

    const getUsers = async() => {
      try {
        const res = await api.get('/users')
        setUsers(res.data)
        } catch(error) {
          console.log(error)
        }
    }

    useEffect(() => {
      setCurrentPage(0)
    }, [itensPerPage])
    // Pagination

    // New User Validation

    

    // Modal
    const [isModalVisible, setIsModalVisible] = useState(false);


    // Validation
    const formRef = useRef(null); 

    async function handleSubmit(data, { reset }) {
      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('O nome obrigatório'),
          email: Yup.string().email('Digite um e-mail válido').required('O e-mail é obrigatório'),
          id_perito: Yup.string().min(7, 'O nº de registro de ter pelo menos 7 caracteres').required('Número de registro é obrigatório'),
          password: Yup.string().min(6, 'Minímo de 6 caracteres').required('A senha é obrigatória'),
          confirm_password: Yup.string()
          .oneOf([Yup.ref('password'), null], 'As senhas estão diferentes'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });
        //create user
        await api.post('/users', data)
          .then(function(res) {
            console.log(res);
          })
          .catch(function(err) {
            console.log(err)
          })
        // Validation passed
        console.log(data);
        reset();
      } catch (err) {
        const validationErrors = {};
        if (err instanceof Yup.ValidationError) {
          err.inner.forEach(error => {
            validationErrors[error.path] = error.message;
          });
          formRef.current.setErrors(validationErrors);
        }
      }
          
    } 

    return (
      <>
      {isModalVisible ? 
        <Modal onClose={() => setIsModalVisible(false)}>
          <h2>Cadastrar Novo Usuário</h2>
        <div className='form-wrapper'>

          <Form ref={formRef} onSubmit={handleSubmit}>
            <div className='modal-schadule'>
              <div className='modal-box'>
                <div className='grup-form-1'>
                  <label htmlFor="for">Nome Completo</label>
                    <Input type='text'name='name'/>
                    {/* <input type="text" required/> */}
                  <label htmlFor="for">E-mail</label>
                    <Input type='email' name='email'/>
                    {/* <input type="text" required/> */}
                  
                </div>

                <div className='group-form-2'>
                  <label htmlFor="for">ID Períto</label>
                    <Input type='text' name='id_perito'/>
                    {/* <input type="text" required/> */}
                  <label htmlFor="for">Senha</label>
                    <Input type='password' name='password'/>
                  <label htmlFor="for">Confirme a Senha</label>
                    <Input type='password' name='confirm_password'/>
                    {/* <input type="password" required/> */}
                </div>
              </div>
              <button type="submit">Criar</button>
            
            </div>
          </Form>
        </div>
        </Modal> : null}
        
        <div className='users-lists'>
          <Titulo tipo="h1" titulo="Usuários" />
          <SelectPagination itensPerPage={itensPerPage} setItensPerPage={setItensPerPage}/>
          <div className='box-content'>
            <ul className='ul-content'>
            {currentItens.map(users => (
              <li key={users.id}>
                <p>{users.id}</p>
                <p>{users.name}</p>
                <p>{users.email}</p>
                <p>{users.status}</p>
              </li>
            ))}
            </ul>
            <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
            <FiPlus onClick={() => setIsModalVisible(true)} className='plus-icon'/>
          </div>   
        </div>
        
      </>
        
    )
}