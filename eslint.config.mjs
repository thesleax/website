import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // The mount/media-query guards used for hydration-safe client components
      // legitimately set state on mount; keep this visible as a warning rather
      // than a build-breaking error.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
]);

export default eslintConfig;
