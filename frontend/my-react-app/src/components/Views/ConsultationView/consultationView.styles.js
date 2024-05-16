import styled, { keyframes } from 'styled-components';
const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;
export const ButtonGreen = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #5f8d4e;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #84a98c;
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

  label {
    margin-top: 20px;
  }

  select,
  input,
  textarea {
    margin-top: 8px;
    padding: 8px;
    border-radius: 5px;
    border: 1px solid #ccc;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker {
    font-size: 14px;
    border-radius: 5px;
    border: 1px solid #84a98c;
    z-index: 1;
    background-color: #fff;
  }

  .react-datepicker__input-container {
    display: block;
    input {
      width: 100%;
      padding: 8px;
      border: none;
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  }

  .hour-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 8px;
  }

  .hour-tags button {
    padding: 8px 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f8f9fa;
    color: #15341a;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  .hour-tags button.selected {
    background-color: #b7ccbb;
    color: green;
  }

  .datepicker-container {
    margin-top: 25px;
  }
`;

export const FormContainer = styled.div`
  display: flex;
  border: 1px solid #8fba98;
  padding: 30px;
  border-radius: 30px;
  gap: 20px;
  flex-direction: column;
`;

export const RowTwoContainer = styled.div`
  display: flex;
  padding: 0 200px 0 200px;
  border-radius: 30px;
  gap: 60px;
`;

export const SelectContainer = styled.div`
  display: flex;
  gap: 20px;
  color: #7d7987;
  padding-bottom: 20px;
`;
export const SelectInput = styled.select`
  padding: 10px;
  font-size: 16px;
  border: 1px solid #c7ddcc;
  border-radius: 4px;
  width: 420px;
  height: 40px;
  color: #285430;
  font-family: 'Nunito Sans';

  &::placeholder {
    color: #e0e0e0;
    font-family: 'Nunito Sans';
    font-size: 14px;
  }

  &:focus {
    box-shadow: 0 0 0 0.1rem #8fba98;
    outline: none;
  }
`;

export const DateContainer = styled.div``;
export const HourContainer = styled.div`
  border-right: 1px solid #5f8d4e;
  border-left: 1px solid #5f8d4e;
  padding: 0 20px 0 20px;
`;
export const ObservationContainer = styled.div`
  textarea {
    width: 200px;
    height: 190px;
    padding: 12px 20px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid #c7ddcc;
    font-size: 16px;
    resize: none;

    &::placeholder {
      color: #e0e0e0;
      font-family: 'Nunito Sans';
      font-size: 14px;
    }

    &:focus {
      box-shadow: 0 0 0 0.1rem #8fba98;
      outline: none;
    }
  }
`;

export const ContainerTitleIcon = styled.div`
  display: flex;
  gap: 30px;
`;

export const SearchIcon = styled.img`
  width: 80px;
  height: 80px;
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

export const TitleDateContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  gap: 10px;
  border-bottom: 2px solid #5f8d4e;
  padding-bottom: 10px;
  margin-bottom: 10px;
  color: #7d7987;
`;

export const CalendarioIconStyle = styled.img`
  width: 40px;
  height: 40px;
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
  font-weight: 300;
  font-size: 18px;
  color: #7d7987;
`;

export const Td = styled.td`
  padding: 20px 0;
  border-bottom: 1px solid #ddd;
  color: #a1a1a1;
  font-size: 16px;

  &:hover {
    color: green;
  }
`;

export const Select = styled.select`
  padding: 5px;
`;

export const ButtonDelete = styled.button`
  background: none;
  border: 1px solid red;
  border-radius: 10px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  align-self: end;
  color: red;
  margin-bottom: 20px;

  &:hover {
    background-color: #ffeeee;
    box-shadow: rgba(0, 0, 0, 0.15) 0 3px 9px 0;
    transform: translateY(-2px);
  }
`;

export const ContainerButtonSubmit = styled.div`
  display: flex;
  width: 100%;
  justify-content: end;
  padding-top: 20px;
`;

export const ContainerTitleAndSearch = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-top: 30px;
`;
export const BookIcon = styled.img`
  width: 50px;
  height: 50px;
`;
export const LixeiraIcon = styled.img`
  width: 30px;
`;
