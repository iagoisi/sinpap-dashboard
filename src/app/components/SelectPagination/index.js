import React from 'react';

const SelectPagination = ({itensPerPage, setItensPerPage}) => {
  return(
    <div>
      <select className='select' value={itensPerPage} onChange={(e) => setItensPerPage(Number(e.target.value))}>
        <option valeu={5}>5</option>
        <option valeu={10}>10</option>
        <option valeu={15}>15</option>
        <option valeu={20}>20</option>
      </select>
    </div>
  )
}

export default SelectPagination;