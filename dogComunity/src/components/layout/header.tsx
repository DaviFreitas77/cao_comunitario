import { View, Text } from "react-native";
import Avatar from "../avatar";
import { Context } from "@/src/context/provider";
import { useContext } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
export default function Header() {
  const { name } = useContext(Context)!;
  return (
    <View className="flex-row items-center w-full justify-between pt-4">
      <View className="flex-row gap-2 items-center">
        <Avatar />
        <Text className="text-xl text-gray-600">Olá, {name}</Text>
      </View>
      <View className="px-2">
        <Ionicons name="notifications-outline" size={24} color="black" />
      </View>
    </View>
  );
}
