import { useState } from "react";
import { colors } from "@/app/styles/colors";
import { useSignUp } from "@clerk/clerk-expo";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { globalStyles } from "@/app/styles/styles";

export default function SignUpClerk() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  // start the sign up process.
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        firstName,
        lastName,
        emailAddress,
        password,
      });

      // send the email.
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // change the UI to our pending section.
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  // This verifies the user using email code that is delivered.
  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View style={globalStyles.container}>
      {!pendingVerification && (
        <View style={{ width: 300 }}>
          <View>
            <TextInput
              autoCapitalize="none"
              value={firstName}
              placeholder="First Name..."
              placeholderTextColor={colors.placeholderText}
              onChangeText={(firstName) => setFirstName(firstName)}
              style={globalStyles.input}
            />
          </View>
          <View>
            <TextInput
              autoCapitalize="none"
              value={lastName}
              placeholder="Last Name..."
              placeholderTextColor={colors.placeholderText}
              onChangeText={(lastName) => setLastName(lastName)}
              style={globalStyles.input}
            />
          </View>
          <View>
            <TextInput
              autoCapitalize="none"
              value={emailAddress}
              placeholder="Email..."
              placeholderTextColor={colors.placeholderText}
              onChangeText={(email) => setEmailAddress(email)}
              style={globalStyles.input}
            />
          </View>

          <View>
            <TextInput
              value={password}
              placeholder="Password..."
              placeholderTextColor={colors.placeholderText}
              secureTextEntry={true}
              onChangeText={(password) => setPassword(password)}
              style={globalStyles.input}
            />
          </View>

          <View style={{ marginTop: 40 }}>
            <TouchableOpacity
              onPress={onSignUpPress}
              style={globalStyles.btnPrimary}
            >
              <Text style={globalStyles.btnPrimaryText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
      {pendingVerification && (
        <View style={{ width: 300 }}>
          <View style={{ marginVertical: 40 }}>
            <TextInput
              value={code}
              placeholder="Code..."
              placeholderTextColor={colors.placeholderText}
              onChangeText={(code) => setCode(code)}
              style={globalStyles.input}
            />
          </View>
          <TouchableOpacity
            onPress={onPressVerify}
            style={globalStyles.btnPrimary}
          >
            <Text style={{ color: colors.text }}>Verify Email</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
