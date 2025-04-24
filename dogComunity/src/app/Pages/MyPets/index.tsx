import { useMyPets } from "@/src/api/useMyPets";
import { useRouter } from "expo-router";
import { View, Text, FlatList, Pressable, Image, TouchableOpacity, Alert } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';


export default function MyPets() {
  const router = useRouter()
  const { myPets, isLoading, error } = useMyPets()



  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-around' }}
        data={myPets}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            style={{ backgroundColor: "#dfdfdf" }}
            className="bg-white shadow-lg rounded-2xl p-1 mb-4 w-56 m-1 ">

            <Image
              source={{ uri: item.imagePet }}
              style={{ width: "100%", height: 200 }}
              className="rounded-xl"
            />


            <View className="mt-3 pl-1">
              <View className="flex-row justify-between">
                <Text className="text-xl font-bold text-gray-800">
                  {item.namePet}
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    Alert.alert(
                      "Excluir pet",
                      "Tem certeza que deseja excluir este pet? Essa ação não poderá ser desfeita.",
                      [
                        {
                          text: "Cancelar",
                          onPress: () => console.log("Cancelado"),
                        },
                        {
                          text: "Excluir",
                          onPress: () => {
                            // Chame aqui sua função de exclusão
                            console.log("Pet excluído");
                          },
                        },
                      ],
                      { cancelable: true }
                    )
                  }
                >
                  <FontAwesome5 name="trash-alt" size={24} color="red" />
                </TouchableOpacity>
              </View>

              <Text className="text-gray-600 text-sm">
                {item.aboutPet}
              </Text>
            </View>


            <View className="flex-row justify-between mt-3 pl-1">
              <Text className="text-sm font-medium text-gray-700">
                {item.gender.nameGender} • {item.age.nameAge}
              </Text>

            </View>
          </Pressable>
        )}
      />
    </View>
  );
}