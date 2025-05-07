import { View, Text, Image, Pressable, StatusBar, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';
import { Context } from "../context/provider";
import { OneSignal, LogLevel } from 'react-native-onesignal';
import { GoogleSignin, isSuccessResponse } from '@react-native-google-signin/google-signin'
import AntDesign from '@expo/vector-icons/AntDesign';
import axios from "axios";
import keys from '../keys.json'

export default function SignIn() {
    const { setLocation, setToken, url } = useContext(Context)!
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
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

                    setLocation(address[0].region || 'Localização desconhecida')
                }
            } catch (error) {
                console.error(error)
            }


        }

        getCurrentLocation();
    }, []);

    useEffect(() => {
        OneSignal.initialize('9fc8ff2f-7de4-4274-809a-2ce822b6106e');
        OneSignal.Notifications.requestPermission(true);

    }, []);


    GoogleSignin.configure({
        webClientId: keys.googleWebClientId,
    })

    async function handleGoogleSignin() {
        try {
            await GoogleSignin.hasPlayServices()

            const response = await GoogleSignin.signIn()

            if (isSuccessResponse(response)) {
                const user = response.data.user;
                const result = await verifyEmailUser(user.email);
                if (result) {
                    const { exists, data } = result;
                    if (exists) {
                        // salvar os dados que vieram do backend
                       
                        const now = new Date()
                        const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
                        await SecureStore.setItemAsync('name', data.user.name ?? '');
                        await SecureStore.setItemAsync('email', data.user.email ?? '');
                        await SecureStore.setItemAsync('image', data.user.image ?? '');
                        await SecureStore.setItemAsync('number', data.user.number ?? '');
                        await SecureStore.setItemAsync('jwtToken', data.token ?? '');
                        await SecureStore.setItemAsync('expiresAt', expiresAt.toISOString())
                        router.push('/tabs/home');
                    } else {
                        // salvar os dados vindos do Google
                        await SecureStore.setItemAsync('name', user.name ?? '');
                        await SecureStore.setItemAsync('email', user.email ?? '');
                        await SecureStore.setItemAsync('image', user.photo ?? '');
                        router.push('/Pages/addNumber');
                    }
                }

            }
        } catch (error) {
            console.log(error)
        }
    }

    async function verifyEmailUser(email: string) {
        try {
            const response = await axios.get(`${url}/api/verifyuser/${email}`)
            if (response.status == 200) {
                return { exists: true, data: response.data };
            }
            return { exists: false };

        } catch (error: any) {
            if (error.response.status == 400) {
                return { exists: false };

            }
        }


    }

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
                    <Text>ou</Text>
                    <Pressable
                        onPress={handleGoogleSignin}
                        className="w-full p-6 flex-row items-center justify-center rounded"
                        style={{ backgroundColor: '#CCF4DC' }}

                    >
                        <Image
                            source={require('../../assets/images/icons/google.png')}
                            style={{ width: 35, height: 35, marginRight: 15 }}
                        />
                        <Text className="font-medium text-2xl">Entrar com Google</Text>
                    </Pressable>
                </View>
            </ScrollView>

        </KeyboardAvoidingView>
    );
}
