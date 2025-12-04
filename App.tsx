import { ScreenContent } from 'components/ScreenContent';
import { StatusBar } from 'expo-status-bar';
import { Button, Text, TextInput } from 'react-native';
import { useState } from 'react';
import './global.css';
import { auth } from 'lib/auth';

export default function App() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  return (
    <>
      <ScreenContent title="Home" path="App.tsx">
        <Text>Get OTP</Text>
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
      <Text>Verify OTP</Text>
      <TextInput
        value={otp}
        onChangeText={(value) => {
          setOtp(value);
        }}
        keyboardType="numeric"
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
      </ScreenContent>
      <StatusBar style="auto" />
    </>
  );
}
