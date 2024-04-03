import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/colors";

const StackNavigation = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="(modals)/resetPassword"
        options={{
          presentation: "modal",
          title: "Back",
          headerStyle: { backgroundColor: colors.bg_primary },
          headerTitleStyle: { color: colors.text },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="chevron-back"
                size={28}
                style={{ color: colors.white, marginRight: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="(modals)/register"
        options={{
          presentation: "modal",
          title: "Back",
          headerStyle: { backgroundColor: colors.bg_primary },
          headerTitleStyle: { color: colors.text },
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons
                name="chevron-back"
                size={28}
                style={{ color: colors.white, marginRight: 20 }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
  );
};

export default StackNavigation;
