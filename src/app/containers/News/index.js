import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import './News.css';
import api from '../../../services/api';

import Titulo from '../../components/Texto/Titulo';
// import Pagination from '../../components/Pagination';

import Modal from '../../components/Modal';
import { DataGrid } from '@mui/x-data-grid'
import SelectPagination from '../../components/SelectPagination';


import { FiPlus } from 'react-icons/fi';



export default function News() {
  useEffect(() => {
    getNews();
  }, []);

const [news, setNews] = useState([]);

// Pagination
const [itensPerPage, setItensPerPage] = useState(10);
const [currentPage, setCurrentPage] = useState(0);

const pages = Math.ceil(news.length / itensPerPage);
const startIndex = currentPage * itensPerPage;
const endIndex = startIndex + itensPerPage;
const currentItens = news.slice(startIndex, endIndex)


const getNews = async() => {
  try {
    const res = await api.get('/blog')
    setNews(res.data)
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


const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'image_blog', headerName: 'Imagem', width: 200 },
  { field: 'titulo', headerName: 'Título' },
  { field: 'texto', headerName: 'Texto', width: 200 },
  // { field: 'link', headerName: 'Link', width: 200 }
]


return (
  <>
    <div className='news-lists'>
      <Titulo tipo="h1" titulo="Notícias" />
      <SelectPagination itensPerPage={itensPerPage} setItensPerPage={setItensPerPage}/>
      <div className='box-content-news'>
        <ul className='ul-content-news'>
          <DataGrid 
            rows={news}
            columns={columns}
            pageSize={itensPerPage}
          />
        </ul>
        {/* <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/> */}
        <FiPlus onClick={() => setIsModalVisible(true)} className='plus-icon'/>
      </div>      
    </div>

    {isModalVisible ? 
        <Modal onClose={() => setIsModalVisible(false)}>
          <h2>Postar Notícia no Site</h2>
        <div className='form-wrapper'>
          <form action="#">
            <div className='modal-schadule'>
              <div className='grup-form-1'>
                <label htmlFor="for">Nome Completo</label>
                  <input type="text" required/>
                <label htmlFor="for">E-mail</label>
                  <input type="text" required/>
                <label htmlFor="for">ID Períto</label>
                <input type="text" required/>
              </div>

              <div className='group-form-2'>
                <label htmlFor="for">Senha</label>
                  <input type="password" required/>
                <label htmlFor="for">Senha novamente</label>
                  <input type="password" required/>
              </div>
            </div>
            <button type="submit">Criar</button>
          </form>
        </div>
        </Modal> : null}

  </>
)
}
