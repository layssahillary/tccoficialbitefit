import React from 'react'
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import PatientsPageView from '../../components/Views/PatientsPageView/PateintsPageView';

const PatientsPage = () => {
  return (
    <>
    <Header />
    <PatientsPageView />
    <Footer />
  </>
  )
}

export default PatientsPage