import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useContext } from "react"
import { Context } from "../context/provider"


const fetchMyPets = async (url: string, token: string) => {
    const response = await axios.get(`${url}/api/myPets`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    return response.data
}


export const useMyPets = () => {

    const { url, token } = useContext(Context)!

    const { data, isLoading, error } = useQuery({
        queryFn: () => fetchMyPets(url, token),
        queryKey: ['myPets', token]

    })
    return {
        myPets:data,
        isLoading,
        error
    }
}