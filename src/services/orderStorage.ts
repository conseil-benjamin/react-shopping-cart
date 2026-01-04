import { ICartProduct } from 'models';

export interface Order {
    id: string;
    customer: {
        firstName: string;
        lastName: string;
        email: string;
        address: string;
        city: string;
        postalCode: string;
    };
    products: ICartProduct[];
    total: number;
    date: string;
}

const STORAGE_KEY = 'SHOPPING_CART_ORDERS';

export const getOrders = (): Order[] => {
    const orders = localStorage.getItem(STORAGE_KEY);
    return orders ? JSON.parse(orders) : [];
};

export const saveOrder = (order: Order): void => {
    const orders = getOrders();
    orders.push(order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
};

export const deleteOrder = (id: string): void => {
    const orders = getOrders();
    const updatedOrders = orders.filter((order) => order.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedOrders));
};
