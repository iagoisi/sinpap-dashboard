import React, { useEffect, useState, useRef } from 'react';
import './Areas.css';

import api from '../../../services/api';

import Upload from '../../components/UploadImages/Upload';

// import FileList from '../../components/UploadImages/FileList';

// import { Link } from 'react-router-dom';
import Titulo from '../../components/Texto/Titulo';

import { DataGrid } from '@mui/x-data-grid'
// import Pagination from '../../components/Pagination';
import SelectPagination from '../../components/SelectPagination';



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
const [itensPerPage, setItensPerPage] = useState(10);
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
  console.log(data);
  
  // try {
  //   const schemaMembros = Yup.object().shape({
  //     name: Yup.string().required('O nome obrigatório'),
  //     email: Yup.string().email().required('O e-mail é obrigatório'),
  //     id_perito: Yup.string().min(7).required('Número de registro é obrigatório'),
  //     password: Yup.string().min(6, 'Minímo de 6 caracteres').required('A senha é obrigatória'),
  //     confirm_password: Yup.string()
  //     .oneOf([Yup.ref('password'), null], 'As senhas estão diferentes'),
  //   });
  //   await schemaMembros.validate(data, {
  //     abortEarly: false,
  //   });
  //   //create user
  //   await api.post('/post', data)
  //     .then(function(res) {
  //       console.log(res);
  //     })
  //     .catch(function(err) {
  //       console.log(err)
  //     })
  //   // Validation passed
  //   console.log(data);
  //   reset();
  // } catch (err) {
  //   const validationErrors = {};
  //   if (err instanceof Yup.ValidationError) {
  //     err.inner.forEach(error => {
  //       validationErrors[error.path] = error.message;
  //     });
  //     formRef.current.setErrors(validationErrors);
  //   }
  // }    
} 

const [ data, setData ] = useState('');
const childToParent = (childData) => {
  setData(childData)
}

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'image_post', headerName: 'Imagem', width: 200 },
  { field: 'title', headerName: 'Título' },
  { field: 'text', headerName: 'Texto', width: 200 },
  { field: 'link', headerName: 'Link', width: 200 }
]

return (
  <>
  {isModalVisible ? 
        <Modal onClose={() => setIsModalVisible(false)}>
          <h2>Novo Post na Área de Membros</h2>
        <div className='form-wrapper'>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <div className='modal-schadule-membros'>
              <div className='modal-box-membros'>
                <div className='grup-form-1-areas'>
                  <div className='schaduleInput'>
                    <label htmlFor="for">Título</label>
                      <Input className='input' type='text'name='title'/>
                  </div>
                  <div className='schaduleInput'>
                    <label htmlFor="for">Link</label>
                      <Input className='input' type='text'name='link'/>
                  </div>
                </div>
                <div className='grup-form-2'>
                  <label htmlFor="for">Texto</label>
                    <Textarea className='input' type='text' name='text'/>
                    <label>

                    </label>
                    {/* <input type='file' id='image[]' /> */}
                    <Upload handleSubmit={handleSubmit}/>
                </div>
              </div>

              {/* <FileList /> */}
              {/* <div className='upload_img'>              
                  Clique aqui ou arraste sua imagem
                  </div>*/}
              <button type="submit">Criar</button>
            
            </div>
          </Form>
        </div>
        </Modal> : null}


    <div className='areas-list'>
      <Titulo tipo="h1" titulo="Posts na Área de Membros" />
      <SelectPagination itensPerPage={itensPerPage} setItensPerPage={setItensPerPage}/>
      <div className='box-content-areas'>
        <ul className='ul-content-areas'>
          <DataGrid 
            rows={posts}
            columns={columns}
            pageSize={itensPerPage}
          />
        </ul>
        {/* <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/> */}
        <FiPlus onClick={() => setIsModalVisible(true)} className='plus-icon'/>
      </div>
    </div>

  </>
)
}
