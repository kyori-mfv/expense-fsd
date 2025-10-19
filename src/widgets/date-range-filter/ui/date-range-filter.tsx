import { DateRangePicker } from "@/shared/composite";
import type { DatePreset } from "@/shared/lib/date-presets";
import { Button } from "@/shared/ui/button";
import type { DateRange } from "react-day-picker";

interface DateRangeFilterProps {
  dateRange: { from: Date; to: Date };
  preset: DatePreset;
  onPresetChange: (preset: DatePreset) => void;
  onCustomRangeChange: (range: DateRange | undefined) => void;
}

export function DateRangeFilter({
  dateRange,
  preset,
  onPresetChange,
  onCustomRangeChange,
}: DateRangeFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
      {/* Preset Buttons */}
      <div className="inline-flex gap-2 p-1 bg-muted rounded-lg">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPresetChange("thisMonth")}
          className="data-[active=true]:bg-background data-[active=true]:shadow-sm"
          data-active={preset === "thisMonth"}
        >
          Tháng này
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPresetChange("lastMonth")}
          className="data-[active=true]:bg-background data-[active=true]:shadow-sm"
          data-active={preset === "lastMonth"}
        >
          Tháng trước
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onPresetChange("thisYear")}
          className="data-[active=true]:bg-background data-[active=true]:shadow-sm"
          data-active={preset === "thisYear"}
        >
          Năm nay
        </Button>
      </div>

      {/* Custom Date Range Picker */}
      <div className="w-[260px]">
        <DateRangePicker dateRange={dateRange} onDateRangeChange={onCustomRangeChange} />
      </div>
    </div>
  );
}
