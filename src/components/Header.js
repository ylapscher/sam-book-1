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

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
  }
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
    
    h1 {
      font-size: 1.3rem;
    }
  }
`;

const NavLinks = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 280px;
    height: 100vh;
    background-color: white;
    flex-direction: column;
    align-items: flex-start;
    padding: 4rem 2rem 2rem 2rem;
    box-shadow: -2px 0 10px rgba(0,0,0,0.15);
    z-index: 1001;
    transition: right 0.3s ease;
    gap: 0;
  }
`;

const MobileOverlay = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
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
    text-align: left;
    padding: 1rem 0;
    border-bottom: 1px solid #eee;
    font-size: 1.1rem;
    color: var(--primary-color);
    
    &:hover {
      color: var(--accent-color);
    }
  }
`;

const CloseButton = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    font-size: 2rem;
    color: var(--secondary-color);
    cursor: pointer;
    padding: 0.5rem;
    line-height: 1;
  }
`;

const StickyCtaButton = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: none;
    position: fixed;
    bottom: 1rem;
    left: 1rem;
    right: 1rem;
    background-color: var(--accent-color);
    color: white;
    border: none;
    border-radius: 8px;
    padding: 1rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    z-index: 999;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    transition: all 0.3s ease;
    
    &:hover {
      background-color: #c15050;
      transform: translateY(-2px);
    }
  }
`;

const MobileMenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--secondary-color);
  padding: 0.5rem;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 1002;
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

  const scrollToForm = () => {
    const formSection = document.getElementById('form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <HeaderContainer>
        <HeaderContent>
          <h1 onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Sam Story Book</h1>
          <MobileMenuToggle onClick={toggleMenu}>
            {isMenuOpen ? '✕' : '☰'}
          </MobileMenuToggle>
          <MobileOverlay isOpen={isMenuOpen} onClick={closeMenu} />
          <NavLinks isOpen={isMenuOpen}>
            <CloseButton onClick={closeMenu}>✕</CloseButton>
            <NavLink to="how-it-works" smooth={true} duration={500} onClick={closeMenu}>How It Works</NavLink>
            <NavLink to="form-section" smooth={true} duration={500} onClick={closeMenu}>Personalize</NavLink>
            <NavLink to="story-section" smooth={true} duration={500} onClick={closeMenu}>About</NavLink>
            <NavLink to="testimonials" smooth={true} duration={500} onClick={closeMenu}>Reviews</NavLink>
            <NavLink to="faq-section" smooth={true} duration={500} onClick={closeMenu}>FAQ</NavLink>
          </NavLinks>
        </HeaderContent>
      </HeaderContainer>
      <StickyCtaButton onClick={scrollToForm}>
        🎁 Create Your Story Book
      </StickyCtaButton>
    </>
  );
}

export default Header;
