import { Context } from "@/src/context/provider";
import { useContext } from "react";
import { View, Text, Image, Pressable } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from "expo-router";

export default function Perfil() {

    const router = useRouter()
    const context = useContext(Context)

    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }
    const { name, image, email, number } = context

    return (
        <View className="p-4">
            <View className="flex-row items-center mt-10 mb-5 gap-4">
                <Image
                    source={{ uri: image }}
                    className="w-20 h-20 rounded-full border-2 border-green-500"
                />
                <View className="">
                    <Text className="text-lg font-bold">
                        {name}
                    </Text>
                    <Text className="text-gray-500">
                        {email}
                    </Text>
                </View>
            </View>

            <View style={{ borderWidth: 1, borderColor: "#dfdfdf", gap: 2, borderRadius: 15, marginTop: 40 }}>
                <Pressable
                    onPress={() => router.push('../Pages/editProfile')}
                    className="flex-row justify-between p-4"
                    style={{ borderBottomWidth: 1, borderColor: '#dfdfdf' }}
                >
                    <Text className="text-lg ">
                        Editar perfil
                    </Text>
                    <FontAwesome name="user" size={24} color="black" />
                </Pressable>
                <Pressable
                    onPress={() => router.push('../Pages/MyPets')}
                    className="flex-row justify-between p-4"
                    style={{ borderBottomWidth: 1, borderColor: '#dfdfdf' }}
                >
                    <Text className="text-lg ">
                        Meus pets
                    </Text>
                    <FontAwesome name="user" size={24} color="black" />
                </Pressable>
                <Pressable
                    onPress={() => router.push('../Pages/aboutUs')}
                    className="flex-row justify-between p-4"
                    style={{ borderBottomWidth: 1, borderColor: '#dfdfdf' }}
                >
                    <Text className="text-lg ">
                        Sobre nós
                    </Text>
                    <AntDesign name="exclamationcircle" size={24} color="black" />
                </Pressable>
                <Pressable
                    className="flex-row justify-between p-4"
                    style={{ borderBottomWidth: 1, borderColor: '#dfdfdf' }}
                >
                    <Text className="text-lg ">
                        Notificações
                    </Text>
                    <Text className="text-gray-500">
                        em breve
                    </Text>
                    <MaterialIcons name="notifications" size={24} color="black" />
                </Pressable>
                <Pressable
                    className="flex-row justify-between p-4"
                    style={{ borderBottomWidth: 1, borderColor: '#dfdfdf' }}
                >
                    <Text className="text-lg ">
                        faça uma doação
                    </Text>
                    <Text className="text-gray-500">
                        em breve
                    </Text>
                    <MaterialIcons name="pets" size={24} color="black" />
                </Pressable>

            </View>
            <View style={{ borderWidth: 1, borderColor: "#dfdfdf", gap: 2, borderRadius: 15, marginTop: 40 }}>

                <Pressable
                    className="flex-row justify-between p-4"
                    style={{ borderBottomWidth: 1, borderColor: '#dfdfdf' }}
                >
                    <Text className="text-lg ">
                        Nos ajude a melhorar
                    </Text>
                    <MaterialIcons name="email" size={24} color="black" />
                </Pressable>
                <Pressable
                    className="flex-row justify-between p-4"
                    style={{ borderBottomWidth: 1, borderColor: '#dfdfdf' }}
                >
                    <Text className="text-lg ">
                        Avaliar aplicativo
                    </Text>
                    <Ionicons name="star-sharp" size={24} color="black" />
                </Pressable>
                <Pressable
                    className="flex-row justify-between p-4"
                    style={{ borderBottomWidth: 1, borderColor: '#dfdfdf' }}
                >
                    <Text className="text-lg ">
                        sair
                    </Text>
                    <MaterialIcons name="logout" size={24} color="red" />
                </Pressable>

            </View>
        </View>
    )
}