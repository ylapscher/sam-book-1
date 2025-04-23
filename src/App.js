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
    flex-direction: column;
    gap: 0;
  }
`;

const ThumbnailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 75px;

  @media (max-width: 768px) {
    display: none;
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

// eslint-disable-next-line no-unused-vars
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
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

const SubmitButton = styled.a`
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
  text-align: center;
  text-decoration: none;
  
  &:hover {
    background-color: #b86565;
    color: white;
    text-decoration: none;
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
  padding: 1rem 0;
  z-index: 10;
  
  @media (max-width: 768px) {
    padding: 0.8rem 0;
  }
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h1 {
    font-size: 32px;
  }
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    
    h1 {
      font-size: 26px;
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

// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
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

// eslint-disable-next-line no-unused-vars
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

const FAQSection = styled.div`
  background-color: #fff;
  width: 100%;
  padding: 2rem 0;
`;

const ContactSection = styled.div`
  background-color: var(--light-gray);
  padding: 3rem 0;
  text-align: center;
  
  h2 {
    margin-bottom: 1rem;
    color: var(--primary-color);
  }
  
  p {
    margin-bottom: 2rem;
    color: var(--secondary-color);
  }
  
  @media (max-width: 768px) {
    padding: 2rem 0;
  }
`;

const ContactButton = styled.a`
  display: inline-block;
  background-color: var(--accent-color);
  color: white;
  padding: 0.8rem 2rem;
  border-radius: var(--border-radius);
  font-weight: 500;
  transition: var(--transition);
  text-decoration: none;
  
  &:hover {
    background-color: #b86565;
    text-decoration: none;
    color: white;
  }
  
  @media (max-width: 768px) {
    padding: 0.7rem 1.5rem;
  }
`;

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openFAQs, setOpenFAQs] = useState({});
  const [stripeLoaded, setStripeLoaded] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [stripeError, setStripeError] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [formSubmitting, setFormSubmitting] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [formSuccess, setFormSuccess] = useState(false);
  // eslint-disable-next-line no-unused-vars
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
  // eslint-disable-next-line no-unused-vars
  const [stepsValid, setStepsValid] = useState({
    1: false,
    2: false,
    3: false
  });
  
  // Track file size warnings
  // eslint-disable-next-line no-unused-vars
  const [fileSizeWarning, setFileSizeWarning] = useState(null);
  // eslint-disable-next-line no-unused-vars
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

  // eslint-disable-next-line no-unused-vars
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

  // eslint-disable-next-line no-unused-vars
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
  
  // eslint-disable-next-line no-unused-vars
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };
  
  // eslint-disable-next-line no-unused-vars
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  // eslint-disable-next-line no-unused-vars
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
                <p>Welcome a new baby with a personalized story all about them—and the family who loves them! This book is filled with grandparents' names, family photos, and hand-painted illustrations, making the child the star of their own story. A timeless keepsake to celebrate a family's journey and show how the love and stories from generations before have helped grow the amazing person this child will become. With strong roots and lots of love, this little star can do anything!</p>
                
                <div style={{ marginTop: "1.5rem" }}>
                  <p style={{ margin: "0" }}><span style={{ fontWeight: "500" }}>✓</span> Recommended for ages 0-8</p>
                  <p style={{ margin: "0" }}><span style={{ fontWeight: "500" }}>✓</span> Printed and dispatched in 5 working days</p>
                  <p style={{ margin: "0" }}><span style={{ fontWeight: "500" }}>✓</span> Upload special photos to customize your story</p>
                  <p style={{ margin: "0" }}><span style={{ fontWeight: "500" }}>✓</span> A beautiful gift for newborns and new parents</p>
                </div>
              </div>
              <Price>$38</Price>
              
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
                <SubmitButton 
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdzunmRUzyP1yr0De4Py5O_LTQQkwiWzraV-By75gtJqzL73g/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

          <FAQSection>
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
          </FAQSection>

          <ContactSection>
            <Section>
              <h2>Have Any Questions?</h2>
              <p>We're here to help! Reach out to us and we'll get back to you as soon as possible.</p>
              <ContactButton 
                href="mailto:samlapscher@gmail.com?subject=Question%20about%20Our%20Family%20Story%20Book"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contact Us
              </ContactButton>
            </Section>
          </ContactSection>
        </MainContent>

        <Footer>
          <p>&copy; {new Date().getFullYear()} Our Family Story Book. All rights reserved.</p>
        </Footer>
      </AppContainer>
    </>
  );
}

export default App;
