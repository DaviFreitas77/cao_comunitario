import { View, Text, Image, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { loadType } from "../api/petService";
export default function Categories() {

    const { types, isLoading, error } = loadType()
    if (isLoading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={{ marginTop: 28, gap: 10 }}>
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
                            style={{ backgroundColor: "#D9D9D9" }}
                            className="flex-row items-center gap-2 p-3 w-36 h-20 ml-2 rounded-xl shadow-md"
                        >
                            <Image
                                source={require('../../assets/images/home/cat.jpg')}
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
