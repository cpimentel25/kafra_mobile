import { SafeAreaView, View } from "react-native";
import { SignedIn } from "@clerk/clerk-expo";
import { SignedOut } from "@clerk/clerk-react";
import { globalStyles } from "../styles/styles";
import UserProfile from "../components/userProfile/_layout";
import UserLogin from "../components/userLogin/_layout";

export default function Tab() {
  return (
    <View style={globalStyles.container}>
      <SafeAreaView>
        <SignedIn>
          <UserProfile />
        </SignedIn>
        <SignedOut>
          <UserLogin />
        </SignedOut>
      </SafeAreaView>
    </View>
  );
}
