import styled from 'styled-components/macro';

export const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  min-height: 80vh;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1.5fr 1fr;
  }
`;

export const FormColumn = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  height: fit-content;
`;

export const SummaryColumn = styled.div`
  background: #ffffff;
  padding: 40px;
  border-radius: 16px;
  height: fit-content;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  position: sticky;
  top: 100px;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 30px;
  font-size: 1.8em;
  font-weight: 300;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 15px;
`;

export const FormGroup = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
`;

export const Row = styled.div`
  display: flex;
  gap: 20px;
  
  ${FormGroup} {
    flex: 1;
    
    &:last-child {
      flex: 0 0 120px; /* Fixed width for postal code */
    }
  }
`;

export const Label = styled.label`
  color: #666;
  margin-bottom: 8px;
  font-size: 0.9em;
  font-weight: 600;
  transition: color 0.2s;
`;

export const Input = styled.input`
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background: #f9f9f9;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    background: #fff;
    box-shadow: 0 0 0 4px rgba(234, 191, 0, 0.1);
  }

  &::placeholder {
    color: #ccc;
  }

  &:read-only {
    opacity: 0.7;
    cursor: default;
    background: #eee;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 18px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 20px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

export const SearchResults = styled.ul`
  list-style: none;
  padding: 0;
  margin: 5px 0 0;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  max-height: 250px;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  z-index: 100;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  top: 100%;
`;

export const SearchResultItem = styled.li`
  padding: 15px;
  cursor: pointer;
  color: #333;
  border-bottom: 1px solid #eee;
  transition: background 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: #f5f5f5;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const RelativeWrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
  font-size: 1.4em;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`;
