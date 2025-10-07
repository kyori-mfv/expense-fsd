import { API_ENDPOINTS } from "@/shared/config/constants";
import type { AIProvider, AIProviderConfig, ParsedTransaction } from "../model/ai-provider.types";

export class GeminiProvider implements AIProvider {
  name = "Gemini";
  private config: AIProviderConfig;

  constructor(config: AIProviderConfig) {
    this.config = config;
  }

  isConfigured(): boolean {
    return !!(this.config.apiKey && this.config.enabled);
  }

  validateConfig(config: AIProviderConfig): boolean {
    return !!(config.apiKey && config.apiUrl && config.model);
  }

  async parseTransaction(
    input: string,
    options: {
      categories: Array<{ name: string }>;
      keywords: Record<string, string[]>;
      transactionLabel?: string;
    }
  ): Promise<ParsedTransaction> {
    if (!this.isConfigured()) {
      throw new Error("Gemini provider not configured");
    }

    const prompt = this.buildPrompt(input, options);

    try {
      const response = await fetch(API_ENDPOINTS.GEMINI_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-goog-api-key": this.config.apiKey || "",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: prompt,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 200,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!text) {
        throw new Error("No response from Gemini API");
      }

      return this.parseResponse(text, input, options.keywords);
    } catch (error) {
      console.error("Gemini parsing error:", error);
      throw error;
    }
  }

  private buildPrompt(
    input: string,
    options: {
      categories: Array<{ name: string }>;
      keywords: Record<string, string[]>;
      transactionLabel?: string;
    }
  ): string {
    const categoryNames = options.categories.map((cat) => cat.name);
    const transactionLabel = options.transactionLabel || "giao dịch";

    return `Phân tích giao dịch ${transactionLabel} này và trả về CHỈ MỘT đối tượng JSON với cấu trúc sau:
{
  "amount": number,
  "category": "string",
  "description": "string",
  "date": "YYYY-MM-DD",
  "confidence": number (0-1)
}

CHÚ Ý: Đầu vào có thể là tiếng Việt KHÔNG dấu (sắc, huyền, ngã, hỏi, nặng).
Ví dụ: "tien nha" = "tiền nhà", "an uong" = "ăn uống", "di chuyen" = "di chuyển"

Quy tắc QUAN TRỌNG:
- AMOUNT: Trích xuất số tiền chính xác. Chú ý: "100k" = 100000, "1tr" = 1000000
- DESCRIPTION: Mô tả ngắn gọn, rõ ràng về giao dịch ${transactionLabel}
- CATEGORY: Chọn danh mục phù hợp nhất từ danh sách các danh mục ${transactionLabel}: [${categoryNames.join(", ")}]
- DATE: Tính toán ngày chính xác dạng YYYY-MM-DD. Hôm nay là ${new Date().toISOString().split("T")[0]}
- CONFIDENCE: Cao (>0.8) khi thông tin rõ ràng, thấp (<0.5) khi thông tin mơ hồ

Quy tắc ƯU TIÊN:
- Nếu đầu vào có "tiền nhà", "nhà tháng", "tien nha", "nha thang" -> CATEGORY phải là "Hóa đơn & Tiện ích"

Loại giao dịch: ${transactionLabel.toUpperCase()}
Đầu vào: "${input}"

Chỉ trả về JSON:`;
  }

  private parseResponse(
    response: string,
    originalInput: string,
    keywords: Record<string, string[]>
  ): ParsedTransaction {
    try {
      // Clean the response to extract JSON
      const jsonMatch = response.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }

      const parsed = JSON.parse(jsonMatch[0]);

      return {
        amount: parsed.amount || 0,
        category: parsed.category || "Khác",
        description: this.capitalizeFirst(parsed.description || originalInput),
        date: parsed.date ? new Date(parsed.date) : new Date(),
        confidence: Math.min(Math.max(parsed.confidence || 0.5, 0), 1),
        suggestions: [],
      };
    } catch (error) {
      console.error("Error parsing Gemini response:", error);
      // Fallback to basic parsing
      return this.fallbackParse(originalInput, keywords);
    }
  }

  private fallbackParse(input: string, keywords: Record<string, string[]>): ParsedTransaction {
    const amountMatch = input.match(/(\d+\.?\d*)/);
    const amount = amountMatch
      ? Number.parseFloat(amountMatch[1]) * (input.includes("k") || input.includes("K") ? 1000 : 1)
      : 0;

    // Simple category guessing
    let category = "Khác";
    for (const [categoryName, categoryKeywords] of Object.entries(keywords)) {
      if (categoryKeywords.some((keyword) => input.toLowerCase().includes(keyword))) {
        category = categoryName;
        break;
      }
    }

    // Simple Vietnamese date parsing
    let date = new Date();
    const lowerInput = input.toLowerCase();
    if (lowerInput.includes("hôm qua")) {
      date = new Date();
      date.setDate(date.getDate() - 1);
    } else if (lowerInput.includes("hôm kia")) {
      date = new Date();
      date.setDate(date.getDate() - 2);
    }

    return {
      amount,
      category,
      description: this.capitalizeFirst(input.replace(/(\d+\.?\d*k?)/, "").trim() || input),
      date,
      confidence: 0.3,
      suggestions: ["Đã phân tích với phương pháp dự phòng"],
    };
  }

  private capitalizeFirst(text: string): string {
    if (!text) return text;
    return text.charAt(0).toUpperCase() + text.slice(1);
  }
}
