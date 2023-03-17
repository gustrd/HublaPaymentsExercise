import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import nock from 'nock';
import TransactionUploadForm from './TransactionUpload';

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate
}));

describe('TransactionUploadForm', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should show success message on successful form submission', async () => {
    const serverUrl = `${process.env.REACT_APP_SERVER_BASE_URL}`;
    const file = new File(['file contents'], 'test-file.txt', { type: 'text/txt' });
    const response = { ok: true };
    nock(serverUrl)
      .post('/transaction/upload')
      .reply(200, response);

    render(<TransactionUploadForm />);

    const input = screen.getByLabelText('Choose a file:');
    userEvent.upload(input, file);

    const submitButton = screen.getByRole('button', { name: 'Upload' });
    fireEvent.click(submitButton);

    expect(screen.getByText('Fill the form below to register a new transaction file upload.')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('The file was successfully submitted!')).toBeInTheDocument();
    });

    expect(screen.queryByText('Fill the form below to register a new transaction file upload.')).not.toBeInTheDocument();
  });

  it('should show error message on failed form submission', async () => {
    const serverUrl = `${process.env.REACT_APP_SERVER_BASE_URL}`;
    const file = new File(['file contents'], 'test-file.csv', { type: 'text/csv' });
    const response = { ok: false };
    nock(serverUrl)
      .post('/transaction/upload')
      .reply(500, response);

    render(<TransactionUploadForm />);

    const input = screen.getByLabelText('Choose a file:');
    userEvent.upload(input, file);

    const submitButton = screen.getByRole('button', { name: 'Upload' });
    fireEvent.click(submitButton);

    expect(screen.getByText('Fill the form below to register a new transaction file upload.')).toBeInTheDocument();
  });
});
