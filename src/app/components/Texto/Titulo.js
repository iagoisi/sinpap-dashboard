import React from 'react';
import './Titulo.css';

const Titulo = ({ tipo, titulo }) => {
  switch(tipo){
    case 'h1':
    default:
      return (<h1 className='Titulo-principal'>{titulo}</h1>);
  }
}


export default Titulo;