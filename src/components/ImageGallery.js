import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 2px;
  }
  
  &::-webkit-scrollbar-thumb:hover {
    background: #999;
  }

  img {
    width: 60px;
    height: 60px;
    object-fit: cover;
    cursor: pointer;
    border: 2px solid transparent;
    border-radius: 4px;
    transition: all 0.3s ease;
    
    &.active {
      border-color: var(--accent-color);
      transform: scale(1.05);
    }

    &:hover {
      border-color: var(--secondary-color);
      transform: scale(1.02);
    }
  }

  @media (max-width: 768px) {
    flex-direction: row;
    overflow-x: auto;
    overflow-y: hidden;
    padding: 0.5rem 0 1rem 0;
    order: 2;
    gap: 0.5rem;
    
    &::-webkit-scrollbar {
      height: 4px;
    }

    img {
      width: 60px;
      height: 60px;
      flex-shrink: 0;
    }
  }
`;

const MainImageContainer = styled.div`
  flex: 1;
  position: relative;
  overflow: hidden;
  background-color: #f8f8f8;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => props.isZoomed ? 'zoom-out' : 'zoom-in'};

  img {
    width: 100%;
    max-height: 600px;
    object-fit: cover;
    display: block;
    border-radius: 8px;
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform-origin: ${props => `${props.zoomX}% ${props.zoomY}%`};
    transform: ${props => props.isZoomed ? 'scale(2)' : 'scale(1)'};
    
    &.loading {
      opacity: 0;
    }
    
    &.loaded {
      opacity: 1;
    }
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
    opacity: ${props => props.isZoomed ? '0' : '1'};
    transition: opacity 0.3s ease;
  }
`;

const ZoomIndicator = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(0,0,0,0.7);
  color: white;
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  display: ${props => props.show ? 'block' : 'none'};
  z-index: 10;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const LoadingSkeleton = styled.div`
  width: 100%;
  max-height: 600px;
  height: 400px;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
  border-radius: 8px;
  
  @keyframes loading {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
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
  const [loadedImages, setLoadedImages] = useState(new Set());
  const [isLoading, setIsLoading] = useState(true);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const imageRefs = useRef({});

  const images = useMemo(() => [
    { src: "/images/1.png", alt: "Pink cover with flowers", priority: true },
    { src: "/images/2.png", alt: "Blue cover with clouds", priority: true },
    { src: "/images/3.png", alt: "Sample page from the book", priority: false },
    { src: "/images/4.png", alt: "Another sample page", priority: false },
    { src: "/images/5.png", alt: "Third sample page", priority: false },
    { src: "/images/6.png", alt: "Fourth sample page", priority: false },
    { src: "/images/7.png", alt: "Art supplies", priority: false }
  ], []);

  const handleImageLoad = useCallback((src) => {
    setLoadedImages(prev => new Set(prev).add(src));
    if (src === images[0].src) {
      setIsLoading(false);
    }
  }, [images]);

  const preloadImage = useCallback((src) => {
    if (!loadedImages.has(src)) {
      const img = new Image();
      img.onload = () => handleImageLoad(src);
      img.src = src;
    }
  }, [loadedImages, handleImageLoad]);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    // Preload adjacent images
    const nextIndex = (index + 1) % images.length;
    const prevIndex = (index - 1 + images.length) % images.length;
    preloadImage(images[nextIndex].src);
    preloadImage(images[prevIndex].src);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    setCurrentImageIndex(newIndex);
    preloadImage(images[newIndex].src);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    setCurrentImageIndex(newIndex);
    preloadImage(images[newIndex].src);
  };

  // Preload priority images on mount
  useEffect(() => {
    images.forEach(image => {
      if (image.priority) {
        preloadImage(image.src);
      }
    });
  }, [images, preloadImage]);

  // Handle keyboard navigation for images
  useEffect(() => {
    const handleArrowKeys = (e) => {
      if (e.key === 'ArrowLeft') {
        const newIndex = currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
        setCurrentImageIndex(newIndex);
        preloadImage(images[newIndex].src);
      } else if (e.key === 'ArrowRight') {
        const newIndex = currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
        setCurrentImageIndex(newIndex);
        preloadImage(images[newIndex].src);
      }
    };

    window.addEventListener('keydown', handleArrowKeys);
    
    return () => {
      window.removeEventListener('keydown', handleArrowKeys);
    };
  }, [currentImageIndex, images, preloadImage]);

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
    
    // Only navigate if not zoomed
    if (!isZoomed) {
      if (isLeftSwipe) {
        handleNextImage({ stopPropagation: () => {} });
      }
      if (isRightSwipe) {
        handlePrevImage({ stopPropagation: () => {} });
      }
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleImageClick = (e) => {
    if (window.innerWidth > 768) { // Only enable zoom on desktop
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      setZoomPosition({ x, y });
      setIsZoomed(!isZoomed);
    }
  };

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape' && isZoomed) {
      setIsZoomed(false);
    }
  }, [isZoomed]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

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
        isZoomed={isZoomed}
        zoomX={zoomPosition.x}
        zoomY={zoomPosition.y}
      >
        {isLoading && <LoadingSkeleton />}
        <ZoomIndicator show={!isZoomed && window.innerWidth > 768}>
          Click to zoom
        </ZoomIndicator>
        <img
          ref={el => imageRefs.current[currentImageIndex] = el}
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt}
          className={loadedImages.has(images[currentImageIndex].src) ? 'loaded' : 'loading'}
          onLoad={() => handleImageLoad(images[currentImageIndex].src)}
          onClick={handleImageClick}
          loading="eager"
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
