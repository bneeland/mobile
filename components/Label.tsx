import { Text, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

export default function Label(props: TextProps) {
  return (
    <Text
      {...props}
      className={twMerge("block font-sans-semibold text-xl", props.className)}
    >
      {props.children}
    </Text>
  );
}
