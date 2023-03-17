import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

describe('Navbar component', () => {
  test('renders all navigation links', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Register New')).toBeInTheDocument();
    expect(screen.getByText('Upload File')).toBeInTheDocument();
    expect(screen.getByText('Transaction List Table')).toBeInTheDocument();
    expect(screen.getByText('Seller Balance List Table')).toBeInTheDocument();
  });

  test('navigation links point to the correct routes', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByText('Home')).toHaveAttribute('href', '/');
    expect(screen.getByText('Register New')).toHaveAttribute('href', '/create');
    expect(screen.getByText('Upload File')).toHaveAttribute('href', '/upload');
    expect(screen.getByText('Transaction List Table')).toHaveAttribute('href', '/list');
    expect(screen.getByText('Seller Balance List Table')).toHaveAttribute('href', '/listSellerBalance');
  });
});