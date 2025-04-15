import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Context } from "../context/provider"
import axios from "axios"



const fetchVerirfyFavorite = async (url: string,token:string,id:number) => {
    const response = await axios.get(`${url}/api/favorite/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    return response.data.message;

}

export const useVerifyFavorite = (id:number) => {
    const {url,token} = useContext(Context)!
    const {data,isLoading,error} = useQuery({
        queryKey:['verifyFavorite',id],
        queryFn:()=>fetchVerirfyFavorite(url,token,id),
        enabled: !!id
    })

    return {verifyFavorite:data,isLoading,error}
}