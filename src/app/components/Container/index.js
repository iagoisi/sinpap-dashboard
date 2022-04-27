import { Outlet } from 'react-router-dom';
import './Container.css'



export default function Container () {
  return (
    <div className='container'>
      <div className='content'>
        <Outlet />
      </div>
    </div>
    );
  }
