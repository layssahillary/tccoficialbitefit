import styled from 'styled-components';

export const ContainerPrincipal = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;
export const FraseUm = styled.p`
  color: #525252;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  align-self: flex-start;
`;

export const Titulo = styled.h2`
  color: #285430;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
  align-self: flex-start;
  padding: 10px 0px;
`;

export const ImagemPrincipal = styled.img``;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: fit-content;
  padding: 10px;
  align-self: center;
  margin: 0 auto; 
`;

export const LogoBiteFit = styled.img`
  height: 100px;
  position: absolute;
  right: 30px;
  top: 30px;
`;

export const ContainerLogin = styled.div`
  display: flex;
  padding-top: 20px;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.form``;

export const Error = styled.p`
  font-size: 16px;
  color: red;
  font-family: 'Nunito Sans', sans-serif;
  padding-bottom: 20px;
`;

export const FraseTres = styled.p`
  color: #525252;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 15px;
  padding-right: 5px;
`;

export const LoginButton = styled.a`
  color: #777777;
  font-family: 'Mulish';
  text-decoration: none;
  font-size: 15px;
  transition: transform 0.3s ease;
  &:hover {
    color: #15341a;
  }
  cursor: pointer;
`;
