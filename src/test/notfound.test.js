import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Notfound from '../components/Notfound';

describe('Notfound', () => {
  it('renders the notfound component', () => {
    render(<Notfound />);

    expect(screen.getByText('Ooooops! Seems you entered a wrong URL!')).toBeInTheDocument();
    expect(screen.getByText('Kindly retype the correct url.')).toBeInTheDocument();
  });
});
