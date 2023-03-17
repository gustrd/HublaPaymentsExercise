import { render, fireEvent, screen, act } from '@testing-library/react';
import Create from './TransactionCreate';
import nock from 'nock';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate
}));

describe('Create component', () => {
  beforeEach(() => {
    nock.cleanAll();
    jest.clearAllMocks();
  });

  it('should render the Create component', () => {
    const { getByText } = render(<Create />);
    expect(getByText('Create Transaction')).toBeInTheDocument();
  });

  it('should submit the form successfully', async () => {
    const postEndpoint = '/transaction';
    const mockResponse = { ok: true };
    nock(`${process.env.REACT_APP_SERVER_BASE_URL}`)
      .post(postEndpoint)
      .reply(200, mockResponse);

    render(
      <>
        <Create />
        <ToastContainer />
      </>
    );

    fireEvent.change(screen.getByLabelText('Transaction Type'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Transaction Value'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Seller Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Product Description'), { target: { value: 'Product 1' } });
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: 'Register Transaction' }));
    });

    expect(await screen.findByText('The form was successfully submitted!')).toBeInTheDocument();
  });

  it('should display an error message when the form submission fails', async () => {
    const postEndpoint = '/transaction';
    const mockResponse = { ok: false };
    nock(`${process.env.REACT_APP_SERVER_BASE_URL}`)
      .post(postEndpoint)
      .reply(400, mockResponse);

    render(
      <>
        <Create />
        <ToastContainer />
      </>
    );

    fireEvent.change(screen.getByLabelText('Transaction Type'), { target: { value: '1' } });
    fireEvent.change(screen.getByLabelText('Transaction Value'), { target: { value: '100' } });
    fireEvent.change(screen.getByLabelText('Seller Name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByLabelText('Product Description'), { target: { value: 'Product 1' } });
    await act(async () => {
      fireEvent.submit(screen.getByRole('button', { name: 'Register Transaction' }));
    });

    expect(await screen.findByText('There was an error when registering your transaction.')).toBeInTheDocument();
  });
});