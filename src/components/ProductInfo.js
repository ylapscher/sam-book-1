import React from 'react';
import styled from 'styled-components';

const ProductInfoContainer = styled.div`
  padding: 1rem;
  background-color: #ffffff;
  border-radius: 8px;
  width: 100%;
  box-sizing: border-box;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    margin-top: 1rem;
  }

  h2 {
    font-size: 1.8rem;
    color: var(--primary-color);
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      font-size: 1.6rem;
      margin-bottom: 0.8rem;
    }
  }

  .subtitle {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--secondary-color);
    margin-bottom: 1.5rem;
    
    @media (max-width: 768px) {
      margin-bottom: 1rem;
    }
  }

  p {
    margin-bottom: 0.8rem; 
  }
`;

const Price = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--primary-color);
  margin: 1.5rem 0;
  text-align: left;
`;

const SubmitButton = styled.button`
  display: block;
  width: 100%;
  padding: 0.9rem 1.5rem;
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1.5rem;

  &:hover {
    background-color: #c15050; /* darker shade of primary color */
  }
`;

function ProductInfo() {
  const scrollToForm = () => {
    const formSection = document.getElementById('form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <ProductInfoContainer>
      <h2>About Our Family Story</h2>
      <div className="subtitle">
        <p>Welcome a new baby with a personalized story all about them. Featuring grandparents' names, family photos, and hand-painted illustrations, this book makes the child the star of their own story. A timeless keepsake celebrating a family's journey and the love and stories from generations past that help shape this amazing child. With strong roots and lots of love, this little star can do anything!</p>
        
        <div style={{ marginTop: "1.5rem" }}>
          <p style={{ margin: "0" }}><span style={{ fontWeight: "500" }}>✓</span> Recommended for ages 0-8</p>
          <p style={{ margin: "0" }}><span style={{ fontWeight: "500" }}>✓</span> Printed and dispatched in 5 working days</p>
          <p style={{ margin: "0" }}><span style={{ fontWeight: "500" }}>✓</span> Upload special photos to customize your story</p>
          <p style={{ margin: "0" }}><span style={{ fontWeight: "500" }}>✓</span> A beautiful gift for newborns and new parents</p>
        </div>
      </div>
      <Price>$38</Price>
      
      <SubmitButton onClick={scrollToForm}>
        Personalize Your Book
      </SubmitButton>
    </ProductInfoContainer>
  );
}

export default ProductInfo;
