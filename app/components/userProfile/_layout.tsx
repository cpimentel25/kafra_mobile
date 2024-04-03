import { colors } from "@/app/styles/colors";
import { globalStyles } from "@/app/styles/styles";
import { useAuth, useUser } from "@clerk/clerk-expo";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function UserProfile() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const { isSignedIn, user } = useUser();

  // In case the user signs out while on the page.
  if (!isLoaded || !isSignedIn) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const SignOut = () => {
    const { isLoaded, signOut } = useAuth();
    if (!isLoaded || !isSignedIn) {
      return (
        <View style={globalStyles.container}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    return (
      <View>
        <MaterialCommunityIcons
          name="logout"
          size={24}
          color={colors.white}
          onPress={() => {
            signOut();
          }}
        />
      </View>
    );
  };

  const onCaptureImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });
    // console.log("🚀 ~ onCaptureImage ~ result:", result);

    if (!result.canceled) {
      const base64 = `data:image/png;base64,${result.assets[0].base64}`;
      user?.setProfileImage({
        file: base64,
      });
    }
  };

  if (!isLoaded) {
    return (
      <View style={globalStyles.container}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.cont}>
          <TouchableOpacity style={styles.contAvatar} onPress={onCaptureImage}>
            <Image source={{ uri: user?.imageUrl }} style={styles.avatar} />
          </TouchableOpacity>
          <View style={styles.contInfo}>
            <View style={styles.contName}>
              <Text style={styles.text}>
                {user?.firstName} {}
              </Text>
              <Text style={styles.text}>{user?.lastName}</Text>
            </View>
            <Text style={styles.text}>
              {user?.emailAddresses[0].emailAddress}
            </Text>
          </View>
        </View>
        <SignOut />
      </View>
      <View style={styles.contRuster}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.bg_primary,
    padding: 30,
  },
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  cont: {
    flexDirection: "row",
    alignItems: "center",
  },
  contRuster: {
    height: "70%",
    width: "100%",
    // borderColor: colors.white,
    // borderWidth: 1,
    // borderRadius: 5,
  },
  contInfo: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  contName: {
    justifyContent: "center",
    flexDirection: "row",
  },
  contAvatar: {
    backgroundColor: colors.white,
    borderRadius: 5,
    marginRight: 10,
    marginTop: 24,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    alignItems: "center",
    gap: 24,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
  text: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 25,
  },
});
