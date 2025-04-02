import { Slot } from "expo-router";
import "../styles/global.css"
import { AppProvider } from "../context/provider";
export default function RootLayout() {
  return (
    <AppProvider>
      <Slot />
    </AppProvider>
  );
}
