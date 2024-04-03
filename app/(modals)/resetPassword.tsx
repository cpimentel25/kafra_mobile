import { colors } from "@/app/styles/colors";
import { globalStyles } from "@/app/styles/styles";
import { useSignIn } from "@clerk/clerk-expo";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function ResetPassword() {
  const { signIn, setActive } = useSignIn();

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);

  // Request a passowrd reset code by email
  const onRequestReset = async () => {
    try {
      await signIn!.create({
        strategy: "reset_password_email_code",
        identifier: emailAddress,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      //   navigation.navigate("Profile");
      alert("Password reset successfully");

      // Set the user session active, which will log in the user automatically
      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <View style={styles.main}>
      {!successfulCreation ? (
        <View style={styles.container}>
          <TextInput
            style={globalStyles.input}
            placeholderTextColor={colors.placeholderText}
            autoCapitalize="none"
            placeholder="name@email.com"
            value={emailAddress}
            onChangeText={setEmailAddress}
          />
          <TouchableOpacity
            style={globalStyles.btnPrimary}
            onPress={onRequestReset}
          >
            <Text style={globalStyles.btnPrimaryText}>Send Reset Email</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.container}>
          <Text>ResetPass</Text>
          <TextInput
            style={globalStyles.input}
            placeholderTextColor={colors.placeholderText}
            placeholder="Code..."
            onChangeText={setCode}
          />
          <TextInput
            style={globalStyles.input}
            placeholderTextColor={colors.placeholderText}
            placeholder="New password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TouchableOpacity style={globalStyles.btnSecundary} onPress={onReset}>
            <Text style={globalStyles.btnSecundaryText}>Set new Password</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.bg_primary,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
});
