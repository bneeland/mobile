import Link from "components/Link";
import Text from "components/Text";
import { View } from "react-native";

export default function Settings() {
  return (
    <View className="gap-5 p-5">
      <Text>Go to emberline.app to access your settings:</Text>
      <Link href="https://www.emberline.app/settings/checkins">
        <Text>Settings on emberline.app</Text>
      </Link>
    </View>
  );
}
