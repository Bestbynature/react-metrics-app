import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import Details from '../components/Details';
import '@testing-library/jest-dom/extend-expect';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('Details', () => {
  beforeEach(() => {
    useSelector.mockReturnValue({
      countryData: {
        Area: 100,
        Population: 5000000,
        Capital: 'City',
        Name: 'Country',
        Map: 'https://goo.gl/maps',
      },
      country: 'Country',
    });
  });

  afterEach(() => {
    useSelector.mockReset();
  });

  test('renders area, population, and capital', () => {
    render(<Details />);

    expect(screen.getAllByText(/Area is/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Population is/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Capital of Country is/)[0]).toBeInTheDocument();
  });

  test('renders country name in the second div', () => {
    render(<Details />);

    expect(screen.getAllByText(/Country/)[0]).toBeInTheDocument();
  });

  test('renders country breakdown header', () => {
    render(<Details />);

    expect(screen.getByText(/COUNTRY BREAKDOWN - 2023/)).toBeInTheDocument();
  });

  test('renders Google Maps link', () => {
    render(<Details />);

    expect(screen.getByText(/Open Google Maps/)).toBeInTheDocument();
    expect(screen.getByText(/Open Google Maps/).getAttribute('href')).toBe(
      'https://goo.gl/maps',
    );
  });

  //   test('renders image for string properties with URL', () => {
  //     render(<Details />);

  //     expect(screen.getByAltText('Official Flag')).toBeInTheDocument();
  //     expect(screen.getByAltText('Official Flag').getAttribute('src')).toBe(
  //       'https://flagcdn.com/w320/it.png'
  //     );
  //   });

  test('renders boolean properties as "Yes" or "No"', () => {
    useSelector.mockReturnValueOnce({
      countryData: {
        Area: 100,
        Population: 5000000,
        Capital: 'City',
        Name: 'Country',
        Map: 'https://goo.gl/maps',
        IsCoastal: true,
      },
      country: 'Country',
    });

    render(<Details />);

    expect(screen.getByText(/IsCoastal/)).toBeInTheDocument();
    expect(screen.getByText(/Yes/)).toBeInTheDocument();
  });

  test('renders other properties', () => {
    render(<Details />);

    expect(screen.getAllByText(/Area/)[0]).toBeInTheDocument();
    expect(screen.getAllByText(/Population/)[0]).toBeInTheDocument();
  });
});
