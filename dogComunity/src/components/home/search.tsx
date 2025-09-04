import React, { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";


export default function Search() {

  return (
    <View className="flex-row items-center bg-[var(--color-primary-100)] rounded-lg p-2 mx-2 mt-4">
      <Feather name="search" size={20} color="gray" className="ml-2" />
      <TextInput
        className="flex-1 ml-2 text-gray-700"
        placeholder="Pesquisar..."
       
      />
    </View>
  );
};


