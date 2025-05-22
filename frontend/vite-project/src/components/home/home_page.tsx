import React from 'react';
import Aside from './assets/components/aside';
import Header from './assets/components/header';
import Footer from './assets/components/footer';
import Main from './assets/components/main';

const HomePage: React.FC = () => {
  return (
    <>   
      <Header />
      <Aside />
      <Main />
      <Footer />
    </>
  );
};

export default HomePage;
