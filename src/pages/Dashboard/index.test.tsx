import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';
import { MemoryRouter } from 'react-router-dom';
import DashboardPage from './'; // Adjust the import path as necessary

fetchMock.enableMocks();

const setupRender = () => {
  render(
    <MemoryRouter>
      <DashboardPage />
    </MemoryRouter>
  );
}

describe('DashboardPage Integration Test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should render without crashing', () => {
    setupRender();
    expect(screen.getByText('Carregando')).toBeInTheDocument();
  });

  it('should handle search and display results', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));

    setupRender();
    const searchInput = screen.getByPlaceholderText('Digite um CPF válido');

    fireEvent.change(searchInput, { target: { value: '56642105087' } });
    
    await new Promise((r) => setTimeout(r, 600));

    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/registrations?cpf=56642105087');
  });

  it('should display error state', async () => {
    fetchMock.mockRejectOnce(new Error('Something went wrong'));

    setupRender();
    const searchInput = screen.getByPlaceholderText('Digite um CPF válido');

    fireEvent.change(searchInput, { target: { value: '123456789' } });

    await waitFor(() => expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument());
  });
});