import Image from 'next/image';
import React from 'react';
import Button from 'next'


function Header() {
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
            <div></div>
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
        </div>
    );
}

export default Header;
