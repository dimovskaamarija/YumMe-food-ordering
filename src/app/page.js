"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();
  const [search,setSearch]=useState('')
  const [sortValue,setSortValue]=useState('')

  useEffect(() => {
    async function fetchRestaurants() {
      const restaurantsRef = collection(firestore, "Restaurant");
      const querySnapshot = await getDocs(restaurantsRef);

      const restaurantsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setRestaurants(restaurantsList);
    }

    fetchRestaurants();
  }, []);
  const handleSorting=(e)=>{
    setSortValue(e.target.value)
  }

  const handleAddRestaurantClick = () => {
    router.push('/addRestaurant');
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(firestore, 'Restaurant', id));
      setRestaurants((prevRestaurants) => prevRestaurants.filter((restaurant) => restaurant.id !== id));
    } catch (error) {
      console.error('Error deleting document: ', error);
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
        <select value={sortValue} onChange={handleSorting} style={{
          width: '200px',
          height: '40px',
          marginLeft: '20px',
          borderRadius: '5px',
          border: '1px solid #ccc',
          padding: '0 10px'
        }}>
          <option value="">Recommended</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
        </select>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>

          <h1 style={{color: '#f58e4f', margin: '20px'}}>List of Restaurants</h1>
          <button onClick={handleAddRestaurantClick} style={{
            padding: '10px 20px',
            backgroundColor: '#396352',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}>Add Restaurant
          </button>
        </div>
        {restaurants.length > 0 ? (
            <ul style={{listStyleType: 'none', padding: 0}}>
              {restaurants.filter((restaurant) => {
                return search.toLowerCase() === '' ? restaurant : restaurant.name.toLowerCase().includes(search.toLowerCase()
                );
              }).sort((a, b) => {
                if (sortValue === 'A-Z') {
                  return a.name.localeCompare(b.name);
                } else if (sortValue === 'Z-A') {
                  return b.name.localeCompare(a.name);
                } else {
                  return 0;
                }
              })
                  .map((restaurant) => (
                      <li key={restaurant.id} style={{
                        display: 'flex',
                        alignItems: 'center',
                        marginBottom: '20px',
                        borderBottom: '1px solid #ddd',
                        paddingBottom: '10px'
                      }}>
                        {restaurant.imageUrl && (
                            <img
                                src={restaurant.imageUrl}
                                alt={restaurant.name}
                                style={{
                                  width: '200px',
                                  height: '200px',
                                  marginRight: '20px',
                                  border: '5px solid #f5d36f',
                                  borderRadius: '30%'
                                }}
                            />
                        )}
                        <div style={{flex: 1}}>
                          <h2 style={{margin: 0}}>{restaurant.name}</h2>
                          <p style={{margin: '5px 0'}}><strong>Address: </strong>{restaurant.address}</p>
                          <p style={{margin: '5px 0'}}><strong>Phone:</strong> {restaurant.contact}</p>
                          <p style={{margin: '5px 0'}}><strong>Working hours:</strong> {restaurant.openingHours}</p>
                        </div>
                        <div>
                          <button onClick={() => router.push(`/openMenu?id=${restaurant.id}`)} style={{
                            padding: '10px',
                            margin: '5px',
                            backgroundColor: '#f58e4f',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                          }}>Menu
                          </button>
                          <button onClick={() => router.push(`/editRestaurant?id=${restaurant.id}`)} style={{
                            padding: '10px',
                            margin: '5px',
                            backgroundColor: '#f5d36f',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                          }}>Edit
                          </button>
                          <button onClick={() => handleDelete(restaurant.id)} style={{
                            padding: '10px',
                            margin: '5px',
                            backgroundColor: '#ee9080',
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
            }}>No restaurants available</h1>
        )}
      </div>
  );
}
