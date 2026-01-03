import { useEffect } from 'react';

import { GithubCorner, GithubStarButton } from 'components/Github';
import Recruiter from 'components/Recruiter';
import Filter from 'components/Filter';
import Products from 'components/Products';
import Cart from 'components/Cart';
import SearchBar from 'components/SearchBar';

import { useProducts } from 'contexts/products-context';

import * as S from './style';

function Home() {
    const { isFetching, products, fetchProducts } = useProducts();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <S.Container>
            <GithubCorner />
            <Recruiter />
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
            <Cart />
        </S.Container>
    );
}

export default Home;
