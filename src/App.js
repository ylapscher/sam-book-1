import React, { useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import { Helmet } from 'react-helmet';

// Import components
import Header from './components/Header';
import ProductSection from './components/ProductSection';
import HowItWorks from './components/HowItWorks';
import FormSection from './components/FormSection';
import StorySection from './components/StorySection';
import FAQSection from './components/FAQSection';
import CustomTestimonials from './components/Testimonials';
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
  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Our Family Story Book",
    "image": [
      "https://www.samstorybook.com/images/1.png",
      "https://www.samstorybook.com/images/2.png",
      "https://www.samstorybook.com/images/3.png"
    ],
    "description": "Create a personalized children's book celebrating your family's heritage and love. Custom story books for ages 0-8 featuring family photos, grandparents' names, and hand-painted illustrations.",
    "brand": {
      "@type": "Brand",
      "name": "Sam Story Book"
    },
    "offers": {
      "@type": "Offer",
      "url": "https://www.samstorybook.com",
      "priceCurrency": "USD",
      "price": "32-38",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "Organization",
        "name": "Sam Story Book"
      }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "4"
    },
    "category": "Children's Books",
    "audience": {
      "@type": "Audience",
      "suggestedMinAge": 0,
      "suggestedMaxAge": 8
    }
  };

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
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
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
    </>
  );
}

export default App;