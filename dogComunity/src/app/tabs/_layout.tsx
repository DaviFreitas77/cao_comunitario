import { Tabs } from "expo-router/tabs";
import { Ionicons } from "@expo/vector-icons";
import Feather from '@expo/vector-icons/Feather';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Text } from "@react-navigation/elements";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "black",
        tabBarStyle:{height:60}
        
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
        
          title: "Início",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 16 }}>Início</Text>  
          ),
        }}
      />
      <Tabs.Screen
        name="registerPet"
        options={{
          title: "",
          
          tabBarIcon: ({ color, size }) => (
      
            <FontAwesome6 name="add" size={24} color={color} />
          
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 16 }}>Pet</Text>  
          ),
          

          
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          title: "Meus favoritos",
          headerShown:true,
          headerStyle:{
            backgroundColor:"#CCF4DC",
          },
          tabBarIcon: ({ color, size }) => (
            <Feather name="heart" size={24} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 16 }}>Favoritos</Text>  
          ),
        }}
      />
      <Tabs.Screen
        name="perfil"
        options={{
          title: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <Feather name="user" size={24} color={color} />
          ),
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 16 }}>Perfil</Text>  
          ),
        }}
      />
     
    </Tabs>
  );
}
