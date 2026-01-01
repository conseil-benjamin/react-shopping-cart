import React, { FC, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from 'contexts/products-context';
import { useCart } from 'contexts/cart-context';
import formatPrice from 'utils/formatPrice';
import Products from 'components/Products'; // Import pour la liste du bas

import { ProductDetailsWrapper } from './ProductDetails.styled';
import star from '../../static/star.png';

interface ProductDetailsProps {}

const ProductDetails: FC<ProductDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { products } = useProducts();
  const { addProduct, openCart } = useCart();

  // 1. Trouver le produit actuel
  const product = products.find((p) => p.id === Number(id));

  // 2. Logique pour les produits suggérés (même catégorie, max 4)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, products]);

  // 3. Remonter en haut de page quand on change de produit
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <ProductDetailsWrapper>
        <p>Produit introuvable...</p>
        <button className="back-button" onClick={() => navigate('/')}>
          Retour à la boutique
        </button>
      </ProductDetailsWrapper>
    );
  }

  const handleAddToCart = () => {
    addProduct({ ...product, quantity: 1 });
    openCart();
  };

  return (
    <ProductDetailsWrapper>
      {/* Bouton de retour (utilisera les nouveaux styles) */}
      <button className="back-button" onClick={() => navigate('/')}>
        Boutique
      </button>

      <div className="product-container">
        <div className="image-section">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="info-section">
          <span className="category">{product.category}</span>
          <h1 className="title">{product.title}</h1>
          
          <div className="rating">
            <span>{product.rating.rate}</span>
            <img src={star} alt="star" style={{ width: '20px', height: '20px' }} />
            <small>({product.rating.count} avis)</small>
          </div>

          <p className="description">{product.description}</p>

          <div className="price-container">
            <span className="price">
              {formatPrice(product.price, 'USD')}
            </span>
          </div>

          <button className="add-button" onClick={handleAddToCart}>
            AJOUTER AU PANIER
          </button>
        </div>
      </div>

      {/* Section Produits suggérés en bas */}
      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h3>Vous aimerez aussi</h3>
          <Products products={relatedProducts} />
        </div>
      )}
    </ProductDetailsWrapper>
  );
};

export default ProductDetails;