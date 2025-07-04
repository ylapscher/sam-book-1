import React from 'react';
import styled from 'styled-components';
import authorHeadshot from '../assets/author-headshot.png';

const HandwrittenHeadline = styled.div`
  font-family: 'Oooh Baby', cursive;
  font-size: 4rem;
  color: #B49781;
  margin-bottom: 0.5rem;
  margin-left: 2px;
  letter-spacing: 1px;
  @media (max-width: 1200px) {
    text-align: center;
  }
`;

const StorySectionContainer = styled.section`
  background-color: #f9f9f9;
  padding: 1rem 0 2rem 0;
`;

const Section = styled.div`
  padding: 2rem 0;
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 360px 1fr;
  gap: 2.5rem;
  align-items: center;

  @media (max-width: 1200px) {
    padding: 2rem 1rem;
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .text-content {
    max-width: 750px;
    margin: 0 0 0 auto;
    @media (max-width: 1200px) {
      margin: 0 auto;
    }
  }

  h2 {
    text-align: left;
    margin-bottom: 1.5rem;
    font-size: 1.3rem;
    color: var(--primary-color);
    
    @media (max-width: 1200px) {
      text-align: center;
    }
    
    @media (max-width: 768px) {
      font-size: 1.6rem;
    }
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--secondary-color);
    margin-bottom: 1rem;
    text-align: left;
    @media (max-width: 1200px) {
      text-align: center;
    }
  }

  .signature {
    font-style: italic;
    margin-top: 1rem;
  }
`;

const Headshot = styled.img`
  width: 288px;
  height: auto;
  border-radius: 32px;
  margin: 0 auto;
  display: block;
  @media (max-width: 1200px) {
    width: 208px;
    height: auto;
  }
  @media (max-width: 600px) {
    width: 100%;
    max-width: 176px;
    height: auto;
    margin-bottom: 1.5rem;
  }
`;

function StorySection() {
  return (
    <StorySectionContainer id="story-section">
      <Section>
        <Headshot src={authorHeadshot} alt="Author headshot" />
        <div className="text-content">
          <HandwrittenHeadline>hey there!</HandwrittenHeadline>
          <h2>I'm Sam Lapscher.</h2>
          <p>
            I've always been an artist. My favorite early memories are coloring for hours with my mom and picking out crafts with my grandma at Michael's on the weekends. What started as a hobby became something I loved sharing. Whether I'm making gifts for friends and family, painting live wedding illustrations, or teaching macramé, sharing art with others always feels like a gift in itself.
          </p>
          <p>
            One day, while playing with my friend's baby, I saw her face light up as she recognized herself and her loved ones in family photos. That moment sparked the idea to create a personalized children's book. What began as a simple story grew into months of hand-painted watercolor illustrations to bring it to life.
          </p>
          <p>
          <em>Our Family Story</em> is really YOUR family's story. I hope it becomes a keepsake that celebrates your roots, honors those who came before, and helps your child build confidence, carrying forward generations of love and strength.
          </p>
          <p className="signature">xo, Sam</p>
        </div>
      </Section>
    </StorySectionContainer>
  );
}

export default StorySection; 