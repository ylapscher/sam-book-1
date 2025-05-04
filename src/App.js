import React, { useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

// Import components
import Header from './components/Header';
import ProductSection from './components/ProductSection';
import HowItWorks from './components/HowItWorks';
import FormSection from './components/FormSection';
import FAQSection from './components/FAQSection';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 0;
`;

function App() {


  // Check for form submission success
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has('submission-success')) {
      // Scroll to the form section to show the success message
      setTimeout(() => {
        const formSection = document.querySelector('#form-section');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <MainContent>
          <ProductSection />
          <HowItWorks />
          <FormSection />
          <Testimonials />
          <FAQSection />
        </MainContent>
        <Footer />
      </AppContainer>
    </>
  );
}

export default App;