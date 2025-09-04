import { View, Image,Pressable} from "react-native";
import { useContext } from "react";
import { Context } from "../context/provider";

export default function Avatar() {
  const context = useContext(Context);
  if (!context) {
    throw new Error(
      "Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider."
    );
  }
  const { image} = context;


  return (
    <View className="w-3/12 items-end">
      <Pressable>
        <Image source={{ uri: image }} className="w-16 h-16 rounded-full" />
      </Pressable>
    </View>
  );
}
