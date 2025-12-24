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
    <View className="gap-5 p-5">
      <Text>{data?.user.email}</Text>
      <Button
        onPress={async () => {
          await auth.signOut();

          router.navigate("/sign-in");
        }}
      >
        Sign out
      </Button>
    </View>
  );
}
