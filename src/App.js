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
  }
`;

const ProductImagesContainer = styled.div`
  display: flex;
  gap: 2rem;
  position: relative;
`;

const ThumbnailList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 75px;

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
`;

const NavigationButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 2;

  &:hover {
    background: #f5f5f5;
  }

  &.prev {
    left: 10px;
  }

  &.next {
    right: 10px;
  }
`;

const ProductInfo = styled.div`
  padding: 0 2rem;

  p.subtitle {
    font-size: 20px;
    color: #595959;
    margin-bottom: 2rem;
  }

  @media (max-width: 1024px) {
    padding: 0;
  }
`;

const Price = styled.div`
  font-size: 28px;
  font-weight: 500;
  margin: 1rem 0;
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

const FormSection = styled.section`
  background: var(--light-gray);
  padding: 2rem;
  margin: 2rem 0;
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
  background-color: var(--primary-color);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease;
  width: 100%;
  margin-top: 2rem;

  &:hover {
    transform: translateY(-2px);
  }
`;

const Header = styled.header`
  width: 100%;
  padding: 3rem 2rem;
  background: white;
  border-bottom: 1px solid #DDDDDD;
`;

const HeaderContent = styled.div`
  max-width: 1400px;
  margin: 0 auto;

  h1 {
    font-size: 48px;
    font-weight: 500;
    color: #222222;
  }
`;

function App() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [openFAQs, setOpenFAQs] = useState({});
  const [stripeLoaded, setStripeLoaded] = useState(false);
  const [stripeError, setStripeError] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(null);
  const [fileUploads, setFileUploads] = useState({
    parentBabyPhoto: false,
    datingPhoto: false,
    babyPhoto: false,
    familyPhoto: false
  });

  const images = [
    { src: "/images/pink-cover.jpg", alt: "Pink cover with flowers" },
    { src: "/images/blue-cover.jpg", alt: "Blue cover with clouds" },
    { src: "/images/sample-page-1.jpg", alt: "Sample page from the book" },
    { src: "/images/sample-page-2.jpg", alt: "Another sample page" }
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
    setOpenFAQs(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFileUploads(prev => ({
        ...prev,
        [name]: true
      }));
    } else {
      setFileUploads(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitting(true);
    setFormError(null);
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Add this specific header for Netlify forms with file uploads
    fetch("/", {
      method: "POST",
      headers: { 
        "Accept": "application/json" 
      },
      body: formData
    })
      .then(response => {
        if (response.ok) {
          setFormSubmitting(false);
          setFormSuccess(true);
          form.reset();
          // Reset file upload states
          setFileUploads({
            parentBabyPhoto: false,
            datingPhoto: false,
            babyPhoto: false,
            familyPhoto: false
          });
          window.scrollTo(0, 0);
        } else {
          return response.text().then(text => {
            throw new Error(`Server responded with ${response.status}: ${text || response.statusText}`);
          });
        }
      })
      .catch(error => {
        setFormSubmitting(false);
        setFormError("There was a problem submitting your form. Please try again.");
        console.error("Form submission error:", error);
      });
  };

  useEffect(() => {
    // Add Stripe script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    
    // Handle success
    script.onload = () => {
      setStripeLoaded(true);
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
                <NavigationButton className="prev" onClick={handlePrevImage}>
                  ‹
                </NavigationButton>
                <NavigationButton className="next" onClick={handleNextImage}>
                  ›
                </NavigationButton>
              </MainImageContainer>
            </ProductImagesContainer>

            <ProductInfo>
              <p className="subtitle">
                Create a personalized children's book that celebrates your family's unique heritage
              </p>
              <Price>$34.99+</Price>
              
              {!stripeError ? (
                stripeLoaded ? (
                  <stripe-buy-button
                    buy-button-id="buy_btn_1QvpRoKo6NlmNYnt0SlX4NnU"
                    publishable-key="pk_live_51MfrNYKo6NlmNYntKY84p45P0y7pUQowfb7ZobQt6AAENqJS1XvBojxEgrXJrtfMHmwYBcprSuRX0QxPWsCkpLOG00EHKs3tZ5"
                  >
                  </stripe-buy-button>
                ) : (
                  <div style={{ 
                    textAlign: "center", 
                    padding: "1rem", 
                    border: "1px solid #ddd", 
                    borderRadius: "4px" 
                  }}>
                    <p>Loading payment options...</p>
                  </div>
                )
              ) : (
                <SubmitButton onClick={() => window.location.href = "mailto:orders@ourfamilystorybook.com?subject=Book Order"}>
                  Contact Us to Order
                </SubmitButton>
              )}

              <Section>
                <h2>How It Works</h2>
                <Grid>
                  <Card>
                    <h3>1. Share Your Story</h3>
                    <p>Tell us about your family's journey, including names, dates, and special memories.</p>
                  </Card>
                  <Card>
                    <h3>2. Add Photos</h3>
                    <p>Share your cherished family photos that will be beautifully integrated into your personalized book.</p>
                  </Card>
                  <Card>
                    <h3>3. Receive Your Book</h3>
                    <p>We'll create and deliver your custom hardcover book, perfect for reading together.</p>
                  </Card>
                </Grid>
              </Section>
            </ProductInfo>
          </ProductGrid>

          <FormSection>
            <Section>
              <h2>Start Your Family's Story</h2>
              <Form
                name="family-story"
                method="POST"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                encType="multipart/form-data"
                onSubmit={handleFormSubmit}
                className={formSubmitting ? "submitting" : ""}
              >
                <input type="hidden" name="form-name" value="family-story" />
                <input type="hidden" name="bot-field" />
                <input type="hidden" name="max-file-size" value="10485760" />
                
                {formSuccess && (
                  <div style={{ 
                    background: "#e6f7e6", 
                    padding: "1rem", 
                    borderRadius: "4px", 
                    marginBottom: "2rem",
                    textAlign: "center"
                  }}>
                    <h3 style={{ color: "#2e7d32" }}>Thank you for your submission!</h3>
                    <p>We'll review your information and contact you soon about your personalized book.</p>
                  </div>
                )}
                
                {formError && (
                  <div style={{ 
                    background: "#ffebee", 
                    padding: "1rem", 
                    borderRadius: "4px", 
                    marginBottom: "2rem",
                    textAlign: "center"
                  }}>
                    <h3 style={{ color: "#c62828" }}>Form Submission Error</h3>
                    <p>{formError}</p>
                  </div>
                )}
                
                {!formSuccess && (
                  <>
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
                              Click to upload or drag and drop (Max 10MB)
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
                              Click to upload or drag and drop (Max 10MB)
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
                              Click to upload or drag and drop (Max 10MB)
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
                              Click to upload or drag and drop (Max 10MB)
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
                      </div>
                    </FormGrid>
                    
                    <div className="form-footer">
                      <button type="submit" disabled={formSubmitting}>
                        {formSubmitting ? (
                          <>
                            <span className="loading-spinner"></span>
                            Submitting...
                          </>
                        ) : (
                          "Submit"
                        )}
                      </button>
                    </div>
                  </>
                )}
              </Form>
            </Section>
          </FormSection>

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
