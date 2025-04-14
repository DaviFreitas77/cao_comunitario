import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { Context } from "../context/provider";

const fetchFavorites = async (url: string, token: string) => {
    const response = await axios.get(`${url}/api/favorite`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    const data = response.data;
    return data;
}


export const useFavorites  = () => {
    const context = useContext(Context)

    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }
    const { url, token } = context

    const { data, isLoading, error,refetch } = useQuery({
        queryFn: () => fetchFavorites(url, token),
        queryKey: ['favorites',token],
        enabled: !!token,
  
    })
    if (isLoading) return { favorites: [], isLoading: true, error: false,refetch}
    if (error) return { favorites: [], isLoading: false, error: error,refetch}


    return { favorites: data, isLoading: false,refetch}
}