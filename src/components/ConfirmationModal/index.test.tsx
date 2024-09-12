import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Modal from './';

describe('Modal Component', () => {
  it('should render without crashing', () => {
    const { getByText } = render(
      <Modal 
        message="Are you sure?" 
        onConfirm={() => {}} 
        onCancel={() => {}} 
      />
    );
    expect(getByText('Confirmação')).toBeInTheDocument();
    expect(getByText('Are you sure?')).toBeInTheDocument();
  });

  it('should display the correct message', () => {
    const { getByText } = render(
      <Modal 
        message="Are you sure?" 
        onConfirm={() => {}} 
        onCancel={() => {}} 
      />
    );
    expect(getByText('Are you sure?')).toBeInTheDocument();
  });

  it('should call onConfirm when Confirmar button is clicked', () => {
    const onConfirmMock = jest.fn();
    const { getByText } = render(
      <Modal 
        message="Are you sure?" 
        onConfirm={onConfirmMock} 
        onCancel={() => {}} 
      />
    );
    fireEvent.click(getByText('Confirmar'));
    expect(onConfirmMock).toHaveBeenCalledTimes(1);
  });

  it('should call onCancel when Cancelar button is clicked', () => {
    const onCancelMock = jest.fn();
    const { getByText } = render(
      <Modal 
        message="Are you sure?" 
        onConfirm={() => {}} 
        onCancel={onCancelMock} 
      />
    );
    fireEvent.click(getByText('Cancelar'));
    expect(onCancelMock).toHaveBeenCalledTimes(1);
  });

  it('should have the correct ARIA attributes', () => {
    const { getByRole } = render(
      <Modal 
        message="Are you sure?" 
        onConfirm={() => {}} 
        onCancel={() => {}} 
      />
    );
    const modalElement = getByRole('dialog');
    expect(modalElement).toHaveAttribute('aria-labelledby', 'modal-title');
    expect(modalElement).toHaveAttribute('aria-describedby', 'modal-description');
    expect(modalElement).toHaveAttribute('aria-modal', 'true');
  });
});