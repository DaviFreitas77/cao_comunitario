import { Text, View,Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
export default function InfoPet(){
    const { id } = useLocalSearchParams();
    console.log(id)
   

    return(
        <View className="flex-1 bg-white">
        <Text>infoPet</Text>
      </View>
    )
}