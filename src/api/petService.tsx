import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useContext } from "react"
import { Context } from "../context/provider"



const fetchPet = async (url: string,token:string) => {
    const response = await axios.get(`${url}/api/pets`,{
        headers:{
            'Authorization': `Bearer ${token}`, 
        }
    })
    const data = response.data
    console.log(data)
    return data;

}
export  function loadPet() {
    const context = useContext(Context)
    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }

    const { url,token} = context
    const { data, isLoading, error } = useQuery({
        queryFn: () => fetchPet(url,token),
        queryKey: ['pets'],

    })

    if (isLoading) return { pets: [], isLoading: true, error: false }
    if (error) return { pets: [], isLoading: false, error: error }

    return { pets: data, isLoading: false }
}




const fetchType = async(url:string) =>{
    const response = await axios.get(`${url}/api/typePet`);
    const data = response.data
    return data;
}

export function loadType(){
    const context = useContext(Context)
    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }

    const { url} = context
    const {data,isLoading,error} = useQuery({
        queryFn:()=>fetchType(url),
        queryKey:['types']
    })
    
    if (isLoading) return { pets: [], isLoading: true, error: false }
    if (error) return { pets: [], isLoading: false, error: error }

    return { types: data, isLoading: false }
}