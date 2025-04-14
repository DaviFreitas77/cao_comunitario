import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useContext } from "react"
import { Context } from "../context/provider"



const fetchPet = async (url: string, token: string) => {
    const response = await axios.get(`${url}/api/pets`, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    const data = response.data
    return data;

}
export function loadPet(location: string | null) {
    const context = useContext(Context)
    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }

    const { url, token } = context
    const { data, isLoading, error,refetch } = useQuery({
        queryFn: () => fetchPet(url, token),
        queryKey: ['pets'],
        enabled:!!location
    })

    return {
        pets: data || [],
        isLoading,
        error,
        refetch
      };
}



const fetchType = async (url: string) => {
    const response = await axios.get(`${url}/api/typePet`);
    const data = response.data
    return data;
}

export function loadType() {

    const context = useContext(Context)
    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }

    const { url } = context
    const { data, isLoading, error } = useQuery({
        queryFn: () => fetchType(url),
        queryKey: ['types']
    })

    if (isLoading) return { types: [], isLoading: true, error: false }
    if (error) return { types: [], isLoading: false, error: error }

    return { types: data, isLoading: false }
}


const fetchGender = async (url: string) => {
    const response = await axios.get(`${url}/api/genderPet`);
    const data = response.data
    return data;
}

export function loadGender() {
    const context = useContext(Context)
    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }

    const { url } = context
    const { data, isLoading, error } = useQuery({
        queryFn: () => fetchGender(url),
        queryKey: ['genders']
    })

    if (isLoading) return { genders: [], isLoading: true, error: false }
    if (error) return { genders: [], isLoading: false, error: error }

    return { genders: data, isLoading: false }
}


const fetchAge = async (url: string, token: string) => {
    const response = await axios.get(`${url}/api/agePet`, {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    const data = response.data;
    return data;
}

export const loadAge = () => {
    const context = useContext(Context)

    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }
    const { token, url } = context

    const { data, isLoading, error } = useQuery({
        queryFn: () => fetchAge(url, token),
        queryKey: ['ages']
    })

    if (isLoading) return { ages: [], isLoading: true, error: false }
    if (error) return { ages: [], isLoading: false, error: error }

    return { ages: data, isLoading: false }


}

const fetchCare = async (url: string) => {
    const response = await axios.get(`${url}/api/care`)
    const data = response.data;
    return data;

}

export const loadCare = () => {
    const context = useContext(Context)

    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }
    const { url } = context

    const { data, isLoading, error } = useQuery({
        queryFn: () => fetchCare(url),
        queryKey: ['cares']
    })

    if (isLoading) return { cares: [], isLoading: true, error: false }
    if (error) return { cares: [], isLoading: false, error: error }

    return { cares: data, isLoading: false }
}


const fetchTemperament = async(url:string)=>{
    const response = await axios.get(`${url}/api/temperament`)
    const data = response.data;
    return data;

}

export const loadTemperament = ()=>{
    const context = useContext(Context)

    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }
    const { url } = context

    const {data,isLoading,error} = useQuery({
        queryFn:()=>fetchTemperament(url),
        queryKey:['temperaments']

    })
    if (isLoading) return { temperaments: [], isLoading: true, error: false }
    if (error) return { temperaments: [], isLoading: false, error: error }

    return { temperaments: data, isLoading: false }

}



const fetchIdPet = async (url: string, id: number, token: string) => {
    const response = await axios.get(`${url}/api/pets/${id}`,{
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })

    const data = response.data
    return data;
}


export const loadIdPet = (id: number) => {
    const context = useContext(Context)
    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }

    const { url, token } = context
    const { data, isLoading, error } = useQuery({
        queryFn: () => fetchIdPet(url, id, token),
        queryKey: ['pet'],
        enabled: !!id
    })

    return { pet: data, isLoading, error }
}