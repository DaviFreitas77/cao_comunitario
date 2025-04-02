import { useContext, createContext, useState, ReactNode, useEffect } from "react";

interface DogCommunity {
    name: string;
    setName: (name: string) => void;

    email: string;
    setEmail: (newEmail: string) => void;

    number: string;
    setNumber: (newNumber: string) => void;

    password: string;
    setPassword: (newPassword: string) => void;

    url:string;
    setUrl:(newUrl:string) => void;

    image:string;
    setImage:(newImage:string) => void;
}

export const Context = createContext<DogCommunity | undefined>(undefined);

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [number, setNumber] = useState('');
    const [password, setPassword] = useState('');
    const [image,setImage] = useState('')
    const [url, setUrl ] = useState('');


    useEffect(()=>{
        setUrl('https://e7e5-2804-7f0-b900-b8bd-dc9b-69a5-71cb-da0c.ngrok-free.app')
    },[url])

    return (
        <Context.Provider value={{ name, setName, email, setEmail, number, setNumber, password, setPassword,url,setUrl,image,setImage }}>
            {children}
        </Context.Provider>
    );
};
