import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";
import type { DateRange } from "react-day-picker";

import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";

interface DateRangePickerProps {
  dateRange?: DateRange;
  onDateRangeChange: (range: DateRange | undefined) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function DateRangePicker({
  dateRange,
  onDateRangeChange,
  disabled,
  placeholder = "Chọn khoảng ngày",
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [tempDateRange, setTempDateRange] = React.useState<DateRange | undefined>(dateRange);

  // Update temp range when external value changes
  React.useEffect(() => {
    if (!open) {
      setTempDateRange(dateRange);
    }
  }, [dateRange, open]);

  // Handle popover close - commit the change
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);

    // When closing, commit the temp selection
    if (!newOpen && tempDateRange) {
      onDateRangeChange(tempDateRange);
    }
  };

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal",
            !dateRange?.from && "text-muted-foreground"
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {dateRange?.from ? (
            dateRange.to ? (
              <>
                {format(dateRange.from, "dd/MM/yyyy", { locale: vi })} -{" "}
                {format(dateRange.to, "dd/MM/yyyy", { locale: vi })}
              </>
            ) : (
              format(dateRange.from, "dd/MM/yyyy", { locale: vi })
            )
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          defaultMonth={tempDateRange?.from}
          selected={tempDateRange}
          onSelect={setTempDateRange}
          numberOfMonths={2}
          locale={vi}
        />
      </PopoverContent>
    </Popover>
  );
}
