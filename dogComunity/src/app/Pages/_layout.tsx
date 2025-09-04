// app/Pages/_layout.tsx
import Ionicons from "@expo/vector-icons/Ionicons";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Router } from "expo-router";

export default function PagesLayout() {
  const router = useRouter()
  return (
    <Stack>
      <Stack.Screen
        name="MyPets/index"
        options={{
          title: "Meus pets em adoção",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="infoPet/index"
        options={{
          title: "Sobre o pet",
          headerShown: true,
          headerStyle:{
            backgroundColor:"#CCF4DC",
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ marginRight:10 }}>
              <Ionicons name="arrow-back" size={24} color="black" />
            </TouchableOpacity>
          ),

        }}
      />
      <Stack.Screen
        name="aboutUs/index"
        options={{
          title: "Sobre nós",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="editProfile/index"
        options={{
          title: "Perfil",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="SignIn/index"
        options={{
          headerShown: true,
          title:"",
          headerStyle:{
            backgroundColor:"#CCF4DC",
          
          },
        
        }}
      />
      <Stack.Screen
        name="SignUp/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="registerPhotoUser/index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy/index"
        options={{
          headerShown: true,
          title:"Políticas de privacidade"
        }}
      />
       <Stack.Screen
        name="addNumber"
        options={{
          headerShown: false,
          title:"Políticas de privacidade"
        }}
      />


    </Stack>
  );
}