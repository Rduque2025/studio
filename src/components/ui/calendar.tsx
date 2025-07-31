
"use client"

import * as React from "react"
import { DayPicker, useDayPicker } from "react-day-picker" 
import { format, isToday } from "date-fns"
import { es } from "date-fns/locale" 
import { Check, ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
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
          "w-full text-sm p-0 relative focus-within:relative focus-within:z-20 bg-muted/20"
        ),
        day: cn(
          "h-40 w-full p-4 text-left align-top font-normal flex flex-col" 
        ),
        day_selected: "bg-primary text-primary-foreground shadow-md rounded-lg",
        day_today: "bg-background rounded-lg", 
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
          renderDayContent ? renderDayContent(cellDate) : <div />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
