"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "/firebase/firebaseConfig";

function Header() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleOrderHistory = () => {
        router.push("/orderHistory");
    };
    const handleSignIn = () => {
        router.push("/signIn");
    };
    const handleSignUp = () => {
        router.push("/signUp");
    };
    const signOutFunction = async () => {
        try {
            await signOut(auth);
            setUser(null);
            router.push("/signIn");
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            backgroundColor: '#396352',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            borderRadius: '8px',
            margin: '15px'
        }}>
            <Image src='/YUM.jpg' width={150} height={100} alt="logo" />
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Link href="/addToCart" passHref>
                    <div style={{
                        cursor: 'pointer',
                        marginLeft: '15px',
                        position: 'relative'
                    }}>
                        <Image
                            src="/cart.png"
                            alt="Cart"
                            width={50}
                            height={50}
                        />
                    </div>
                </Link>

                {!user ? (
                    <>
                        <button onClick={handleSignIn} style={{
                            backgroundColor: '#f58e4f',
                            color: 'white',
                            padding: '10px 15px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginLeft: '15px',
                            transition: 'background-color 0.3s',
                            fontWeight: 'bold'
                        }}>Sign in</button>

                        <button onClick={handleSignUp} style={{
                            backgroundColor: '#f5d36f',
                            color: 'white',
                            padding: '10px 15px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginLeft: '15px',
                            transition: 'background-color 0.3s',
                            fontWeight: 'bold'
                        }}>Sign up</button>
                    </>
                ) : (
                    <>
                        <button onClick={signOutFunction} style={{
                            backgroundColor: '#e8b48c',
                            color: 'white',
                            padding: '10px 15px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginLeft: '15px',
                            transition: 'background-color 0.3s',
                            fontWeight: 'bold'
                        }}>Sign out</button>

                        <button onClick={handleOrderHistory} style={{
                            backgroundColor: '#ee9080',
                            color: 'white',
                            padding: '10px 15px',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            marginLeft: '15px',
                            transition: 'background-color 0.3s',
                            fontWeight: 'bold'
                        }}>Order History</button>
                    </>
                )}
            </div>
        </div>
    );
}

export default Header;
