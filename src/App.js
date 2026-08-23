import React, { useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { Helmet, HelmetProvider } from 'react-helmet-async';

// Import components
import Header from './components/Header';
import ProductSection from './components/ProductSection';
import HowItWorks from './components/HowItWorks';
import FormSection from './components/FormSection';
import StorySection from './components/StorySection';
import FAQSection from './components/FAQSection';
import CustomTestimonials from './components/Testimonials';
import Footer from './components/Footer';
import { structuredDataJson } from './agent/structuredData';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow-x: hidden; /* Prevent horizontal scrolling */
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 0;
  margin-top: 0;

  @media (max-width: 768px) {
    padding-top: 60px;
  }
`;

function App() {
  // Check for form submission success
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has('submission-success')) {
      // Fire Meta Pixel Lead event (form/email signup submitted)
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
      }
      // Fire Meta Pixel Purchase event (order completed)
      if (typeof window.fbq === 'function') {
        const value = parseFloat(url.searchParams.get('value') || url.searchParams.get('amount') || url.searchParams.get('order_value')) || 38;
        window.fbq('track', 'Purchase', { value, currency: 'USD' });
      }
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
    <HelmetProvider>
      <Helmet>
        <script type="application/ld+json">
          {structuredDataJson()}
        </script>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-EM0KL5NT5L"></script>
        <script>
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-EM0KL5NT5L', {
              page_title: "Sam Story Book - Personalized Children's Books",
              page_location: window.location.href
            });
          `}
        </script>
      </Helmet>
      <GlobalStyles />
      <AppContainer>
        <Header />
        <MainContent>
          <ProductSection />
          <HowItWorks />
          <FormSection />
          <StorySection />
          <CustomTestimonials />
          <FAQSection />
        </MainContent>
        <Footer />
      </AppContainer>
    </HelmetProvider>
  );
}

export default App;