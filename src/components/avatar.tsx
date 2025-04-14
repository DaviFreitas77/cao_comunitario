import { View, Image, Text, TouchableOpacity } from "react-native";
import { useContext, useState } from "react";
import { Context } from "../context/provider";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';
import { router } from "expo-router";
import { queryClient } from "../app/_layout";
export default function Avatar() {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const context = useContext(Context)
    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }
    const { image, token, url } = context




    const logOut = async () => {

        try {
            const response = await axios.post(`${url}/api/logout`, {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            }

            )

            if (response.status === 200) {
                const data = response.data

                const deteledToken = await SecureStore.deleteItemAsync('jwtToken');
                const deteledName = await SecureStore.deleteItemAsync('name');
                const deteledNumber = await SecureStore.deleteItemAsync('number');
                const deteledEmail = await SecureStore.deleteItemAsync('email');
                const deleteExpiresAt = await SecureStore.deleteItemAsync('expiresAt');
                queryClient.clear()
                router.replace('/');
            }


        } catch (error) {
            console.error(error)
        }
    }
    return (
        <View className="w-3/12 items-end">
            <TouchableOpacity
                onPress={() => setDropdownVisible(!dropdownVisible)}
            >
                <Image
                    source={{ uri: image }}
                    className="w-16 h-16 rounded-full"
                />
            </TouchableOpacity>

            <View
                style={{ display: dropdownVisible ? 'flex' : 'none' }}
                className="bg-gray absolute top-16 z-50 w-full h-10 items-center">
                <TouchableOpacity

                    onPress={logOut}
                    className="bg-[#dfdfdf]  w-full p-3">
                    <Text>Sair</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}