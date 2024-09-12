import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import LoadOverlay from './';

describe('LoadOverlay Component', () => {
  it('should render without crashing', () => {
    const { getByText } = render(<LoadOverlay label="Carregando" />);
    expect(getByText('Carregando')).toBeInTheDocument();
  });

  it('should display the correct label', () => {
    const { getByText } = render(<LoadOverlay label="Please wait" />);
    expect(getByText('Please wait')).toBeInTheDocument();
  });

  it('should have the correct ARIA attributes', () => {
    const { getByText } = render(<LoadOverlay label="Carregando" />);
    const labelElement = getByText('Carregando');
    expect(labelElement).toHaveAttribute('role', 'alert');
    expect(labelElement).toHaveAttribute('aria-live', 'assertive');
  });

  it('should have the correct styles', () => {
    const { getByText } = render(<LoadOverlay label="Carregando" />);
    const labelElement = getByText('Carregando');
    expect(labelElement).toHaveStyle('color: black');
  });
});