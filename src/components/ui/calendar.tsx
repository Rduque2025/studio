
"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, CaptionProps } from "react-day-picker"
import { format } from "date-fns"
import { es } from "date-fns/locale" // Import es locale

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  locale?: Locale; // Add locale to props
}

function CustomCaption(props: CaptionProps) {
  const { displayMonth } = props;
  return (
    <div className="flex justify-between items-center mb-4 px-1">
      <h2 className="text-2xl font-bold text-foreground">
        {format(displayMonth, "MMM", { locale: es })}. {/* Use locale */}
      </h2>
      <span className="text-sm text-muted-foreground">
        {format(displayMonth, "yyyy", { locale: es })} {/* Use locale */}
      </span>
    </div>
  );
}


function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  locale = es, // Default to 'es'
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-1", className)} // Reduced padding
      locale={locale} // Pass locale to DayPicker
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-3", // Reduced space
        
        caption_end: "flex items-center justify-between", // For custom caption alignment if needed
        caption_label: "hidden", // Hide default label as we use CustomCaption

        nav: "flex items-center space-x-1 absolute top-2 right-1", // Position nav buttons
        nav_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-7 w-7 bg-transparent p-0 text-muted-foreground hover:text-foreground"
        ),
        nav_button_previous: " ", // Use custom caption, so default nav buttons less prominent or removed from default flow.
        nav_button_next: " ",
        
        table: "w-full border-collapse space-y-1",
        head_row: "flex mb-2", // Added margin bottom for spacing
        head_cell: "text-muted-foreground/80 rounded-md w-9 font-normal text-[0.75rem] uppercase", // Smaller, lighter, uppercase
        
        row: "flex w-full mt-1", // Reduced margin top
        cell: cn(
          "h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20",
          // Removing borders from cells for minimalist look
          "[&:has([aria-selected].day-range-end)]:rounded-r-md",
          "first:[&:has([aria-selected])]:rounded-l-md",
          "last:[&:has([aria-selected])]:rounded-r-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-full" // Ensure day numbers are focus of interaction
        ),
        day_range_end: "day-range-end",
        day_selected: "bg-primary text-primary-foreground hover:bg-primary/90 focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-muted/50 text-foreground rounded-full", // Subtle circle for today
        day_outside: "day-outside text-muted-foreground/50 opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Caption: CustomCaption,
        IconLeft: ({ className: iconClassName, ...rest }) => (
          <ChevronLeft className={cn("h-5 w-5", iconClassName)} {...rest} />
        ),
        IconRight: ({ className: iconClassName, ...rest }) => (
          <ChevronRight className={cn("h-5 w-5", iconClassName)} {...rest} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
