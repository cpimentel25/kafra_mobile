import "react-native-gesture-handler";
import { ClerkProvider } from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import StackNavigation from "./navigation/stack.navigation";
import { StatusBar } from "expo-status-bar";

const EXPO_PUBLIC_CLERK_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

export default function AppLayout() {
  return (
    <>
      <StatusBar style="light" />
      <ClerkProvider
        publishableKey={EXPO_PUBLIC_CLERK_KEY!}
        tokenCache={tokenCache}
      >
        <StackNavigation />
      </ClerkProvider>
    </>
  );
}
