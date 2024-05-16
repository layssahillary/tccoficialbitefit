import React from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import PatientProfileView from '../../components/Views/PatientProfileView/PatientProfileView';
const PatientProfilePage = () => {
  return (
    <>
      <Header />
      <PatientProfileView />
      <Footer />
    </>
  );
};

export default PatientProfilePage;
