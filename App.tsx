import "./global.css";
import {
  KeyboardAwareScrollView,
  KeyboardProvider,
} from "react-native-keyboard-controller";
import { Pressable, Text, View } from "react-native";
import { useState } from "react";
import { auth } from "lib/auth";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import Input from "components/Input";
import Button from "components/Button";
import Fieldset from "components/Fieldset";
import Label from "components/Label";
import { ArrowLeft } from "lucide-react-native";

export default function App() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <KeyboardProvider>
      <SafeAreaProvider>
        <KeyboardAwareScrollView
          bottomOffset={62}
          className="bg-blue-50"
          contentContainerClassName=""
        >
          <SafeAreaView className="">
            <View className="">
              <Text className="my-5 text-center text-xl text-stone-400">
                Emberline
              </Text>
              <View className="mx-5 gap-7 rounded-3xl bg-white p-10 shadow">
                <Text className="text-4xl font-semibold">Sign in</Text>
                {step === "email" && (
                  <>
                    <Text className="text-xl">
                      Enter your email to sign in.
                    </Text>
                    <View className="gap-3">
                      <Fieldset>
                        <Label className="text-xl">Email</Label>
                        <Input
                          placeholder="you@example.com"
                          keyboardType="email-address"
                          autoCapitalize="none"
                          value={email}
                          onChangeText={(value) => {
                            setEmail(value);
                          }}
                          autoFocus
                          className="text-xl"
                        />
                      </Fieldset>
                      <Button
                        onPress={async () => {
                          setLoading(true);

                          const { data, error } =
                            await auth.emailOtp.sendVerificationOtp({
                              email, // required
                              type: "sign-in", // required
                            });
                          console.log("data");
                          console.log(data);

                          if (error) {
                            console.error(error);
                          } else {
                            setStep("otp");
                          }

                          setLoading(false);
                        }}
                        loading={loading}
                        disabled={loading}
                      >
                        <Text className="text-xl">Sign in</Text>
                      </Button>
                    </View>
                  </>
                )}
                {step === "otp" && (
                  <>
                    <Text className="text-xl">
                      We just sent a code to{" "}
                      <Text className="font-bold">{email}</Text>. Please enter
                      it below.
                    </Text>
                    <View className="gap-3">
                      <Fieldset>
                        <Label className="text-xl">Verification code</Label>
                        <Input
                          placeholder="XXXXXX"
                          keyboardType="numeric"
                          value={otp}
                          onChangeText={(value) => {
                            setOtp(value);
                          }}
                          autoFocus
                          className="text-xl"
                        />
                      </Fieldset>
                      <Button
                        onPress={async () => {
                          setLoading(true);

                          const { data, error } = await auth.signIn.emailOtp({
                            email, // required
                            otp, // required
                          });
                          console.log("data");
                          console.log(data);

                          if (error) {
                            console.error(error);
                          } else {
                          }

                          setLoading(false);
                        }}
                        loading={loading}
                        disabled={loading}
                      >
                        <Text className="text-xl">Verify</Text>
                      </Button>
                    </View>
                    <Pressable
                      onPress={() => {
                        setStep("email");

                        setOtp("");
                      }}
                      className="flex flex-row items-center justify-center gap-1"
                    >
                      <ArrowLeft />
                      <Text className="text-xl">Back</Text>
                    </Pressable>
                  </>
                )}
              </View>
            </View>
          </SafeAreaView>
        </KeyboardAwareScrollView>
      </SafeAreaProvider>
    </KeyboardProvider>
  );
}
