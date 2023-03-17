import { render, waitFor, screen } from '@testing-library/react';
import nock from 'nock';
import SellerBalanceListDataTable from './SellerBalanceListDataTable';

describe('SellerBalanceListDataTable component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('displays table data after loading', async () => {
    const fakeData = [
      { sellerName: 'Seller 1', balanceValue: 100 },
      { sellerName: 'Seller 2', balanceValue: 200 },
    ];

    nock(`${process.env.REACT_APP_SERVER_BASE_URL}`)
      .get('/transaction/sellerBalance')
      .reply(200, [
        { sellerName: 'Alice', balanceValue: 100 },
        { sellerName: 'Bob', balanceValue: 200 },
      ]);

    render(
      <div>
        <SellerBalanceListDataTable />
      </div>
    );

    await waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bob')).toBeInTheDocument();
      expect(screen.getByText('100')).toBeInTheDocument();
      expect(screen.getByText('200')).toBeInTheDocument();
    });
  });

  test('displays error message when data loading fails', async () => {
    nock(`${process.env.REACT_APP_SERVER_BASE_URL}`)
      .get('/transaction/sellerBalance')
      .reply(500, []);

    render(
      <div>
        <SellerBalanceListDataTable />
      </div>
    );

    expect(await screen.findByText('There are no records to display')).toBeInTheDocument();
  });

  afterAll(() => {
    nock.cleanAll();
  });

});