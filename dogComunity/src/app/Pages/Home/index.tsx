import { View, Text,Image } from "react-native"
import * as SecureStore from 'expo-secure-store'
import { useContext, useEffect } from "react";
import { Context } from "@/src/context/provider";
export default function Home() {
  const context = useContext(Context)
  if (!context) {
    throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
  }

  const { setName, setImage, name,image } = context

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const nameUser = await SecureStore.getItemAsync('name');
        if (nameUser) {
          setName(nameUser);
        }

        const imageUser = await SecureStore.getItemAsync('image');
        if (imageUser) {
          setImage(imageUser)
        }

      } catch (error) {
        console.error('Erro ao verificar o token:', error);
      }
    };

    loadUserData();
  }, []);


  return (
    <View>
      <View className="flex-row items-center w-full justify-between p-2">
     <View>
       <Text className="text-2xl color-gray-500">Olá</Text>
       <Text className="text-lg text-3xl">{name}</Text>
     </View>
    <Image
        source={{ uri: image }}
        className="w-16 h-16 rounded-full"
    />
</View>
    </View>
  )
}