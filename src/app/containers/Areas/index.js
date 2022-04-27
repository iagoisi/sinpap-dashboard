import React, { useEffect, useState, useRef } from 'react';
import './Areas.css';

import api from '../../../services/api';

import Upload from '../../components/UploadImages/Upload';

// import FileList from '../../components/UploadImages/FileList';

// import { Link } from 'react-router-dom';
import Titulo from '../../components/Texto/Titulo';

import Pagination from '../../components/Pagination';

import * as Yup from 'yup';

import { Form } from '@unform/web';
import Input from '../../components/Form/Input';
import Textarea from '../../components/Form/textArea';

import { FiPlus } from 'react-icons/fi';
import Modal from '../../components/Modal';




export default function Posts() {
  useEffect(() => {
    getPosts();
  }, []);

const [posts, setPosts] = useState([]);

// Pagination
const [itensPerPage, setItensPerPage] = useState(5);
const [currentPage, setCurrentPage] = useState(0);

const pages = Math.ceil(posts.length / itensPerPage);
const startIndex = currentPage * itensPerPage;
const endIndex = startIndex + itensPerPage;
const currentItens = posts.slice(startIndex, endIndex)

const getPosts = async() => {
  try {
    const res = await api.get('/post')
    setPosts(res.data)
    console.log(res.data)
    } catch(error) {
      console.log(error)
    }
}

useEffect(() => {
  setCurrentPage(0)
}, [itensPerPage])
//Pagination


const [isModalVisible, setIsModalVisible] = useState(false);


// Validation
const formRef = useRef(null); 

async function handleSubmit(data, { reset }) {
  try {
    const schemaMembros = Yup.object().shape({
      name: Yup.string().required('O nome obrigatório'),
      email: Yup.string().email().required('O e-mail é obrigatório'),
      id_perito: Yup.string().min(7).required('Número de registro é obrigatório'),
      password: Yup.string().min(6, 'Minímo de 6 caracteres').required('A senha é obrigatória'),
      confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'As senhas estão diferentes'),
    });
    await schemaMembros.validate(data, {
      abortEarly: false,
    });
    //create user
    await api.post('/post', data)
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
          <h2>Novo Post na Área de Membros</h2>
        <div className='form-wrapper'>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div className='modal-schadule-membros'>
              <div className='modal-box-membros'>
                  <label htmlFor="for">Título</label>
                    <Input className='input' type='text'name='title'/>
                  <label htmlFor="for">Texto</label>
                    <Textarea className='input' type='text' name='text'/>
              </div>

              <Upload />
              {/* <FileList /> */}
              {/* <div className='upload_img'>              
                  Clique aqui ou arraste sua imagem
                  </div>*/}
              <button type="submit">Criar</button>
            
            </div>
          </Form>
        </div>
        </Modal> : null}


    <div className='posts-lists'>
      <Titulo tipo="h1" titulo="Área de Membros" />
      <div className='box-content'>
        <ul className='ul-content'>
        {currentItens.map(post => (
          <li key={post.id}>
            <p>{post.id}</p>
            <p>{post.title}</p>
            <p>{post.link}</p>
            <p>{post.createdDate}</p>
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
