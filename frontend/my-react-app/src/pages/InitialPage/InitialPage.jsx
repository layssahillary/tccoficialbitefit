import React, { useEffect, useState } from 'react';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';
import InitialPageView from '../../components/Views/InitialPageView/index';
import LoadingLogo from '../../components/LoadingLogo/LoadingLogo';

const InitialPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <LoadingLogo />
      ) : (
        <>
          <Header />
          <InitialPageView />
          <Footer />
        </>
      )}
    </>
  );
};

export default InitialPage;
