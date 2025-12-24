import { Pressable, View } from "react-native";
import Text from "components/Text";
import {
  KeyboardAwareScrollView,
  KeyboardProvider,
} from "react-native-keyboard-controller";
import { useState } from "react";
import Fieldset from "components/Fieldset";
import Label from "components/Label";
import Input from "components/Input";
import Button from "components/Button";
import { ArrowLeft } from "lucide-react-native";
import { auth } from "lib/auth";
import { useRouter } from "expo-router";
import Link from "components/Link";
import Error from "components/Error";

export default function SignIn() {
  const router = useRouter();

  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  return (
    <KeyboardProvider>
      <KeyboardAwareScrollView
        bottomOffset={62}
        className="bg-blue-50"
        contentContainerClassName=""
      >
        <View className="">
          {/* <Text className="my-5 text-center text-stone-400">Emberline</Text> */}
          <View className="m-5 gap-7 rounded-3xl bg-white p-10 shadow">
            <Text className="text-4xl leading-normal">Sign in</Text>
            {step === "email" && (
              <>
                <Text>Enter your email to sign in or create an account.</Text>
                <View className="gap-3">
                  <Fieldset>
                    <Label>Email</Label>
                    <Input
                      placeholder="you@example.com"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={(value) => {
                        setEmail(value);
                      }}
                      autoFocus
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
                    <Text>Sign in</Text>
                  </Button>
                </View>
                <Text className="text-md text-pretty">
                  By signing in, you agree to the{" "}
                  <Link href="https://www.emberline.app/terms-of-service">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="https://www.emberline.app/privacy-policy">
                    Privacy Policy
                  </Link>
                  .
                </Text>
              </>
            )}
            {step === "otp" && (
              <>
                <Text>
                  We just sent a code to{" "}
                  <Text className="font-sans-bold">{email}</Text>. Please enter
                  it below.
                </Text>
                <View className="gap-3">
                  <Fieldset>
                    <Label>Verification code</Label>
                    <Input
                      placeholder="XXXXXX"
                      keyboardType="numeric"
                      value={otp}
                      onChangeText={(value) => {
                        setOtp(value);
                        setError("");
                      }}
                      autoFocus
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
                        console.log(error);

                        setError(
                          error.message || "Incorrect input. Please try again.",
                        );
                      } else {
                        router.navigate("/(protected)");

                        setStep("email");
                        setEmail("");
                        setOtp("");
                        setError("");
                      }

                      setLoading(false);
                    }}
                    loading={loading}
                    disabled={loading}
                  >
                    <Text>Verify</Text>
                  </Button>
                </View>

                {error && <Error>{error}</Error>}

                <Pressable
                  onPress={() => {
                    setStep("email");
                    setOtp("");
                    setError("");
                  }}
                  className="flex flex-row items-center justify-center gap-1"
                >
                  <ArrowLeft />
                  <Text>Back</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </KeyboardProvider>
  );
}
