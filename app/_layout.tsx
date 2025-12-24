import "global.css";
import { Stack } from "expo-router";
import { auth } from "lib/auth";
import { useFonts } from "expo-font";
import { SettingProvider } from "contexts/SettingContext";

const { useSession } = auth;

// SplashScreen.preventAutoHideAsync();

export default function Layout() {
  useFonts({
    "Manrope-ExtraLight": require("../assets/fonts/Manrope-ExtraLight.ttf"),
    "Manrope-Light": require("../assets/fonts/Manrope-Light.ttf"),
    "Manrope-Regular": require("../assets/fonts/Manrope-Regular.ttf"),
    "Manrope-Medium": require("../assets/fonts/Manrope-Medium.ttf"),
    "Manrope-SemiBold": require("../assets/fonts/Manrope-SemiBold.ttf"),
    "Manrope-Bold": require("../assets/fonts/Manrope-Bold.ttf"),
    "Manrope-ExtraBold": require("../assets/fonts/Manrope-ExtraBold.ttf"),
  });

  const { isPending, data } = useSession();

  if (isPending) return <></>;

  return (
    <SettingProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={!!data?.user}>
          <Stack.Screen name="(protected)" />
        </Stack.Protected>

        <Stack.Screen
          name="sign-in"
          options={{ title: "Sign In", headerShown: true }}
        />
      </Stack>
    </SettingProvider>
  );
}
