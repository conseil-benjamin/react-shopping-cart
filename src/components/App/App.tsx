import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProductDetails from 'components/ProductDetails';
import Loader from 'components/Loader';
import { GithubCorner, GithubStarButton } from 'components/Github';
import Filter from 'components/Filter';
import Products from 'components/Products';
import Cart from 'components/Cart';
import SearchBar from 'components/SearchBar';

import { useProducts } from 'contexts/products-context';
import * as S from './style';
import Admin from 'components/Admin';
import Checkout from 'components/Checkout';

function App() {
  const { isFetching, products, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <S.Container>
      {isFetching && <Loader />}
      <GithubCorner />

      <Routes>
        <Route
          path="/"
          element={
            <S.TwoColumnGrid>
              <S.Side>
                <Filter />
                <GithubStarButton />
              </S.Side>
              <S.Main>
                <S.MainHeader>
                  <SearchBar />

                </S.MainHeader>
                <Products products={products} />
              </S.Main>
            </S.TwoColumnGrid>
          }
        />

        {/* Route pour le détail du produit */}
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      <Cart />
    </S.Container>
  );
}

export default App;