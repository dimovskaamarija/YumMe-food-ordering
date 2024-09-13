"use client";

import { useState, useEffect } from 'react';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firestore } from '/firebase/firebaseConfig'; // Adjust the path as necessary
import { useRouter, useSearchParams } from 'next/navigation'; // To handle routing and query parameters

export default function EditRestaurant() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [contact, setContact] = useState('');
    const [openingHours, setOpeningHours] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const router = useRouter();
    const searchParams = useSearchParams();
    const restaurantId = searchParams.get('id');


    useEffect(() => {
        async function fetchRestaurant() {
            if (restaurantId) {
                try {
                    const docRef = doc(firestore, 'Restaurant', restaurantId);
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        const data = docSnap.data();
                        setName(data.name || '');
                        setAddress(data.address || '');
                        setContact(data.contact || '');
                        setOpeningHours(data.openingHours || '');
                        setImageUrl(data.imageUrl || '');
                    }
                } catch (err) {
                    console.error(`Error fetching data: ${err.message}`);
                }
            }
        }

        fetchRestaurant();
    }, [restaurantId]);

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

            const docRef = doc(firestore, 'Restaurant', restaurantId);
            await updateDoc(docRef, restaurantData);

            router.push('/');

        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };
    const handleback=()=>{
        router.push(`/`)
    }

    return (
        <div>
            <h1 style={{ marginLeft: '100px' }}>Edit Restaurant</h1>
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
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{height: '30px'}}/>

                <label>Address</label>
                <input type="text" value={address} onChange={(e) => setAddress(e.target.value)}
                       style={{height: '30px'}}/>

                <label>Phone</label>
                <input type="text" value={contact} onChange={(e) => setContact(e.target.value)}
                       style={{height: '30px'}}/>

                <label>Working hours</label>
                <input type="text" value={openingHours} onChange={(e) => setOpeningHours(e.target.value)}
                       style={{height: '30px'}}/>

                <label>Image URL</label>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                       style={{height: '30px'}}/>
                <button type="submit" style={{
                    width: '80px',
                    padding: '10px',
                    margin: '7px',
                    backgroundColor: 'orangered',
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
                    backgroundColor: 'salmon',
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
