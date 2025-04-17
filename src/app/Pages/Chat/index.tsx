import { Context } from "@/src/context/provider";
import { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import io from "socket.io-client";
import { useLocalSearchParams } from "expo-router";

const socket = io("http://192.168.15.7:3000");

export default function ChatUser() {
  const { idUser } = useContext(Context)!;
  const { pet, ownerPet, image, name } = useLocalSearchParams();
  const [message, setMessage] = useState("");



  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            typeof image === "string"
              ? { uri: image }
              : require("../../../../assets/images/home/cat.jpg")
          }
          style={styles.avatar}
        />
        <Text style={styles.name}>{name}</Text>
      </View>

    

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite sua mensagem..."
          value={message}
          onChangeText={(txt) => setMessage(txt)}
          style={styles.textInput}
        />
        <Button title="Enviar" />
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#eee",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  chatMessage: {
    paddingVertical: 6,
  },
  from: {
    fontWeight: "bold",
  },
  inputContainer: {
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 8,
    paddingBottom: 16,
    backgroundColor: "#fff",
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 8,
    borderRadius: 8,
  },
});
