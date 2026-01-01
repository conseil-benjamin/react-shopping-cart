import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from './SearchBar';

describe('<SearchBar />', () => {
  test('it should mount', () => {
    render(<SearchBar />);

    const searchBar = screen.getByTestId('SearchBar');

    expect(searchBar).toBeInTheDocument();
  });
});