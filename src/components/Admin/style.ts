import styled from 'styled-components/macro';

export const Container = styled.div`
  padding: 40px 20px;
  max-width: 1200px;
  margin: 0 auto;
  min-height: 80vh;
`;

export const Title = styled.h1`
  font-size: 2.5em;
  margin-bottom: 30px;
  text-align: center;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 300;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

export const Content = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.05);
  overflow-x: auto;
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 10px;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Th = styled.th`
  text-align: left;
  padding: 15px 20px;
  color: #888;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.85em;
  letter-spacing: 1px;
`;

export const Tr = styled.tr`
  background: #f9f9f9;
  transition: transform 0.2s, background 0.2s, box-shadow 0.2s;

  &:hover {
    transform: scale(1.005);
    background: #ffffff;
    box-shadow: 0 5px 15px rgba(0,0,0,0.05);
  }
`;

export const Td = styled.td`
  padding: 20px;
  
  &:first-child {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
  }

  &:last-child {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const DeleteButton = styled.button`
  background: linear-gradient(135deg, #ff6b6b 0%, #ee5253 100%);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 25px;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 4px 15px rgba(238, 82, 83, 0.4);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(238, 82, 83, 0.6);
  }

  &:active {
    transform: translateY(0);
  }
`;
