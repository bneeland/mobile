import { Text as ReactNativeText, TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

export default function Text(props: TextProps) {
  return (
    <ReactNativeText
      {...props}
      className={twMerge("block font-sans-regular text-xl", props.className)}
    >
      {props.children}
    </ReactNativeText>
  );
}
