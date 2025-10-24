import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { IonIcon, IonInput } from "@ionic/react";
import { checkmarkOutline, closeOutline, eyeOffOutline, eyeOutline } from "ionicons/icons";
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
            <div className="flex-1">
              <IonInput
                type={showKey ? "text" : "password"}
                value={localKey}
                onIonInput={(e) => handleChange(e.detail.value as string)}
                placeholder="Nhập Gemini API key..."
                fill="outline"
                className={
                  isValid === false
                    ? "ion-input-error"
                    : isValid === true
                      ? "ion-input-success"
                      : ""
                }
              >
                <IonIcon
                  slot="end"
                  icon={showKey ? eyeOffOutline : eyeOutline}
                  onClick={() => setShowKey(!showKey)}
                  className="cursor-pointer text-[var(--ion-color-medium)] hover:text-[var(--ion-text-color)]"
                />
              </IonInput>
            </div>
            <Button onClick={handleSave} variant={isValid === true ? "default" : "secondary"}>
              {isValid === true ? <IonIcon icon={checkmarkOutline} className="text-base" /> : "Lưu"}
            </Button>
          </div>
          {isValid === false && (
            <p className="text-xs text-destructive mt-1 flex items-center gap-1">
              <IonIcon icon={closeOutline} className="text-xs" />
              API key không hợp lệ (tối thiểu 10 ký tự)
            </p>
          )}
          {isValid === true && (
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <IonIcon icon={checkmarkOutline} className="text-xs" />
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
