import { useFavorites } from "@/src/api/useFavorite";
import { View, Text, Image, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";
import { useContext, useEffect,} from "react";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Context } from "@/src/context/provider";


export default function Favorite() {
  const {token} = useContext(Context)!
  console.log(token)
  const { favorites, isLoading, error,refetch } = useFavorites()
  const router = useRouter()
  if (isLoading) return <Text>Loading...</Text>

  
  return (
    <View className="bg-[#ffffff] h-full  items-center justify-center">
      {favorites.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-around' }}
          data={favorites}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                router.push({
                  pathname: "../Pages/infoPet",
                  params: { id: JSON.stringify(item.idPet) },
                });
              }}
              style={{ backgroundColor: "#dfdfdf" }}
              className="bg-white shadow-lg rounded-2xl p-1 mb-4 w-60 m-1 ">
        
              <Image
                source={{ uri: item.pet.imagePet }}
                style={{ width: "100%", height: 200 }}
                className="rounded-xl"
              />


              <View className="mt-3 pl-1">
                <Text className="text-xl font-bold text-gray-800">
                  {item.pet.namePet}
                </Text>
                <Text className="text-gray-600 text-sm">
                  {item.pet.aboutPet}
                </Text>
              </View>

   
              <View className="flex-row justify-between mt-3 pl-1">
                <Text className="text-sm font-medium text-gray-700">
                  {item.pet.gender.nameGender} • {item.pet.age.nameAge}
                </Text>

              </View>
            </Pressable>
          )}
        />
      ) : (
        <View>
          <Text className="text-3xl">Você não tem pet favorito</Text>
          <Image
            source={require('../../../assets/images/home/aviso.png')}
            style={{ width: 300, height: 300 }}
          />
        </View>
      )}

    </View>
  )
}