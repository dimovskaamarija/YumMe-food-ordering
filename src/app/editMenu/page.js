"use client";

import { useEffect, useState } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { firestore } from "/firebase/firebaseConfig";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditProductMenu() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const searchParams = useSearchParams();
    const restaurantId = searchParams.get('id'); // Restaurant ID from URL
    const menuItemId = searchParams.get('menuItemId'); // Menu item ID from URL
    const router = useRouter();

    useEffect(() => {
        async function fetchMenuItem() {
            if (menuItemId) {
                const menuItemRef = doc(firestore, "Menu", menuItemId);
                const menuItemDoc = await getDoc(menuItemRef);

                if (menuItemDoc.exists()) {
                    const data = menuItemDoc.data();
                    setName(data.name);
                    setDescription(data.description);
                    setCategory(data.category);
                    setPrice(data.price);
                    setImageUrl(data.imageUrl);
                }
            }
        }

        fetchMenuItem();
    }, [menuItemId]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!menuItemId) {
            console.error("No menu item selected to edit.");
            return;
        }
        try {
            const menuItemRef = doc(firestore, "Menu", menuItemId);
            const updatedData = {
                name,
                description,
                category,
                price,
                imageUrl,
                restaurant: doc(firestore, "Restaurant", restaurantId)
            };
            await updateDoc(menuItemRef, updatedData);
            router.push(`/openMenu?id=${restaurantId}`);
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };
    const handleback=()=>{
        router.push(`/openMenu?id=${restaurantId}`)
    }

    return (
        <div>
            <h1 style={{ marginLeft: '100px' }}>Edit Product</h1>
            <br />
            <form onSubmit={handleSubmit}
                  style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px', marginLeft: '100px' }}>
                <label>Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} style={{ height: "30px" }} />

                <label>Description</label>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} style={{ height: "30px" }} />

                <label>Category</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} style={{ height: "30px" }} />

                <label>Price</label>
                <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} style={{ height: "30px" }} />

                <label>Image Url</label>
                <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} style={{ height: "30px" }} />

                <button type="submit" style={{ width: '80px', padding: '10px', margin: '7px', backgroundColor: 'orangered', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '400px' }}>Save</button>
                <button onClick={handleback} style={{ width: '80px', padding: '10px', margin: '7px', backgroundColor: 'salmon', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginLeft: '400px' }}>Cancel</button>
            </form>
        </div>
    );
}
