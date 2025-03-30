import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding-top: 0;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 1rem;
  background-color: white;
  color: var(--secondary-color);
  border-top: 1px solid #DDDDDD;
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  gap: 2rem;
  padding: 1rem 2rem;
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 0;
  padding-top: 50px;
  padding-bottom: 50px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const ProductImagesContainer = styled.div`
  display: flex;
  gap: 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 1rem;
  }
`;

const ThumbnailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 75px;

  @media (max-width: 768px) {
    flex-direction: row;
    width: 100%;
    overflow-x: auto;
    padding-bottom: 10px;
    
    img {
      width: 60px;
      height: 60px;
      object-fit: cover;
    }
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
    border: 2px solid transparent;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.05);
    }

    &.active {
      border-color: #222222;
    }
  }
`;

const MainImageContainer = styled.div`
  flex: 1;
  position: relative;
  
  img {
    width: 100%;
    height: auto;
    border-radius: 4px;
  }

  .navigation-container {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    pointer-events: none;
  }
`;

const NavigationButton = styled.button`
  position: absolute;
  background: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 2;
  transition: all 0.3s ease;
  pointer-events: auto;
  top: 50%;
  transform: translateY(-50%);

  &:hover {
    background: #f5f5f5;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%) scale(1.05);
  }

  &.prev {
    left: -24px;
    margin-left: 10px;
  }

  &.next {
    right: -24px;
    margin-right: 10px;
  }
  
  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
    
    &.prev {
      left: -10px;
    }
    
    &.next {
      right: -10px;
    }
  }
`;

const ProductInfo = styled.div`
  padding: 0 2rem;

  .subtitle {
    margin-bottom: 2rem;
    
    p {
      font-size: 16px;
      color: var(--secondary-color);
      margin-bottom: 1rem;
    }
  }

  @media (max-width: 1024px) {
    padding: 0;
  }
  
  @media (max-width: 768px) {
    .subtitle {
      margin-bottom: 1.5rem;
      
      p {
        font-size: 15px;
        margin-bottom: 0.8rem;
      }
      
      > div {
        grid-template-columns: 1fr !important;
        gap: 0.5rem !important;
      }
    }
  }
`;

const Price = styled.div`
  font-size: 24px;
  font-weight: 700;
  margin: 1rem 0;
  color: var(--price-color);
  
  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const Section = styled.section`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;

  h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  @media (max-width: 768px) {
    padding: 1.5rem 1rem;
    
    h2 {
      font-size: 22px;
      margin-bottom: 1rem;
    }
  }
`;

const HowItWorksSection = styled.div`
  background-color: #F8EEE6;
  width: 100%;
  padding: 3rem 0;
  
  h2 {
    font-size: 32px;
    margin-bottom: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const Card = styled.div`
  background: white;
  border-radius: 4px;
  padding: 2rem;
  border: 1px solid #DDDDDD;

  h3 {
    margin-bottom: 1rem;
  }

  p {
    color: var(--secondary-color);
    line-height: 1.6;
  }
`;

const FAQ = styled.div`
  max-width: 800px;
  margin: 1rem auto;
`;

const FAQItem = styled.div`
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;
  padding-bottom: 1rem;

  h3 {
    margin-bottom: 0.5rem;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &::after {
      content: "${props => props.isOpen ? '▼' : '▶'}";
      font-size: 0.8rem;
      transition: transform 0.3s ease;
    }
  }

  p {
    color: var(--secondary-color);
    line-height: 1.6;
    max-height: ${props => props.isOpen ? '1000px' : '0'};
    overflow: hidden;
    transition: max-height 0.3s ease;
    margin-bottom: ${props => props.isOpen ? '1rem' : '0'};
  }
`;

const FormSection = styled.div`
  form {
    @media (max-width: 768px) {
      padding: 1rem !important;
    }
  }
  
  .form-row {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 0;
    }
  }
  
  .form-group {
    flex: 1;
    
    @media (max-width: 768px) {
      margin-bottom: 0.5rem;
    }
  }
