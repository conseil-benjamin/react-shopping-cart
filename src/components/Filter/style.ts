// src/components/Filter/style.ts
import styled from 'styled-components/macro';
import CB from 'commons/Checkbox';

export const Container = styled.div`
  padding: 15px;
`;

export const Checkbox = styled(CB)`
  display: block; // On les affiche l'un au-dessus de l'autre pour plus de clarté
  margin-bottom: 12px;

  label {
    display: flex;
    align-items: center;
    position: relative;
    cursor: pointer;
    font-size: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    width: auto; // On enlève la largeur fixe de 35px
    height: auto; // On enlève la hauteur fixe
    padding: 8px 12px;
    border-radius: 4px; // On remplace le cercle par des coins arrondis
    background-color: #ececec;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.primary};
      color: white;
    }

    input:checked ~ .checkmark {
      background-color: transparent; // On gère l'état via le label parent
      color: inherit;
    }

    /* Quand l'input est coché, on change le style du label entier */
    &:has(input:checked) {
      background-color: ${({ theme }) => theme.colors.primary};
      color: #ececec;
    }

    input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
    }

    .checkmark {
      /* On adapte la checkmark pour qu'elle contienne tout le texte */
      position: relative; 
      width: auto;
      height: auto;
      line-height: normal;
      text-align: left;
      color: inherit;
      background-color: transparent;
      border: none;
    }
  }
`;

export const Title = styled.h4`
  margin-top: 20px;
  margin-bottom: 15px;
  font-weight: bold;
`;

export const RatingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
`;

interface IRatingButton {
  isActive?: boolean;
}

export const RatingButton = styled.button<IRatingButton>`
  padding: 8px 12px;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  transition: all 0.2s;
  
  /* Style dynamique selon si le bouton est actif ou non */
  border: 1px solid ${({ isActive, theme }) => (isActive ? theme.colors.primary : '#ccc')};
  background-color: ${({ isActive, theme }) => (isActive ? theme.colors.primary : '#f9f9f9')};
  color: ${({ isActive }) => (isActive ? '#fff' : '#333')};

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ isActive, theme }) => (isActive ? theme.colors.primary : '#ececec')};
  }

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
  }
`;