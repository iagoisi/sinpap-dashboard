import React, { useState, useEffect } from 'react';

import { useDropzone } from 'react-dropzone';

import { uniqueId } from 'lodash';
import filesize from 'filesize';

import api from '../../../../services/api';

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';


import { DropContainer, UploadMessage, Container, FileInfo, Preview, SchaduleText, SchaduleIcons } from './styles';


export default function Upload() {
  const [files, setFiles] = useState([]);

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isDragAccept,
    isDragReject,
    isDragFocused
  } = useDropzone({
    accept: 'image/*',
    maxFiles: 1,
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        file,
        id: uniqueId(),
        readableSize: filesize(file.size),
        preview: URL.createObjectURL(file),
        progress: 0,
        uploaded: false,
        error: false,
        url: null,
      }))
      ); 
    }
  });



  const preview = acceptedFiles.map(file => (

    <li key={file.id}> 
      <FileInfo>
        
        <Preview src={file.preview}  />
        <SchaduleText>
          <strong>{file.name}</strong>
          <span>
            <p>{file.readableSize}</p>
            { !!file.url && (
              <button onClick={() => {}}>Excluir</button>
            )}
          </span>
        </SchaduleText>
      </FileInfo>

      <SchaduleIcons style={{ width: 30, height: 30 }}>
        {!file.uploaded && !file.error && (
          <CircularProgressbar 
            strokeWidth={10} 
            value={file.progress}
          />
          )}
        { file.url && (
            <a
              href='url da imagem'
              target='_blank'
              rel='noopener noreferrer'
              >
                <MdLink style={{ marginRight: 8 }} size={30} color='#222' />
            </a>
          )
        }
        
        { file.uploaded && (
          <MdCheckCircle size={40} color='#00e676' />
        )
        }

        { file.error && (
          <MdError size={40} color='#ff1744' />
        )}
        
      </SchaduleIcons>
    </li>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);


  const imagesToParent = () => {
    handleSubmit(files)
  }


  return(
    <>
      <DropContainer
        {...getRootProps({ isDragAccept, isDragReject, isDragFocused, imagesToParent })}>      
        <input {...getInputProps()} />
        {isDragFocused && (<UploadMessage>haha</UploadMessage>)}
        {!isDragAccept && !isDragReject && (<UploadMessage>Arraste e solte seu aquivos aqui...</UploadMessage>)}
        {isDragAccept && (<UploadMessage type='sucess'>Solte seu aquivo aqui...</UploadMessage>)}
        {isDragReject && (<UploadMessage type='error'>Puts! Aquivo não suportado</UploadMessage>)}
      </DropContainer>
      <Container>
        {preview}
      </Container>


    </>
  );
}