`;

const FileUpload = styled.div`
  border: 2px dashed #ddd;
  padding: 1.5rem;
  border-radius: 4px;
  text-align: center;
  margin-top: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;

  &:hover {
    border-color: #4b9cd3;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
  }

  label {
    display: block;
    color: #666;
    margin-bottom: 0;
  }

  &.file-uploaded {
    border-color: #2e7d32;
    background-color: #e6f7e6;
  }

  .upload-success {
    color: #2e7d32;
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .upload-success svg {
    margin-right: 0.5rem;
  }
`;

const SubmitButton = styled.button`
  background-color: var(--accent-color);
  color: white;
  font-size: 18px;
  font-weight: 500;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: var(--border-radius);
  cursor: pointer;
  transition: var(--transition);
  display: block;
  width: 100%;
  margin-bottom: 2rem;
  
  &:hover {
    background-color: #b86565;
  }
  
  @media (max-width: 768px) {
    font-size: 16px;
    padding: 0.7rem 1.2rem;
    margin-bottom: 1.5rem;
  }
`;

const Header = styled.header`
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem 0;
  z-index: 10;
  
  @media (max-width: 768px) {
    padding: 1.2rem 0;
  }
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    
    h1 {
      font-size: 22px;
    }
  }
`;

const StepGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3rem;
  margin-top: 2rem;
  max-width: 1000px;
  margin: 0 auto;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
`;

const StepBox = styled.div`
  background: white;
  border-radius: 8px;
  padding: 2.5rem;
  text-align: center;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  max-width: 320px;
  margin: 0 auto;
  width: 100%;
  
  .step-number {
    background-color: var(--accent-color);
    color: white;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 1.5rem;
    font-weight: 600;
    font-size: 18px;
  }
  
  h3 {
    margin-bottom: 1rem;
    font-size: 22px;
    color: var(--primary-color);
  }
  
  p {
    font-size: 16px;
    color: var(--secondary-color);
    line-height: 1.6;
    margin-bottom: 0.75rem;
  }
`;

