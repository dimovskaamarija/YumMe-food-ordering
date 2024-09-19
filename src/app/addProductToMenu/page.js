"use client";
import { useState } from 'react';
import { collection, addDoc, doc } from "firebase/firestore";
import { firestore } from "/firebase/firebaseConfig";
import { useRouter, useSearchParams } from "next/navigation";

export default function AddProductToMenu() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [category, setCategory] = useState('');
    const searchParams = useSearchParams();
    const restaurantId = searchParams.get('id');
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {


            const restaurantRef = doc(firestore, "Restaurant", restaurantId);

            const menuItemData = {
                name,
                description,
                price,
                category,
                imageUrl,
                restaurant: restaurantRef
            };

            await addDoc(collection(firestore, "Menu"), menuItemData);
            setName('');
            setDescription('');
            setPrice('');
            setImageUrl('');
            setCategory('');

            router.push(`/openMenu?id=${restaurantId}`);
        } catch (error) {
            console.error('Error adding item: ', error);
        }

    };
    const handleback=()=>{
        router.push(`/openMenu?id=${restaurantId}`)
    }
    return (
        <div>
            <h1 style={{ marginLeft: '100px',color:'#f58e4f' }}>Add new product</h1>
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
                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)}
                       style={{height: '30px'}} required/>
                <label>Category</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)}
                       style={{height: '30px'}} required/>
                <label>Price</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} style={{height: '30px'}} required/>
                <label>Image Url</label>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)}
                       style={{height: '30px'}} required/>
                <button type="submit" style={{
                    padding: '10px',
                    backgroundColor: '#396352',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px'
                }}>
                    Add Item
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
