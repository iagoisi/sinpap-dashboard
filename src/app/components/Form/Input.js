import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import './input.css';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value'
    })
  }, [fieldName, registerField]);

  return (
    <div className='div-input'>
      <input placeholder={`Digite seu ${fieldName}`} ref={inputRef} className={error ? 'has-error' : ''} {...rest}/>

      { error && <span className='error' style={{ color: '#f00' }}>{error}</span> }
    </div>
  )
}