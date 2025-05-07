import { useContext, useEffect, useRef, useState } from "react";
import { View, Text, Pressable } from "react-native";
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup'
import { Animated } from "react-native";
import { showToast } from "@/src/components/toast";
import { TextInputMask } from 'react-native-masked-text';
import axios from "axios";
import { Context } from "@/src/context/provider";
import * as SecureStore from 'expo-secure-store';
import { useRouter } from "expo-router";
export default function AddNumber() {
    const router = useRouter()
    const { url, location } = useContext(Context)!
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);
    const opacity = useRef(new Animated.Value(0)).current;

    const validationSchema = yup.object().shape({
        number: yup.string().required('o numero é obrigatório').min(12, "o numero deve conter 11 caractéres")
    })
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema)
    })


    const onSubmit = async (data: any) => {
        const name = await SecureStore.getItemAsync('name')
        const email = await SecureStore.getItemAsync('email')
        const image = await SecureStore.getItemAsync('image')
        setLoading(true)
        try {
            const response = await axios.post(`${url}/api/users`, {
                name,
                email,
                password: '1234',
                number: data.number,
                image,
                city: location

            });
            const now = new Date()
            const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)
            const token = (response.data.token)
            await SecureStore.setItemAsync('jwtToken', token)
            await SecureStore.setItemAsync('number', data.number)
            await SecureStore.setItemAsync('expiresAt', expiresAt.toISOString())

            router.replace('/tabs/home')

        } catch (error: any) {
            if (error.response) {
                showToast(error.response.data, 'error');
                router.replace('./SignUp')
            } else if (error.request) {
                console.log("Sem resposta do servidor:", error.request);
            } else {
                console.log("Erro desconhecido:", error.message);
            }
        } finally {
            setLoading(false)
        }
    };

    return (
        <View className="flex-1 items-center px-2 ">
            <Animated.View style={{ opacity }}>
                <Text className="text-4xl mt-36">Adicione seu numero de telefone</Text>
            </Animated.View>

            <Animated.View className='w-full mt-12' style={{ opacity }}>
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
                            placeholder="ex: 11 99999-9999"
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
            </Animated.View>
            <Pressable
                onPress={handleSubmit(onSubmit)}
                className="w-full p-6 flex items-center justify-center rounded mt-36 absolute bottom-4"
                style={{ backgroundColor: '#CCF4DC' }}

            >
                <Text className="font-medium text-2xl">Próximo</Text>
            </Pressable>
        </View>
    )
}