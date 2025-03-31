import { View, Text, Image,Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function RegisterPhoto() {
    const router = useRouter();
    return (
        <View className="flex-1 items-center justify-evenly p-4">

            <View className="w-full flex justify-center items-center">
            <Text className="text-3xl">Olá Davi,escolha sua foto antes de começar.</Text>
                <Image
                    source={require('../../../../assets/images/login/user.png')}
                    style={{ width: 200, height: 200 }}
                    className="mt-8"
                    
                />
            </View>

            <View className="w-full">
                <Pressable
                    // onPress={() => router.push('/Pages/SignUp')}
                    className="w-full p-6 flex items-center justify-center rounded"
                    style={{ backgroundColor: '#CCF4DC' }}
                >
                    <Text className="font-medium text-2xl">cadastrar</Text>
                </Pressable>
            </View>
        </View>
    )
}