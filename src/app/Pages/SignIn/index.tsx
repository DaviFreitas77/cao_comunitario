import { View, Text, Image, Pressable, StatusBar, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from "expo-router";
import { useForm, Controller } from 'react-hook-form'
import * as SecureStore from 'expo-secure-store';
import axios from "axios";
import { useContext } from "react";
import { Context } from "@/src/context/provider";

export default function SignIn() {
    const context = useContext(Context)
    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }
    const { url, setLocation } = context
    const router = useRouter()
    const { control, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            email: '',
            password: ''
        }

    })

    const onSubmit = async (data: any) => {
        try {
            const response = await axios.post(`${url}/api/login`, data)
            if (response.status === 200) {
                await SecureStore.setItemAsync('jwtToken', response.data.token)
                await SecureStore.setItemAsync('name', response.data.user.name)
                await SecureStore.setItemAsync('image', response.data.user.image)
                await SecureStore.setItemAsync('email', response.data.user.email)
                await SecureStore.setItemAsync('number', response.data.user.number)
                setLocation(response.data.user.city)
                router.replace('/../tabs/home')
            } else {
                alert(response.data.message)
            }

        } catch (error) {
            console.log(error)

        }
    }

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


                    <Pressable
                        onPress={() => router.back()}
                        className="pl-5 pt-5"
                        style={{ backgroundColor: '#CCF4DC' }}
                    >
                        <FontAwesome name="arrow-left" size={24} color="#000" />
                    </Pressable>


                    <View className="flex-1 items-center justify-center mt-10">
                        <Image
                            source={require('../../../../assets/images/login/dog.png')}

                            resizeMode="contain"
                        />
                    </View>

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
                                source={require('../../../../assets/images/login/comunitario.png')}
                                style={{ width: 370, height: 120 }}
                            />
                        </View>

                        <View className='w-full'>

                            <Controller
                                control={control}
                                name='email'
                                rules={{ required: 'o email é obrigatório' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        placeholder="Email"
                                        className="w-full pl-3 p-5 rounded text-lg bg-white"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}

                                        style={{
                                            borderColor: errors.email ? 'red' : '#CCF4DC',
                                            borderWidth: 1,
                                        }}

                                    />
                                )}

                            />
                            {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
                        </View>




                        <View className="w-full">
                            <Controller
                                control={control}
                                name='password'
                                rules={{ required: 'a senha é obrigatória' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        placeholder="Senha"
                                        className="w-full pl-3 p-5 rounded text-lg bg-white"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        secureTextEntry
                                        style={{
                                            borderColor: errors.password ? 'red' : '#CCF4DC',
                                            borderWidth: 1,
                                        }}
                                    />
                                )}

                            />
                            {errors.password && <Text style={{ color: 'red' }}>{errors.password.message}</Text>}
                        </View>

                        <Pressable

                            onPress={handleSubmit(onSubmit)}
                            className="w-full p-6 flex items-center justify-center rounded"
                            style={{ backgroundColor: '#CCF4DC' }}

                        >
                            <Text className="font-medium text-2xl">Entrar</Text>
                        </Pressable>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
