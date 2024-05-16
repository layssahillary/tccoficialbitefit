import styled, { keyframes } from 'styled-components';
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
export const ContainerMain = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 200px;
  padding: 40px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border-radius: 10px;
  animation: ${fadeIn} 0.5s ease-in-out;
`;
export const SearchIcon = styled.img`
  width: 80px;
  height: 80px;
`;

export const SearchEmpty = styled.img`
  align-self: center;
  width: 450px;
`;

export const SearchEmptyP = styled.p`
  color: #e0e0e0;
  font-family: 'Nunito Sans';
  font-size: 24px;
  align-self: center;
  font-weight: 700;
`;

export const ContainerTitleIcon = styled.div`
  display: flex;
  gap: 30px;
`;

export const InputSearch = styled.input`
  width: 250px;
  height: 20px;
  padding: 10px;
  cursor: pointer;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #c7ddcc;
  border-radius: 4px;
  color: #285430;
  font-family: 'Nunito Sans';
  background-image: url('../../imagens/icones/lupa-arredondada.png');
  background-repeat: no-repeat;

  &::placeholder {
    color: #e0e0e0;
    font-family: 'Nunito Sans';
    font-size: 14px;
  }

  &:focus {
    box-shadow: 0 0 0 0.2rem #8fba98;
    outline: none;
  }
`;

export const ContainerTitleSearch = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContainerTitle = styled.div`
  margin-bottom: 60px;
`;

export const Title = styled.h1`
  color: #285430;
  font-family: 'Nunito Sans', sans-serif;
  font-size: 36px;
  font-weight: 700;
`;

export const Phrase = styled.p`
  font-family: 'Mulish';
  font-size: 20px;
  font-weight: 300px;
  color: #7d7987;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
`;

export const Tr = styled.tr`
  padding: 8px;
`;

export const Th = styled.th`
  padding: 8px;
  border-bottom: 1px solid #285430;
  text-align: left;
  font-family: 'Nunito Sans';
  font-weight: 300px;
  font-size: 18px;
  color: #7d7987;
`;
export const Td = styled.td`
  padding: 8px;
  border-bottom: 1px solid #ddd;
  color: #a1a1a1;
  font-size: 16px;
  &:hover {
    color: green;
  }
`;

export const EditIcone = styled.img`
  width: 30px;
`;

export const TrashIcone = styled.img`
  width: 30px;
`;

export const IconsButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const Thead = styled.thead``;

export const Tbody = styled.tbody``;
