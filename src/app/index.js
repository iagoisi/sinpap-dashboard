import React from "react";

import { 
  Route,
  Routes
} from 'react-router-dom';

import Users from './containers/Users';
import Areas from './containers/Areas';
import News from './containers/News';
import Inicio from './containers/Inicio';

import Navbar from "./components/Navbar";


export default function App()  {
    return (
    <Routes>
      <Route path="/" element={<Inicio />}> 
        <Route path="/users" element={<Users />} />
        <Route path="/pagina-01" element={<Areas />} />
        <Route path="/news" element={<News />} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
    ); 
}




