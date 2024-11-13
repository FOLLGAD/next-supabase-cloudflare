import baseConfig, { restrictEnvAccess } from "@polaris/eslint-config/base";
import nextjsConfig from "@polaris/eslint-config/nextjs";
import reactConfig from "@polaris/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
