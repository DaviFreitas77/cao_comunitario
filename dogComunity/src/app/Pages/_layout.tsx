// app/Pages/_layout.tsx
import { Stack } from "expo-router";

export default function PagesLayout() {
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
          title: "Detalhes do pet",
          headerShown: false,
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

    </Stack>
  );
}