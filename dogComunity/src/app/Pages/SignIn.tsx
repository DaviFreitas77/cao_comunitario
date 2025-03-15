import { View, Text, Image, Pressable, StatusBar, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from "expo-router";
import { useState } from "react";

export default function SignIn() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const router = useRouter();

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1, backgroundColor: '#CCF4DC' }}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <StatusBar barStyle="dark-content" backgroundColor="#CCF4DC" />

                    {/* Botão de voltar */}
                    <Pressable
                        onPress={() => router.back()}
                        className="pl-5 pt-5"
                        style={{ backgroundColor: '#CCF4DC' }}
                    >
                        <FontAwesome name="arrow-left" size={24} color="#000" />
                    </Pressable>


                    <View className="flex-1 items-center justify-center mt-10">
                        <Image
                            source={require('../../../assets/images/login/dog.png')}

                            resizeMode="contain"
                        />
                    </View>

                    {/* Área do formulário */}
                    <View
                        className="w-full flex items-center gap-6 p-8 rounded-tl-3xl rounded-tr-3xl"
                        style={{
                            backgroundColor: "white",
                            shadowColor: "#000",
                            shadowOffset: { width: 0, height: 5 },
                            shadowOpacity: 0.2,
                            shadowRadius: 10,
                            elevation: 5,
                            paddingBottom: 30,
                        }}
                    >

                        <View className="flex items-center justify-center">
                            <Image
                                source={require('../../../assets/images/login/comunitario.png')}
                                style={{ width: 370, height: 120 }}
                            />
                        </View>


                        <TextInput
                            placeholder="Email"
                            className="w-full pl-3 p-5 rounded text-lg bg-white"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            style={{
                                borderColor: '#CCF4DC',
                                borderWidth: 1,
                            }}
                        />


                        <TextInput
                            placeholder="Senha"
                            className="w-full pl-3 p-5 rounded text-lg bg-white"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            style={{
                                borderColor: '#CCF4DC',
                                borderWidth: 1,
                            }}
                        />


                        <Pressable
                            className="w-full p-6 flex items-center justify-center rounded"
                            style={{ backgroundColor: '#CCF4DC' }}
                            onPress={() => console.log("Login pressionado")}
                        >
                            <Text className="font-medium text-2xl">Entrar</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
