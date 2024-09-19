"use client";
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { firestore } from "/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

export default function AddProduct() {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            const cartQuery = collection(firestore, "Cart");
            const querySnapshot = await getDocs(cartQuery);
            const items = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCartItems(items);
            setTotalPrice(calculateTotalPrice(items));
        }
        fetchData();
    }, []);

    const calculateTotalPrice = (items) => {
        return items.reduce((acc, item) => acc + parseFloat(item.price), 0);
    };

    const handleBack = () => {
        router.push(`/`);
    };
    const handleMakeOrder=()=>{
        router.push(`/orderDetails?total=${totalPrice}`)
    }



    const handleRemove = async (id) => {
        try {
            const cartDocRef = doc(firestore, "Cart", id);
            await deleteDoc(cartDocRef);
            const updatedItems = cartItems.filter(item => item.id !== id);
            setCartItems(updatedItems);
            setTotalPrice(calculateTotalPrice(updatedItems));
        } catch (error) {
            console.log("Error deleting item: ", error);
        }
    };

    return (
        <div style={{padding: '20px', fontFamily: 'Arial, sans-serif'}}>
            <h1 style={{textAlign: 'center', color: 'orangered'}}>Your Cart</h1>
            {cartItems.length > 0 ? (
                <ul style={{listStyleType: 'none', padding: 0}}>
                    {cartItems.map(item => (
                        <li
                            key={item.id}
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                borderBottom: '1px solid #ddd',
                                padding: '10px 0',
                                marginBottom: '10px',
                            }}
                        >
                            <div style={{flex: 1}}>
                                <h2 style={{margin: 0, color: 'orangered'}}>{item.name}</h2>
                                <h3 style={{margin: '5px 0'}}>Price: {item.price} мкд.</h3>
                            </div>
                            <div>
                                <button
                                    onClick={() => handleRemove(item.id)}
                                    style={{
                                        padding: '10px 20px',
                                        backgroundColor: 'orangered',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                        fontSize: '16px',
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        </li>
                    ))}
                    <h2>Total Price: {totalPrice} мкд.</h2>
                    <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '20px'}}>
                        <button onClick={() => handleMakeOrder()}
                                style={{
                                    padding: '10px 20px',
                                    backgroundColor: 'green',
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
                            Order
                        </button>


                    </div>
                </ul>
            ) : (
                <h2 style={{textAlign:'center',margin:'50px',width:'300px',backgroundColor:'salmon',color:'white',border:'none',borderRadius:'10px',padding:'20px',marginLeft:'670px'}}>Your cart is empty.</h2>
            )}
            <button
                onClick={handleBack}
                style={{
                    padding: '10px 20px',
                    backgroundColor: 'green',
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
                Home
            </button>
        </div>

    );
}
