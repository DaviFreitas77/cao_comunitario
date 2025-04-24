import { View, Text, ScrollView } from "react-native";

export default function AboutUs() {
  return (
    <ScrollView className="flex-1 bg-white px-6 py-8">
      <View className="bg-white rounded-2xl p-4 shadow-md">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Sobre Nós 🐶🐱
        </Text>

        <Text className="text-base text-gray-700 leading-relaxed">
          Você já foi escolhido por um pet com um simples olhar? A gente sim — e foi aí que tudo começou.{"\n\n"}
          
          Criamos esse app porque sabíamos que “au au” e “miau” também significam “me adota, por favor!”. Aqui, a ideia é simples: juntar patinhas carentes com corações disponíveis. Cães e gatos que estão só esperando você dar um match (e um sofá pra eles deitarem).{"\n\n"}

          Nosso time é formado por humanos que amam bichos mais do que boletos pagos, e estamos aqui pra facilitar o encontro entre pets incríveis e pessoas sensacionais (tipo você aí lendo isso).{"\n\n"}

          Então, se você está procurando um novo melhor amigo, um personal trainer peludo ou só alguém pra roubar seu lugar na cama — esse app é o seu lugar.

    
        </Text>
      </View>
    </ScrollView>
  );
}
