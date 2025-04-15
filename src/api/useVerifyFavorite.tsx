import { useQuery } from "@tanstack/react-query"
import { useContext } from "react"
import { Context } from "../context/provider"
import axios from "axios"



const fetchVerirfyFavorite = async (url: string, token: string, id: number) => {
    const response = await axios.get(`${url}/api/favorite/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    return response.data.message;

}

export const useVerifyFavorite = (id: number,isFavorite:boolean) => {
    const { url, token } = useContext(Context)!
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ['verifyFavorite', id,isFavorite],
        queryFn: () => fetchVerirfyFavorite(url, token, id),
        enabled:!!id,


    })

    if (isLoading) return { verifyFavorite: false, isLoading: true, error: false,refetch}
    if (error) return { verifyFavorite: false, isLoading: false, error: error,refetch}


    return { verifyFavorite: data, isLoading: false,refetch}

}