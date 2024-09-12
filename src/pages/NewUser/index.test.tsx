import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NewUserPage from './index'; // Adjust the import path as necessary
import { postRegistration } from '~/services/registrations';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock('~/services/registrations');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const setupRender = () => {
  render(
    <MemoryRouter>
      <NewUserPage />
    </MemoryRouter>
  );
}

describe('NewUserPage Integration Test', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  it('should render the form and handle submission', async () => {
    (postRegistration as jest.Mock).mockResolvedValue({ data: { id: 1 } });

    setupRender();

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'David Souza' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'david.souza@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/CPF/i), { target: { value: '37590790087' } });
    fireEvent.change(screen.getByLabelText(/Data de Admissão/i), { target: { value: '2023-01-01' } });

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    await waitFor(() => expect(screen.getByText(/Salvando/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(/Salvando/i)).not.toBeInTheDocument());

    expect(toast.success).toHaveBeenCalledWith('Cadastro realizado com sucesso!');
    expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
  });

  it('should handle form submission error', async () => {
    (postRegistration as jest.Mock).mockRejectedValue(new Error('Falha ao cadastrar'));

    setupRender();

    fireEvent.change(screen.getByLabelText(/Nome/i), { target: { value: 'David Souza' } });
    fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'david.souza@gmail.com' } });
    fireEvent.change(screen.getByLabelText(/CPF/i), { target: { value: '37590790087' } });
    fireEvent.change(screen.getByLabelText(/Data de Admissão/i), { target: { value: '2023-01-01' } });

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    await waitFor(() => expect(screen.getByText(/Salvando/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.queryByText(/Salvando/i)).not.toBeInTheDocument());

    expect(toast.error).toHaveBeenCalledWith('Erro ao realizar cadastro');
  });

  it('should set aria-invalid and aria-describedby on invalid inputs', async () => {
    setupRender();

    fireEvent.click(screen.getByRole('button', { name: /Cadastrar/i }));

    await waitFor(() => {
      expect(screen.getByLabelText(/Nome/i)).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText(/Nome/i)).toHaveAttribute('aria-describedby', 'employeeName-error');
      expect(screen.getByLabelText(/Email/i)).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText(/Email/i)).toHaveAttribute('aria-describedby', 'email-error');
      expect(screen.getByLabelText(/CPF/i)).toHaveAttribute('aria-invalid', 'true');
      expect(screen.getByLabelText(/CPF/i)).toHaveAttribute('aria-describedby', 'cpf-error');
    });
  });
});