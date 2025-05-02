import { View, Text, Image, ActivityIndicator, FlatList, ScrollView, Pressable } from "react-native"
import * as SecureStore from 'expo-secure-store'
import { useContext, useEffect } from "react";
import { Context } from "@/src/context/provider";
import { StatusBar } from "react-native";
import * as Location from 'expo-location';
import { useState } from "react";
import Categories from "@/src/components/categories";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { loadPet } from "@/src/api/petService";
import Avatar from "@/src/components/avatar";
import { useCallback } from 'react';
import { useFocusEffect, useRouter } from "expo-router";
import { set } from "react-hook-form";

interface Pet {
  id: number;
  namePet: string;
  imagePet: string;
  aboutPet: string;
  gender: {
    nameGender: string;
  };
  age: {
    nameAge: string;
  };
  type: {
    id: number;
    nameType: string;
  };

}

export default function Home() {
  const context = useContext(Context)
  if (!context) {
    throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
  }

  const { setName, setImage, name, image, location, setEmail, setNumber,setToken,setIdUser,token } = context
  const { pets, isLoading, error, refetch } = loadPet(location) as { pets: Pet[], isLoading: boolean, error: any, refetch: () => void };



  const router = useRouter()
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredPets = Array.isArray(pets)
    ? selectedType
      ? pets.filter(pet => pet.type.nameType === selectedType)
      : pets
    : [];





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

        const emailUser = await SecureStore.getItemAsync('email');
        if (emailUser) {
          setEmail(emailUser)
        }

        const numberUser = await SecureStore.getItemAsync('number');
        if (numberUser) {
          setNumber(numberUser)
        }

        const token = await SecureStore.getItemAsync('jwtToken');
        if (token) {
          setToken(token)
        }
        const id = await SecureStore.getItemAsync('idUser');
        if (id) {
          setIdUser(id)
        }


      } catch (error) {
        console.error('Erro ao verificar o token:', error);
      }
    };

    loadUserData();
  }, [name]);



  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );
  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return <Text>Erro ao carregar os pets.</Text>;
  }
  return (
    <ScrollView style={{ backgroundColor: "#ffff" }}>


      <View
        style={{ flex: 1, backgroundColor: 'white' }}
        className="p-2">
        <View className="flex-row items-center w-full justify-between ">
          <View>
            <Text className="text-2xl color-gray-500">Olá</Text>
            <Text className="text-2xl">{name}</Text>
          </View>
          <Avatar />
        </View>
        <View className="mt-4">
          <Image
            source={require('../../../assets/images/carrossel/cat.jpg')}
            className="w-full h-60 rounded-2xl"
          />
        </View>

        <Categories setSelectedType={setSelectedType} />

        <View className="flex-row items-center py-4">
          <Text>
            <MaterialIcons name="location-on" size={24} color="red" />
          </Text>
          <Text className="text-lg">
            {location ? `${location}` : "sem localização"}
          </Text>
        </View>
        <View>
          {filteredPets.length > 0 ? (
            <FlatList
              horizontal
              data={filteredPets}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <Pressable
                  onPress={() => {
                    router.push({
                      pathname: "../Pages/infoPet",
                      params: { id: JSON.stringify(item.id) },
                    });
                  }}
                  style={{ backgroundColor: "#dfdfdf" }}
                  className="bg-white shadow-lg rounded-2xl p-1 mb-4 w-72 mr-4">
                  {/* Imagem do pet */}
                  <Image
                    source={{ uri: item.imagePet }}
                    style={{ width: "100%", height: 240 }}
                    className="rounded-xl"
                  />

                  {/* Nome e informações */}
                  <View className="mt-3 pl-1">
                    <Text className="text-xl font-bold text-gray-800">
                      {item.namePet}
                    </Text>
                    <Text className="text-gray-600 text-sm">
                      {item.aboutPet}
                    </Text>
                  </View>

                  {/* Infos adicionais */}
                  <View className="flex-row justify-between mt-3 pl-1">
                    <Text className="text-sm font-medium text-gray-700">
                      {item.gender.nameGender} • {item.age.nameAge}
                    </Text>

                  </View>
                </Pressable>
              )}
            />
          ) : (
            <View className="items-center justify-center">
              <Text>Nenhum bichinho encontrado na redondeza</Text>
              <Image
                source={require('../../../assets/images/home/nenhumpet.png')}
                style={{ width: 200, height: 300 }}
              />
            </View>
          )}
        </View>
        <StatusBar
          barStyle="light-content"
          backgroundColor="#CCF4DC"

        />
      </View>
    </ScrollView>
  )
}