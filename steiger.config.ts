import fsd from "@feature-sliced/steiger-plugin";
import { defineConfig } from "steiger";

export default defineConfig([
  ...fsd.configs.recommended,
  {
    // Disable insignificant-slice rule globally
    // This rule suggests merging slices with single references, but we intentionally
    // keep features and widgets separate for better maintainability, testability,
    // and reusability following strict FSD principles.
    rules: {
      "fsd/insignificant-slice": "off",
    },
  },
]);
