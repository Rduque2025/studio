
"use client"

import * as React from "react"
import { PlusCircle } from "lucide-react" 
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
      className={cn("p-1 w-full", className)} 
      locale={locale} 
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 w-full",
        month: "space-y-3 w-full", 
        
        caption: "hidden", // Hide the default caption
        
        table: "w-full border-collapse space-y-1",
        head_row: "flex mb-1", 
        head_cell: "text-muted-foreground/80 rounded-md w-full font-normal text-[0.8rem] uppercase justify-center flex",
        
        row: "flex w-full mt-1 gap-1", 
        cell: cn( 
          "w-full text-sm p-0 relative focus-within:relative focus-within:z-20 border border-border rounded-md",
          "min-h-[10rem] h-auto",
          "has-[[aria-selected=true]]:bg-[#dcdcdc] has-[[aria-selected=true]]:text-foreground has-[[aria-selected=true]]:hover:bg-[#c8c8c8] has-[[aria-selected=true]]:focus:bg-[#c8c8c8]", // Handles selected day bg
          "dark:has-[[aria-selected=true]]:bg-slate-700 dark:has-[[aria-selected=true]]:text-slate-50 dark:has-[[aria-selected=true]]:hover:bg-slate-600 dark:has-[[aria-selected=true]]:focus:bg-slate-600",
          props.mode === "range" &&
            "has-[[aria-selected=true_],[aria-selected=true_span_end],[aria-selected=true_span_start]]:bg-accent/50", // Keep range styles if needed
          props.mode === "multiple" && "has-[[aria-selected=true]]:bg-accent/50" // Keep multiple styles if needed
        ),
        day: cn(
          "h-full w-full p-1.5 text-left align-top font-normal flex flex-col" 
        ),
        day_selected: "", // Clear direct day_selected styles as cell handles it via has[]
        day_today: "bg-sky-100 dark:bg-sky-900/50 rounded-md", 
        day_outside: "day-outside text-muted-foreground/40 opacity-100", 
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: props.mode === "range" && "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_range_start: props.mode === "range" && "aria-selected:rounded-l-md",
        day_range_end: props.mode === "range" && "aria-selected:rounded-r-md",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        DayContent: ({ date: cellDate, activeModifiers }) => (
          <div className={cn("flex flex-col h-full w-full", activeModifiers.selected && "text-foreground")}>
            <div className="flex items-start justify-between space-x-1 mb-1"> 
              <div className="flex items-center space-x-1"> 
                <div className={cn(
                  "self-start text-xs font-medium px-1.5 py-0.5 rounded-full",
                   activeModifiers.today && !activeModifiers.selected && "bg-secondary text-secondary-foreground",
                   activeModifiers.selected && !activeModifiers.today && "bg-transparent text-foreground", // Number pill transparent if selected
                   activeModifiers.selected && activeModifiers.today && "bg-transparent text-foreground"  // Number pill transparent if selected and today
                )}>
                  {format(cellDate, "d")}
                </div>
                {activeModifiers.today && (
                  <span className="text-[0.6rem] font-bold text-primary uppercase tracking-wider">
                    Hoy
                  </span>
                )}
              </div>
              {activeModifiers.selected && onAddEventTrigger && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddEventTrigger(cellDate);
                  }}
                  className={cn(
                    "p-0 h-6 w-6 flex items-center justify-center rounded-full text-muted-foreground hover:text-primary hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring cursor-pointer"
                  )}
                  aria-label={`Añadir evento el ${format(cellDate, 'PPP', { locale: props.locale || es })}`}
                >
                  <PlusCircle className="h-4 w-4" />
                </div>
              )}
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
