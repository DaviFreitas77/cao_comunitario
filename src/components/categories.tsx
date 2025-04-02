import { View, Text, Image, TouchableOpacity } from "react-native";

export default function Categories() {
    return (
        <View className="flex-row gap-4 w-full p-4">
        
            <TouchableOpacity 
                style={{ backgroundColor: "#D9D9D9"}}
                className="flex-row items-center gap-4 p-4 w-1/2 rounded-xl shadow-md">
                <Image 
                    source={require('../../assets/images/home/cat.jpg')}
                    className="w-16 h-16 rounded-full"
                />
                <Text className="text-lg font-semibold text-gray-700">Gatos</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={{ backgroundColor: "#D9D9D9" }} 
                className="flex-row items-center gap-4 p-4 w-1/2 rounded-xl shadow-md">
                <Image 
                    source={require('../../assets/images/home/cat.jpg')}
                    className="w-16 h-16 rounded-full"
                />
                <Text className="text-lg font-semibold text-gray-700">Cachorros</Text>
            </TouchableOpacity>
        </View>
    );
}