const FormNavigation = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem;
  
  button {
    background-color: var(--accent-color);
    color: white;
    border: none;
    border-radius: var(--border-radius);
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    cursor: pointer;
    transition: var(--transition);
    
    &:hover {
      background-color: #b86565;
    }
    
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
  
  .back-btn {
    background-color: #6c757d;
    
    &:hover {
      background-color: #5a6268;
    }
  }
`;

const FormProgress = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  
  .step {
    width: 100px;
    text-align: center;
    position: relative;
    
    &:not(:last-child)::after {
      content: "";
      position: absolute;
      top: 15px;
      left: 50%;
      width: 100%;
      height: 2px;
      background-color: #ddd;
      z-index: 1;
    }
    
    &.active .step-number {
      background-color: var(--accent-color);
    }
    
    &.completed .step-number {
      background-color: #2e7d32;
    }
    
    &.completed:not(:last-child)::after {
      background-color: #2e7d32;
    }
  }
  
  .step-number {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #ddd;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0.5rem;
    position: relative;
    z-index: 2;
  }
  
  .step-title {
    font-size: 14px;
    color: var(--secondary-color);
  }
  
  .active .step-title {
    color: var(--primary-color);
    font-weight: 500;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;

  .field-label {
    display: flex;
    align-items: center;
    margin-bottom: 0.6rem;
    color: var(--secondary-color);
    font-weight: bold;
  }
  
  .field-number {
    margin-right: 0.5rem;
    font-weight: 600;
    color: var(--accent-color);
  }

  input[type="text"], select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
`;

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openFAQs, setOpenFAQs] = useState({});
  const [stripeLoaded, setStripeLoaded] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [stripeError, setStripeError] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [fileUploads, setFileUploads] = useState({
    parentBabyPhoto: false,
    datingPhoto: false,
    babyPhoto: false,
    familyPhoto: false
  });
  
  // Form step state
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  // Track step validity
  const [stepsValid, setStepsValid] = useState({
    1: false,
    2: false,
    3: false
  });
  
  // Track file size warnings
  const [fileSizeWarning, setFileSizeWarning] = useState(null);
  const [formValid, setFormValid] = useState(false);

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
    e.stopPropagation(); // Prevent event bubbling
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = (e) => {
    e.stopPropagation(); // Prevent event bubbling
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

    // Add event listener
    window.addEventListener('keydown', handleKeyDown);
    
    // Clean up
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [images.length]); // Only re-run if images array length changes

  const toggleFAQ = (index) => {
    setOpenFAQs(prev => {
      // If clicking on an already open section, close it
      if (prev[index]) {
        return {
          ...prev,
          [index]: false
        };
      }
      
      // Otherwise, close all sections and open the clicked one
      const newState = {};
      Object.keys(prev).forEach(key => {
        newState[key] = false;
      });
      return {
        ...newState,
        [index]: true
      };
    });
  };

  // Function to resize/compress an image file
  const compressImage = (file, maxSizeMB = 1.5) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        
        img.onload = () => {
          // Create a canvas to resize the image
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions while maintaining aspect ratio
          if (width > height) {
            if (width > 1200) {
              height = Math.round(height * (1200 / width));
              width = 1200;
            }
          } else {
            if (height > 1200) {
              width = Math.round(width * (1200 / height));
              height = 1200;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to a file 
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error('Canvas to Blob conversion failed'));
                return;
              }
              
              // Create a new file from the blob
              const resizedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              
              resolve(resizedFile);
            },
            'image/jpeg',
            0.7 // Quality setting (0.7 = 70% quality)
          );
        };
        
        img.onerror = (error) => {
          reject(error);
        };
      };
      
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      
      // Check file size - compress if over 1.5MB
      if (file.size > 1.5 * 1024 * 1024) {
        setFileSizeWarning(`Compressing ${file.name} (${(file.size / (1024 * 1024)).toFixed(2)}MB)...`);
        
        try {
          // Compress the image
          const compressedFile = await compressImage(file);
          
          // Replace the file in the input
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(compressedFile);
          e.target.files = dataTransfer.files;
          
          setFileSizeWarning(`Image compressed: ${(compressedFile.size / (1024 * 1024)).toFixed(2)}MB (was ${(file.size / (1024 * 1024)).toFixed(2)}MB)`);
          
          // Clear the warning after 3 seconds
          setTimeout(() => {
            setFileSizeWarning(null);
          }, 3000);
          
        } catch (error) {
          console.error('Error compressing image:', error);
          setFileSizeWarning(`Warning: ${file.name} is ${(file.size / (1024 * 1024)).toFixed(2)}MB. Please use a smaller image.`);
        }
      } else {
        setFileSizeWarning(null);
      }
      
      setFileUploads(prev => ({
        ...prev,
        [name]: true
      }));
    } else {
      setFileUploads(prev => ({
        ...prev,
        [name]: false
      }));
      setFileSizeWarning(null);
    }
  };

  const handleFormChange = (e) => {
    const form = e.target.form;
    const currentStepFields = Array.from(form.elements)
      .filter(element => {
        // Get only the form elements that are visible in the current step
        if (!element.name || element.type === 'submit' || element.type === 'button') {
          return false;
        }
        
        // For step 1, check if it's a family detail field
        if (currentStep === 1) {
          return ['babyName', 'parentName', 'grandparentName', 'grandparentOrigin', 'parentOrigin', 'settlementLocation'].includes(element.name);
        }
        
        // For step 2, check if it's a photo upload field
        if (currentStep === 2) {
          return ['parentBabyPhoto', 'datingPhoto', 'babyPhoto', 'familyPhoto'].includes(element.name);
        }
        
        // For step 3, check if it's a customization field
        if (currentStep === 3) {
          return ['childGender', 'coverStyle', 'message'].includes(element.name);
        }
        
        return false;
      });
    
    // Check if all visible fields in the current step are valid
    const isCurrentStepValid = currentStepFields.every(field => field.checkValidity());
    
    // Update the validity state for the current step
    setStepsValid(prev => ({
      ...prev,
      [currentStep]: isCurrentStepValid
    }));
    
    // Update overall form validity
    setFormValid(form.checkValidity());
  };
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitting(true);

    try {
      // Submit to Netlify
      const formElement = e.target;
      const formData = new FormData(formElement);
      
      await fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });

      // If successful, show the Stripe payment button
      setFormSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting the form. Please try again.');
    } finally {
      setFormSubmitting(false);
    }
  };

  useEffect(() => {
    // Add Stripe script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    
    // Handle success
    script.onload = () => {
      setStripeLoaded(true);
      
      // Silence Stripe console errors from ad blockers
      const originalConsoleError = console.error;
      console.error = function(msg, ...args) {
        // Filter out Stripe-related error messages
        if (typeof msg === 'string' && 
            (msg.includes('stripe.com') || 
             msg.includes('Failed to fetch') || 
             msg.includes('Uncaught (in promise)') ||
             msg.includes('FetchError'))) {
          return;
        }
        originalConsoleError.apply(console, [msg, ...args]);
      };
      
      // Detect if network requests to Stripe might be blocked
      setTimeout(() => {
        const stripeBuyButton = document.querySelector('stripe-buy-button');
        // If the button shadow DOM hasn't loaded properly after 2 seconds, assume blocked
        if (stripeBuyButton && 
            (!stripeBuyButton.shadowRoot || 
             !stripeBuyButton.shadowRoot.querySelector('button'))) {
          setStripeError(true);
        }
      }, 2000);
    };
    
    // Handle errors
    script.onerror = () => {
      console.log('Stripe script failed to load. This could be due to an ad blocker.');
      setStripeError(true);
    };
    
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  // Check for form submission success (Netlify adds ?submission-success to the URL)
  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has('submission-success')) {
      setFormSuccess(true);
      // Scroll to the form section to show the success message
      setTimeout(() => {
        const formSection = document.querySelector('.form-section');
        if (formSection) {
          formSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 500);
    }
  }, []);

  const scrollToForm = () => {
    const formSection = document.querySelector('.form-section');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Header>
          <HeaderContent>
            <h1>Our Family Story</h1>
          </HeaderContent>
        </Header>
        <MainContent>
          <ProductGrid>
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
              
              <MainImageContainer>
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

            <ProductInfo>
              <h2 style={{ marginBottom: "1rem", fontSize: "24px", color: "var(--primary-color)" }}>About the Book</h2>
              <div className="subtitle">
                <p>Welcome a new baby with a personalized tale that incorporates your family's history. This book features grandparents' names, cherished photographs, and hand-painted illustrations, making the little one the star of their story. A timeless keepsake to celebrate your family's journey for generations to come.</p>
                
                <div style={{ marginTop: "1.5rem" }}>
                  <p style={{ margin: "0" }}><span style={{ fontWeight: "500" }}>✓</span> Recommended for ages 0-8</p>
                  <p style={{ margin: "0" }}><span style={{ fontWeight: "500" }}>✓</span> Printed and dispatched in 5 working days</p>
                  <p style={{ margin: "0" }}><span style={{ fontWeight: "500" }}>✓</span> Upload special photos to customize your story</p>
                  <p style={{ margin: "0" }}><span style={{ fontWeight: "500" }}>✓</span> A beautiful gift for newborns and new parents</p>
                </div>
              </div>
              <Price>$34.99+</Price>
              
              {!stripeLoaded ? (
                <div style={{ 
                  textAlign: "center", 
                  padding: "1rem", 
                  border: "1px solid #ddd", 
                  borderRadius: "4px" 
                }}>
                  <p>Loading payment options...</p>
                </div>
              ) : (
                <SubmitButton onClick={scrollToForm}>
                  Personalize My Book
                </SubmitButton>
              )}
            </ProductInfo>
          </ProductGrid>

          <HowItWorksSection>
            <Section>
              <h2>How It Works</h2>
              <StepGrid>
                <StepBox>
                  <div className="step-number">1</div>
                  <h3>Share Your Story</h3>
                  <p>Enter the baby's details and upload photos.</p>
                  <p>Add family origins and names to be displayed throughout the story.</p>
                </StepBox>
                <StepBox>
                  <div className="step-number">2</div>
                  <h3>Customize Your Book</h3>
                  <p>Select the baby's gender and choose a book cover.</p>
                  <p>Make it uniquely yours with these personal touches.</p>
                </StepBox>
                <StepBox>
                  <div className="step-number">3</div>
                  <h3>Write a Loving Message & Place Your Order</h3>
                  <p>Add a heartfelt message to be printed on the last page of the book. Then, complete your purchase, and we'll ship your custom baby book directly to you.</p>
                </StepBox>
              </StepGrid>
            </Section>
          </HowItWorksSection>

          <FormSection className="form-section">
            <Section>
              <h2>Start Your Family's Story</h2>
              {formSuccess ? (
                <div style={{ 
                  background: "#e6f7e6", 
                  padding: "2rem", 
                  borderRadius: "10px", 
                  marginBottom: "2rem",
                  textAlign: "center",
                  maxWidth: "1000px",
                  margin: "0 auto"
                }}>
                  <h3 style={{ color: "#2e7d32" }}>Thank you for your submission!</h3>
                  <p>We've received your family story information. Our team will review it and contact you soon about your personalized book.</p>
                </div>
              ) : (
                <form
                  name="family-story" 
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  encType="multipart/form-data"
                  onChange={handleFormChange}
                  onSubmit={handleFormSubmit}
                  style={{
                    maxWidth: "600px",
                    margin: "0 auto",
                    background: "white",
                    padding: "2rem",
                    borderRadius: "10px",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                    display: "flex",
                    flexDirection: "column"
                  }}
                  className={formSubmitting ? "submitting" : ""}
                >
                  <input type="hidden" name="form-name" value="family-story" />
                  <input type="hidden" name="bot-field" />
                  
                  {fileSizeWarning && (
                    <div 
                      className="file-size-warning"
                      style={{
                        backgroundColor: "#fff3cd",
                        color: "#856404",
                        padding: "1rem",
                        borderRadius: "4px",
                        marginBottom: "1.5rem",
                        fontWeight: "bold"
                      }}
                    >
                      {fileSizeWarning}
                    </div>
                  )}
                  
                  {/* Form Progress Indicator */}
                  <FormProgress>
                    <div className={`step ${currentStep >= 1 ? 'active' : ''} ${currentStep > 1 ? 'completed' : ''}`}>
                      <div className="step-number">1</div>
                      <div className="step-title">Family Details</div>
                    </div>
                    <div className={`step ${currentStep >= 2 ? 'active' : ''} ${currentStep > 2 ? 'completed' : ''}`}>
                      <div className="step-number">2</div>
                      <div className="step-title">Family Photos</div>
                    </div>
                    <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
                      <div className="step-number">3</div>
                      <div className="step-title">Customization</div>
                    </div>
                  </FormProgress>
                  
                  {/* Step 1: Family Details */}
                  <div style={{ 
                    display: currentStep === 1 ? 'block' : 'none',
                    marginBottom: '2rem'
                  }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Family Details</h3>
                    
                    <FormGroup>
                      <div className="field-label">
                        <span className="field-number">1.</span>
                        <label htmlFor="babyName">Baby's Name</label>
                      </div>
                      <input type="text" name="babyName" id="babyName" required />
                    </FormGroup>

                    <FormGroup>
                      <div className="field-label">
                        <span className="field-number">2.</span>
                        <label htmlFor="parentName">Parent's Name</label>
                      </div>
                      <input type="text" name="parentName" id="parentName" required />
                    </FormGroup>

                    <FormGroup>
                      <div className="field-label">
                        <span className="field-number">3.</span>
                        <label htmlFor="parentOrigin">Parent's Country of Origin</label>
                      </div>
                      <input type="text" name="parentOrigin" id="parentOrigin" required />
                    </FormGroup>

                    <FormGroup>
                      <div className="field-label">
                        <span className="field-number">4.</span>
                        <label htmlFor="grandparentName">Grandparent's Name</label>
                      </div>
                      <input type="text" name="grandparentName" id="grandparentName" required />
                    </FormGroup>

                    <FormGroup>
                      <div className="field-label">
                        <span className="field-number">5.</span>
                        <label htmlFor="grandparentOrigin">Grandparent's Country of Origin</label>
                      </div>
                      <input type="text" name="grandparentOrigin" id="grandparentOrigin" required />
                    </FormGroup>

                    <FormGroup>
                      <div className="field-label">
                        <span className="field-number">6.</span>
                        <label htmlFor="settlementLocation">Where Family Settled</label>
                      </div>
                      <input type="text" name="settlementLocation" id="settlementLocation" required />
                    </FormGroup>
                  </div>
                  
                  {/* Step 2: Family Photos */}
                  <div style={{ 
                    display: currentStep === 2 ? 'block' : 'none',
                    marginBottom: '2rem'
                  }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Family Photos</h3>
                    
                    <FormGroup>
                      <div className="field-label">
                        <span className="field-number">1.</span>
                        <label>Parent's Baby Photo</label>
                      </div>
                      <FileUpload className={fileUploads.parentBabyPhoto ? "file-uploaded" : ""}>
                        <label htmlFor="parentBabyPhoto">
                          Click to upload or drag and drop (Max 1.5MB recommended)
                        </label>
                        <input 
                          type="file" 
                          name="parentBabyPhoto" 
                          id="parentBabyPhoto" 
                          accept="image/*"
                          required 
                          onChange={handleFileChange}
                        />
                        {fileUploads.parentBabyPhoto && (
                          <div className="upload-success">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM11.7071 6.70711L7.70711 10.7071C7.31658 11.0976 6.68342 11.0976 6.29289 10.7071L4.29289 8.70711C3.90237 8.31658 3.90237 7.68342 4.29289 7.29289C4.68342 6.90237 5.31658 6.90237 5.70711 7.29289L7 8.58579L10.2929 5.29289C10.6834 4.90237 11.3166 4.90237 11.7071 5.29289C12.0976 5.68342 12.0976 6.31658 11.7071 6.70711Z" fill="#2e7d32"/>
                            </svg>
                            File uploaded successfully
                          </div>
                        )}
                      </FileUpload>
                    </FormGroup>

                    <FormGroup>
                      <div className="field-label">
                        <span className="field-number">2.</span>
                        <label>Parents' Dating Photo</label>
                      </div>
                      <FileUpload className={fileUploads.datingPhoto ? "file-uploaded" : ""}>
                        <label htmlFor="datingPhoto">
                          Click to upload or drag and drop (Max 1.5MB recommended)
                        </label>
                        <input 
                          type="file" 
                          name="datingPhoto" 
                          id="datingPhoto" 
                          accept="image/*"
                          required 
                          onChange={handleFileChange}
                        />
                        {fileUploads.datingPhoto && (
                          <div className="upload-success">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM11.7071 6.70711L7.70711 10.7071C7.31658 11.0976 6.68342 11.0976 6.29289 10.7071L4.29289 8.70711C3.90237 8.31658 3.90237 7.68342 4.29289 7.29289C4.68342 6.90237 5.31658 6.90237 5.70711 7.29289L7 8.58579L10.2929 5.29289C10.6834 4.90237 11.3166 4.90237 11.7071 5.29289C12.0976 5.68342 12.0976 6.31658 11.7071 6.70711Z" fill="#2e7d32"/>
                            </svg>
                            File uploaded successfully
                          </div>
                        )}
                      </FileUpload>
                    </FormGroup>

                    <FormGroup>
                      <div className="field-label">
                        <span className="field-number">3.</span>
                        <label>Baby's Recent Photo</label>
                      </div>
                      <FileUpload className={fileUploads.babyPhoto ? "file-uploaded" : ""}>
                        <label htmlFor="babyPhoto">
                          Click to upload or drag and drop (Max 1.5MB recommended)
                        </label>
                        <input 
                          type="file" 
                          name="babyPhoto" 
                          id="babyPhoto" 
                          accept="image/*"
                          required 
                          onChange={handleFileChange}
                        />
                        {fileUploads.babyPhoto && (
                          <div className="upload-success">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM11.7071 6.70711L7.70711 10.7071C7.31658 11.0976 6.68342 11.0976 6.29289 10.7071L4.29289 8.70711C3.90237 8.31658 3.90237 7.68342 4.29289 7.29289C4.68342 6.90237 5.31658 6.90237 5.70711 7.29289L7 8.58579L10.2929 5.29289C10.6834 4.90237 11.3166 4.90237 11.7071 5.29289C12.0976 5.68342 12.0976 6.31658 11.7071 6.70711Z" fill="#2e7d32"/>
                            </svg>
                            File uploaded successfully
                          </div>
                        )}
                      </FileUpload>
                    </FormGroup>

                    <FormGroup>
                      <div className="field-label">
                        <span className="field-number">4.</span>
                        <label>Current Family Photo</label>
                      </div>
                      <FileUpload className={fileUploads.familyPhoto ? "file-uploaded" : ""}>
                        <label htmlFor="familyPhoto">
                          Click to upload or drag and drop (Max 1.5MB recommended)
                        </label>
                        <input 
                          type="file" 
                          name="familyPhoto" 
                          id="familyPhoto" 
                          accept="image/*"
                          required 
                          onChange={handleFileChange}
                        />
                        {fileUploads.familyPhoto && (
                          <div className="upload-success">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM11.7071 6.70711L7.70711 10.7071C7.31658 11.0976 6.68342 11.0976 6.29289 10.7071L4.29289 8.70711C3.90237 8.31658 3.90237 7.68342 4.29289 7.29289C4.68342 6.90237 5.31658 6.90237 5.70711 7.29289L7 8.58579L10.2929 5.29289C10.6834 4.90237 11.3166 4.90237 11.7071 5.29289C12.0976 5.68342 12.0976 6.31658 11.7071 6.70711Z" fill="#2e7d32"/>
                            </svg>
                            File uploaded successfully
                          </div>
                        )}
                      </FileUpload>
                    </FormGroup>
                    
                    <div style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#666", padding: "0.5rem", backgroundColor: "#f9f9f9", borderRadius: "4px" }}>
                      <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>Important Notes:</p>
                      <ul style={{ margin: "0", paddingLeft: "1.2rem" }}>
                        <li>Total file size must be under 8MB</li>
                        <li>Use small/compressed images when possible</li>
                      </ul>
                    </div>
                  </div>
                  
                  {/* Step 3: Customization */}
                  <div style={{ 
                    display: currentStep === 3 ? 'block' : 'none',
                    marginBottom: '2rem'
                  }}>
                    <h3 style={{ textAlign: 'center', marginBottom: '2rem' }}>Customization</h3>
                    
                    <FormGroup>
                      <div className="field-label">
                        <span className="field-number">1.</span>
                        <label htmlFor="childGender">Book For</label>
                      </div>
                      <select name="childGender" id="childGender" required>
                        <option value="">Select...</option>
                        <option value="boy">Boy</option>
                        <option value="girl">Girl</option>
                      </select>
                    </FormGroup>

                    <FormGroup>
                      <div className="field-label">
                        <span className="field-number">2.</span>
                        <label htmlFor="coverStyle">Cover Style</label>
                      </div>
                      <select name="coverStyle" id="coverStyle" required>
                        <option value="">Select...</option>
                        <option value="pink-flowers">Pink with Flowers</option>
                        <option value="blue-clouds">Blue with Clouds</option>
                      </select>
                    </FormGroup>
                    
                    <FormGroup>
                      <div className="field-label">
                        <span className="field-number">3.</span>
                        <label htmlFor="message">Message for Baby (Optional)</label>
                      </div>
                      <textarea 
                        name="message" 
                        id="message" 
                        rows="4" 
                        style={{ 
                          width: "100%", 
                          padding: "0.8rem",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          fontSize: "1rem",
                          resize: "vertical"
                        }}
                        placeholder="Write a special message for the baby..."
                      ></textarea>
                    </FormGroup>
                  </div>
                  
                  {/* Form Navigation */}
                  <FormNavigation>
                    {currentStep > 1 && (
                      <button 
                        type="button" 
                        className="back-btn"
                        onClick={prevStep}
                      >
                        Back
                      </button>
                    )}
                    
                    {currentStep < totalSteps ? (
                      <button 
                        type="button" 
                        className="next-btn"
                        onClick={nextStep}
                        disabled={!stepsValid[currentStep]}
                        style={{ marginLeft: currentStep === 1 ? 'auto' : '0' }}
                      >
                        Next
                      </button>
                    ) : (
                      <button 
                        type="submit" 
                        disabled={!formValid || formSubmitting}
                        style={{
                          marginLeft: 'auto',
                        }}
                      >
                        {formSubmitting ? "Submitting..." : "Complete Order"}
                      </button>
                    )}
                  </FormNavigation>
                </form>
              )}
            </Section>
          </FormSection>

          <div style={{ backgroundColor: "#F8EEE6", width: "100%" }}>
            <Section>
              <h2>Frequently Asked Questions</h2>
              <FAQ>
                <FAQItem isOpen={openFAQs[0]}>
                  <h3 onClick={() => toggleFAQ(0)}>What makes this book special?</h3>
                  <p>Our personalized children's book shares your family's special story using real names, places, and photos. It helps kids connect with their heritage while making reading fun and meaningful. Personalized books are great for building a love of reading because children see themselves in the story.</p>
                </FAQItem>
                <FAQItem isOpen={openFAQs[1]}>
                  <h3 onClick={() => toggleFAQ(1)}>How long does it take to create?</h3>
                  <p>Once you've provided all information and photos, it typically takes 2-3 weeks to create, print, and deliver your personalized book.</p>
                </FAQItem>
                <FAQItem isOpen={openFAQs[2]}>
                  <h3 onClick={() => toggleFAQ(2)}>What information do I need to provide?</h3>
                  <p>You'll need to share family names, countries of origin, settlement locations, and family photos including baby pictures and current photos.</p>
                </FAQItem>
              </FAQ>
            </Section>
          </div>
        </MainContent>

        <Footer>
          <p>&copy; {new Date().getFullYear()} Our Family Story Book. All rights reserved.</p>
        </Footer>
      </AppContainer>
    </>
  );
}

export default App;
