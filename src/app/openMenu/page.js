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
    const [search, setSearch]=useState('')
    const [categoryFilter,setCategoryFilter]=useState('')
    const [sortValue,setSortValue]=useState('')

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
    const handleSelectedCategory=(e)=>{
        setCategoryFilter(e.target.value)
    }
    const handleSorting=(e)=>{
        setSortValue(e.target.value)
    }


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
        <div style={{padding: '20px'}}>
            <input type='text' style={{
                width: '300px',
                height: '40px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '0 10px',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                marginLeft: '20px'
            }} placeholder={'Search here...'} onChange={(e) => setSearch(e.target.value)}/>
            <select value={categoryFilter} onChange={handleSelectedCategory} style={{
                width: '200px',
                height: '40px',
                marginLeft: '20px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                padding: '0 10px'
            }}>
                <option value="">All Categories</option>
                <option value="Main Dish">Main Dish</option>
                <option value="Appetizers">Appetizers</option>
                <option value="Dessert">Dessert</option>
                <option value="Salad">Salad</option>
                <option value="Breakfast">Breakfast</option>
            </select>
            <select value={sortValue} onChange={handleSorting} style={{
                width: '200px',
                height: '40px',
                marginLeft: '20px',
                borderRadius: '5px',
                border: '1px solid #ccc',
                padding: '0 10px'
            }}>
                <option value="">Recommended</option>
                <option value="Lowest Price First">Lowest Price First</option>
                <option value="Highest Price First">Highest Price First</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
            </select>
            <div
                style={{
                    padding: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                }}
            >


                <h1 style={{color: '#f58e4f', margin:'20px'}}>Menu</h1>
                <button onClick={handleBack} style={{
                    padding: '10px 20px',
                    backgroundColor: '#396352',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>Back
                </button>
                <button onClick={handleAddProduct} style={{
                    padding: '10px 20px',
                    backgroundColor: '#396352',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>Add product
                </button>
            </div>
            {menuItems.length > 0 ? (
                <ul style={{listStyleType: 'none', padding: 0}}>
                    {menuItems.filter((item) => {
                        return search.toLowerCase() === '' ? item : item.name.toLowerCase().includes(search.toLowerCase())
                    }).filter(item => {
                        return categoryFilter === ''
                            ? item
                            : item.category === categoryFilter;
                    }).sort((a, b) => {
                        if (sortValue === 'Lowest Price First') {
                        return a.price - b.price;
                    } else if (sortValue === 'Highest Price First') {
                        return b.price - a.price;
                    } else if (sortValue === 'A-Z') {
                        return a.name.localeCompare(b.name);
                    } else if (sortValue === 'Z-A') {
                        return b.name.localeCompare(a.name);
                    } else {
                        return 0;
                    }
                    }).
                    map((item) => (
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
                                        borderRadius: '30%'
                                    }}
                                />
                            )}
                            <div style={{flex: 1}}>
                                <h2 style={{margin: 0}}>{item.name}</h2>
                                <p style={{margin: '5px 0'}}><strong>Description:</strong> {item.description}</p>
                                <p style={{margin: '5px 0'}}><strong>Category:</strong> {item.category}</p>
                                <p style={{margin: '5px 0'}}><strong>Price:</strong> {item.price} мкд.</p>
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
                <h1 style={{
                    textAlign: 'center',
                    margin: '50px',
                    width: '300px',
                    backgroundColor: '#f5d36f',
                    color: 'white',
                    border: 'none',
                    borderRadius: '10px',
                    padding: '20px',
                    marginLeft: '670px'
                }}>No menu items available for this restaurant.</h1>
            )}
        </div>
    );
}
