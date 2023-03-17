import { render, screen } from '@testing-library/react';
import nock from 'nock';
import TransactionListDataTable from './TransactionListDataTable';

describe('TransactionListDataTable component', () => {
  afterEach(() => {
    jest.clearAllMocks();
    nock.cleanAll();
  });

  test('displays table data after loading', async () => {
    const fakeData = [
      {
        id: '1',
        transactionType: 4,
        transactionDate: '2022-01-01',
        productDescription: 'Product 1',
        transactionValue: 100,
        sellerName: 'Seller 1',
      },
      {
        id: '2',
        transactionType: 3,
        transactionDate: '2022-01-02',
        productDescription: 'Product 2',
        transactionValue: 200,
        sellerName: 'Seller 2',
      },
    ];

    nock(`${process.env.REACT_APP_SERVER_BASE_URL}`)
      .get('/transaction')
      .reply(200, fakeData);

    render(<TransactionListDataTable />);

    expect(await screen.findByText('4')).toBeInTheDocument();
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();
    expect(screen.getByText('Seller 1')).toBeInTheDocument();

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('Seller 2')).toBeInTheDocument();
  });

  test('displays error message when data loading fails', async () => {
    nock(`${process.env.REACT_APP_SERVER_BASE_URL}`)
      .get('/transaction')
      .reply(500, []);

    render(<TransactionListDataTable />);

    expect(await screen.findByText('There are no records to display')).toBeInTheDocument();
  });
});