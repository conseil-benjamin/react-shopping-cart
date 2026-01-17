import { useEffect, useState } from 'react';
import Loader from 'components/Loader';
import { getOrders, deleteOrder, Order } from 'services/orderStorage';
import formatPrice from 'utils/formatPrice';
import Swal from 'sweetalert2';
import * as S from './style';

// Composant d'administration affichant les commandes stockées localement
const Admin = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false);

  // Au montage, on récupére les commandes une seule fois
  useEffect(() => {
        fetchOrders();
    }, []);

  // Récupère les commandes depuis le service API
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

  // Supprime une commande après confirmation utilisateur via SweetAlert
  const handleDeleteOrder = async (id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#eabf00',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
              // Appel au service pour supprimer effectivement la commande
              deleteOrder(id);
              // Mise à jour locale de l'état pour retirer la commande sans recharger
              setOrders((prevOrders) => prevOrders.filter((order) => order.id !== id));
                Swal.fire(
                    'Deleted!',
                    'Order has been deleted.',
                    'success'
                );
            } catch (error) {
                console.error('Error deleting order:', error);
                Swal.fire(
                    'Error!',
                    'Failed to delete order.',
                    'error'
                );
            }
        }
    };

    return (
        <S.Container>
            <S.Title>Admin Page</S.Title>
            <S.Content>
                {isLoading ? (
                  // Affiche un loader pendant la récupération des données
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
                              // Affiche chaque commande dans une ligne de tableau
                              orders.map((order) => (
                                    <S.Tr key={order.id}>
                                        <S.Td>{new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}</S.Td>
                                        <S.Td>{order.customer.firstName} {order.customer.lastName}</S.Td>
                                        <S.Td>{order.customer.email}</S.Td>
                                        <S.Td>{order.customer.city} ({order.customer.postalCode})</S.Td>
                                        {/* Calcul du nombre total d'articles dans la commande */}
                                        <S.Td>{order.products.reduce((acc, p) => acc + p.quantity, 0)} items</S.Td>
                                        {/* formatPrice gère l'affichage monétaire */}
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
