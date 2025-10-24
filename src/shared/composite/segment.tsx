import { IonLabel, IonSegment, IonSegmentButton } from "@ionic/react";
import type { ReactNode } from "react";
import { useState } from "react";

export interface SegmentOption<T extends string = string> {
  /** Unique value for this segment option */
  value: T;
  /** Display label for the segment button */
  label: string;
  /** Optional: Render custom content when this segment is active */
  content?: ReactNode;
}

export interface SegmentProps<T extends string = string> {
  /** Array of segment options */
  options: SegmentOption<T>[];
  /** Initial selected segment value */
  defaultValue?: T;
  /** Callback when segment changes */
  onValueChange?: (value: T) => void;
  /** Optional: Additional CSS classes for the wrapper */
  className?: string;
  /** Optional: Show content below segment based on selection */
  showContent?: boolean;
}

/**
 * Segment - Reusable Ionic segment control component
 *
 * A general-purpose composite component that wraps IonSegment with state management
 * and optional content rendering. Provides a native mobile UI for multi-choice selection.
 *
 * @example
 * ```tsx
 * // Simple segment without content
 * <Segment
 *   options={[
 *     { value: 'thisMonth', label: 'Tháng này' },
 *     { value: 'lastMonth', label: 'Tháng trước' },
 *     { value: 'thisYear', label: 'Năm nay' },
 *   ]}
 *   defaultValue="thisMonth"
 *   onValueChange={(value) => setPreset(value)}
 * />
 *
 * // Segment with content rendering
 * <Segment
 *   options={[
 *     { value: 'ai', label: 'Nhập AI', content: <AIInput /> },
 *     { value: 'manual', label: 'Nhập Thủ công', content: <ManualForm /> },
 *   ]}
 *   defaultValue="manual"
 *   showContent
 * />
 * ```
 */
export function Segment<T extends string = string>({
  options,
  defaultValue,
  onValueChange,
  className,
  showContent = false,
}: SegmentProps<T>) {
  const [selectedValue, setSelectedValue] = useState<T>(defaultValue ?? (options[0]?.value as T));

  const handleChange = (value: T) => {
    setSelectedValue(value);
    onValueChange?.(value);
  };

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  return (
    <div className={className}>
      <IonSegment
        className="py-0.5"
        value={selectedValue}
        onIonChange={(e) => handleChange(e.detail.value as T)}
      >
        {options.map((option) => (
          <IonSegmentButton key={option.value} value={option.value}>
            <IonLabel>{option.label}</IonLabel>
          </IonSegmentButton>
        ))}
      </IonSegment>

      {showContent && selectedOption?.content && (
        <div className="mt-4">{selectedOption.content}</div>
      )}
    </div>
  );
}
