import { render, screen } from '@testing-library/react';
import TextField from './';

describe('TextField Component', () => {
  it('renders the label when provided', () => {
    render(<TextField id="test-input" label="Test Label" />);
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('renders the input element with the correct id', () => {
    render(<TextField id="test-input" />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('id', 'test-input');
  });

  it('renders the error message when provided', () => {
    render(<TextField id="test-input" error="Test Error" />);
    const errorMessage = screen.getByText('Test Error');
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveAttribute('role', 'alert');
    expect(errorMessage).toHaveAttribute('id', 'test-input-error');
  });

  it('associates the error message with the input using aria-describedby', () => {
    render(<TextField id="test-input" error="Test Error" />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('aria-describedby', 'test-input-error');
  });

  it('does not render the label when not provided', () => {
    render(<TextField id="test-input" />);
    const label = screen.queryByText('Test Label');
    expect(label).not.toBeInTheDocument();
  });

  it('does not render the error message when not provided', () => {
    render(<TextField id="test-input" />);
    const errorMessage = screen.queryByText('Test Error');
    expect(errorMessage).not.toBeInTheDocument();
  });

  it('does not have aria-describedby when there is no error', () => {
    render(<TextField id="test-input" />);
    const input = screen.getByRole('textbox');
    expect(input).not.toHaveAttribute('aria-describedby');
  });
});