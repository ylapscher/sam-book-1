import React from 'react';
import styled from 'styled-components';

const HowItWorksContainer = styled.section`
  background-color: #f9f9f9;
  padding-top: 3rem;
  padding-bottom: 3rem;
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

const StepGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const StepBox = styled.div`
  background-color: white;
  padding: 2rem 1.5rem;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: none;

  .step-number {
    background-color: var(--accent-color);
    color: white;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    line-height: 40px;
    font-size: 1.2rem;
    font-weight: bold;
    margin: 0 auto 1rem auto;
  }

  h3 {
    font-size: 1.3rem;
    color: var(--secondary-color);
    margin-bottom: 1rem;
  }

  p {
    font-size: 0.95rem;
    color: #555;
    line-height: 1.5;
  }
`;

function HowItWorks() {
  return (
    <HowItWorksContainer id="how-it-works">
      <Section>
        <h2>How It Works</h2>
        <StepGrid>
          <StepBox>
            <div className="step-number">1</div>
            <h3>Share Your Story</h3>
            <p>Fill out the details about the baby and family. Add family origins and names to be displayed throughout the story.</p>
          </StepBox>
          <StepBox>
            <div className="step-number">2</div>
            <h3>Customize Your Book</h3>
            <p>Upload family photos and choose a book cover. Make it uniquely yours with these personal touches!</p>
          </StepBox>
          <StepBox>
            <div className="step-number">3</div>
            <h3>Place Your Order</h3>
            <p>Add a heartfelt message to include in the book. Then, complete your purchase, and we'll ship your custom baby book directly to you!</p>
          </StepBox>
        </StepGrid>
      </Section>
    </HowItWorksContainer>
  );
}

export default HowItWorks;
