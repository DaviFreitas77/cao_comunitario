import { View, Text, Image, Pressable, Animated, TouchableOpacity, BackHandler, Alert, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";
import { useContext, useRef, useEffect, useState } from "react";
import { Context } from "@/src/context/provider";
import { storage } from "@/src/service/conexaoFirebase";
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios'
import * as SecureStore from 'expo-secure-store';
import * as Location from 'expo-location';

export default function RegisterPhoto() {
    const context = useContext(Context);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [loading, setLoading] = useState(false)
    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }

    const { name, email, password, number, url, location, setLocation } = context;


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
                setLocation(address[0].region || 'Localização desconhecida');
            }
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        if (!location) {
            getCurrentLocation();
        }
    }, [location]);

    const router = useRouter();
    const opacity = useRef(new Animated.Value(0)).current;
    const [image, setImage] = useState<string | null>(null);

    const requestPermission = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (status !== 'granted') {
            // Se a permissão não for concedida, exibe um alerta e fecha o app
            Alert.alert(
                'Permissão necessária',
                'Precisamos da permissão para acessar suas fotos para que você possa escolher uma foto de perfil.',
                [{
                    text: 'OK',
                    onPress: () => BackHandler.exitApp(),
                }]
            );
        } else {
            pickImage();
        }
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const url = await uploadImage(result.assets[0].uri);
            setImage(url);
        }
    };

    const uploadImage = async (uri: any) => {
        try {
            const filename = uri.split('/').pop();
            const storageRef = ref(storage, `images/${filename}`);

            const response = await fetch(uri);
            if (!response.ok) throw new Error('Falha ao buscar imagem');
            const blob = await response.blob();

            // Faz o upload da imagem para o Firebase Storage
            await uploadBytes(storageRef, blob);

            const url = await getDownloadURL(storageRef);
            return url;
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);
            return null;
        }
    };

    const registerUser = async () => {
        setLoading(true)
        try {
            if (!location) {
                alert("precisamos da sua localização para continuar")
                getCurrentLocation()
            }
            const response = await axios.post(`${url}/api/users`, {
                name,
                email,
                password,
                number,
                image,
                city: location
            });


            await saveToken(response.data.token, response.data.user.name, response.data.user.number, response.data.user.image, response.data.user.email)
            router.replace('/tabs/home')
        } catch (error) {
            console.error('erro', error);
        } finally {
            setLoading(false)
        }
    };

    const saveToken = async (token: string, name: string, number: string, image: string, email: string) => {
        try {
            await SecureStore.setItemAsync('jwtToken', token)
            await SecureStore.setItemAsync('name', name)
            await SecureStore.setItemAsync('number', number)
            await SecureStore.setItemAsync('image', image)
            await SecureStore.setItemAsync('email', email)
        } catch (error) {
            console.error('Erro ao salvar token de forma segura:', error);
        }
    }

    useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    return (
        <View className="flex-1 items-center justify-evenly p-4">

            <Animated.View style={{ opacity }}>
                <Text style={{ fontSize: 24 }}>
                    Olá {name}, escolha sua foto antes de começar.
                </Text>
            </Animated.View>



            <TouchableOpacity
                style={{ opacity }}
                onPress={requestPermission}
                className="relative mt-8">
                {image ? (
                    <Image
                        source={{ uri: image }}
                        style={{ width: 200, height: 200, borderRadius: 100 }}
                    />
                ) : (
                    <Image
                        source={require('../../../../assets/images/login/user.png')}
                        style={{ width: 200, height: 200 }}
                    />
                )}
                <Image
                    source={require('../../../../assets/images/icons/cam.png')}
                    className="absolute left-40 top-5"
                />
            </TouchableOpacity>



            {image ? (
                <Animated.View style={{ opacity }} className="w-full">

                    <Pressable
                        onPress={registerUser}
                        className="w-full p-6 flex items-center justify-center rounded"
                        style={{ backgroundColor: '#CCF4DC' }}
                    >
                        <Text className="font-medium text-2xl">cadastrar</Text>
                    </Pressable>
                </Animated.View>
            ) : (
                <Animated.View style={{ opacity }} className="w-full">

                    <Pressable
                        disabled
                        onPress={registerUser}
                        className="w-full p-6 flex items-center justify-center rounded"
                        style={{ backgroundColor: '#cccc' }}
                    >
                        <Text className="font-medium text-2xl">cadastrar</Text>
                    </Pressable>
                </Animated.View>
            )}

        </View>
    );
}
