import { View, Text, Image, Pressable, StatusBar, TextInput, ScrollView, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, Switch } from "react-native";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { useForm, Controller } from 'react-hook-form'
import { Context } from "@/src/context/provider";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import { TextInputMask } from 'react-native-masked-text';

export default function SignUp() {
    const router = useRouter();
    const context = useContext(Context);
    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }

    const { setName, setEmail, setPassword, setNumber } = context;
    const [isEnabled, setIsEnable] = useState(false)



    const validationSchema = yup.object().shape({
        name: yup.string().min(4, "no minimo 4 caracteres").required("o nome é obrigatório"),
        email: yup.string().email('Email inválido').required('Email é obrigatório'),
        password: yup.string().min(8, 'A senha deve ter pelo menos 8 caracteres').required('Senha é obrigatória'),
        number: yup.string().min(12, "o numero deve conter no minímo 11 caracteres").required('o numero é obrigatório')
    })
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)

    })

    const onSubmit = (data: any) => {
        setName(data.name)
        setEmail(data.email)
        setNumber(data.number)
        setPassword(data.password)
        router.push('/Pages/registerPhotoUser')
    }



    const toggleSwitch = () => {
        setIsEnable(!isEnabled)
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
                            source={require('../../../../assets/images/login/dog.png')}

                            resizeMode="contain"
                        />
                    </View>

                    {/* Área do formulário */}
                    <View
                        className="w-full flex items-center gap-6 p-4 rounded-tl-3xl rounded-tr-3xl"
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
                                name='name'
                                rules={{ required: 'o nome é obrigatório' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                        placeholder="Nome"
                                        className="w-full pl-3 p-5 rounded text-lg bg-white"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        style={{
                                            borderColor: errors.name ? 'red' : '#CCF4DC',
                                            borderWidth: 1,
                                        }}
                                    />
                                )}
                            />
                            {errors.name && <Text style={{ color: "red" }}>{errors.name.message}</Text>}
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
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                        style={{
                                            borderColor: errors.email ? 'red' : '#CCF4DC',
                                            borderWidth: 1,
                                        }}
                                    />
                                )}
                            />
                            {errors.email && <Text style={{ color: 'red' }}>{errors.email.message}</Text>}
                        </View>


                        <View className='w-full'>
                            <Controller
                                control={control}
                                name='number'
                                rules={{ required: 'o número é obrigatório' }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInputMask
                                        type="custom"
                                        options={{
                                            mask: '99 99999-9999'
                                        }}
                                        placeholder="Número/whatsap"
                                        value={value}
                                        onBlur={onBlur}
                                        onChangeText={onChange}
                                        keyboardType="numeric"
                                        style={{
                                            width: '100%',
                                            paddingVertical: 20,
                                            paddingLeft: 15,
                                            backgroundColor: 'white',
                                            borderColor: errors.number ? 'red' : '#CCF4DC',
                                            borderWidth: 1,
                                            borderRadius: 5,
                                        }}
                                    />
                                )}
                            />
                            {errors.number && <Text style={{ color: 'red' }}>{errors.number.message}</Text>}
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

                            <View className="flex-row items-center">
                                <Switch
                                    trackColor={{ false: '#767577', true: 'green' }}
                                    thumbColor={isEnabled ? 'green' : '#ccc'}
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                                <Link className="text-cyan-600" href="/Pages/PrivacyPolicy">Politicas e privacidade</Link>
                            </View>
                        </View>



                        <Pressable
                            onPress={isEnabled ? handleSubmit(onSubmit) : null}
                            className="w-full p-6 flex items-center justify-center rounded"
                            style={{ backgroundColor: '#CCF4DC' }}

                        >
                            <Text className="font-medium text-2xl">Próximo</Text>
                        </Pressable>

                    </View>

                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
