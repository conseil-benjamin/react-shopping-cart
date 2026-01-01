import styled from 'styled-components';

export const ProductDetailsWrapper = styled.div`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;

  .back-button {
    display: inline-flex;
    align-items: center;
    background: transparent;
    border: 2px solid #1b1a20;
    color: #1b1a20;
    padding: 8px 16px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    text-transform: uppercase;
    transition: all 0.2s;

    &::before {
      content: '←';
      margin-right: 8px;
      transition: transform 0.2s;
    }

    &:hover {
      background-color: #1b1a20;
      color: white;
      &::before {
        transform: translateX(-4px);
      }
    }
  }

  .product-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 50px;
    align-items: start;

    @media (max-width: 768px) { grid-template-columns: 1fr; }
  }

  .image-section img {
    width: 100%;
    max-height: 500px;
    object-fit: contain;
  }

  .info-section {
    .category { color: #888; text-transform: uppercase; font-size: 14px; }
    .title { margin: 10px 0; font-size: 32px; }
    .rating {  span { font-weight: bold; margin-right: 5px; }; align-items: center; display: flex;}
    .description { line-height: 1.6; color: #444; margin-bottom: 30px; }
    
    .price {
      font-size: 28px;
      font-weight: bold;
      color: #1b1a20;
      &::before { content: '$'; font-size: 18px; margin-right: 2px; }
    }

    .add-button {
      width: 100%;
      background-color: #1b1a20;
      color: #fff;
      padding: 1em;
      margin-top: 1em;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s;
      &:hover { background-color: #eab308; }
    }
  }

  .related-products {
    margin-top: 1em;
    border-top: 1px solid #ececec;
    padding-top: 1em;

    h3 {
      text-align: center;
      margin-bottom: 1em;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
  }
`;