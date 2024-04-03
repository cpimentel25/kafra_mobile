import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { globalStyles } from "@/app/styles/styles";
import SignIdWithGoogle from "../signInGoogle/_layout";
import { colors } from "@/app/styles/colors";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";

export default function UserLogin() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      console.log("🚀 ~ onSignInPress ~ completeSignIn:", completeSignIn);
      // This is an important step,
      // This indicates the user is signed in
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={globalStyles.main}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <SignIdWithGoogle />
        <View style={styles.seperatorView}>
          <View style={styles.seperator} />
          <Text style={{ color: colors.text }}>or</Text>
          <View style={styles.seperator} />
        </View>
        <Text style={styles.loginInfo}>Log in using email address</Text>
        <TextInput
          style={globalStyles.input}
          placeholderTextColor={colors.placeholderText}
          placeholder="Email"
          value={emailAddress}
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        <TextInput
          style={globalStyles.input}
          placeholderTextColor={colors.placeholderText}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <Link href={"/(modals)/resetPassword"} asChild>
          <Text style={styles.forgotpass}>Forgot password?</Text>
        </Link>
        <TouchableOpacity
          style={globalStyles.btnPrimary}
          onPress={onSignInPress}
        >
          <Text style={globalStyles.btnPrimaryText}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.crateAccount}>
          <Text style={styles.textCreateAccount}>
            Need to create an account?
          </Text>
          <Link href={"/(modals)/register"} asChild>
            <Text style={{ color: colors.primary }}>Sign Up</Text>
          </Link>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
  },
  seperatorView: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 30,
  },
  seperator: {
    flex: 1,
    borderBottomColor: colors.white,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  loginInfo: {
    marginBottom: 10,
    color: colors.text,
  },
  textCreateAccount: {
    marginRight: 10,
    color: colors.text,
  },
  crateAccount: {
    flexDirection: "row",
    marginTop: 10,
  },
  forgotpass: {
    width: "100%",
    textAlign: "right",
    marginBottom: 15,
    color: colors.text,
  },
});
