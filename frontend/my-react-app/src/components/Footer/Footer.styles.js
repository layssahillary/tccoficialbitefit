import styled from 'styled-components';

export const FooterWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60px 200px; 
  background: linear-gradient(to bottom, #a9c3a0, #5f8d4e);

  width: calc(100% - 400px);
`;

export const ListaLinks = styled.div`
  display: flex;
  align-items: end;
  gap: 50px;
`;

export const Logo = styled.img``;

export const ResumoContainer = styled.div``;
export const ResumoP = styled.p`
  width: 400px;
  padding: 10px;
  color: #ffffff;
`;
export const ConteinerUl = styled.ul`
  list-style-type: none;
`;

export const ConteinerLi = styled.li`
  max-width: 100%;
  padding: 10px;
`;

export const ConteinerItem = styled.a`
  color: #ffffff;
  font-family: 'Mulish';
  text-decoration: none;
  font-size: 18px;
  transition: transform 0.3s ease; 
  &:hover {
    color: #15341a;
  }
`;
