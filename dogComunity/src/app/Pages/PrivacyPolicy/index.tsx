import { ScrollView, Text, View } from 'react-native';
import React from 'react';

export default function PrivacyPolicyScreen() {
  return (
    <ScrollView className="flex-1 bg-white px-5 pt-10 pb-20">
      <Text className="text-2xl font-bold mb-4 text-gray-800">
        Política de Privacidade
      </Text>

      <Text className="text-gray-600 mb-4">Última atualização: 25 de abril de 2025</Text>

      <Text className="text-lg font-semibold text-gray-700 mt-6">1. Informações que coletamos</Text>
      <Text className="text-gray-600 mt-2">• Nome, e-mail, telefone, cidade, imagem de perfil.</Text>
      <Text className="text-gray-600">• Localização para mostrar pets próximos.</Text>
      <Text className="text-gray-600">• Imagens, se você quiser adicionar fotos de pets.</Text>

      <Text className="text-lg font-semibold text-gray-700 mt-6">2. Como usamos essas informações</Text>
      <Text className="text-gray-600 mt-2">• Criar e gerenciar sua conta.</Text>
      <Text className="text-gray-600">• Mostrar pets para adoção na sua região.</Text>
      <Text className="text-gray-600">• Facilitar o contato entre adotantes e tutores.</Text>

      <Text className="text-lg font-semibold text-gray-700 mt-6">3. Compartilhamento de dados</Text>
      <Text className="text-gray-600 mt-2">Não compartilhamos suas informações pessoais com terceiros.</Text>

      <Text className="text-lg font-semibold text-gray-700 mt-6">4. Segurança</Text>
      <Text className="text-gray-600 mt-2">Seus dados são armazenados de forma segura e criptografada.</Text>

      <Text className="text-lg font-semibold text-gray-700 mt-6">5. Permissões</Text>
      <Text className="text-gray-600 mt-2">• Localização: apenas durante o uso do app.</Text>
      <Text className="text-gray-600">• galeria: para enviar fotos de pets.</Text>

      <Text className="text-lg font-semibold text-gray-700 mt-6">6. Seus direitos</Text>
      <Text className="text-gray-600 mt-2">Você pode solicitar a exclusão da conta a qualquer momento.</Text>

      <Text className="text-lg font-semibold text-gray-700 mt-6">7. Contato</Text>
      <Text className="text-gray-600 mt-2">Email: suporte@seudominio.com</Text>
    </ScrollView>
  );
}
