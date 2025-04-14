import { Text, View, Image, ScrollView, Pressable, StatusBar } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { loadIdPet } from "@/src/api/petService";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function InfoPet() {
  const { id } = useLocalSearchParams();
  const idPet = parseInt(`${id}`);
  const { pet, isLoading, error } = loadIdPet(idPet);

  if (isLoading) return <Text className="p-4 text-xl">Carregando...</Text>;
  if (error) return <Text className="p-4 text-xl text-red-500">Erro ao carregar dados</Text>;

  return (
    <View className="flex-1 bg-white">
      <Image
        source={{ uri: pet.imagePet }}
        className="w-full h-1/2"
        resizeMode="cover"
      />

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
                className="text-base font-medium text-center bg-[#CCF4DC] p-4 rounded-2xl w-[45%]"
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
                className="text-base font-medium text-center bg-[#CCF4DC] p-4 rounded-2xl w-[45%]"
              >
                {t.descCares.nameCare}
              </Text>
            ))}
          </View>
        </View>
        {/* Sobre o pet*/}
        <View className="p-4 ">
          <Text className="text-2xl font-medium mb-2">um pouco sobre {pet.namePet}</Text>
          <Text>Esse é um gatinho encantador, cheio de charme e personalidade. Com um olhar curioso e um jeitinho carinhoso, ele adora explorar cantinhos da casa e tirar longas sonecas ao sol. Perfeito para quem busca um companheiro tranquilo, amoroso e cheio de afeto para compartilhar os dias.</Text>
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

          <Pressable className=" p-6 flex items-center justify-center rounded bg-[#CCF4DC]">
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
