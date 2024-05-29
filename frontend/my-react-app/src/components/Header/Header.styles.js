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
  align-items: center; /* Ensures items are aligned vertically in the center */
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

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 45px;
  height: 45px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.199);
  background-color: rgb(255, 65, 65);

  .sign {
    width: 100%;
    transition-duration: .3s;
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 17px;

      path {
        fill: white;
      }
    }
  }

  .text {
    position: absolute;
    right: 0%;
    width: 0%;
    opacity: 0;
    color: white;
    font-size: 1.2em;
    font-weight: 600;
    transition-duration: .3s;
    margin-left: 10px; /* Add margin to create space between svg and text */
  }

  &:hover {
    width: 125px;
    border-radius: 40px;
    transition-duration: .3s;

    .sign {
      width: 30%;
      transition-duration: .3s;
      padding-left: 20px;
    }

    .text {
      opacity: 1;
      width: 70%;
      transition-duration: .3s;
      padding-right: 10px;
    }
  }

  &:active {
    transform: translate(2px, 2px);
  }
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
