"use client";
import { useEffect, useState } from "react";
import { query, collection, where, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";
import { firestore } from "/firebase/firebaseConfig";
import { useSearchParams, useRouter } from "next/navigation";

export default function Menu() {
    const [menuItems, setMenuItems] = useState([]);
    const searchParams = useSearchParams();
    const restaurantId = searchParams.get('id');
    const router = useRouter();

    useEffect(() => {
        async function fetchMenu() {
            if (restaurantId) {
                const menuQuery = query(
                    collection(firestore, "Menu"),
                    where("restaurant", "==", doc(firestore, "Restaurant", restaurantId))
                );

                try {
                    const querySnapshot = await getDocs(menuQuery);
                    const menuItemsList = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        ...doc.data()
                    }));
                    setMenuItems(menuItemsList);
                } catch (error) {
                    console.log("Error fetching menu items: ", error);
                }
            }
        }

        fetchMenu();
    }, [restaurantId]);

    const handleAddToCart = async (item) => {
        try {
            const cartItem = {
                name: item.name,
                price: item.price,
                restaurant: item.restaurant,
                quantity: 1
            };
            await addDoc(collection(firestore, "Cart"), cartItem);
            router.push('/addToCart');
        } catch (error) {
            console.log('Cannot add item to the cart: ', error);
        }
    };

    const handleBack = () => {
        router.push(`/`);
    };

const handleAddProduct=()=>{
    router.push(`addProductToMenu?id=${restaurantId}`)
}
    const handleEditProduct = (menuItemId) => {
        router.push(`/editMenu?id=${restaurantId}&menuItemId=${menuItemId}`);
    };

    const handleDeleteProduct = async (id) => {
        try {
            const menuDocRef = doc(firestore, "Menu", id);
            await deleteDoc(menuDocRef);
            setMenuItems(prevItems => prevItems.filter(item => item.id !== id));
        } catch (error) {
            console.log("Error deleting item: ", error);
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <div
                style={{
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}
            >

                <h1  style={{color:'#f58e4f'}}>Menu</h1>
                <button onClick={handleBack} style={{ padding: '10px 20px', backgroundColor: '#396352', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Back</button>
                <button onClick={handleAddProduct} style={{ padding: '10px 20px', backgroundColor: '#396352', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add product</button>
            </div>
            {menuItems.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {menuItems.map((item) => (
                        <li
                            key={item.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                marginBottom: '20px',
                                borderBottom: '1px solid #ddd',
                                paddingBottom: '10px',
                            }}
                        >
                            {item.imageUrl && (
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    style={{
                                        width: '220px',
                                        height: '200px',
                                        marginRight: '20px',
                                        border: '5px solid #f5d36f',
                                        borderRadius:'30%'
                                    }}
                                />
                            )}
                            <div style={{ flex: 1 }}>
                                <h2 style={{ margin: 0 }}>{item.name}</h2>
                                <p style={{ margin: '5px 0' }}><strong>Description:</strong> {item.description}</p>
                                <p style={{ margin: '5px 0' }}><strong>Category:</strong> {item.category}</p>
                                <p style={{ margin: '5px 0' }}><strong>Price:</strong> {item.price} мкд.</p>
                            </div>
                            <div>
                                <button onClick={() => handleAddToCart(item)} style={{
                                    padding: '10px',
                                    margin: '5px',
                                    backgroundColor: '#f58e4f',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}>Add to cart
                                </button>
                                <button onClick={() => handleEditProduct(item.id)} style={{
                                    padding: '10px',
                                    margin: '5px',
                                    backgroundColor: '#f5d36f',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}>Edit
                                </button>
                                <button onClick={() => handleDeleteProduct(item.id)} style={{
                                    padding: '10px',
                                    margin: '5px',
                                    backgroundColor: '#d9bf89',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '5px',
                                    cursor: 'pointer'
                                }}>Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <h1 style={{textAlign:'center',margin:'50px',width:'300px',backgroundColor:'#f5d36f',color:'white',border:'none',borderRadius:'10px',padding:'20px',marginLeft:'670px'}}>No menu items available for this restaurant.</h1>
            )}
        </div>
    );
}
