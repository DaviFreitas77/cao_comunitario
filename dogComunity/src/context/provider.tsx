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

    url: string;
    setUrl: (newUrl: string) => void;

    image: string;
    setImage: (newImage: string) => void;

    location: string;
    setLocation: (newLocation: string) => void;

    token: string;
    setToken: (newToken: string) => void;

    idUser: string;
    setIdUser: (newIdUser: string) => void;
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
    const [image, setImage] = useState('')
    const [url, setUrl] = useState('');
    const [location, setLocation] = useState('')
    const [token, setToken] = useState('')
    const [idUser, setIdUser] = useState('')


    useEffect(() => {
        setUrl('https://0c434ee3c93b.ngrok-free.app')
    }, [url])

    return (
        <Context.Provider value={{ name, setName, email, setEmail, number, setNumber, password, setPassword, url, setUrl, image, setImage, location, setLocation, token, setToken, idUser, setIdUser }}>
            {children}
        </Context.Provider>
    );
};
