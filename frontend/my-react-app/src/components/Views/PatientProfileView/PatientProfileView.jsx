import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ContainerMain, Menu, MenuItem } from './PatientProfile.styles';

import ProfileContainer from './componentes/profile/ProfileContainer';
import DashboardContainer from './componentes/dashboard/DashboardContainer';

import iconeDieta from '../../../imagens/icones/iconesPatienteProfileView/iconsMenu/comida-saudavel.png';
import iconePerfil from '../../../imagens/icones/iconesPatienteProfileView/iconsMenu/do-utilizador.png';
import iconeLista from '../../../imagens/icones/iconesPatienteProfileView/iconsMenu/lista-de-reproducao.png';
import iconeReceita from '../../../imagens/icones/iconesPatienteProfileView/iconsMenu/livro-de-receitas.png';

import LoadingLogo from '../../LoadingLogo/LoadingLogo';
import DietaContainer from './componentes/dieta/DietaContainer';

const PatientProfileView = () => {
  const { id } = useParams();
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
  }, []);


  const [activeComponent, setActiveComponent] = useState(1);

  const handleMenuItemClick = (index) => {
    setActiveComponent(index);
  };

  return (
    <ContainerMain>
      <Menu>
        <MenuItem
          active={activeComponent === 1}
          onClick={() => handleMenuItemClick(1)}
        >
          <img src={iconePerfil} alt="Icone perfil" />
        </MenuItem>
        <MenuItem
          active={activeComponent === 2}
          onClick={() => handleMenuItemClick(2)}
        >
          <img src={iconeLista} alt="Icone historico familiar de doencas" />
        </MenuItem>
        <MenuItem
          active={activeComponent === 3}
          onClick={() => handleMenuItemClick(3)}
        >
          <img src={iconeDieta} alt="Icone historico familiar de doencas" />
        </MenuItem>
        <MenuItem
          active={activeComponent === 4}
          onClick={() => handleMenuItemClick(4)}
        >
          <img src={iconeReceita} alt="Icone historico familiar de doencas" />
        </MenuItem>
      </Menu>
      {loading ? (
        <LoadingLogo />
      ) : (
        <>
          {activeComponent === 1 && patient && patient.length > 0 && (
            <ProfileContainer {...patient[0]} />
          )}
          {activeComponent === 2 && patient && patient.length > 0 && (
            <DashboardContainer {...patient[0]} />
          )}
           {activeComponent === 3 && patient && patient.length > 0 && (
            <DietaContainer {...patient[0]} />
          )}
        </>
      )}
    </ContainerMain>
  );
};

export default PatientProfileView;
