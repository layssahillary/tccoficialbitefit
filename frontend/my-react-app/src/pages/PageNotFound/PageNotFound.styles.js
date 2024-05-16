import styled from 'styled-components';

export const ContainerImg = styled.section`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 50;
  padding: 20px;
  border-radius: 10px;

  p {
    font-family: 'Mulish';
    font-size: 16px;
    color: #7d7987;
    text-align: center;
  
  }
  a{
    color: #1EC861;
    text-decoration: none;
    font-size: 18px;
  }
  img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    margin: 0 auto;
  }
`;
