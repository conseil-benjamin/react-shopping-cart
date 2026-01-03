import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Loader from 'components/Loader';
import Home from 'components/Home';
import Admin from 'components/Admin';
import Checkout from 'components/Checkout';

import { useProducts } from 'contexts/products-context';

import * as S from './style';

function App() {
  const { isFetching } = useProducts();

  return (
    <BrowserRouter>
      <S.Container>
        {isFetching && <Loader />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </S.Container>
    </BrowserRouter>
  );
}

export default App;
