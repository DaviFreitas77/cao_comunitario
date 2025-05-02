import { View, Text, Image, Pressable, StatusBar, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import { Context } from "../context/provider";
import { OneSignal, LogLevel } from 'react-native-onesignal';

export default function SignIn() {
    const context = useContext(Context)

    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }

    const { setLocation, setToken } = context
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        OneSignal.initialize('9fc8ff2f-7de4-4274-809a-2ce822b6106e');
        OneSignal.Notifications.requestPermission(true);

    }, []);


    useEffect(() => {
        async function getCurrentLocation() {
            try {
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Permissão não autorizada');
                    return;
                }
                let location = await Location.getCurrentPositionAsync({});
                let address = await Location.reverseGeocodeAsync(location.coords);
                if (address.length > 0) {
                    console.log(address[0].region);
                    setLocation(address[0].region || 'Localização desconhecida')
                }
            } catch (error) {
                console.error(error)
            }


        }

        getCurrentLocation();
    }, []);

    const router = useRouter();
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const expiresAtString = await SecureStore.getItemAsync('expiresAt');
                const token = await SecureStore.getItemAsync('jwtToken')

                if (!expiresAtString || !token) return false
                const now = new Date()
                const expiresAt = new Date(expiresAtString)

                if (now < expiresAt) {
                    setToken(token)
                    router.replace('/tabs/home');
                }

            } catch (error) {
                console.error('Erro ao verificar o token:', error);
            }
        };

        checkLoggedIn();
    }, [router]);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, backgroundColor: '#CCF4DC' }}
        >

            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <StatusBar barStyle="dark-content" backgroundColor="#CCF4DC" />

                <View className="flex-1 items-center justify-center mt-10">
                    <Image
                        source={require('../../assets/images/login/dog.png')}

                        resizeMode="contain"
                    />
                </View>

                <View
                    className="w-full flex items-center gap-6 p-8 rounded-tl-3xl rounded-tr-3xl h-1/2"
                    style={{
                        backgroundColor: "white",
                    }}
                >

                    <View className="flex items-center justify-center">
                        <Image
                            source={require('../../assets/images/login/comunitario.png')}
                            style={{ width: 370, height: 120 }}
                        />
                    </View>
                    <Pressable

                        onPress={() => router.push('/Pages/SignIn')}
                        className="w-full p-6 flex items-center justify-center rounded  mt-14"
                        style={{ backgroundColor: '#CCF4DC' }}

                    >
                        <Text className="font-medium text-2xl">Entrar</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => router.push('/Pages/SignUp')}
                        className="w-full p-6 flex items-center justify-center rounded"
                        style={{ backgroundColor: '#CCF4DC' }}
                    >
                        <Text className="font-medium text-2xl">Cadastrar</Text>
                    </Pressable>
                </View>
            </ScrollView>

        </KeyboardAvoidingView>
    );
}
