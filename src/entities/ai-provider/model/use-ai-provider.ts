import { useMemo } from "react";
import { GeminiProvider } from "../api/gemini-provider";
import type { AIProvider } from "./ai-provider.types";

/**
 * Hook to create and memoize AI provider instance
 * Decouples features from direct class instantiation
 */
export function useAIProvider(apiKey: string): AIProvider | null {
  return useMemo(() => {
    if (!apiKey) return null;

    return new GeminiProvider({
      apiKey,
      enabled: true,
    });
  }, [apiKey]);
}
