import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Nav,
  Logo,
  Lista,
  NavItem,
  NavLink,
  HeaderContainer,
  CadastrarPacienteLink,
  LogoutButton,
} from './Header.styles';
import logoBiteFit from '../../imagens/logoBiteFit/logoBiteFit.svg'; 
import { useNavigate } from 'react-router-dom'; 
import CardComponent from '../ModalConfirm/ModalConfirm'; 

function Header() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate(); 
  const [modalIsOpen, setModalIsOpen] = useState(false); 

  const handleLogout = () => {
    localStorage.removeItem('user');
    closeModal(); 
    navigate('/login'); 
  };

  const openModal = () => {
    setModalIsOpen(true); 
  };

  const closeModal = () => {
    setModalIsOpen(false); 
  };

  const user = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const id = user.id.toString();
    axios
      .get('http://localhost:8800/patient/getPatientById/' + id)
      .then((response) => {
        setPatients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching patients:', error);
      });
  }, []);

  return (
    <Nav>
      <HeaderContainer>
        <Logo src={logoBiteFit} alt="Logo" />
        <Lista>
          <NavItem>
            <NavLink href="/initialPage">Inicio</NavLink>
          </NavItem>

          {user.tipo === 'nutricionista' ? (
            <>
             <NavItem>
                <CadastrarPacienteLink href="/cadastrarPaciente">
                  Cadastrar paciente
                </CadastrarPacienteLink>
              </NavItem>
              <NavItem>
                <NavLink href="/pacientes">Pacientes</NavLink>
              </NavItem>
             
            </>
          ) : (
            <>
              {patients.map((patient) => (
                <>
                  <NavItem key={patient.paciente_id}>
                    <NavLink href={`/perfilPaciente/${patient.paciente_id}/profile`}>
                      Perfil
                    </NavLink>
                  </NavItem>
                </>
              ))}
            </>
          )}

          <NavItem>
            <NavLink href="/consultas">Consultas</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/perfilNutricionista">Perfil Nutricionista</NavLink>
          </NavItem>
          <NavItem>
          <LogoutButton onClick={openModal}>
              <div className="sign">
                <svg viewBox="0 0 512 512">
                  <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z"></path>
                </svg>
              </div>
              <div className="text">Logout</div>
            </LogoutButton>
          </NavItem>
        </Lista>
      </HeaderContainer>
      
      {modalIsOpen && (
        <CardComponent
          heading="Tem certeza que deseja sair?"
          description="Ao sair, você será redirecionado para a página de login."
          cancelText="Cancelar"
          confirmText="Confirmar"
          show={modalIsOpen}
          onCancel={closeModal}
          onConfirm={handleLogout}
        />
      )}
    </Nav>
  );
}

export default Header;
