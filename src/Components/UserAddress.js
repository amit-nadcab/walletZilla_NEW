import React from 'react'
import { useSelector } from "react-redux";

export const UserAddress = () => {
    const { userAddress } = useSelector((state) => state.data.value);
    return (
        <>
            <div className='pt-2 w-50 mx-auto deposit-calculator'>
                <p className='text-white'>UserAddress</p>
                <p className='text-white'>{userAddress.userAddress.substr(0, 5) +
                    "......." +
                    userAddress.userAddress.substr(36)}</p>
            </div>
        </>
    )
}
