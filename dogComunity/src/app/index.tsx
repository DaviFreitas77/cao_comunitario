import { useNavigation, useRouter } from "expo-router";
import { Text, View, Image, Pressable, StatusBar } from "react-native";

export default function Start() {
    const router = useRouter();

    return (
        <View >
            <StatusBar
                barStyle="dark-content"
                backgroundColor="#CCF4DC"
            />
            <View className="h-3/5 flex items-center justify-end"
                style={{
                    backgroundColor: '#CCF4DC',
                    borderBottomLeftRadius: 80,
                    borderBottomRightRadius: 80
                }}  >
                <Image
                    source={require('../../assets/images/login/dog.png')}
                    className="h-full"
                />
            </View>
            <View className="flex items-center justify-center mt-5">
                <Image
                    source={require('../../assets/images/login/comunitario.png')}
                    style={{ width: 370, height: 120 }}
                />
            </View>

            <View className="flex items-center justify-center mt-5 gap-6 p-8">
                <Pressable
                    onPress={() => router.push("/Pages/SignIn")}
                    className="w-full p-6 flex items-center justify-center rounded"
                    style={{ backgroundColor: '#CCF4DC', }}
                >
                    <Text className="font-medium text-2xl">Entrar</Text>
                </Pressable>
                <Pressable
                onPress={() => router.push("/Pages/SignUp")}
                    className="w-full p-6 flex items-center justify-center rounded"
                    style={{ backgroundColor: '#CCF4DC', }}
                >
                    <Text className="font-medium text-2xl">Cadastrar</Text>
                </Pressable>
            </View>
        </View>
    );
}
