import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { loadType } from "../api/petService";
import { useState } from "react";
import Ionicons from '@expo/vector-icons/Ionicons';
// Definindo a interface para as propriedades do componente
interface CategoriesProps {
  setSelectedType: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Categories({ setSelectedType }: CategoriesProps) {
  const [buttonFilter, setButtonFilter] = useState<string | null>(null);
  const { types, isLoading } = loadType();
  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View className="mt-4">

      {types ? (
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={types}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setButtonFilter(item.nameType);
                setSelectedType(item.nameType);
              }}
              className={` flex-row items-center gap-2 p-3 w-52 h-20 mr-2 rounded-xl mt-3 ${buttonFilter === item.nameType ? "bg-[#CCF4DC]" : "bg-[var(--color-primary-100)]"}`}
              
            >
              <Image
                source={{ uri: item.imageType }}
                className="w-12 h-12 rounded-full"
              />
              <Text className="text-base font-semibold text-gray-700">
                {item.nameType}
              </Text>
            </TouchableOpacity>
          )}
        />
      ) : (
        <Text>nenhuma categoria encontrada</Text>
      )}
    </View>
  );
}
