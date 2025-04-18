import { Slot } from "expo-router";
import "../styles/global.css"
import { AppProvider } from "../context/provider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Toast from "react-native-toast-message";

export const queryClient = new QueryClient()
export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <Slot />
        <Toast/>
      </AppProvider>
    </QueryClientProvider>
  );
}
