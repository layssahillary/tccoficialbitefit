
import styled from 'styled-components';

export const ContainerMain = styled.div`
  display: flex;
  margin: 40px 200px;
  padding: 40px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
  border-radius: 10px;
  gap: 40px;
`;

export const Menu = styled.div`
  display: flex;
  background-color: #f0f2f4;
  height: 300px;
  width: 60px;
  border-radius: 100px;
  flex-direction: column;
  justify-content: space-around;
`;

export const MenuItem = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: filter 0.3s ease; 

  &:hover {
    filter: brightness(1.2); 
  }

  img {
    width: 30px;
    filter: ${({ active }) => (active ? 'brightness(0.5)' : 'none')}; 
  }
`;

