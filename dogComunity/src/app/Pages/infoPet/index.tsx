import { Text, View, Image, ScrollView, Pressable, StatusBar, TouchableOpacity, Linking } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { loadIdPet } from "@/src/api/petService";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { Context } from "@/src/context/provider";

import { useVerifyFavorite } from "@/src/api/useVerifyFavorite";
import { showToast } from "@/src/components/toast";

export default function InfoPet() {
  const router = useRouter()
  const { id } = useLocalSearchParams();
  const idPet = Number(id); 
  const [isFavorite, setIsFavorite] = useState(false)
  const { url, token } = useContext(Context)!
  const { verifyFavorite, refetch } = useVerifyFavorite(idPet)
  const { pet, isLoading, error } = loadIdPet(idPet);

  useEffect(() => {
    if (verifyFavorite !== isFavorite) {
      setIsFavorite(verifyFavorite);
    }
  }, [verifyFavorite]); 

  if (isLoading) return <Text className="p-4 text-xl">Carregando...</Text>;
  if (error) return <Text className="p-4 text-xl text-red-500">Erro ao carregar dados</Text>;


  const addFavorite = async (id: number) => {
    try {
      const response = await axios.post(
        `${url}/api/favorite`,
        { idPet: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        showToast('Pet favoritado com sucesso!', 'success');
        setIsFavorite(true)

      }


    } catch (error: any) {
      if (error.response) {
        if (error.response.status == 400) {
          deleteFavorite(id)
        } else {
          console.log("Erro desconhecido:", error);
        }
      } else {
        console.log("Erro de rede ou servidor não responde:", error);
      }
    }
  };

  const deleteFavorite = async (id: number) => {
    try {
      const response = await axios.delete(
        `${url}/api/favorite/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        showToast('Pet removido dos favoritos!', 'success');
        setIsFavorite(false)


      }

    } catch (error: any) {
      if (error.response) {
        console.log(error.response.status.message)
      }

    }
  }


  const openWhats = (namePet: string) => {
    const message = encodeURIComponent(`oii,vi seu pet no aplicativo cão comunitario e fiquei interessado em adotar o(a)${namePet}`)
    let url = `http://api.whatsapp.com/send?phone=55${pet.onwer.number}&text=${message}`
    Linking.openURL(url).then((data) => {
      console.log('WhatsApp Opened');
    }).catch((err) => {
      console.log(err);
      alert('Make sure Whatsapp installed on your device');
    });
  }

  return (
    <View className="flex-1 bg-white">

      <Image
        source={{ uri: pet.imagePet }}
        className="w-full h-1/2"
        resizeMode="cover"
      />

      <TouchableOpacity
        onPress={() => addFavorite(pet.id)}
        className="absolute right-1 top-3">
        <AntDesign name={isFavorite ? 'heart' : 'hearto'} size={40} color="red" />
      </TouchableOpacity>
      <ScrollView
      >
        <View className="p-2">

          <View className="flex-row justify-between">
            <Text className="text-3xl font-medium mb-4">{pet.namePet}</Text>

            <View className="flex-row">
              <MaterialIcons name="location-on" size={18} color="red" />
              <Text className="text-large">{pet.city}</Text>
            </View>
          </View>


          <View className="flex-row flex-wrap justify-between gap-4 mb-6">
            <View className="bg-[#CCF4DC] p-4 rounded-2xl w-[30%] items-center">
              <Text className="text-lg font-semibold text-center">
                {pet.type.nameType}
              </Text>
            </View>
            <View className="bg-[#CCF4DC] p-4 rounded-2xl w-[30%] items-center">
              <Text className="text-lg font-semibold text-center">
                {pet.gender.nameGender}
              </Text>
            </View>
            <View className="bg-[#CCF4DC] p-4 rounded-2xl w-[30%] items-center">
              <Text className="text-lg font-semibold text-center">
                {pet.age.nameAge}
              </Text>
            </View>
          </View>

          {/* Personalidade */}
          <Text className="text-2xl font-medium mb-2">Personalidade</Text>
          <View className="flex-row flex-wrap gap-2 mb-6 justify-start">
            {pet.temperaments.map((t: any) => (
              <Text
                key={t.id}
                className="text-base font-medium text-center bg-[#CCF4DC] p-4 rounded-2xl w-[30%]"
              >
                {t.temperament.nameTemperament}
              </Text>
            ))}
          </View>

          {/* Cuidados Veterinários */}
          <Text className="text-2xl font-medium mb-2">Cuidados veterinários</Text>
          <View className="flex-row flex-wrap gap-2 justify-start">
            {pet.cares.map((t: any) => (
              <Text
                key={t.id}
                className="text-base font-medium text-center bg-[#CCF4DC] p-4 rounded-2xl w-[30%]"
              >
                {t.descCares.nameCare}
              </Text>
            ))}
          </View>
        </View>
        {/* Sobre o pet*/}
        <View className="p-4 ">
          <Text className="text-2xl font-medium mb-2">um pouco sobre {pet.namePet}</Text>
          <Text>{pet.aboutPet}</Text>
        </View>
        {/* dono*/}
        <View className="p-4 flex-row items-center justify-between">
          <View className="flex-row items-center justify-start">
            <Image
              source={{ uri: pet.onwer.image }}
              className="w-20 h-20 rounded-full mb-2"
            />
            <Text className="text-2xl font-medium mb-2"> {pet.onwer.name}</Text>
          </View>

          <Pressable
            onPress={() => openWhats(pet.namePet)}
            className=" p-6 flex items-center justify-center rounded bg-[#CCF4DC]">
            <Text>Entrar em contato</Text>
          </Pressable>

        </View>
      </ScrollView>

      <StatusBar
        barStyle="light-content"
        backgroundColor="#CCF4DC"

      />
    </View>
  );
}
