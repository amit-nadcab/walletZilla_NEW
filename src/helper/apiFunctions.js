import axios from "axios";
import { BASE_URL } from "./config";


export const getDepositDetisl = async(userAddress)=>{
    try {
        const data = await axios.post(`${BASE_URL}/getDepositList`,{userAddress:userAddress})
        return   data.data
    } catch (error) {
        console.log(error,"getDepositDetisl Error");
    }
}

export const getWithdrawList = async(userAddress)=>{
    try {
        const data = await axios.post(`${BASE_URL}/getWithdrawList`,{userAddress:userAddress})
        return   data.data
    } catch (error) {
        console.log(error,"getDepositDetisl Error");
    }
}

export const getAirdropList = async(userAddress)=>{
    try {
        const data = await axios.post(`${BASE_URL}/getAirdropList`,{userAddress:userAddress})
        return   data.data
    } catch (error) {
        console.log(error,"getDepositDetisl Error");
    }
}

export const getMyReferral = async(userAddress)=>{
    try {
        const data = await axios.post(`${BASE_URL}/getMyReferrals`,{userAddress:userAddress})
        return   data.data
    } catch (error) {
        console.log(error,"getDepositDetisl Error");
    }
}

export const getMyTeam = async(userAddress)=>{
    try {
        const data = await axios.post(`${BASE_URL}/getMyTeam`,{userAddress:userAddress})
        return data.data
    } catch (error) {
        console.log(error,"getDepositDetisl Error");
    }
}