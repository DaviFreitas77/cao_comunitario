import { View, Image, Text, TextInput, Pressable } from "react-native"
import { useContext, useState } from "react";
import { Context } from "@/src/context/provider";

export default function EditProfile() {
    const context = useContext(Context)
    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }


    const { url, image, email, name, number } = context
    const [editName, setEditName] = useState(false)
    const [editNumber, setEditNumber] = useState(false)


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
            <View>

                <Pressable
                    className="border border-gray-300 rounded-lg p-2 mt-2">
                    <Text style={{ fontSize: 8, fontWeight: "bold" }}>Email</Text>
                    <Text className="text-lg text-gray-500">{email}</Text>
                </Pressable>
            </View>

            <View>
                {editName == true ? (
                    <TextInput
                        className="border border-gray-300 rounded-lg p-2 mt-2"
                        placeholder="digite seu novo nome"
                    />
                ) : (
                    <Pressable
                        onPress={() => setEditName(true)}
                        className="border border-gray-300 rounded-lg p-2 mt-2">
                        <Text style={{ fontSize: 8, fontWeight: "bold" }}>Nome</Text>
                        <Text className="text-lg">{name}</Text>
                    </Pressable>
                )}



            </View>
            <View>
                {editNumber == true ? (
                    <TextInput
                        className="border border-gray-300 rounded-lg p-2 mt-2"
                        placeholder="digite seu novo número"
                    />
                ) : (
                    <Pressable
                        onPress={() => setEditNumber(true)}
                        className="border border-gray-300 rounded-lg p-2 mt-2">
                        <Text style={{ fontSize: 8, fontWeight: "bold" }}>Número</Text>
                        <Text className="text-lg">{number}</Text>
                    </Pressable>
                )}



            </View>


            <View
                className="justify-end mt-10 mb-5">
                <Pressable
                    className="w-full p-3 flex items-center justify-center rounded"
                    style={{ backgroundColor: '#CCF4DC' }}
                >
                    <Text className="text-2xl">Salvar alterações</Text>
                </Pressable>
            </View>

        </View>
    )
}