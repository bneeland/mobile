import { TextInput, TextInputProps } from "react-native";
import { twMerge } from "tailwind-merge";

export default function Input(props: TextInputProps) {
  return (
    <TextInput
      {...props}
      className={twMerge(
        "rounded-full border border-stone-200 bg-white px-7 py-5 shadow transition-colors disabled:bg-stone-200 disabled:text-stone-600",
        props.className,
      )}
    >
      {props.children}
    </TextInput>
  );
}
