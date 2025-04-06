import { View, Text, Image, ActivityIndicator, FlatList } from "react-native"
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
  const { pets, isLoading, error } = loadPet() as { pets: Pet[], isLoading: boolean, error: any };

  const context = useContext(Context)
  if (!context) {
    throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
  }

  const { setName, setImage, name, image, location } = context

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const filteredPets = selectedType ? pets.filter(pet => pet.type.nameType === selectedType) : pets;


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


  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>Erro ao carregar os pets.</Text>;
  }
  return (
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
      <View className="">
        {pets.length > 0 ? (
          <FlatList
            data={filteredPets}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View className="bg-white shadow-lg rounded-2xl p-4 mb-4">
                {/* Imagem do pet */}
                <Image
                  source={{ uri: item.imagePet }}
                  style={{ width: "60%", height: 220 }}
                  className="rounded-xl"
                />

                {/* Nome e informações */}
                <View className="mt-3">
                  <Text className="text-xl font-bold text-gray-800">
                    {item.namePet}
                  </Text>
                  <Text className="text-gray-600 text-sm">
                    {item.aboutPet}
                  </Text>
                </View>

                {/* Infos adicionais */}
                <View className="flex-row justify-between mt-3">
                  <Text className="text-sm font-medium text-gray-700">
                    {item.gender.nameGender} • {item.age.nameAge}
                  </Text>

                </View>
              </View>
            )}
          />
        ) : (
          <Text>Nenhum pet encontrado</Text>
        )}
      </View>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#CCF4DC"

      />
    </View>
  )
}