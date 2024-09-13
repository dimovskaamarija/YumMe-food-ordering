import React from 'react'
import Header from "@/app/header";
function Provider({children}){
    return(
        <div>
            <Header/>
            {children}
        </div>
    )
}
export default Provider