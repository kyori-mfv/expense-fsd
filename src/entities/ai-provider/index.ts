// Public API - only expose what's needed by features
export { GeminiProvider } from "./api/gemini-provider";
export { useAIProvider } from "./model/use-ai-provider";
export type {
  AIProvider,
  AIProviderConfig,
  ParsedTransaction,
  ParsedExpense, // Legacy alias
} from "./model/ai-provider.types";
