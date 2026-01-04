import React, { FC, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from 'contexts/products-context';
import { useCart } from 'contexts/cart-context';
import formatPrice from 'utils/formatPrice';
import Products from 'components/Products';

import { ProductDetailsWrapper } from './ProductDetails.styled';
import star from '../../static/star.png';

interface ProductDetailsProps {}

/**
 * ProductDetails component
 * - Displays full information for a single product (image, title, rating,
 *   description, price) and allows adding the product to the cart.
 * - Also computes and shows a short list of related products (same category).
 * - Uses `useProducts` to read products list and `useCart` to add/open cart.
 */
const ProductDetails: FC<ProductDetailsProps> = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { products } = useProducts();
  const { addProduct, openCart } = useCart();

  // 1. Find the current product by id from the products list
  const product = products.find((p) => p.id === Number(id));

  // 2. Logic for suggested products (same category, max 4)
  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product, products]);

  // 3. Scroll to top when the product id changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <ProductDetailsWrapper>
        <p>Product not found...</p>
        <button className="back-button" onClick={() => navigate('/') }>
          Back to shop
        </button>
      </ProductDetailsWrapper>
    );
  }

  const handleAddToCart = () => {
    addProduct({ ...product, quantity: 1 });
    openCart();
  };

  // Handler invoked when the "Add to cart" button is clicked.
  // - Adds the current product to the cart with an initial quantity of 1.
  // - Opens the cart drawer/modal so the user sees the updated contents.


  return (
    <ProductDetailsWrapper>
      <button className="back-button" onClick={() => navigate('/') }>
        Back to shop
      </button>

      <div className="product-container">
        {/* Image section: show the main product image */}
        <div className="image-section">
          <img src={product.image} alt={product.title} />
        </div>

        {/* Info section: category, title, rating, description and price */}
        <div className="info-section">
          <span className="category">{product.category}</span>
          <h1 className="title">{product.title}</h1>
          
          {/* Rating display: numeric rate, star icon and total reviews */}
          <div className="rating">
            <span>{product.rating.rate}</span>
            <img src={star} alt="star" style={{ width: '20px', height: '20px' }} />
            <small>({product.rating.count} reviews)</small>
          </div>

          {/* Product description */}
          <p className="description">{product.description}</p>

          {/* Price and add-to-cart button */}
          <div className="price-container">
            <span className="price">
              $ {formatPrice(product.price, 'USD')}
            </span>
          </div>

          <button className="add-button" onClick={handleAddToCart}>
            ADD TO CART
          </button>
        </div>
      </div>

      {relatedProducts.length > 0 && (
        <div className="related-products">
          <h3>You may also like</h3>
          <Products products={relatedProducts} />
        </div>
      )}
    </ProductDetailsWrapper>
  );
};

export default ProductDetails;