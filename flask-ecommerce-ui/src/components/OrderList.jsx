import { func, number } from 'prop-types';
import { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = ({ customerId, onOrderSelect }) => {
    const [orders, setOrders] = useState([]);
    // useEffect(setup<function>, dependency)
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/orders');
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error)
            }
        }
        if (customerId) {
            fetchOrders()
        }
    }, [customerId]);

    return (
        <div className='order-list'>
            <h3>Orders</h3>
            <ul>
                {orders.map(order => (
                    <li key={order.id} onClick={() => setOrders()}>
                        Order ID: {order.id}, Date: {order.date}
                    </li>
                ))}
            </ul>
        </div>
    );
};

OrderList.propTypes = {
    customerId: number,
    onOrderSelect: func
}

export default OrderList;