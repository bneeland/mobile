import { Image } from "expo-image";
import { Button, StyleSheet, TextInput } from "react-native";

import { HelloWave } from "@/components/hello-wave";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { auth } from "@/lib/auth";
import { useState } from "react";

const { useSession } = auth;

export default function HomeScreen() {
  const sessionData = useSession();
  console.log("sessionData");
  console.log(sessionData);

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/partial-react-logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedText>Get OTP</ThemedText>
      <TextInput
        value={email}
        onChangeText={(value) => {
          setEmail(value);
        }}
      />
      <Button
        title="Submit"
        onPress={async () => {
          const response = await auth.emailOtp.sendVerificationOtp({
            email, // required
            type: "sign-in", // required
          });
          console.log("response");
          console.log(response);
        }}
      />
      <ThemedText>Verify OTP</ThemedText>
      <TextInput
        value={otp}
        onChangeText={(value) => {
          setOtp(value);
        }}
      />
      <Button
        title="Submit"
        onPress={async () => {
          const response = await auth.signIn.emailOtp({
            email, // required
            otp, // required
          });
          console.log("response");
          console.log(response);
        }}
      />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
