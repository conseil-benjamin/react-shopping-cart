import { useEffect, useState } from 'react';
import Loader from 'components/Loader';
import { getOrders, deleteOrder, Order } from 'services/orderStorage';
import formatPrice from 'utils/formatPrice';
import * as S from './style';

const Admin = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        setIsLoading(true);
        try {
            const localOrders = getOrders();
            setOrders(localOrders);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteOrder = (id: string) => {
        if (!window.confirm('Are you sure you want to delete this order?')) return;

        try {
            deleteOrder(id);
            setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
            alert(`Order deleted successfully`);
        } catch (error) {
            console.error('Error deleting order:', error);
            alert('Failed to delete order');
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
                                <S.Th>Date</S.Th>
                                <S.Th>Customer</S.Th>
                                <S.Th>Email</S.Th>
                                <S.Th>Location</S.Th>
                                <S.Th>Products</S.Th>
                                <S.Th>Total</S.Th>
                                <S.Th>Actions</S.Th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.length === 0 ? (
                                <tr>
                                    <S.Td colSpan={7} style={{ textAlign: 'center' }}>No orders found.</S.Td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <S.Tr key={order.id}>
                                        <S.Td>{new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}</S.Td>
                                        <S.Td>{order.customer.firstName} {order.customer.lastName}</S.Td>
                                        <S.Td>{order.customer.email}</S.Td>
                                        <S.Td>{order.customer.city} ({order.customer.postalCode})</S.Td>
                                        <S.Td>{order.products.reduce((acc, p) => acc + p.quantity, 0)} items</S.Td>
                                        <S.Td>${formatPrice(order.total, 'USD')}</S.Td>
                                        <S.Td>
                                            <S.DeleteButton onClick={() => handleDeleteOrder(order.id)}>
                                                Delete
                                            </S.DeleteButton>
                                        </S.Td>
                                    </S.Tr>
                                ))
                            )}
                        </tbody>
                    </S.Table>
                )}
            </S.Content>
        </S.Container>
    );
};

export default Admin;
