import React, { useState } from 'react';
import { Link } from 'react-scroll';
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
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  position: relative;

  h1 {
    margin: 0;
    font-size: 1.5rem;
    color: var(--primary-color);
    font-weight: 500;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 1rem;
    gap: 1rem;
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'flex' : 'none'};
    flex-direction: column;
    align-items: center;
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: white;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
    padding: 1rem 0;
    z-index: 1000;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: var(--secondary-color);
  font-size: 1rem;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0.5rem 0;

  &:hover {
    color: var(--accent-color);
  }

  @media (max-width: 768px) {
    width: 100%;
    text-align: center;
    padding: 0.75rem 0;
    border-top: 1px solid #eee;
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--secondary-color);

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
    z-index: 1001;
  }
`;

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <h1 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Sam Story Book</h1>
        <MobileMenuToggle onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </MobileMenuToggle>
        <NavLinks isOpen={isMenuOpen}>
          <NavLink to="how-it-works" smooth={true} duration={500} onClick={closeMenu}>How It Works</NavLink>
          <NavLink to="form-section" smooth={true} duration={500} onClick={closeMenu}>Personalize</NavLink>
          <NavLink to="story-section" smooth={true} duration={500} onClick={closeMenu}>About</NavLink>
          <NavLink to="testimonials" smooth={true} duration={500} onClick={closeMenu}>Reviews</NavLink>
          <NavLink to="faq-section" smooth={true} duration={500} onClick={closeMenu}>FAQ</NavLink>
        </NavLinks>
      </HeaderContent>
    </HeaderContainer>
  );
}

export default Header;
