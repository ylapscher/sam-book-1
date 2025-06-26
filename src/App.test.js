import { render, screen } from '@testing-library/react';
import App from './App';

test('renders sam story book app', () => {
  render(<App />);
  const titleElement = screen.getByRole('heading', { name: /sam story book/i });
  expect(titleElement).toBeInTheDocument();
});
