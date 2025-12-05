import { View, ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";

export default function Fieldset(props: ViewProps) {
  return (
    <View {...props} className={twMerge("gap-1", props.className)}>
      {props.children}
    </View>
  );
}
