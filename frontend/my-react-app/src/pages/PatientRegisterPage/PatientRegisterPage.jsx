import React from 'react'
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import PatientRegisterView from '../../components/Views/PatientRegisterView/patientRegister';

const PatientRegisterPage = () => {
  return (
    <>
    <Header />
    <PatientRegisterView />
    <Footer />
  </>
  )
}

export default PatientRegisterPage