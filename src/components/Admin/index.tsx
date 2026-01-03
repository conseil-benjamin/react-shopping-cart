import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from 'components/Loader';
import * as S from './style';

interface Cart {
    id: number;
    userId: number;
    date: string;
    products: { productId: number; quantity: number }[];
}

const Admin = () => {
    const [carts, setCarts] = useState<Cart[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchCarts();
    }, []);

    const fetchCarts = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get('https://fakestoreapi.com/carts');
            setCarts(response.data);
        } catch (error) {
            console.error('Error fetching carts:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteCart = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this cart?')) return;

        try {
            await axios.delete(`https://fakestoreapi.com/carts/${id}`);
            // FakeStoreAPI doesn't actually delete, so we filter locally
            setCarts((prevCarts) => prevCarts.filter((cart) => cart.id !== id));
            alert(`Cart ${id} deleted successfully`);
        } catch (error) {
            console.error('Error deleting cart:', error);
            alert('Failed to delete cart');
        }
    };

    return (
        <S.Container>
            <S.Title>Admin Page</S.Title>
            <S.Content>
                {isLoading ? (
                    <Loader />
                ) : (
                    <S.Table>
                        <thead>
                            <tr>
                                <S.Th>ID</S.Th>
                                <S.Th>User ID</S.Th>
                                <S.Th>Date</S.Th>
                                <S.Th>Products</S.Th>
                                <S.Th>Actions</S.Th>
                            </tr>
                        </thead>
                        <tbody>
                            {carts.map((cart) => (
                                <S.Tr key={cart.id}>
                                    <S.Td>{cart.id}</S.Td>
                                    <S.Td>{cart.userId}</S.Td>
                                    <S.Td>{new Date(cart.date).toLocaleDateString()}</S.Td>
                                    <S.Td>{cart.products.length} items</S.Td>
                                    <S.Td>
                                        <S.DeleteButton onClick={() => handleDeleteCart(cart.id)}>
                                            Delete
                                        </S.DeleteButton>
                                    </S.Td>
                                </S.Tr>
                            ))}
                        </tbody>
                    </S.Table>
                )}
            </S.Content>
        </S.Container>
    );
};

export default Admin;
