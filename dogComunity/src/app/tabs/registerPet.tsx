import { View, Text, ImageBackground, TextInput, Pressable, FlatList, TouchableOpacity, Image } from "react-native";
import { useContext, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import * as ImagePicker from 'expo-image-picker';
import { storage } from "@/src/service/conexaoFirebase";
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { loadAge, loadCare, loadGender, loadTemperament, loadType } from "@/src/api/petService";
import axios from "axios";
import { Context } from "@/src/context/provider";
import { router, useRouter } from "expo-router";


interface FormData {
    name: string;
}


export default function RegisterPet() {
    const router = useRouter()

    const context = useContext(Context)

    if (!context) {
        throw new Error("Contexto não foi fornecido. Certifique-se de que o componente está dentro de um Context.Provider.");
    }
    const { url, token, location } = context

    const { genders, isLoading, error } = loadGender();
    const { types, isLoading: isLoadingTypes, error: errorTypes } = loadType();
    const { ages, isLoading: isLoadingAges, error: errorAges } = loadAge();
    const { cares, isLoading: isLoadingCares, error: errorCares } = loadCare();
    const { temperaments, isLoading: isLoadingTemperaments, error: errorTemperaments } = loadTemperament()

    const [step, setStep] = useState(0)
    const [selectedGender, setSelectedGender] = useState<number | null>(null)
    const [selectedType, setSelectedType] = useState<number | null>(null)
    const [selectedAge, setSelectedAge] = useState<number | null>(null)
    const [selectedCares, setSelectedCares] = useState<number[]>([]);
    const [selectedTemperaments, setSelectedTemperaments] = useState<number[]>([])
    const [image, setImage] = useState<string | null>(null)
    const [about, setAbout] = useState<string>('')


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

    const captureCare = (id: number) => {
        if (selectedCares.includes(id)) {
            // Se já estiver na lista, remove
            setSelectedCares(selectedCares.filter(careId => careId !== id));
        } else {
            // Se não estiver, adiciona
            setSelectedCares([...selectedCares, id]);
        }
    };

    const captureTemperament = (id: number) => {
        if (selectedTemperaments.includes(id)) {
            setSelectedTemperaments(selectedTemperaments.filter(tempId => tempId !== id))
        } else {
            setSelectedTemperaments([...selectedTemperaments, id])
        }
    }

    function avancedStep() {
        setStep(prev => prev + 1);
    }
    const validationSchema = yup.object().shape({
        name: yup.string().max(10, "no máximo 10 caracteres").required("o nome é obrigatório"),

    });
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(validationSchema)
    })


    const onSubmit = async (data: FormData) => {
        if (step < 6) {
            avancedStep();
            return;
        }

        try {
    
            const response = await axios.post(`${url}/api/pets`, {
                namePet: data.name,
                typePet: selectedType,
                aboutPet: about,
                imagePet: image,
                genderPet: selectedGender,
                agePet: selectedAge,
                fkTemperament: selectedTemperaments,
                fkCare: selectedCares,
                city: location
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const datax = response.data;
            setSelectedType(null)
            setSelectedCares([])
            setSelectedTemperaments([])
            setImage(null)
            setSelectedGender(null)
            setSelectedAge(null)
            setStep(0)
            router.replace('/../tabs/home')
          


        } catch (error) {
            console.error("Erro ao enviar dados do pet:", error);
        }
    };


    return (
        <ImageBackground
            source={require('../../../assets/images/cadastroPet/fundoPet.png')}
            className="flex-1 p-4 justify-center"
        >

            {step === 0 && (
                <View
                    style={{ flex: .8 }}
                    className="items-center  gap-12">
                    <Text className="text-3xl"> Qual o nome do seu pet?</Text>

                    <View className="w-full gap-2">
                        <Controller
                            control={control}
                            name="name"
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                    className="border-b-2 w-full"
                                    placeholder="Nome do Pet"
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                    value={value}
                                />
                            )}
                        />
                        {errors.name && (
                            <Text style={{ color: "red" }}>{errors.name.message}</Text>
                        )}
                    </View>


                    <Pressable
                        onPress={handleSubmit(onSubmit)}
                        className="bg-[#FFB800] w-full h-12 rounded-full items-center justify-center"
                    >
                        <Text className="text-lg">Próximo</Text>
                    </Pressable>
                </View>
            )}


            {step === 1 && (
                <View
                    style={{ flex: .8 }}
                    className="items-center  gap-12">
                    <Text className="text-3xl"> Seu pet é?</Text>
                    {genders.length > 0 && (
                        <FlatList
                            horizontal
                            data={genders}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => setSelectedGender(item.id)}
                                    style={{ backgroundColor: selectedGender === item.id ? "#CCF4DC" : "#FFB800", borderWidth: selectedGender === item.id ? 1 : 0 }}
                                    className="m-7  w-36 h-36 rounded-full items-center justify-center">
                                    <Text>{item.nameGender}</Text>
                                </Pressable>
                            )}
                        />
                    )}
                    {selectedGender ? (
                        <Pressable
                            onPress={handleSubmit(onSubmit)}
                            className="bg-[#FFB800] w-full h-12 rounded-full items-center justify-center"
                        >
                            <Text className="text-lg">Próximo</Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            disabled
                            onPress={handleSubmit(onSubmit)}
                            className="bg-[#cccc] w-full h-12 rounded-full items-center justify-center"
                        >
                            <Text className="text-lg">Próximo</Text>
                        </Pressable>
                    )}

                </View>
            )}
            {step === 2 && (
                <View
                    style={{ flex: .8 }}
                    className="items-center  gap-12">
                    <Text className="text-3xl"> O que é seu pet?</Text>
                    {types.length > 0 && (
                        <FlatList
                            horizontal
                            data={types}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => setSelectedType(item.id)}
                                    style={{ backgroundColor: selectedType === item.id ? "#CCF4DC" : "#FFB800", borderWidth: selectedType === item.id ? 1 : 0 }}
                                    className="m-7  w-36 h-36 rounded-full items-center justify-center">
                                    <Text>{item.nameType}</Text>
                                </Pressable>
                            )}
                        />
                    )}
                    {selectedType ? (
                        <Pressable
                            onPress={handleSubmit(onSubmit)}
                            className="bg-[#FFB800] w-full h-12 rounded-full items-center justify-center"
                        >
                            <Text className="text-lg">Próximo</Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            disabled
                            onPress={handleSubmit(onSubmit)}
                            className="bg-[#cccc] w-full h-12 rounded-full items-center justify-center"
                        >
                            <Text className="text-lg">Próximo</Text>
                        </Pressable>
                    )}

                </View>
            )}
            {step === 3 && (
                <View
                    style={{ flex: .8 }}
                    className="items-center  gap-12">
                    <Text className="text-3xl"> qual a idade do seu pet?</Text>
                    {ages.length > 0 && (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            columnWrapperStyle={{ justifyContent: 'space-around' }}
                            data={ages}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => setSelectedAge(item.id)}
                                    style={{ backgroundColor: selectedAge === item.id ? "#CCF4DC" : "#FFB800", borderWidth: selectedAge === item.id ? 1 : 0 }}
                                    className="m-7  w-36 h-36 rounded-full items-center justify-center">
                                    <Text>{item.nameAge}</Text>
                                </Pressable>
                            )}
                        />
                    )}
                    {selectedAge ? (
                        <Pressable
                            onPress={handleSubmit(onSubmit)}
                            className="bg-[#FFB800] w-full h-12 rounded-full items-center justify-center"
                        >
                            <Text className="text-lg">Próximo</Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            disabled
                            onPress={handleSubmit(onSubmit)}
                            className="bg-[#cccc] w-full h-12 rounded-full items-center justify-center"
                        >
                            <Text className="text-lg">Próximo</Text>
                        </Pressable>
                    )}

                </View>
            )}
            {step === 4 && (
                <View
                    style={{ flex: .8 }}
                    className="items-center  gap-12">
                    <Text className="text-3xl"> selecione os cuidados</Text>
                    {cares.length > 0 && (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            data={cares}
                            keyExtractor={(item) => item.id.toString()}
                            className="w-full"
                            columnWrapperStyle={{ justifyContent: 'space-around' }}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => captureCare(item.id)}
                                    style={{
                                        backgroundColor: selectedCares.includes(item.id) ? "#CCF4DC" : "#FFB800",
                                        borderWidth: selectedCares.includes(item.id) ? 1 : 0,
                                    }}
                                    className="m-7  w-36 h-36 rounded-full items-center justify-center"
                                >
                                    <Text>{item.nameCare}</Text>
                                </Pressable>
                            )}
                        />
                    )}
                    {selectedCares.length > 0 ? (
                        <Pressable
                            onPress={handleSubmit(onSubmit)}
                            className="bg-[#FFB800] w-full h-12 rounded-full items-center justify-center"
                        >
                            <Text className="text-lg">Próximo</Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            disabled
                            onPress={handleSubmit(onSubmit)}
                            className="bg-[#cccc] w-full h-12 rounded-full items-center justify-center"
                        >
                            <Text className="text-lg">Próximo</Text>
                        </Pressable>
                    )}

                </View>
            )}
            {step === 5 && (
                <View
                    style={{ flex: .8 }}
                    className="items-center  gap-12">
                    <Text className="text-3xl"> selecione os cuidados</Text>
                    {temperaments.length > 0 && (
                        <FlatList
                            showsVerticalScrollIndicator={false}
                            numColumns={2}
                            data={temperaments}
                            keyExtractor={(item) => item.id.toString()}
                            className="w-full"
                            columnWrapperStyle={{ justifyContent: 'space-around' }}
                            renderItem={({ item }) => (
                                <Pressable
                                    onPress={() => captureTemperament(item.id)}
                                    style={{
                                        backgroundColor: selectedTemperaments.includes(item.id) ? "#CCF4DC" : "#FFB800",
                                        borderWidth: selectedTemperaments.includes(item.id) ? 1 : 0,
                                    }}
                                    className="m-7  w-36 h-36 rounded-full items-center justify-center"
                                >
                                    <Text>{item.nameTemperament}</Text>
                                </Pressable>
                            )}
                        />
                    )}
                    {selectedTemperaments.length > 0 ? (
                        <Pressable
                            onPress={handleSubmit(onSubmit)}
                            className="bg-[#FFB800] w-full h-12 rounded-full items-center justify-center"
                        >
                            <Text className="text-lg">Próximo</Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            disabled
                            onPress={handleSubmit(onSubmit)}
                            className="bg-[#cccc] w-full h-12 rounded-full items-center justify-center"
                        >
                            <Text className="text-lg">Próximo</Text>
                        </Pressable>
                    )}

                </View>
            )}
            {step === 6 && (
                <View
                    style={{ flex: .8 }}
                    className="items-center  gap-12">
                    <Text className="text-3xl"> escolha a foto </Text>
                    <TouchableOpacity
                        onPress={pickImage}
                    >
                        {image ? (
                            <Image
                                source={{ uri: image }}
                                style={{ width: 200, height: 200, borderRadius: 100 }}
                            />
                        ) : (
                            <Image
                                source={require('../../../assets/images/login/user.png')}
                                style={{ width: 200, height: 200 }}
                            />
                        )}
                    </TouchableOpacity>

                    <TextInput
                        className="border-b-2 w-full"
                        placeholder="escreva sobre o bichinho ou deixe em branco"
                        onChangeText={(txt) => setAbout(txt)}
                        value={about}

                    />




                    {image ? (
                        <Pressable
                            onPress={handleSubmit(onSubmit)}
                            className="bg-[#FFB800] w-full h-12 rounded-full items-center justify-center"
                        >
                            <Text className="text-lg">Próximo</Text>
                        </Pressable>
                    ) : (
                        <Pressable
                            disabled
                            onPress={handleSubmit(onSubmit)}
                            className="bg-[#cccc] w-full h-12 rounded-full items-center justify-center"
                        >
                            <Text className="text-lg">Próximo</Text>
                        </Pressable>
                    )}

                </View>
            )}

        </ImageBackground>
    )
}