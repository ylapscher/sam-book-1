import React from 'react';
import styled from 'styled-components';
import ImageGallery from './ImageGallery';
import ProductInfo from './ProductInfo';

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 2rem;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 0;
  padding-top: 50px;
  padding-bottom: 50px;
  box-sizing: border-box;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  @media (max-width: 768px) {
    padding-top: 0.5rem;
    padding-bottom: 1rem;
  }
`;

function ProductSection() {
  return (
    <ProductGrid>
      <ImageGallery />
      <ProductInfo />
    </ProductGrid>
  );
}

export default ProductSection;
