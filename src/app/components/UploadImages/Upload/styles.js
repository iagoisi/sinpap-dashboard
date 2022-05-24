import styled from 'styled-components';

const getColor = (props) => {
  if (props.isDragAccept) {
      return '#00e676';
  }
  if (props.isDragReject) {
      return '#ff1744';
  }
  if (props.isDragFocused) {
      return 'blue';
  }
  return '#999';
}

export const DropContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  border-width: 2px;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  height: 40px;

  transition: height 0.2s ease;
`;

const messageColors = {
  default: '#999',
  error: '#ff1744',
  sucess: '#00e676'
};

export const UploadMessage = styled.p`
  display: flex;
  color: ${props => messageColors[props.type || 'default']};
  align-items: center;
  justify-content: center;
  padding: 15px 0;
`;



export const Container = styled.ul`
  margin: 10px 0 10px 0;
  display: flex;
  /* width: 200px; */
  padding: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  li {
    display: flex;
    width: 280px;
    justify-content: space-between;
    align-items: center;
    color: #444;
    /* margin-bottom: 10px; */
  }

  
`;

export const FileInfo = styled.div`
  display: flex;
  align-items: center;

    span {
      display: flex;
      align-items: center;
      color: #999;
      /* margin-top: 5px; */

      p {
        font-size: 12px;
        display: flex;
        /* margin-left: 0; */
      }

      button {
        font-size: 10px;
        font-weight: bold;
        height: 15px;
        color: red;
        background: transparent;
        margin-left: 3px;
        cursor: pointer;
      }
    }
`;
export const Preview = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 5px;
  background-image: url(${props => props.src});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 50% 50%;
  margin-right: 10px;
`

export const SchaduleText = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 0;

  strong {
    max-width: 150px;
    font-size: 10px;
    margin-bottom: 10px;
    text-align: left;
  }
`


export const SchaduleIcons = styled.div`
  display: flex;
  align-items: center;
`


