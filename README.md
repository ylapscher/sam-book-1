# Sam's Story: A Personalized Children's Book Website

This is a single-page React application for ordering personalized children's books that tell a family's immigration story. The website allows customers to create custom books featuring their family's unique journey, incorporating personal photos and stories into a beautifully illustrated children's book.

## Features

- **Product Showcase**: Visual display of both book cover options (pink with flowers and blue with clouds) and sample pages
- **Stripe Integration**: Secure payment processing through Stripe's Buy Button
- **Custom Form**: Comprehensive form to collect:
  - Family member names
  - Countries of origin
  - Settlement locations
  - Multiple family photos (baby pictures, dating photos, current family photos)
- **Book Customization**: Options for:
  - Book recipient's gender
  - Cover style selection
- **Netlify Form Integration**: Secure form submission and file upload handling

## Technical Stack

- React
- Styled Components for styling
- Stripe for payments
- Netlify for form handling and hosting

## Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open [http://localhost:3000](http://localhost:3000) to view it in your browser

## Environment Variables

The following environment variables are required:
- `REACT_APP_STRIPE_PUBLISHABLE_KEY`: Your Stripe publishable key
- `REACT_APP_STRIPE_BUY_BUTTON_ID`: Your Stripe Buy Button ID

## License

All rights reserved. © Sam's Story
