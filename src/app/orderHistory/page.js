"use client"
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

export default function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function fetchOrdersData() {
            const ordersRef = collection(firestore, "OrderHistory");
            const querySnapshot = await getDocs(ordersRef);
            const ordersList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setOrders(ordersList);
        }
        fetchOrdersData();
    }, []);

    const handleHomeClick = () => {
        router.push('/');
    };

    return (
        <div style={{margin: '20px'}}>

            <h1 style={{color: 'orangered'}}>Order History</h1>
            <table style={{
                width: '100%',
                borderCollapse: 'collapse',
                marginTop: '20px'
            }}>
                <thead>
                <tr>
                    <th style={{border: '1px solid #ddd', padding: '8px'}}>First Name</th>
                    <th style={{border: '1px solid #ddd', padding: '8px'}}>Last Name</th>
                    <th style={{border: '1px solid #ddd', padding: '8px'}}>Address</th>
                    <th style={{border: '1px solid #ddd', padding: '8px'}}>Date</th>
                    <th style={{border: '1px solid #ddd', padding: '8px'}}>Total Price</th>
                    <th style={{border: '1px solid #ddd', padding: '8px'}}>Phone Number</th>
                    <th style={{border: '1px solid #ddd', padding: '8px'}}>Delivery Type</th>
                </tr>
                </thead>
                <tbody>
                {orders.map((order) => (
                    <tr key={order.id}>
                        <td style={{border: '1px solid #ddd', padding: '8px'}}>{order.firstName}</td>
                        <td style={{border: '1px solid #ddd', padding: '8px'}}>{order.lastName}</td>
                        <td style={{border: '1px solid #ddd', padding: '8px'}}>{order.address}</td>
                        <td style={{border: '1px solid #ddd', padding: '8px'}}>{order.date}</td>
                        <td style={{border: '1px solid #ddd', padding: '8px'}}>{order.total}</td>
                        <td style={{border: '1px solid #ddd', padding: '8px'}}>{order.phone}</td>
                        <td style={{border: '1px solid #ddd', padding: '8px'}}>{order.deliveryType}</td>
                    </tr>
                ))}
                </tbody>
            </table>
            <button
                onClick={handleHomeClick}
                style={{
                    padding: '10px 20px',
                    backgroundColor: 'darksalmon',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    marginBottom: '20px',
                    marginTop:'20px'
                }}
            >
                Home
            </button>
        </div>
    );
}
