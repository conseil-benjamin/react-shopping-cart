import { KeyboardEvent } from 'react';

import formatPrice from 'utils/formatPrice';
import { IProduct } from 'models';

import { useCart } from 'contexts/cart-context';
import { Link } from 'react-router-dom';
import * as S from './style';

interface IProps {
  product: IProduct;
}

const Product = ({ product }: IProps) => {
  const { openCart, addProduct } = useCart();
  const {
    title,
    price,
    image
  } = product;

  const handleAddProduct = () => {
    addProduct({ ...product, quantity: 1 });
    openCart();
  };

  const handleAddProductWhenEnter = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.code === 'Space') {
      addProduct({ ...product, quantity: 1 });
      openCart();
    }
  };

  return (
    <S.Container onKeyUp={handleAddProductWhenEnter} sku={product.id} tabIndex={1}>
      <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <S.Image style={{ backgroundImage: `url(${product.image})` }} />
        <S.Title>{product.title}</S.Title>
      </Link>
      <S.Price>
        <S.Val>
           <b> $ {formatPrice(price, 'USD')}</b>
          
        </S.Val>
      </S.Price>
      <S.BuyButton onClick={handleAddProduct} tabIndex={-1}>
        Add to cart
      </S.BuyButton>
    </S.Container>
  );
};

export default Product;
