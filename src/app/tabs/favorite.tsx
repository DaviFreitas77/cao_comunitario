import { useFavorites } from "@/src/api/useFavorite";
import { View, Text, Image, Pressable, FlatList } from "react-native";
import { useRouter } from "expo-router";

export default function Favorite() {
  const { favorites, isLoading, error } = useFavorites()
  const router = useRouter()
  if (isLoading) return <Text>Loading...</Text>

  return (
    <View className="bg-[#ffffff] h-full p-4 items-center justify-center">

      {favorites.length == 2 ? (
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
              {/* Imagem do pet */}
              <Image
                source={{ uri: item.pet.imagePet }}
                style={{ width: "100%", height: 200 }}
                className="rounded-xl"
              />

              {/* Nome e informações */}
              <View className="mt-3 pl-1">
                <Text className="text-xl font-bold text-gray-800">
                  {item.pet.namePet}
                </Text>
                <Text className="text-gray-600 text-sm">
                  {item.pet.aboutPet}
                </Text>
              </View>

              {/* Infos adicionais */}
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