import { View, Text, Image } from "react-native"
import * as SecureStore from 'expo-secure-store'
import { useContext, useEffect } from "react";
import { Context } from "@/src/context/provider";
import { StatusBar } from "react-native";
import * as Location from 'expo-location';
import { useState } from "react";
export default function Home() {

  const context = useContext(Context)
  const [location, setLocation] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  if (!context) {
    throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
  }

  const { setName, setImage, name, image } = context

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
  }, [name]);


  useEffect(() => {
    async function getCurrentLocation() {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permissão não autorizada');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync(location.coords);
        if (address.length > 0) {
          console.log(address[0].region);
          setLocation(address[0].region || 'Localização desconhecida')
        }
      } catch (error) {
        console.error(error)
      }


    }

    getCurrentLocation();
  }, []);


  return (
    <View
      style={{ flex: 1, backgroundColor: 'white' }}
      className="p-2">
      <View className="flex-row items-center w-full justify-between ">
        <View>
          <Text className="text-2xl color-gray-500">Olá</Text>
          <Text className="text-3xl">{name}</Text>
        </View>
        <Image
          source={{ uri: image }}
          className="w-16 h-16 rounded-full"
        />
      </View>
      <View className="mt-4">
        <Image
          source={require('../../../assets/images/carrossel/cat.jpg')}
          className="w-full h-60 rounded-2xl"
        />
      </View>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#CCF4DC"

      />
    </View>
  )
}