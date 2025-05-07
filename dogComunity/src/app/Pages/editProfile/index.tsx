import { View, Image, Text, TextInput, Pressable, TouchableOpacity } from "react-native"
import { useContext, useState } from "react";
import { Context } from "@/src/context/provider";
import axios from "axios";
import { showToast } from "@/src/components/toast";
import * as SecureStore from 'expo-secure-store';
import { TextInputMask } from 'react-native-masked-text';
import { storage } from "@/src/service/conexaoFirebase";
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import * as ImagePicker from 'expo-image-picker';
export default function EditProfile() {

    const { url, image, email, name, number, token, setImage, setName, setNumber } = useContext(Context)!
    console.log(number)

    const [editName, setEditName] = useState(false)
    const [editNumber, setEditNumber] = useState(false)
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [newImage, setNewImage] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const url = await uploadImage(result.assets[0].uri);
            if (url) {
                setNewImage(url);
                updateImageProfile()
            }
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
            return url
        } catch (error) {
            console.error('Erro ao fazer upload da imagem:', error);
            return null;
        }
    };

    const updateImageProfile = async () => {
        try {
            const response = await axios.put(`${url}/api/users`, {
                image: newImage,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })


            if (response.status == 200) {
                showToast(response.data.message, 'success')
                updateSecureExpo(newName, newNumber, newImage || '')
                setImage(newImage || '')
                setNewImage('')
            }
        } catch (error: any) {
            showToast(error.response?.data?.message, 'error');

        }
    }

    const updateProfile = async () => {
        try {
            const response = await axios.put(`${url}/api/users`, {
                name: newName ? newName : null,
                number: newNumber ? newNumber : null,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (response.status == 200) {
                showToast(response.data.message, 'success')
                setName(newName)
                setNumber(newNumber)
                setEditName(false);
                setEditNumber(false);
                setNewName('');
                setNewNumber('');
                updateSecureExpo(newName, newNumber, newImage || '')

            }
        } catch (error: any) {
            showToast(error.response?.data?.message, 'error');

        }

    }

    const updateSecureExpo = async (newName: string, newNumber: string, newImage: string) => {
        try {
            await SecureStore.setItemAsync('name', newName ? newName : name)
            await SecureStore.setItemAsync('number', newNumber ? newNumber : number)
            await SecureStore.setItemAsync('image', newImage ? newImage : image)
        } catch (error) {
            console.error("Erro ao atualizar SecureStore:", error);
        }

    }


    return (
        <View className="p-4">
            <View className="flex-row items-center mt-10 mb-5 gap-4">
                <TouchableOpacity onPress={pickImage}>
                    <Image
                        source={{ uri: image }}
                        className="w-20 h-20 rounded-full border-2 border-green-500"
                    />
                </TouchableOpacity>
                <View className="">
                    <Text className="text-lg font-bold">
                        {name}
                    </Text>

                    <Text className="text-gray-500">
                        {email}
                    </Text>
                </View>
            </View>
            <View>

                <Pressable
                    className="border border-gray-300 rounded-lg p-2 mt-2">
                    <Text style={{ fontSize: 8, fontWeight: "bold" }}>Email</Text>
                    <Text className="text-lg text-gray-500">{email}</Text>
                </Pressable>
            </View>

            <View>
                {editName == true ? (
                    <TextInput

                        placeholder="digite seu novo nome"
                        onChangeText={(txt) => setNewName(txt)}
                        value={newName}
                        style={{
                            width: '100%',
                            paddingVertical: 20,
                            paddingLeft: 15,
                            backgroundColor: 'white',
                            marginTop: 2,
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                    />
                ) : (
                    <Pressable
                        onPress={() => setEditName(true)}
                        className="border border-gray-300 rounded-lg p-2 mt-2">
                        <Text style={{ fontSize: 8, fontWeight: "bold" }}>Nome</Text>
                        <Text className="text-lg">{name}</Text>
                    </Pressable>
                )}



            </View>
            <View>
                {editNumber == true ? (

                    <TextInputMask
                        type="custom"
                        options={{ mask: '99 99999-9999' }}
                        keyboardType="numeric"
                        placeholder="digite seu novo número"
                        onChangeText={(txt) => setNewNumber(txt)}
                        value={newNumber}
                        style={{
                            width: '100%',
                            paddingVertical: 20,
                            paddingLeft: 15,
                            backgroundColor: 'white',
                            marginTop: 2,
                            borderWidth: 1,
                            borderRadius: 5,
                        }}
                    />
                ) : (
                    <Pressable
                        onPress={() => setEditNumber(true)}
                        className="border border-gray-300 rounded-lg p-2 mt-2">
                        <Text style={{ fontSize: 8, fontWeight: "bold" }}>Número</Text>
                        <Text className="text-lg">{number}</Text>
                    </Pressable>
                )}



            </View>


            <View
                className="justify-end mt-10 mb-5">
                <Pressable
                    onPress={updateProfile}
                    className="w-full p-3 flex items-center justify-center rounded"
                    style={{ backgroundColor: '#CCF4DC' }}
                >
                    <Text className="text-2xl">Salvar alterações</Text>
                </Pressable>
            </View>

        </View>
    )
}