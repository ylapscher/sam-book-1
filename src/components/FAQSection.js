import React, { useState } from 'react';
import styled from 'styled-components';

const ContactSectionContainer = styled.section`
  background-color: #ffffff;
`;

const Section = styled.div`
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 1200px) {
    padding: 2rem 1rem;
  }

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    font-size: 2rem;
    color: var(--primary-color);
  }
`;

const FAQ = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const FAQItem = styled.div`
  margin-bottom: 0.8rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 0.8rem;

  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
    cursor: pointer;
    color: var(--secondary-color);
    display: flex;
    justify-content: space-between;
    gap: 0;
    align-items: center;

    span.question-text {
      padding-right: 2rem;
    }

    &::after {
      content: '+';
      font-size: 1.5rem;
      transition: transform 0.3s ease;
      transform: ${props => props.isOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
    max-height: ${props => props.isOpen ? '1000px' : '0'};
    overflow: hidden;
    transition: max-height 0.5s ease-in-out, padding 0.5s ease;
    margin: 0;
    padding-top: ${props => props.isOpen ? '0.5rem' : '0'};
  }
`;

const ContactButton = styled.a`
  display: inline-block;
  padding: 0.8rem 1.8rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-decoration: none;

  &:hover {
    background-color: #c15050; /* darker shade of accent color */
  }
`;

function FAQSection() {
  const [openFAQs, setOpenFAQs] = useState({});

  const toggleFAQ = (index) => {
    setOpenFAQs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <ContactSectionContainer id="faq-section">
      <Section>
        <h2>Frequently Asked Questions</h2>
        <FAQ>
          <FAQItem isOpen={openFAQs[0]}>
            <h3 onClick={() => toggleFAQ(0)}><span className="question-text">What makes this book special?</span></h3>
            <p>Our personalized children's book shares your family's special story using real names, places, and photos. It helps kids connect with their heritage while making reading fun and meaningful. Personalized books are great for building a love of reading because children see themselves in the story.</p>
          </FAQItem>
          <FAQItem isOpen={openFAQs[1]}>
            <h3 onClick={() => toggleFAQ(1)}><span className="question-text">How long does it take to create?</span></h3>
            <p>Once you've provided all information and photos, it typically takes 2-3 weeks to create, print, and deliver your personalized book.</p>
          </FAQItem>
          <FAQItem isOpen={openFAQs[2]}>
            <h3 onClick={() => toggleFAQ(2)}><span className="question-text">What information do I need to provide?</span></h3>
            <p>You'll need to share family names, countries of origin, settlement locations, and family photos including baby pictures and current photos.</p>
          </FAQItem>
        </FAQ>
        
        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p>Have any other questions?</p>
          <ContactButton 
            href="mailto:samlapscher@gmail.com?subject=Question%20about%20Our%20Family%20Story%20Book"
            target="_blank"
            rel="noopener noreferrer"
          >
            Contact Us
          </ContactButton>
        </div>
      </Section>
    </ContactSectionContainer>
  );
}

export default FAQSection;
