import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const testimonials = [
  {
    name: 'Sharon G',
    date: 'May 21',
    text: 'The most beautifully illustrated and customized book for our baby and us 🥹😍 I have never seen anything like this and the art to the poems were so heartwarming and special.',
    stars: 5
  },
  {
    name: 'Michael Z',
    date: 'June 3',
    text: 'Thank you! What an amazing gift - Daniel loves it. I read it to him again today!',
    stars: 5
  },
  {
    name: 'Jenna S',
    date: 'May 14',
    text: "It's so special - it's truly like the most incredible gift!",
    stars: 5
  },
  {
    name: 'Evelyn L',
    date: 'June 2',
    text: 'I ordered this photo book as a gift & it completely exceeded expectations. The quality was outstanding, and the illustrations brought the memories to life in a meaningful way. I\'m so happy how it turned out!',
    stars: 5
  }
];

const TestimonialsContainer = styled.section`
  background-color: #fff;
  padding: 3rem 0 1.2rem 0;
  text-align: center;
`;

const TestimonialsTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 2rem;
  font-size: 2rem;
`;

const CarouselOuter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1300px;
  margin: 0 auto 2rem auto;
  position: relative;
  min-height: 370px;
`;

const ArrowButton = styled.button`
  background: none;
  border: none;
  font-size: 2.5rem;
  color: #bbb;
  cursor: pointer;
  padding: 0 1rem;
  transition: color 0.2s, opacity 0.2s, cursor 0.2s;
  z-index: 2;
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  
  &:hover:enabled {
    color: var(--primary-color);
  }

  &:disabled {
    color: #eee;
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Carousel = styled.div`
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;
  align-items: stretch;
`;

const TestimonialCard = styled.div`
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  padding: 2rem 1.5rem 1.5rem 1.5rem;
  text-align: center;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 340px;
  max-width: 400px;
  min-height: 340px;
  justify-content: flex-start;
  align-items: center;
  overflow: visible;
  position: relative;
`;

const QuoteIcon = styled.span`
  position: absolute;
  top: -1.7rem;
  left: calc(-1.7rem + 45px);
  font-size: 5.5rem;
  color: var(--accent-color);
  font-family: 'Georgia', serif;
  font-weight: 900;
  line-height: 1;
  user-select: none;
  z-index: 1;
  pointer-events: none;
  opacity: 0.5;
`;

const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const NameDate = styled.div`
  display: flex;
  flex-direction: column;
`;

const Name = styled.div`
  font-weight: 600;
  font-size: 1.1rem;
  color: #222;
`;

const Date = styled.div`
  font-size: 0.95rem;
  color: #888;
`;

const Stars = styled.div`
  color: #ffc107;
  font-size: 1.3rem;
  margin: 0.5rem 0 0.5rem 0;
`;

const Text = styled.div`
  font-size: 1.1rem;
  color: #222;
  line-height: 1.4;
`;

const ReviewButton = styled.a`
  display: inline-block;
  margin: 1rem auto 0 auto;
  padding: 0.8rem 2rem;
  background-color: var(--accent-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.2s;
  &:hover {
    background: #c15050;
  }
`;

function CustomTestimonials() {
  const [start, setStart] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const total = testimonials.length;

  // Responsive visibleCount
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 600) {
        setVisibleCount(1);
      } else if (window.innerWidth <= 900) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prev = () => {
    if (start > 0) setStart(start - 1);
  };
  const next = () => {
    if (start < total - visibleCount) setStart(start + 1);
  };

  // Get the testimonials to show, wrapping around if needed
  const visibleTestimonials = testimonials.slice(start, start + visibleCount);

  return (
    <TestimonialsContainer id="testimonials">
      <TestimonialsTitle>Customer Reviews</TestimonialsTitle>
      <CarouselOuter>
        <ArrowButton onClick={prev} aria-label="Previous testimonial" disabled={start === 0}>&#8592;</ArrowButton>
        <Carousel>
          {visibleTestimonials.map((t, idx) => (
            <TestimonialCard key={idx}>
              <QuoteIcon>&ldquo;</QuoteIcon>
              <CardHeader>
                <NameDate>
                  <Name>{t.name}</Name>
                  {t.date && <Date>{t.date}</Date>}
                </NameDate>
              </CardHeader>
              <Stars>{'★'.repeat(t.stars)}</Stars>
              <Text>{t.text}</Text>
            </TestimonialCard>
          ))}
        </Carousel>
        <ArrowButton onClick={next} aria-label="Next testimonial" disabled={start >= total - visibleCount}>&#8594;</ArrowButton>
      </CarouselOuter>
      <ReviewButton href="mailto:samlapscher@gmail.com?subject=New%20Review">Submit a Review</ReviewButton>
    </TestimonialsContainer>
  );
}

export default CustomTestimonials;
