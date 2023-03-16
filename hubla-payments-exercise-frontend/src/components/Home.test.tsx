import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from './Home';

const mockedUsedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...(jest.requireActual("react-router-dom") as any),
  useNavigate: () => mockedUsedNavigate
}));

describe('Home component', () => {
  it('renders the welcome message', () => {
    const { getByText } = render(<Home />);
    const message = getByText('Welcome to Hubla\'s seller\'s transaction dashboard. Choose your option at the navigation bar.');
    expect(message).toBeInTheDocument();
  });
});