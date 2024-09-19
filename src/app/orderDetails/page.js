"use client";

import React, { useState } from "react";
import { addDoc, collection, getDocs, deleteDoc } from "firebase/firestore";
import { firestore } from "/firebase/firebaseConfig";
import { useRouter, useSearchParams } from "next/navigation";

export default function OrderDetails() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const totalFromCart = searchParams.get('total');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [deliveryType, setDeliveryType] = useState('');
    const [totalPrice, setTotalPrice] = useState(totalFromCart || '');
    const [selectedOption, setSelectedOption] = useState('');

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
        setDeliveryType(event.target.value);
    };
    const handleBack=()=>{
        router.push('/addToCart')

    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {

            const today = new Date();
            const formattedDate = today.toISOString().split('T')[0];

            const OrderData = {
                total: totalPrice,
                firstName,
                lastName,
                address,
                phone,
                deliveryType,
                date: formattedDate
            };

            await addDoc(collection(firestore, "OrderHistory"), OrderData);
            const cartQuery = collection(firestore, "Cart");
            const querySnapshot = await getDocs(cartQuery);
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            });

            router.push('/');
        } catch (error) {
            console.error("Error placing your order: ", error);
        }

    };

    return (
        <div>
            <h1 style={{ marginLeft: '100px', color: '#f58e4f' }}>Enter order details</h1>
            <br />
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '300px',
                textAlign: 'justify',
                marginLeft: '100px'
            }}>
                <label>First Name</label>
                <input
                    type="text"
                    style={{height: '30px'}}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />

                <label>Last Name</label>
                <input
                    type="text"
                    style={{height: '30px'}}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />

                <label>Address</label>
                <input
                    type="text"
                    style={{height: '30px'}}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                />

                <label>Phone number</label>
                <input
                    type="text"
                    style={{height: '30px'}}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                />

                <label>Delivery type</label>
                <div>
                    <input
                        type="radio"
                        id="pickUp"
                        name="deliveryType"
                        value="Pick Up"
                        checked={selectedOption === "Pick Up"}
                        onChange={handleOptionChange}
                     
                    />
                    <label htmlFor="pickUp">Pick Up</label>
                </div>

                <div>
                    <input
                        type="radio"
                        id="deliverHome"
                        name="deliveryType"
                        value="Deliver at Home"
                        checked={selectedOption === "Deliver at Home"}
                        onChange={handleOptionChange}
                    />
                    <label htmlFor="deliverHome">Deliver at Home</label>
                </div>

                <h2 style={{color: '#f58e4f'}}>Total Price: {totalPrice} мкд.</h2>

                    <button
                        type="submit"
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#396352',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '18px',
                            marginTop: '20px',
                            display: 'block',
                            width: '200px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        Place Order
                    </button>
                    <button
                        onClick={handleBack}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#396352',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '18px',
                            marginTop: '20px',
                            display: 'block',
                            width: '200px',
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        Back
                    </button>
               


            </form>
        </div>
    );
}
