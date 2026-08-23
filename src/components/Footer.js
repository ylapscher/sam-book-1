import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  text-align: center;
  padding: 1rem;
  background-color: white;
  color: var(--secondary-color);
  border-top: 1px solid #DDDDDD;
`;

const FooterNav = styled.nav`
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;

  a {
    color: var(--secondary-color);
    text-decoration: none;
    font-size: 1rem;
  }

  a:hover {
    color: var(--accent-color);
  }
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterNav aria-label="About, contact, and privacy">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
        <a href="/privacy">Privacy</a>
      </FooterNav>
      <p>&copy; {new Date().getFullYear()} Sam Story Book. All rights reserved.</p>
    </FooterContainer>
  );
}

export default Footer;
