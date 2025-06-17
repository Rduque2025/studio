
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, CaptionProps } from "react-day-picker" 
import { format } from "date-fns"
import { es } from "date-fns/locale" 

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  locale?: Locale; 
  renderDayContent?: (date: Date) => React.ReactNode;
}

function CustomCaption(props: CaptionProps) {
  const { displayMonth, goToMonth, previousMonth, nextMonth } = props;
  return (
    <div className="flex justify-between items-center mb-4 px-1">
      <h2 className="text-2xl font-bold text-foreground">
        {format(displayMonth, "MMMM yyyy", { locale: es })}.
      </h2>
      <div className="space-x-1 flex items-center">
        <button
          type="button"
          onClick={() => previousMonth && goToMonth(previousMonth)}
          disabled={!previousMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
          aria-label="Mes anterior"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          onClick={() => nextMonth && goToMonth(nextMonth)}
          disabled={!nextMonth}
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          )}
          aria-label="Mes siguiente"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}


function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  locale = es, 
  renderDayContent,
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
        
        caption: "flex justify-center pt-1 relative items-center", 
        caption_label: "text-lg font-medium text-foreground", 
        caption_dropdowns: "flex gap-1", 

        nav: "space-x-1 flex items-center", 
        nav_button: cn( 
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1", 
        nav_button_next: "absolute right-1",   
        
        table: "w-full border-collapse space-y-1",
        head_row: "flex mb-1", 
        head_cell: "text-muted-foreground/80 rounded-md w-full font-normal text-[0.8rem] uppercase justify-center flex",
        
        row: "flex w-full mt-1 gap-1", 
        cell: cn( 
          "w-full text-sm p-0 relative focus-within:relative focus-within:z-20 border border-border rounded-md",
          "min-h-[10rem] h-auto", 
          props.mode === "range" &&
            "has-[[aria-selected=true_],[aria-selected=true_span_end],[aria-selected=true_span_start]]:bg-accent/50",
          props.mode === "multiple" && "has-[[aria-selected=true]]:bg-accent/50"
        ),
        day: cn(
          "h-full w-full p-1.5 text-left align-top font-normal flex flex-col" 
        ),
        day_selected: 
          cn( (props.mode === "single" || props.mode === "multiple" || props.mode === "range") && 
              "bg-[#dcdcdc] text-foreground hover:bg-[#c8c8c8] focus:bg-[#c8c8c8] rounded-md dark:bg-slate-700 dark:text-slate-50 dark:hover:bg-slate-600 dark:focus:bg-slate-600"
            ),
        day_today: "bg-sky-100 dark:bg-sky-900/50 border-2 border-sky-300 dark:border-sky-700 rounded-md", 
        day_outside: "day-outside text-muted-foreground/40 opacity-100", 
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: props.mode === "range" && "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_range_start: props.mode === "range" && "aria-selected:rounded-l-md",
        day_range_end: props.mode === "range" && "aria-selected:rounded-r-md",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Caption: CustomCaption,
        DayContent: ({ date: cellDate, activeModifiers }) => (
          <div className={cn("flex flex-col h-full w-full", activeModifiers.selected && "text-foreground")}>
            <div className="flex items-center space-x-1 mb-1"> 
              <div className={cn(
                "self-start text-xs font-medium px-1.5 py-0.5 rounded-full",
                 activeModifiers.today && !activeModifiers.selected && "bg-secondary text-secondary-foreground",
                 activeModifiers.selected && !activeModifiers.today && "bg-[#dcdcdc] text-foreground", // Selected, not today
                 activeModifiers.selected && activeModifiers.today && "bg-[#dcdcdc] text-foreground" // Selected AND today
              )}>
                {format(cellDate, "d")}
              </div>
              {activeModifiers.today && (
                <span className="text-[0.6rem] font-bold text-primary uppercase tracking-wider">
                  Hoy
                </span>
              )}
            </div>
            {renderDayContent ? renderDayContent(cellDate) : null}
          </div>
        ),
        IconLeft: ({ ...rest }) => ( 
          <ChevronLeft className={cn("h-4 w-4")} {...rest} />
        ),
        IconRight: ({ ...rest }) => ( 
          <ChevronRight className={cn("h-4 w-4")} {...rest} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }

