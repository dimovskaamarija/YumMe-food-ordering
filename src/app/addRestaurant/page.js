"use client";

import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '/firebase/firebaseConfig';
import { useRouter } from 'next/navigation';

export default function AddRestaurant() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const restaurantData = {
                name,
                address,
                contact,
                openingHours,
                imageUrl
            };
            await addDoc(collection(firestore, "Restaurant"), restaurantData);
            router.push('/');

            setName('');
            setAddress('');
            setContact('');
            setOpeningHours('');
            setImageUrl('');

        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    const handleback=()=>{
        router.push(`/`)
    }
    return (
        <div>
            <h1 style={{ marginLeft: '100px',color:'#f58e4f' }}>Add New Restaurant</h1>
            <br />
            <form onSubmit={handleSubmit} style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                width: '300px',
                textAlign: 'justify',
                marginLeft: '100px'
            }}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{height: '30px'}} required/>

                <label>Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                       style={{height: '30px'}} required/>

                <label>Phone</label>
                <input type="text" value={contact} onChange={(e) => setContact(e.target.value)}
                       style={{height: '30px'}} required/>

                <label>Working hours</label>
                <input type="text" value={openingHours} onChange={(e) => setOpeningHours(e.target.value)}
                       style={{height: '30px'}} required/>

                <label>Image URL</label>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                       style={{height: '30px'}} required/>
                <button type="submit" style={{
                    width: '70px',
                    padding: '10px',
                    margin: '7px',
                    backgroundColor: '#f58e4f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginLeft: '400px'
                }}>Save
                </button>
                <button onClick={handleback} style={{
                    width: '80px',
                    padding: '10px',
                    margin: '7px',
                    backgroundColor: '#f5d36f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginLeft: '400px'
                }}>Cancel
                </button>
            </form>
        </div>
    );
}
