import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const ProductImagesContainer = styled.div`
  display: flex;
  gap: 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0;
  }
`;

const ThumbnailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  max-height: 600px;
  overflow-y: auto;

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 4px;
    transition: border-color 0.3s ease;
    
    &.active {
      border-color: var(--primary-color);
    }

    &:hover {
      border-color: var(--secondary-color);
    }
  }

  @media (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    padding-bottom: 1rem;
    order: 2; /* Show thumbnails below main image on mobile */

    img {
      width: 48px;
      height: 48px;
    }
  }
`;

const MainImageContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;

  img {
    width: 100%;
    max-height: 600px;
    object-fit: cover;
    display: block;
    border-radius: 8px;
  }

  .navigation-container {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem;
    pointer-events: none;
  }
`;

const NavigationButton = styled.button`
  background-color: #fff;
  color: #222;
  border: 2px solid #222;
  padding: 0.5rem 1rem;
  font-size: 1.5rem;
  cursor: pointer;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
  pointer-events: auto;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);

  &:hover {
    background-color: #f0f0f0;
    border-color: #111;
    color: #111;
  }
`;

function ImageGallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const images = [
    { src: "/images/1.png", alt: "Pink cover with flowers" },
    { src: "/images/2.png", alt: "Blue cover with clouds" },
    { src: "/images/3.png", alt: "Sample page from the book" },
    { src: "/images/4.png", alt: "Another sample page" },
    { src: "/images/5.png", alt: "Third sample page" },
    { src: "/images/6.png", alt: "Fourth sample page" },
    { src: "/images/7.png", alt: "Art supplies" }
  ];

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // Handle keyboard navigation for images
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setCurrentImageIndex((prev) => 
          prev === 0 ? images.length - 1 : prev - 1
        );
      } else if (e.key === 'ArrowRight') {
        setCurrentImageIndex((prev) => 
          prev === images.length - 1 ? 0 : prev + 1
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [images.length]);

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
    
    if (isLeftSwipe) {
      handleNextImage({ stopPropagation: () => {} });
    }
    if (isRightSwipe) {
      handlePrevImage({ stopPropagation: () => {} });
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <ProductImagesContainer>
      <ThumbnailList>
        {images.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            onClick={() => handleThumbnailClick(index)}
            className={currentImageIndex === index ? 'active' : ''}
          />
        ))}
      </ThumbnailList>
      
      <MainImageContainer
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <img
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt}
        />
        <div className="navigation-container">
          <NavigationButton 
            className="prev" 
            onClick={handlePrevImage}
            aria-label="Previous image"
          >
            ‹
          </NavigationButton>
          <NavigationButton 
            className="next" 
            onClick={handleNextImage}
            aria-label="Next image"
          >
            ›
          </NavigationButton>
        </div>
      </MainImageContainer>
    </ProductImagesContainer>
  );
}

export default ImageGallery;
