import { render } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

describe('App', () => {
  
  it('renders the Home component when the path is "/"', () => {
    const { getByText } = render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    const homeComponent = getByText("Home");
    expect(homeComponent).toBeInTheDocument();
  });

  it('renders the Create component when the path is "/create"', () => {
    const { getByText } = render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    const createComponent = getByText("Register New");
    expect(createComponent).toBeInTheDocument();
  });

  it('renders the TransactionUploadForm component when the path is "/upload"', () => {
    const { getByText } = render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    const transactionUploadFormComponent = getByText("Upload File");
    expect(transactionUploadFormComponent).toBeInTheDocument();
  });

  it('renders the TransactionListDataTable component when the path is "/list"', () => {
    const { getByText } = render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    const transactionListDataTableComponent = getByText("Transaction List Table");
    expect(transactionListDataTableComponent).toBeInTheDocument();
  });

  it('renders the SellerBalanceListDataTable component when the path is "/listSellerBalance"', () => {
    const { getByText } = render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    const sellerBalanceListDataTableComponent = getByText("Seller Balance List Table");
    expect(sellerBalanceListDataTableComponent).toBeInTheDocument();
  });
});
