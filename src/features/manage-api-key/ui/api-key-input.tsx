import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Check, Eye, EyeOff, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useApiKey } from "../model/use-api-key";

interface ApiKeyInputProps {
  onApiKeyChange?: (apiKey: string) => void;
}

export function ApiKeyInput({ onApiKeyChange }: ApiKeyInputProps) {
  const { apiKey, setApiKey, validateApiKey } = useApiKey();
  const [localKey, setLocalKey] = useState(apiKey);
  const [showKey, setShowKey] = useState(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    setLocalKey(apiKey);
  }, [apiKey]);

  const handleSave = () => {
    const valid = validateApiKey(localKey);
    setIsValid(valid);

    if (valid) {
      setApiKey(localKey);
      onApiKeyChange?.(localKey);
    }
  };

  const handleChange = (value: string) => {
    setLocalKey(value);
    setIsValid(null);
  };

  return (
    <Card className="p-4">
      <div className="space-y-4">
        <div>
          <Label htmlFor="api-key">Gemini API Key</Label>
          <div className="flex gap-2 mt-2">
            <div className="relative flex-1">
              <Input
                id="api-key"
                type={showKey ? "text" : "password"}
                value={localKey}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Nhập Gemini API key..."
                className={
                  isValid === false
                    ? "border-destructive"
                    : isValid === true
                      ? "border-green-500"
                      : ""
                }
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <Button onClick={handleSave} variant={isValid === true ? "default" : "secondary"}>
              {isValid === true ? <Check size={16} /> : "Lưu"}
            </Button>
          </div>
          {isValid === false && (
            <p className="text-xs text-destructive mt-1 flex items-center gap-1">
              <X size={12} />
              API key không hợp lệ (tối thiểu 10 ký tự)
            </p>
          )}
          {isValid === true && (
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <Check size={12} />
              API key đã được lưu
            </p>
          )}
        </div>

        <p className="text-xs text-muted-foreground">
          Lấy API key tại:{" "}
          <a
            href="https://aistudio.google.com/apikey"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary underline"
          >
            aistudio.google.com
          </a>
        </p>
      </div>
    </Card>
  );
}
