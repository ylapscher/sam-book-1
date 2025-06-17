import React, { useState } from 'react';
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
    text: "It's so special sammi it's truly like the most incredible gift",
    stars: 5
  },
  {
    name: 'Evelyn L',
    date: 'June 2',
    text: 'I ordered this photo book as a gift, and it completely exceeded expectations. The quality was outstanding, and the layout brought the memories to life in such a meaningful way. I couldn\'t be happier with how it turned out.',
    stars: 5
  }
];

const TestimonialsContainer = styled.section`
  background-color: #fff;
  padding: 3rem 0;
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
  transition: color 0.2s;
  z-index: 2;
  display: flex;
  align-items: center;
  height: 100%;
  position: relative;
  &:hover {
    color: var(--primary-color);
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
  text-align: left;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 340px;
  max-width: 400px;
  height: 340px;
  justify-content: flex-start;
  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
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
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 7;
  -webkit-box-orient: vertical;
`;

const ReviewButton = styled.a`
  display: inline-block;
  margin: 2rem auto 0 auto;
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
  const visibleCount = 3;
  const total = testimonials.length;

  const prev = () => setStart((start - 1 + total) % total);
  const next = () => setStart((start + 1) % total);

  // Get the 3 testimonials to show, wrapping around if needed
  const visibleTestimonials = Array.from({ length: visibleCount }, (_, i) => testimonials[(start + i) % total]);

  return (
    <TestimonialsContainer id="testimonials">
      <TestimonialsTitle>Testimonials</TestimonialsTitle>
      <CarouselOuter>
        <ArrowButton onClick={prev} aria-label="Previous testimonial">&#8592;</ArrowButton>
        <Carousel>
          {visibleTestimonials.map((t, idx) => (
            <TestimonialCard key={idx}>
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
        <ArrowButton onClick={next} aria-label="Next testimonial">&#8594;</ArrowButton>
      </CarouselOuter>
      <ReviewButton href="mailto:samlapscher@gmail.com?subject=New%20Review">Submit a Review</ReviewButton>
    </TestimonialsContainer>
  );
}

export default CustomTestimonials;
