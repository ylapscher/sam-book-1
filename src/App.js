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

  &:hover {
    border-color: var(--primary-color);
  }

  input {
    display: none;
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

  useEffect(() => {
    // Add Stripe script
    const script = document.createElement('script');
    script.src = 'https://js.stripe.com/v3/buy-button.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.body.removeChild(script);
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
              
              <stripe-buy-button
                buy-button-id="buy_btn_1QvpRoKo6NlmNYnt0SlX4NnU"
                publishable-key="pk_live_51MfrNYKo6NlmNYntKY84p45P0y7pUQowfb7ZobQt6AAENqJS1XvBojxEgrXJrtfMHmwYBcprSuRX0QxPWsCkpLOG00EHKs3tZ5"
              >
              </stripe-buy-button>

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
              >
                <input type="hidden" name="form-name" value="family-story" />
                <input type="hidden" name="bot-field" />
                <input type="hidden" name="max-file-size" value="10485760" />
                
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
                      <FileUpload>
                        <label htmlFor="parentBabyPhoto">
                          Click to upload or drag and drop (Max 10MB)
                          <input 
                            type="file" 
                            name="parentBabyPhoto" 
                            id="parentBabyPhoto" 
                            accept="image/*"
                            max-size="10485760"
                            required 
                          />
                        </label>
                      </FileUpload>
                    </FormGroup>

                    <FormGroup>
                      <label>Parents' Dating Photo *</label>
                      <FileUpload>
                        <label htmlFor="datingPhoto">
                          Click to upload or drag and drop (Max 10MB)
                          <input 
                            type="file" 
                            name="datingPhoto" 
                            id="datingPhoto" 
                            accept="image/*"
                            max-size="10485760"
                            required 
                          />
                        </label>
                      </FileUpload>
                    </FormGroup>

                    <FormGroup>
                      <label>Baby's Recent Photo *</label>
                      <FileUpload>
                        <label htmlFor="babyPhoto">
                          Click to upload or drag and drop (Max 10MB)
                          <input 
                            type="file" 
                            name="babyPhoto" 
                            id="babyPhoto" 
                            accept="image/*"
                            max-size="10485760"
                            required 
                          />
                        </label>
                      </FileUpload>
                    </FormGroup>

                    <FormGroup>
                      <label>Current Family Photo *</label>
                      <FileUpload>
                        <label htmlFor="familyPhoto">
                          Click to upload or drag and drop (Max 10MB)
                          <input 
                            type="file" 
                            name="familyPhoto" 
                            id="familyPhoto" 
                            accept="image/*"
                            max-size="10485760"
                            required 
                          />
                        </label>
                      </FileUpload>
                    </FormGroup>
                  </div>
                </FormGrid>

                <SubmitButton type="submit">Submit Your Story</SubmitButton>
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
