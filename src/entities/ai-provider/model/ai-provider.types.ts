export interface ParsedTransaction {
  amount: number;
  category: string;
  description: string;
  date: Date;
  confidence: number;
  suggestions?: string[];
}

export interface AIProviderConfig {
  apiKey: string;
  enabled: boolean;
  apiUrl?: string;
  model?: string;
}

export interface AIProvider {
  name: string;
  isConfigured(): boolean;
  validateConfig(config: AIProviderConfig): boolean;
  parseTransaction(
    input: string,
    options: {
      categories: readonly { name: string }[] | Array<{ name: string }>;
      keywords: Record<string, string[]>;
      transactionLabel?: string;
    }
  ): Promise<ParsedTransaction>;
}

// Legacy alias for backward compatibility
export type ParsedExpense = ParsedTransaction;
