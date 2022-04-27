import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import './News.css';
import api from '../../../services/api';

import Titulo from '../../components/Texto/Titulo';
import Pagination from '../../components/Pagination';

import Modal from '../../components/Modal';


import { FiPlus } from 'react-icons/fi';



export default function News() {
  useEffect(() => {
    getNews();
  }, []);

const [news, setNews] = useState([]);

// Pagination
const [itensPerPage, setItensPerPage] = useState(5);
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


return (
  <>
    <div className='news-lists'>
      <Titulo tipo="h1" titulo="Notícias" />
      <div className='box-content'>
        <ul className='ul-content'>
        {currentItens.map(news => (
          <li key={news.id}>
            <p>{news.id}</p>
            <p>{news.titulo}</p>
            <p>{news.texto}</p>
            <p>{news.createdDate}</p>
          </li>
        ))}
        </ul>
        <Pagination pages={pages} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
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
