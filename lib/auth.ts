import { expoClient } from "@better-auth/expo/client";
import { emailOTPClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

export const auth = createAuthClient({
  baseURL: process.env.EXPO_PUBLIC_SERVER_BASE_URL,
  // baseURL: "https://local.uptrack.dev", // Base URL of your Better Auth backend.
  // baseURL: "http://localhost:3000", // Base URL of your Better Auth backend.
  plugins: [
    emailOTPClient(),
    expoClient({
      scheme: "mobile",
      storagePrefix: "mobile",
      storage: SecureStore,
    }),
  ],
});
