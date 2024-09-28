import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { ContainerMain, Menu, MenuItem } from './PatientProfile.styles';
import ProfileContainer from './componentes/profile/ProfileContainer';
import DashboardContainer from './componentes/dashboard/DashboardContainer';
import DietaContainer from './componentes/dieta/DietaContainer';
import LoadingLogo from '../../LoadingLogo/LoadingLogo';
import iconeDieta from '../../../imagens/icones/iconesPatienteProfileView/iconsMenu/comida-saudavel.png';
import iconePerfil from '../../../imagens/icones/iconesPatienteProfileView/iconsMenu/do-utilizador.png';
import iconeLista from '../../../imagens/icones/iconesPatienteProfileView/iconsMenu/lista-de-reproducao.png';
import iconeReceita from '../../../imagens/icones/iconesPatienteProfileView/iconsMenu/livro-de-receitas.png';

const PatientProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      axios
        .get(`http://localhost:8800/patient/getPatientById/` + id)
        .then((response) => {
          setPatient(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching patient:', error);
        });
    };

    fetchData();
  }, [id]);

  const handleMenuItemClick = (component) => {
    navigate(`${component}`);
  };

  const currentPath = location.pathname.split('/').pop();

  return (
    <ContainerMain>
      <Menu>
        <MenuItem
          active={currentPath === 'profile'}
          onClick={() => handleMenuItemClick('profile')}
        >
          <img src={iconePerfil} alt="Icone perfil" />
        </MenuItem>
        <MenuItem
          active={currentPath === 'dashboard'}
          onClick={() => handleMenuItemClick('dashboard')}
        >
          <img src={iconeLista} alt="Icone histórico familiar de doenças" />
        </MenuItem>
        <MenuItem
          active={currentPath === 'dieta'}
          onClick={() => handleMenuItemClick('dieta')}
        >
          <img src={iconeDieta} alt="Icone dieta" />
        </MenuItem>
        <MenuItem
          active={currentPath === 'receita'}
          onClick={() => handleMenuItemClick('receita')}
        >
          <img src={iconeReceita} alt="Icone receita" />
        </MenuItem>
      </Menu>
      {loading ? (
        <LoadingLogo />
      ) : (
        <Routes>
          <Route path="profile" element={<ProfileContainer {...patient[0]} />} />
          <Route path="dashboard" element={<DashboardContainer {...patient[0]} />} />
          <Route path="dieta" element={<DietaContainer {...patient[0]} />} />
        </Routes>
      )}
    </ContainerMain>
  );
};

export default PatientProfilePage;
