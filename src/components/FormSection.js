import React from 'react';
import styled from 'styled-components';
import { FilloutStandardEmbed } from '@fillout/react';

const SectionContainer = styled.section`
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

function FormSection() {
  return (
    <SectionContainer id="form-section" style={{ padding: '1rem 0' }}>
      <FilloutStandardEmbed
        filloutId="wQgANXSphgus"
        width="100%"
        dynamicResize={true}
      />
    </SectionContainer>
  );
}

export default FormSection;
