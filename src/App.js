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
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;

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
  position: relative;
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

  &:hover {
    background: #f5f5f5;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    transform: scale(1.05);
  }

  &.prev {
    left: -24px;
  }

  &.next {
    right: -24px;
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
  font-size: 28px;
  font-weight: 500;
  margin: 1rem 0;
  
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const Section = styled.section`
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
  border-top: 1px solid #DDDDDD;

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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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

const Form = styled.form`
  max-width: 1000px;
  margin: 0 auto;
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  &.submitting {
    opacity: 0.5;
    pointer-events: none;
  }

  display: flex;
  flex-direction: column;
  
  .form-footer {
    margin-top: 2rem;
    text-align: center;
  }
  
  button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 0.75rem 2rem;
    font-size: 1.1rem;
    font-weight: 600;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
    min-width: 180px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    
    &:hover {
      background-color: var(--primary-dark);
    }
    
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
  
  .loading-spinner {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    border-top-color: white;
    animation: spin 1s linear infinite;
    margin-right: 10px;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    color: var(--secondary-color);
    font-weight: bold;
  }

  input[type="text"] {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
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
    background-color: #1a4580;
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
  position: sticky;
  top: 0;
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
  
  @media (max-width: 768px) {
    padding: 0 1rem;
    
    h1 {
      font-size: 22px;
    }
  }
`;

const CollapsibleSection = styled.div`
  border-bottom: 1px solid #DDDDDD;
  margin-bottom: 1rem;
  max-width: 800px;
  margin: 0 auto;

  &:last-child {
    border-bottom: none;
  }
`;

const CollapsibleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 0;
  cursor: pointer;
  
  h3 {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
  }

  .icon {
    font-size: 24px;
    transition: transform 0.3s ease;
    transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  }
`;

const CollapsibleContent = styled.div`
  max-height: ${props => props.isOpen ? '500px' : '0'};
  overflow: hidden;
  transition: max-height 0.3s ease;
  padding-bottom: ${props => props.isOpen ? '1.5rem' : '0'};
`;

const QuoteSection = styled.div`
  background-color: #F8B6D1;
  padding: 6rem 2rem;
  text-align: center;
  margin-top: 4rem;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 20px;
    background: url("data:image/svg+xml,%3Csvg width='100%25' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0,20 C40,20 40,0 80,0 C120,0 120,20 160,20 C200,20 200,0 240,0 C280,0 280,20 320,20 C360,20 360,0 400,0 C440,0 440,20 480,20 C520,20 520,0 560,0 C600,0 600,20 640,20 C680,20 680,0 720,0 C760,0 760,20 800,20' fill='white' /%3E%3C/svg%3E") repeat-x;
  }
  
  .quote {
    font-size: 42px;
    max-width: 900px;
    margin: 0 auto 2rem;
    line-height: 1.4;
    color: #333;
    font-family: Georgia, serif;
  }
  
  .attribution {
    font-size: 20px;
    color: #555;
    font-style: normal;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openFAQs, setOpenFAQs] = useState({});
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [stripeError, setStripeError] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [fileUploads, setFileUploads] = useState({
    parentBabyPhoto: false,
    datingPhoto: false,
    babyPhoto: false,
    familyPhoto: false
  });
  
  // Track file size warnings
  const [fileSizeWarning, setFileSizeWarning] = useState(null);
  const [formData, setFormData] = useState({});
  const [formValid, setFormValid] = useState(false);

  const images = [
    { src: "/images/1.png", alt: "Pink cover with flowers" },
    { src: "/images/2.png", alt: "Blue cover with clouds" },
    { src: "/images/3.png", alt: "Sample page from the book" },
    { src: "/images/4.png", alt: "Another sample page" },
    { src: "/images/5.png", alt: "Third sample page" },
    { src: "/images/6.png", alt: "Fourth sample page" }
  ];

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Check if form is valid
    const form = e.target.form;
    if (form) {
      setFormValid(form.checkValidity());
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
            <h1>Our Family Story Book</h1>
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
                  <NavigationButton className="prev" onClick={handlePrevImage}>
                    ‹
                  </NavigationButton>
                  <NavigationButton className="next" onClick={handleNextImage}>
                    ›
                  </NavigationButton>
                </div>
              </MainImageContainer>
            </ProductImagesContainer>

            <ProductInfo>
              <div className="subtitle">
                <p>Welcome a new baby with a personalized tale that weaves your family's history into a captivating narrative. This beautifully crafted book includes grandparents' names and cherished photographs, making the little one the star of their own story. The story is brought to life with stunning hand-painted illustrations, creating a treasured keepsake that celebrates your family's journey and will be cherished for generations to come.</p>
                
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

              <Section>
                <h2>How It Works</h2>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                  <CollapsibleSection>
                    <CollapsibleHeader isOpen={openFAQs['howItWorks1']} onClick={() => toggleFAQ('howItWorks1')}>
                      <h3>1. Share Your Story</h3>
                      <span className="icon">▼</span>
                    </CollapsibleHeader>
                    <CollapsibleContent isOpen={openFAQs['howItWorks1']}>
                      <p>Tell us about your family's journey, including names, dates, and special memories. We'll incorporate these details into a beautifully crafted narrative that resonates with your child.</p>
                    </CollapsibleContent>
                  </CollapsibleSection>

                  <CollapsibleSection>
                    <CollapsibleHeader isOpen={openFAQs['howItWorks2']} onClick={() => toggleFAQ('howItWorks2')}>
                      <h3>2. Add Your Photos</h3>
                      <span className="icon">▼</span>
                    </CollapsibleHeader>
                    <CollapsibleContent isOpen={openFAQs['howItWorks2']}>
                      <p>Share your cherished family photos that will be beautifully integrated into your personalized book. We'll carefully place them throughout the story to create a meaningful connection between the narrative and your family's memories.</p>
                    </CollapsibleContent>
                  </CollapsibleSection>

                  <CollapsibleSection>
                    <CollapsibleHeader isOpen={openFAQs['howItWorks3']} onClick={() => toggleFAQ('howItWorks3')}>
                      <h3>3. Receive Your Book</h3>
                      <span className="icon">▼</span>
                    </CollapsibleHeader>
                    <CollapsibleContent isOpen={openFAQs['howItWorks3']}>
                      <p>We'll create and deliver your custom hardcover book, perfect for reading together. Each book is carefully printed and bound to ensure it becomes a lasting family keepsake that can be passed down through generations.</p>
                    </CollapsibleContent>
                  </CollapsibleSection>
                </div>
              </Section>
            </ProductInfo>
          </ProductGrid>

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
                    maxWidth: "1000px",
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
                  
                  <FormGrid>
                    <div>
                      <FormGroup>
                        <label htmlFor="parentName">Parent's Name *</label>
                        <input type="text" name="parentName" id="parentName" required />
                      </FormGroup>

                      <FormGroup>
                        <label htmlFor="parentOrigin">Parent's Country of Origin *</label>
                        <input type="text" name="parentOrigin" id="parentOrigin" required />
                      </FormGroup>

                      <FormGroup>
                        <label htmlFor="grandparentName">Grandparent's Name *</label>
                        <input type="text" name="grandparentName" id="grandparentName" required />
                      </FormGroup>

                      <FormGroup>
                        <label htmlFor="grandparentOrigin">Grandparent's Country of Origin *</label>
                        <input type="text" name="grandparentOrigin" id="grandparentOrigin" required />
                      </FormGroup>

                      <FormGroup>
                        <label htmlFor="settlementLocation">Where Family Settled *</label>
                        <input type="text" name="settlementLocation" id="settlementLocation" required />
                      </FormGroup>

                      <FormGroup>
                        <label htmlFor="childGender">Book For *</label>
                        <select name="childGender" id="childGender" required>
                          <option value="">Select...</option>
                          <option value="boy">Boy</option>
                          <option value="girl">Girl</option>
                        </select>
                      </FormGroup>

                      <FormGroup>
                        <label htmlFor="coverStyle">Cover Style *</label>
                        <select name="coverStyle" id="coverStyle" required>
                          <option value="">Select...</option>
                          <option value="pink-flowers">Pink with Flowers</option>
                          <option value="blue-clouds">Blue with Clouds</option>
                        </select>
                      </FormGroup>
                    </div>

                    <div>
                      <FormGroup>
                        <label>Parent's Baby Photo *</label>
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
                        <label>Parents' Dating Photo *</label>
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
                        <label>Baby's Recent Photo *</label>
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
                        <label>Current Family Photo *</label>
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

                      <div style={{ 
                        marginTop: "1rem", 
                        fontSize: "0.85rem", 
                        color: "#666",
                        padding: "0.5rem",
                        backgroundColor: "#f9f9f9",
                        borderRadius: "4px"
                      }}>
                        <p style={{ margin: "0 0 0.5rem 0", fontWeight: "bold" }}>Important Notes:</p>
                        <ul style={{ margin: "0", paddingLeft: "1.2rem" }}>
                          <li>Total file size must be under 8MB</li>
                          <li>Use small/compressed images when possible</li>
                          <li>Most phone photos need to be resized before upload</li>
                        </ul>
                        <p style={{ margin: "0.5rem 0 0 0", fontSize: "0.8rem" }}>
                          Having trouble with uploads? <a href="mailto:orders@ourfamilystorybook.com?subject=Photo%20Upload" style={{ color: "#4b9cd3" }}>Email us your photos directly</a>.
                        </p>
                      </div>
                    </div>
                  </FormGrid>
                  
                  <div style={{ marginTop: "2rem", textAlign: "center" }}>
                    {formSuccess ? (
                      <div>
                        <stripe-buy-button
                          buy-button-id="buy_btn_1QvpRoKo6NlmNYnt0SlX4NnU"
                          publishable-key="pk_live_51MfrNYKo6NlmNYntKY84p45P0y7pUQowfb7ZobQt6AAENqJS1XvBojxEgrXJrtfMHmwYBcprSuRX0QxPWsCkpLOG00EHKs3tZ5"
                        >
                        </stripe-buy-button>
                      </div>
                    ) : (
                      <button 
                        type="submit" 
                        disabled={!formValid || formSubmitting}
                        style={{
                          backgroundColor: "var(--primary-color)",
                          color: "white",
                          border: "none",
                          padding: "0.75rem 2rem",
                          fontSize: "1.1rem",
                          fontWeight: "600",
                          borderRadius: "4px",
                          cursor: formValid ? "pointer" : "not-allowed",
                          opacity: formValid ? 1 : 0.7,
                          transition: "all 0.3s ease",
                          minWidth: "180px",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {formSubmitting ? (
                          <>
                            <span className="loading-spinner"></span>
                            Submitting...
                          </>
                        ) : (
                          "Continue to Payment"
                        )}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </Section>
          </FormSection>

          <QuoteSection>
            <div className="quote">
              "In every personalized book, a child finds a reflection of their own limitless potential."
            </div>
            <div className="attribution">
              Written and Illustrated by Sam Lapscher
            </div>
          </QuoteSection>

          <Section>
            <h2>Frequently Asked Questions</h2>
            <FAQ>
              <FAQItem isOpen={openFAQs[0]}>
                <h3 onClick={() => toggleFAQ(0)}>What makes this book special?</h3>
                <p>Our personalized children's book tells your family's unique immigration story using real names, places, and photos, helping children understand their heritage in an engaging way.</p>
              </FAQItem>
              <FAQItem isOpen={openFAQs[1]}>
                <h3 onClick={() => toggleFAQ(1)}>How long does it take to create?</h3>
                <p>Once you've provided all information and photos, it typically takes 2-3 weeks to create, print, and deliver your personalized book.</p>
              </FAQItem>
              <FAQItem isOpen={openFAQs[2]}>
                <h3 onClick={() => toggleFAQ(2)}>What information do I need to provide?</h3>
                <p>You'll need to share family names, countries of origin, settlement locations, and family photos including baby pictures and current photos.</p>
              </FAQItem>
              <FAQItem isOpen={openFAQs[3]}>
                <h3 onClick={() => toggleFAQ(3)}>Can I preview the book before ordering?</h3>
                <p>Yes! We'll create a digital preview of your book for your approval before printing. You can request revisions if needed.</p>
              </FAQItem>
            </FAQ>
          </Section>

          <Section>
            <h2>About the Book</h2>
            <Grid>
              <Card>
                <h3>Personalized Story</h3>
                <p>Each book is uniquely crafted to tell your family's immigration story, featuring real names, places, and photos of your loved ones.</p>
              </Card>
              <Card>
                <h3>Beautiful Illustrations</h3>
                <p>Hand-drawn illustrations bring your family's journey to life, creating a magical experience for children of all ages.</p>
              </Card>
              <Card>
                <h3>Cultural Heritage</h3>
                <p>Celebrate your family's roots and help your children understand their rich cultural heritage through storytelling.</p>
              </Card>
            </Grid>
          </Section>
        </MainContent>

        <Footer>
          <p>&copy; {new Date().getFullYear()} Our Family Story Book. All rights reserved.</p>
        </Footer>
      </AppContainer>
    </>
  );
}

export default App;
