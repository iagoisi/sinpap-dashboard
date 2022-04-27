import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import './textarea.css';

export default function TextArea({ name, ...rest }) {
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
      <textarea ref={inputRef} className={error ? 'has-error' : ''} {...rest}/>

      { error && <span className='error' style={{ color: '#f00' }}>{error}</span> }
    </div>
  )
}