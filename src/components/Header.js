import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: white;
  padding: 0.8rem 1rem;
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 1000; 
  border-bottom: 1px solid #DDDDDD;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--primary-color);
    font-weight: 500;
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <h1>Our Family Story</h1>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
