import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
export const ContainerSection = styled.section`
  display: flex;
  background-color: #f3f3f3;
  border-radius: 30px;
  flex-direction: column;
  animation: ${fadeIn} 0.5s ease-in-out;
`;
export const ContainerTitle = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;

  h2 {
    color: #285430;
    font-family: 'Nunito Sans', sans-serif;
  }

  p {
    color: #777777;
  }
`;
export const Img = styled.img`
  width: 60px;
`;
export const ContainerImg = styled.div``;

export const ContainerInfo = styled.div``;

export const ContainerMain = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const ContainerInfos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  h3 {
    color: #285430;
    font-family: 'Nunito Sans', sans-serif;
  }
  p {
    color: #777777;
  }
`;
export const ContainerImg2 = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
export const Icon = styled.img`
  width: 35px;
`;

export const DietasPacienteWrapper = styled.div`
  padding: 20px;
  border-radius: 40px;
  background-color: #ffffff;

  h1 {
    color: #285430;
    font-family: 'Nunito Sans', sans-serif;
    font-size: 24px;
  }
`;

export const DietaItem = styled.li`
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  ul {
    list-style-type: none;
    padding-left: 0;
  }
`;

export const RefeicaoItem = styled.li`
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #ccc;
  margin: 10px 0 10px 0;
  ul {
    list-style-type: none;
    padding-left: 0;
  }
`;
export const ContainerTitleRefeicao = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px 0 10px;
  color: ${(props) => props.cor};
  margin-bottom: 10px;

  h2 {
    font-family: 'Nunito Sans', sans-serif;
    font-size: 24px;
    font-weight: 700;
  }
`;

export const AlimentoItem = styled.li`
  display: flex;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-bottom: 8px;
  gap: 100px;
`;
export const ContainerImgRefeicao = styled.div``;

export const ContainerNSEI = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
export const IlustrationFood = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 20px;
`;

export const Alimentos = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  h5 {
    color: ${(props) => props.cor};
    font-family: 'Mulish';
    font-size: 16px;
    font-weight: 700;
  }

  p {
    font-family: 'Mulish';
  }
`;

export const ButtonOpenClone = styled.button`
  background: none;
  border: none;
  color: inherit;
  cursor: pointer;
  outline: none;
  padding: 0;
  text-align: inherit;
`;
export const StyledTableContainer = styled.div`
  border-radius: 10px;
  overflow: hidden; /* Para garantir que as bordas arredondadas sejam aplicadas corretamente */
  width: 100%;
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
    color: #1e1e1e;
  }

  th {
    background-color: ${(props) => `${props.cor}10`};
    font-weight: bold;
    color: ${(props) => props.cor};
  }

  tr:nth-child(even) {
  }

  tr:hover {
    background-color: #f7f7f7;
  }
`;

export const IconCloseOpen = styled.img`

&:hover {
    background-color: #f7f7f7;
    padding: 5px;
    border-radius: 5px;
  }
  width: 20px;
  padding: 5px;
`;

export const ButtonPDF = styled.button`
  padding: 10px;
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition-duration: 0.3s;

  &:hover {
    background-color: #5f8d4e;
  }

  &:hover .icon2 {
    border-bottom: 2px solid white;
    border-left: 2px solid white;
    border-right: 2px solid white;
  }

  &:hover .svgIcon {
    fill: white;
    animation: slide-in-top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }

  .svgIcon {
    fill: #5f8d4e;
    width: 24px; /* Ajuste o tamanho do ícone conforme necessário */
    height: 24px; /* Ajuste o tamanho do ícone conforme necessário */
    margin-bottom: 5px; /* Espaçamento entre o ícone e o texto */
  }

  .icon2 {
    width: 18px;
    height: 5px;
    border-bottom: 2px solid #5f8d4e;
    border-left: 2px solid #5f8d4e;
    border-right: 2px solid #5f8d4e;
  }

  .tooltip {
    position: absolute;
    top: -50px;
    opacity: 0;
    background-color: rgb(12, 12, 12);
    color: white;
    padding: 10px 10px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition-duration: 0.2s;
    pointer-events: none;
    letter-spacing: 0.5px;
  }

  &:hover .tooltip {
    opacity: 1;
    transition-duration: 0.3s;
  }

  .tooltip::before {
    position: absolute;
    content: '';
    width: 10px;
    height: 10px;
    background-color: rgb(12, 12, 12);
    background-size: 1000%;
    background-position: center;
    transform: rotate(45deg);
    bottom: -5%;
    transition-duration: 0.3s;
  }

  @keyframes slide-in-top {
    0% {
      transform: translateY(-10px);
      opacity: 0;
    }

    100% {
      transform: translateY(0px);
      opacity: 1;
    }
  }
`;
export const ContainerButtonOpenPDF = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0px 10px 0px;
  align-items: center;
`;
export const ContainerAvisoPDF = styled.div`
  display: flex;
  justify-content: end;
  padding: 10px;
  p{
    font-family: 'Mulish';
    color: #777777;
  }
`;
