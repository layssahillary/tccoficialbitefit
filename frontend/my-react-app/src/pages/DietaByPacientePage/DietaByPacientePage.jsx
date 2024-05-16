import React from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import DietaByPacienteView from '../../components/Views/DietaByPacienteView/DietaByPacienteView';
const NutricionistaProfilePage = () => {
  return (
    <>
      <Header />
      <DietaByPacienteView />
      <Footer />
    </>
  );
};

export default NutricionistaProfilePage;
