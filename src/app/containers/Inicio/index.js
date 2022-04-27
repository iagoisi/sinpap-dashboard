import React from 'react';
import '../Inicio/Inicio.css';


import Titulo from '../../components/Texto/Titulo';
import Navbar from '../../components/Navbar';
import Container from '../../components/Container';

export default function Inicio () {
  return (
      <>
        <div className="logo">
          <Titulo tipo="h1" titulo="SINPAP/MS" />
        </div>
        <div className='global-box'>
          <Navbar className='navigation'/>
          <Container />
        </div>
      </>
    );
  }
