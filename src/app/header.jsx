"use client"
import Image from 'next/image';
import React from 'react';
import Button from 'next'
import Link from "next/link";
import {useRouter} from "next/navigation";


function Header() {
    const router=useRouter()
    const handleOrderHistory=()=>{
        router.push("/orderHistory")
    }
    return (
        <div style={{
                display: 'flex',
                alignItems: 'center',
                padding: '10px',
            margin:"15px"
            }} >
            <Image src='/YUM.jpg' width={150} height={100} alt="logo"/>
<div>
    <input type='text' className='w-full' style={{
        marginLeft:'300px',
        marginRight:'400px',
        width:'300px',
        height:'30px'
    }} placeholder={'Search here...'}/>

</div>
            <div>
                <Link href="/addToCart" passHref>
                    <div style={{cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',}}>
                        <Image
                            src="/cart.png"
                            alt="Cart"
                            width={50}
                            height={50}

                        />
                    </div>
                </Link>
            </div>
            <button style={{
                backgroundColor: 'orangered',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginLeft:"15px"

            }}>Sign in</button>
            <button


            style={{
                backgroundColor: 'salmon',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                margin:"15px"

            }}>Sign up</button>
            <button onClick={handleOrderHistory} style={{
                backgroundColor: 'lightsalmon',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                marginLeft:"15px"

            }}>Order History</button>

        </div>

    );
}

export default Header;
