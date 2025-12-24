import { TextProps } from "react-native";
import { twMerge } from "tailwind-merge";
import Text from "./Text";

export default function Error(props: TextProps) {
  return (
    <Text
      {...props}
      className={twMerge(
        props.className,
        "rounded-xl border border-red-600/25 px-4 py-2 text-center text-red-600",
      )}
    >
      {props.children}
    </Text>
  );
}
