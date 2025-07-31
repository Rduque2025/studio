
"use client"

import * as React from "react"
import { DayPicker, DayPickerProps } from "react-day-picker" 
import { format } from "date-fns"
import { es } from "date-fns/locale" 

import { cn } from "@/lib/utils"

export type CalendarProps = DayPickerProps & {
  renderDayContent?: (date: Date) => React.ReactNode;
  onAddEventTrigger?: (date: Date) => void;
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  locale = es, 
  renderDayContent,
  onAddEventTrigger,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-full", className)} 
      locale={locale} 
      classNames={{
        months: "w-full",
        month: "w-full space-y-4", 
        
        caption: "hidden", // Hide the default caption
        
        table: "w-full border-collapse",
        head_row: "grid grid-cols-7 mb-4", 
        head_cell: "text-muted-foreground/80 rounded-md w-full font-normal text-[0.8rem] uppercase text-center",
        
        row: "grid grid-cols-7 w-full gap-px", 
        cell: cn( 
          "w-full text-sm p-2 relative focus-within:relative focus-within:z-20 bg-muted/20",
          "min-h-[8rem] h-auto",
          "has-[[aria-selected=true]]:bg-background has-[[aria-selected=true]]:shadow-md has-[[aria-selected=true]]:rounded-lg"
        ),
        day: cn(
          "h-full w-full p-1 text-left align-top font-normal flex flex-col" 
        ),
        day_selected: "",
        day_today: "bg-background shadow-inner rounded-lg", 
        day_outside: "day-outside text-muted-foreground/30 opacity-100", 
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "",
        day_range_start: "",
        day_range_end: "",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        DayContent: ({ date: cellDate, activeModifiers }) => (
          <div className="flex flex-col h-full w-full">
            <div className="flex items-start justify-between"> 
              <div className={cn(
                  "text-2xl font-bold",
                   activeModifiers.outside && "text-muted-foreground/30"
                )}>
                {format(cellDate, "dd")}
              </div>
            </div>
            {renderDayContent ? renderDayContent(cellDate) : null}
          </div>
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
