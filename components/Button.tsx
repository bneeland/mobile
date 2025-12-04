import { Pressable, PressableProps, Text, TextProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

export default function Button({
  loading,
  children,
  ...props
}: { loading?: boolean; children?: TextProps['children'] } & PressableProps) {
  return (
    <Pressable
      {...props}
      className={twMerge(
        'cursor-pointer rounded-full bg-stone-800 px-7 py-5 transition-colors active:bg-stone-600 disabled:cursor-default disabled:bg-stone-400',
        loading && 'animate-pulse',
        props.className
      )}>
      <Text className="text-center text-white">{children}</Text>
    </Pressable>
  );
}
