import { View, Text, Image, ActivityIndicator, FlatList, ScrollView, Pressable } from "react-native"
import * as SecureStore from 'expo-secure-store'
import { useContext, useEffect } from "react";
import { Context } from "@/src/context/provider";
import { StatusBar } from "react-native";
import { useState } from "react";
import Categories from "@/src/components/categories";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { loadPet } from "@/src/api/petService";
import { useCallback } from 'react';
import { useFocusEffect, useRouter } from "expo-router";
import Header from "@/src/components/layout/header";
import Search from "@/src/components/home/search";

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

  const { setName, setImage, name, image, location, setEmail, setNumber, setToken, setIdUser, token } = useContext(Context)!
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
      <Header/>
      <Search/>
      <View
        style={{ flex: 1, backgroundColor: 'white' }}
        className="p-2">
        <View>
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
                 
                  className="bg-[var(--color-primary-100)] shadow-lg rounded-2xl p-1 mb-4 w-72 mr-4">
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
              <Text className="text-xl text-gray-400">Nenhum bichinho encontrado na redondeza</Text>
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