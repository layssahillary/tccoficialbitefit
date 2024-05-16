import styled from 'styled-components';
import Modal from 'react-modal';

export const Nav = styled.nav`
  width: auto;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 200px; 
  background-color: #ffffff;
`;

export const Logo = styled.img`
  height: 100px; 
`;

export const Lista = styled.ul`
  display: flex;
  gap: 40px;
  list-style-type: none;
`;

export const NavItem = styled.li``;

export const NavLink = styled.a`
  color: #777777;
  font-family: 'Mulish';
  text-decoration: none;
  font-size: 18px;
  transition: transform 0.3s ease;
  &:hover {
    color: #15341a;
  }
`;

export const CadastrarPacienteLink = styled(NavLink)`
  font-weight: bold;
  color: #285430;
`;

export const Logout = styled(NavLink)`
  font-weight: bold;
`;

const customContentStyle = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
    maxHeight: '80vh', 
    overflowY: 'auto', 
    backgroundColor: '#f1f1f1',
    color: '#525252',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
};

export const StyledModal = styled(Modal).attrs({
  style: customContentStyle,
})``;

export const Button = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
`;

export const RedButton = styled(Button)`
  background-color: #f44336;
  color: white;
`;

export const GreenButton = styled(Button)`
  background-color: #4caf50;
  color: white;
`;

export const ButtonDivStyle = styled.div`
  display: flex;
  justify-content: space-between;
`;
