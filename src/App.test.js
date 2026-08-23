import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sam story book app', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', { level: 1, name: /our family story/i });
  expect(titleElement).toBeInTheDocument();
  expect(screen.getByText(/sam story book/i)).toBeInTheDocument();
});

test('footer links to trust pages', () => {
  render(<App />);
  const trustNav = screen.getByRole('navigation', { name: /about, contact, and privacy/i });
  expect(trustNav).toBeInTheDocument();
  expect(trustNav.querySelector('a[href="/about"]')).toHaveTextContent('About');
  expect(trustNav.querySelector('a[href="/contact"]')).toHaveTextContent('Contact');
  expect(trustNav.querySelector('a[href="/privacy"]')).toHaveTextContent('Privacy');
});
