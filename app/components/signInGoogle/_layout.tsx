import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useWarmUpBrowser } from "@/app/hooks/warmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";
import { globalStyles } from "@/app/styles/styles";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "@/app/styles/colors";

export default function SignIdWithGoogle() {
  // Warm up the android browser to improve UX
  // https://docs.expo.dev/guides/authentication/#improving-user-experience
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive!({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <TouchableOpacity style={globalStyles.buttonSocial} onPress={onPress}>
      <AntDesign
        name="google"
        size={24}
        color={colors.white}
        style={globalStyles.btnIcon}
      />
      <Text style={globalStyles.textButtonSocial}>Continue with Google</Text>
    </TouchableOpacity>
  );
}
