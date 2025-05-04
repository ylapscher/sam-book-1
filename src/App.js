import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

// Import components
import Header from './components/Header';
import ProductSection from './components/ProductSection';
import HowItWorks from './components/HowItWorks';
import FormSection from './components/FormSection';
import FAQSection from './components/FAQSection';
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
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [stripeError, setStripeError] = useState(false);

  // Stripe integration
  useEffect(() => {
    // Add Stripe script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    
    // Handle success
    script.onload = () => {
      setStripeLoaded(true);
      
      // Handle possible Stripe errors
      setTimeout(() => {
        const stripeBuyButton = document.querySelector('stripe-buy-button');
        if (stripeBuyButton && 
            (!stripeBuyButton.shadowRoot || 
             !stripeBuyButton.shadowRoot.querySelector('button'))) {
          setStripeError(true);
        }
      }, 2000);
    };
    
    // Handle errors
    script.onerror = () => {
      console.log('Stripe script failed to load.');
      setStripeError(true);
    };
    
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

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
          <ProductSection stripeLoaded={stripeLoaded} />
          <HowItWorks />
          <FormSection />
          <FAQSection />
        </MainContent>
        <Footer />
      </AppContainer>
    </>
  );
}

export default App;