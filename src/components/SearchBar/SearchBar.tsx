import React from 'react';
import { useProducts } from 'contexts/products-context';
import styled from 'styled-components';

const SearchInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchBar = () => {
  const { searchTerm, handleSearch } = useProducts();

  return (
    <SearchInput
      type="text"
      placeholder="Search for a product..."
      value={searchTerm}
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
};

export default SearchBar;