import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/LoginPage/Login';
import InitialPage from '../pages/InitialPage/InitialPage.jsx';
import PatientRegisterPage from '../pages/PatientRegisterPage/PatientRegisterPage.jsx';
import NutricionistRegisterPage from '../pages/NutricionistRegisterPage/NutricionistRegisterPage.jsx';
import PatientsPage from '../pages/PatientsPage/PatientsPage.jsx';
import PatientProfilePage from '../pages/PatientProfilePage/PatientProfilePage.jsx';
import NutricionistaProfilePage from '../pages/NutricionistaProfilePage/NutricionistaProfilePage.jsx';
import NotFoundPage from '../pages/PageNotFound/PageNotFound.jsx';
import DietaByPacientePage from '../pages/DietaByPacientePage/DietaByPacientePage.jsx';

import ConsultationPage from '../pages/ConsultationPage/ConsultationPage.jsx';

import GlobalStyle from '../styles/global';

function RoutesPath() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/initalPage" element={<InitialPage />} />
          <Route path="/cadastrarPaciente" element={<PatientRegisterPage />} />
          <Route path="/pacientes" element={<PatientsPage />} />
          <Route path="/perfilPaciente/:id" element={<PatientProfilePage />} />
          <Route path="/perfilNutricionista" element={<NutricionistaProfilePage />} />
          <Route path="/consultas" element={<ConsultationPage />} />
          <Route path="/dietaPaciente/:id" element={<DietaByPacientePage />} />
          <Route
            path="/nutricionistRegister"
            element={<NutricionistRegisterPage />}
          />
        </Routes>
      </Router>
      <GlobalStyle />
    </>
  );
}

export default RoutesPath;
