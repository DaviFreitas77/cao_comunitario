import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { loadType } from "../api/petService";
import { useState } from "react";

// Definindo a interface para as propriedades do componente
interface CategoriesProps {
    setSelectedType: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function Categories({ setSelectedType }: CategoriesProps) {
    const [buttonFilter, setButtonFilter] = useState<string | null>(null);
    const { types, isLoading, error } = loadType()
    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }




    return (
        <View

            style={{ marginTop: 28, gap: 10 }}>
            <View className="flex-row items-center gap-2">
                <Text className="text-2xl font-bold text-gray-800">
                    Escolha o que você quer
                </Text>
                <Text><MaterialIcons name="pets" size={24} color="black" /></Text>
            </View>

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
                            style={{
                                backgroundColor: buttonFilter === item.nameType ? "#CCF4DC" : "#D9D9D9",
                            }}
                            className="flex-row items-center gap-2 p-3 w-52 h-20 ml-2 rounded-xl shadow-md"
                        >
                            <Image
                                source={{ uri: item.imageType }}
                                className="w-12 h-12 rounded-full"
                            />
                            <Text className="text-base font-semibold text-gray-700">{item.nameType}</Text>
                        </TouchableOpacity>

                    )}

                />
            ) : (
                <Text>
                    nenhuma categoria encontrada
                </Text>
            )}




        </View>
    );
}
