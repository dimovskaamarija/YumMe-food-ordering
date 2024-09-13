"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { firestore } from "/firebase/firebaseConfig";
import { useRouter } from "next/navigation";

export default function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const router = useRouter();

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
      <div style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h1>List of Restaurants</h1>
          <button onClick={handleAddRestaurantClick} style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Add Restaurant</button>
        </div>
        {restaurants.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {restaurants.map((restaurant) => (
                  <li key={restaurant.id} style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                    {restaurant.imageUrl && (
                        <img
                            src={restaurant.imageUrl}
                            alt={restaurant.name}
                            style={{ width: '200px', height: '200px', marginRight: '20px', border: '3px solid black' }}
                        />
                    )}
                    <div style={{ flex: 1 }}>
                      <h2 style={{ margin: 0 }}>{restaurant.name}</h2>
                      <p style={{ margin: '5px 0' }}><strong>Address: </strong>{restaurant.address}</p>
                      <p style={{ margin: '5px 0' }}><strong>Phone:</strong> {restaurant.contact}</p>
                      <p style={{ margin: '5px 0' }}><strong>Working hours:</strong> {restaurant.openingHours}</p>
                    </div>
                    <div>
                      <button onClick={()=>router.push(`/openMenu?id=${restaurant.id}`)} style={{ padding: '10px', margin: '5px', backgroundColor: 'orangered', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Menu</button>
                      <button onClick={() => router.push(`/editRestaurant?id=${restaurant.id}`)} style={{ padding: '10px', margin: '5px', backgroundColor: 'salmon', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Edit</button>
                      <button onClick={() => handleDelete(restaurant.id)} style={{ padding: '10px', margin: '5px', backgroundColor: 'lightsalmon', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Delete</button>
                    </div>
                  </li>
              ))}
            </ul>
        ) : (
            <p>No restaurants available</p>
        )}
      </div>
  );
}
