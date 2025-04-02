import { View, Text, Image, Pressable, StatusBar, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import * as SecureStore from 'expo-secure-store'

export default function SignIn() {

    const router = useRouter();
    useEffect(() => {
        const checkLoggedIn = async () => {
            try {
                const logged = await SecureStore.getItemAsync('name');
                if (logged) {
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
