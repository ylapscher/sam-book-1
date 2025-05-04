import React, { useEffect } from 'react';
import styled from 'styled-components';

const TestimonialsContainer = styled.section`
  background-color: #f9f9f9;
  padding: 3rem 0;
  text-align: center;
`;

const TestimonialsTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const TestimonialsWrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

function Testimonials() {
  useEffect(() => {
    // Dynamically load Elfsight script
    const script = document.createElement('script');
    script.src = 'https://static.elfsight.com/platform/platform.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <TestimonialsContainer id="testimonials">
      <TestimonialsWrapper>
        <TestimonialsTitle>Reviews</TestimonialsTitle>
        <div 
          className="elfsight-app-69cd4b16-bf86-4d96-b35b-e275ffa08160" 
          data-elfsight-app-lazy
        ></div>
      </TestimonialsWrapper>
    </TestimonialsContainer>
  );
}

export default Testimonials;
