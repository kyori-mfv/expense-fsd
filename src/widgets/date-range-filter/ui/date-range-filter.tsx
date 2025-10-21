import { DateRangePicker, IonicSegment } from "@/shared/composite";
import type { DatePreset } from "@/shared/lib/date-presets";
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
      {/* Preset Segment */}
      <IonicSegment
        options={[
          { value: "thisMonth", label: "Tháng này" },
          { value: "lastMonth", label: "Tháng trước" },
          { value: "thisYear", label: "Năm nay" },
        ]}
        defaultValue={preset}
        onValueChange={onPresetChange}
      />

      {/* Custom Date Range Picker */}
      <div className="w-[260px]">
        <DateRangePicker dateRange={dateRange} onDateRangeChange={onCustomRangeChange} />
      </div>
    </div>
  );
}
