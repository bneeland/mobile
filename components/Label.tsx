import { Text, TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

export default function Label(props: TextProps) {
  return (
    <Text {...props} className={twMerge('block font-semibold', props.className)}>
      {props.children}
    </Text>
  );
}
