import { useEffect, useState } from "react";

const STORAGE_KEY = "gemini-api-key-storage";

export function useApiKey() {
  const [apiKey, setApiKeyState] = useState<string>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored || "";
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, apiKey);
  }, [apiKey]);

  const setApiKey = (key: string) => {
    setApiKeyState(key);
  };

  const clearApiKey = () => {
    setApiKeyState("");
  };

  const hasApiKey = () => {
    return apiKey.length > 0;
  };

  const validateApiKey = (key: string): boolean => {
    // Basic validation: API key should not be empty and should have minimum length
    return key.trim().length > 10;
  };

  return {
    apiKey,
    setApiKey,
    clearApiKey,
    hasApiKey,
    validateApiKey,
  };
}
