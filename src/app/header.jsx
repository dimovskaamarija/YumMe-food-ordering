"use client";
import Image from 'next/image';
import React from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";

function Header() {
    const router = useRouter();
    const handleOrderHistory = () => {
        router.push("/orderHistory");
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

            <input type='text' style={{
                width: '300px',
                height: '40px',
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '0 10px',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)',
                marginLeft: '20px'
            }} placeholder={'Search here...'} />

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

                <button style={{
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

                <button style={{
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
            </div>
        </div>
    );
}

export default Header;
