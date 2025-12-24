import { Link as ExpoRouterLink, LinkProps } from "expo-router";
import { twMerge } from "tailwind-merge";

export default function Link(props: LinkProps) {
  return (
    <ExpoRouterLink
      {...props}
      className={twMerge(props.className, "text-stone-400")}
    >
      {props.children}
    </ExpoRouterLink>
  );
}
