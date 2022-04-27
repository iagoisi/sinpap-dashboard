import React from 'react';

const Pagination = ({pages, currentPage, setCurrentPage}) => {
  return(
    <div className='pagination'>
      {Array.from(Array(pages), (item, index) => {
        return <button
            key={index}
            style = { index === currentPage? { 
              backgroundColor: '#44AB20',
              border: '1px #44AB20 solid',
              color: '#fff'
            } : null}
            value={index} 
            onClick={(e) => 
              setCurrentPage(Number(e.target.value))}>
                {index + 1}
          </button>
      })}
    </div>
  )
}



export default Pagination;