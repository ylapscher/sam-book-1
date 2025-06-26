import React, { useState, useEffect, useRef } from 'react';
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
    text: "The quality, personalization, and heartfelt storytelling completely blew me away. I gave it as a gift for my friend's daughter's first birthday, and she actually cried when she opened it and said it was truly the most amazing gift.  You can truly feel the love and care that went into every page. I can't recommend this enough!",
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
  padding: 3rem 0 0.3rem 0;
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
  min-height: 390px;
  overflow: visible;
  
  @media (max-width: 768px) {
    flex-direction: column;
    min-height: 440px;
    padding: 0 1rem;
  }
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
  
  @media (max-width: 768px) {
    background: rgba(255, 255, 255, 0.9);
    border: 2px solid #ddd;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    font-size: 1.8rem;
    padding: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    
    &:first-of-type {
      left: 10px;
    }
    
    &:last-of-type {
      right: 10px;
    }
    
    &:hover:enabled {
      background: rgba(255, 255, 255, 1);
      border-color: #ccc;
    }
  }
`;

const CarouselContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: visible;
  
  @media (max-width: 768px) {
    order: 1;
    margin-bottom: 1rem;
    overflow: hidden;
  }
`;

const Carousel = styled.div`
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: center;
  align-items: stretch;
  transition: transform 0.3s ease;
  overflow: visible;
  
  @media (max-width: 768px) {
    gap: 1rem;
    transform: translateX(${props => props.translateX}px);
    width: ${props => props.totalWidth}px;
  }
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
  margin-top: 1.5rem;
  
  @media (max-width: 768px) {
    min-width: calc(100vw - 4rem);
    max-width: calc(100vw - 4rem);
    margin: 1.5rem 1rem 0 1rem;
    padding: 1.5rem 1.2rem 1.2rem 1.2rem;
    min-height: 320px;
  }
`;

const QuoteIcon = styled.span`
  position: absolute;
  top: -1.5rem;
  left: 1rem;
  font-size: 4.5rem;
  color: var(--accent-color);
  font-family: 'Georgia', serif;
  font-weight: 900;
  line-height: 1;
  user-select: none;
  z-index: 2;
  pointer-events: none;
  opacity: 0.4;
  
  @media (max-width: 768px) {
    top: -1rem;
    left: 0.8rem;
    font-size: 3.5rem;
  }
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
  margin: 0.2rem 0 0.2rem 0;
`;

const Text = styled.div`
  font-size: 1.1rem;
  color: #222;
  line-height: 1.4;
`;

const DotIndicators = styled.div`
  display: none;
  justify-content: center;
  gap: 0.5rem;
  margin: 1rem 0;
  
  @media (max-width: 768px) {
    display: flex;
    order: 2;
  }
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.active ? 'var(--accent-color)' : '#ddd'};
  cursor: pointer;
  transition: background-color 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? 'var(--accent-color)' : '#bbb'};
  }
`;

const AddReviewButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;
  display: inline-block;
  text-decoration: none;

  &:hover {
    background-color: #c15050;
  }
`;

function CustomTestimonials() {
  const [start, setStart] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);
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

  const handleAddReview = () => {
    const subject = encodeURIComponent('Book Review');
    const mailtoLink = `mailto:samlapscher@gmail.com?subject=${subject}`;
    window.open(mailtoLink);
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe && start < total - visibleCount) {
      next();
    }
    if (isRightSwipe && start > 0) {
      prev();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const goToSlide = (index) => {
    setStart(index);
  };

  // Get the testimonials to show
  const visibleTestimonials = testimonials.slice(start, start + visibleCount);

  return (
    <TestimonialsContainer id="testimonials">
      <TestimonialsTitle>Customer Reviews</TestimonialsTitle>
      <CarouselOuter>
        <ArrowButton onClick={prev} aria-label="Previous testimonial" disabled={start === 0}>&#8592;</ArrowButton>
        <CarouselContainer>
          <Carousel
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
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
        </CarouselContainer>
        <ArrowButton onClick={next} aria-label="Next testimonial" disabled={start >= total - visibleCount}>&#8594;</ArrowButton>
        <DotIndicators>
          {testimonials.map((_, idx) => (
            <Dot
              key={idx}
              active={idx >= start && idx < start + visibleCount}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </DotIndicators>
      </CarouselOuter>
      <AddReviewButton onClick={handleAddReview}>
        Add Your Review
      </AddReviewButton>
    </TestimonialsContainer>
  );
}

export default CustomTestimonials;