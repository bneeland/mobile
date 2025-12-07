import "global.css";
import { Stack } from "expo-router";
import { auth } from "lib/auth";

const { useSession } = auth;

export default function Layout() {
  // const data = { user: true}
  const { isPending, data } = useSession();

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!!data?.user}>
        <Stack.Screen name="(protected)" />
      </Stack.Protected>

      <Stack.Screen
        name="sign-in"
        options={{ title: "Sign In", headerShown: true }}
      />
    </Stack>
  );
}
