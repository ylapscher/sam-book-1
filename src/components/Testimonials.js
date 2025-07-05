import React from 'react';
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
    text: "The quality, personalization, and heartfelt storytelling completely blew me away. I gave it as a gift for my friend's daughter's first birthday, and she actually cried when she opened it and said it was truly the most amazing gift. You can truly feel the love and care that went into every page. I can't recommend this enough!",
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
  padding: 3rem 0;
  text-align: center;
`;

const TestimonialsTitle = styled.h2`
  color: var(--primary-color);
  margin-bottom: 2rem;
  font-size: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.6rem;
  }
`;

const ReviewsList = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
  }
`;

const ReviewItem = styled.div`
  text-align: left;
  padding: 1.5rem 0;
  border-bottom: 1px solid #eee;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
`;

const ReviewerName = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--primary-color);
  margin: 0;
`;

const ReviewDate = styled.span`
  font-size: 0.9rem;
  color: #888;
`;

const Stars = styled.div`
  color: #ffc107;
  font-size: 1.1rem;
  margin: 0.5rem 0;
`;

const ReviewText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  color: var(--secondary-color);
  margin: 0.75rem 0 0 0;
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
  margin-top: 2rem;
  display: inline-block;
  text-decoration: none;

  &:hover {
    background-color: #c15050;
  }
`;

function CustomTestimonials() {
  const handleAddReview = () => {
    const subject = encodeURIComponent('Book Review');
    const mailtoLink = `mailto:samlapscher@gmail.com?subject=${subject}`;
    window.open(mailtoLink);
  };

  return (
    <TestimonialsContainer id="testimonials">
      <TestimonialsTitle>Customer Reviews</TestimonialsTitle>
      <ReviewsList>
        {testimonials.map((review, index) => (
          <ReviewItem key={index}>
            <ReviewHeader>
              <ReviewerName>{review.name}</ReviewerName>
              <ReviewDate>{review.date}</ReviewDate>
            </ReviewHeader>
            <Stars>{'★'.repeat(review.stars)}</Stars>
            <ReviewText>{review.text}</ReviewText>
          </ReviewItem>
        ))}
      </ReviewsList>
      <AddReviewButton onClick={handleAddReview}>
        Add Your Review
      </AddReviewButton>
    </TestimonialsContainer>
  );
}

export default CustomTestimonials;