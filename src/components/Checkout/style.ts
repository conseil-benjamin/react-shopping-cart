import styled from 'styled-components/macro';

export const Container = styled.div`
  max-width: 1200px;
  margin: 40px auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
  min-height: 80vh;
  background-color: ${({ theme }) => theme.colors.primary};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: 1.5fr 1fr;
  }
`;

export const FormColumn = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  border: 1px solid rgba(255, 255, 255, 0.18);
  height: fit-content;
`;

export const SummaryColumn = styled.div`
  background: ${({ theme }) => theme.colors.primary};
  padding: 40px;
  border-radius: 16px;
  height: fit-content;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  position: sticky;
  top: 100px;
`;

export const Title = styled.h2`
  color: ${({ theme }) => theme.colors.white};
  margin-bottom: 30px;
  font-size: 1.8em;
  font-weight: 300;
  letter-spacing: 1px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 15px;
`;

export const FormGroup = styled.div`
  margin-bottom: 25px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const Label = styled.label`
  color: #aaa;
  margin-bottom: 8px;
  font-size: 0.9em;
  font-weight: 600;
  transition: color 0.2s;
`;

export const Input = styled.input`
  padding: 15px;
  border-radius: 8px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.2);
  color: white;
  font-size: 16px;
  transition: all 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.secondary};
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 0 4px rgba(234, 191, 0, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.secondary} 0%, #ff9f43 100%);
  color: ${({ theme }) => theme.colors.primary};
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
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(234, 191, 0, 0.3);
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
  background: #2d2d2d;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  max-height: 250px;
  overflow-y: auto;
  position: absolute;
  width: 100%;
  z-index: 100;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
`;

export const SearchResultItem = styled.li`
  padding: 15px;
  cursor: pointer;
  color: #eee;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  transition: background 0.2s;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

export const RelativeWrapper = styled.div`
  position: relative;
`;

export const TotalRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  font-weight: bold;
  font-size: 1.4em;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;
