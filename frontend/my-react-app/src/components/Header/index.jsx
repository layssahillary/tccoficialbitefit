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
  Logout,
} from './Header.styles';
import logoBiteFit from '../../imagens/logoBiteFit/logoBiteFit.svg'; // Importe a imagem da logo
import { useNavigate } from 'react-router-dom'; // Importe useNavigate
import CardComponent from '../ModalConfirm/ModalConfirm'; // Importe o novo modal

function Header() {
  const [patients, setPatients] = useState([]);
  const navigate = useNavigate(); // Inicialize o hook useNavigate
  const [modalIsOpen, setModalIsOpen] = useState(false); // Estado para controlar a exibição do modal

  const handleLogout = () => {
    localStorage.removeItem('user');
    closeModal(); // Fecha o modal ao confirmar o logout
    navigate('/login'); // Redireciona para a página de login
  };

  const openModal = () => {
    setModalIsOpen(true); // Abre o modal
  };

  const closeModal = () => {
    setModalIsOpen(false); // Fecha o modal
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
            <NavLink href="/initalPage">Inicio</NavLink>
          </NavItem>

          {user.tipo === 'nutricionista' ? (
            <>
              <NavItem>
                <NavLink href="/pacientes">Pacientes</NavLink>
              </NavItem>
              <NavItem>
                <CadastrarPacienteLink href="/cadastrarPaciente">
                  Cadastrar paciente
                </CadastrarPacienteLink>
              </NavItem>
            </>
          ) : (
            <>
              {patients.map((patient) => (
                <>
                  <NavItem key={patient.paciente_id}>
                    <NavLink href={`/perfilPaciente/${patient.paciente_id}`}>
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
            <Logout onClick={openModal}>Sair</Logout>
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
