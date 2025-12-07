import Button from "components/Button";
import Text from "components/Text";
import { useRouter } from "expo-router";
import { auth } from "lib/auth";
import { View } from "react-native";

const { useSession } = auth;

export default function Account() {
  const { data } = useSession();

  const router = useRouter();

  return (
    <View>
      {data?.user.email && <Text>Signed in as {data.user.email}</Text>}
      <Button
        onPress={async () => {
          await auth.signOut();

          router.navigate("/sign-in");
        }}
      >
        Sign Out
      </Button>
    </View>
  );
}

// import "../global.css";
// import {
//   KeyboardAwareScrollView,
//   KeyboardProvider,
// } from "react-native-keyboard-controller";
// import { Pressable, View } from "react-native";
// import { useState } from "react";
// import { auth } from "lib/auth";
// import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
// import Input from "components/Input";
// import Button from "components/Button";
// import Fieldset from "components/Fieldset";
// import Label from "components/Label";
// import { ArrowLeft } from "lucide-react-native";
// import { useFonts } from "expo-font";
// import Text from "components/Text";

// export default function App() {
//   useFonts({
//     "Manrope-ExtraLight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
//     "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"),
//     "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
//     "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
//     "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"),
//     "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
//     "Manrope-ExtraBold": require("../assets/fonts/Manrope-ExtraBold.ttf"),
//   });

//   const [step, setStep] = useState<"email" | "otp">("email");
//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");
//   const [loading, setLoading] = useState(false);

//   return (
//     // <KeyboardProvider>
//     //   <SafeAreaProvider>
//     //     <KeyboardAwareScrollView
//     //       bottomOffset={62}
//     //       className="bg-blue-50"
//     //       contentContainerClassName=""
//     //     >
//     //       <SafeAreaView className="">
//             <View className="">
//               <Text className="my-5 text-center text-stone-400">Emberline</Text>
//               <View className="mx-5 gap-7 rounded-3xl bg-white p-10 shadow">
//                 <Text className="text-4xl leading-normal">Sign in</Text>
//                 {step === "email" && (
//                   <>
//                     <Text>Enter your email to sign in.</Text>
//                     <View className="gap-3">
//                       <Fieldset>
//                         <Label>Email</Label>
//                         <Input
//                           placeholder="you@example.com"
//                           keyboardType="email-address"
//                           autoCapitalize="none"
//                           value={email}
//                           onChangeText={(value) => {
//                             setEmail(value);
//                           }}
//                           autoFocus
//                         />
//                       </Fieldset>
//                       <Button
//                         onPress={async () => {
//                           setLoading(true);

//                           const { data, error } =
//                             await auth.emailOtp.sendVerificationOtp({
//                               email, // required
//                               type: "sign-in", // required
//                             });
//                           console.log("data");
//                           console.log(data);

//                           if (error) {
//                             console.error(error);
//                           } else {
//                             setStep("otp");
//                           }

//                           setLoading(false);
//                         }}
//                         loading={loading}
//                         disabled={loading}
//                       >
//                         <Text>Sign in</Text>
//                       </Button>
//                     </View>
//                   </>
//                 )}
//                 {step === "otp" && (
//                   <>
//                     <Text>
//                       We just sent a code to{" "}
//                       <Text className="font-sans-bold">{email}</Text>. Please
//                       enter it below.
//                     </Text>
//                     <View className="gap-3">
//                       <Fieldset>
//                         <Label>Verification code</Label>
//                         <Input
//                           placeholder="XXXXXX"
//                           keyboardType="numeric"
//                           value={otp}
//                           onChangeText={(value) => {
//                             setOtp(value);
//                           }}
//                           autoFocus
//                         />
//                       </Fieldset>
//                       <Button
//                         onPress={async () => {
//                           setLoading(true);

//                           const { data, error } = await auth.signIn.emailOtp({
//                             email, // required
//                             otp, // required
//                           });
//                           console.log("data");
//                           console.log(data);

//                           if (error) {
//                             console.error(error);
//                           } else {
//                           }

//                           setLoading(false);
//                         }}
//                         loading={loading}
//                         disabled={loading}
//                       >
//                         <Text>Verify</Text>
//                       </Button>
//                     </View>
//                     <Pressable
//                       onPress={() => {
//                         setStep("email");

//                         setOtp("");
//                       }}
//                       className="flex flex-row items-center justify-center gap-1"
//                     >
//                       <ArrowLeft />
//                       <Text>Back</Text>
//                     </Pressable>
//                   </>
//                 )}
//               </View>
//             </View>
//     //       </SafeAreaView>
//     //     </KeyboardAwareScrollView>
//     //   </SafeAreaProvider>
//     // </KeyboardProvider>
//   );
// }
