'use client'

import { addWeeks, format, isEqual, startOfWeek } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange, Matcher } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { X } from 'lucide-react'

export interface DatePickerProps {
  date?: Date
  onDateChange: (date?: Date) => void
  className?: string
  placeholder?: string
  disabled?: boolean
  onReset?: () => void
  /**
   * @default null
   */
  selectedDay?: null | string
}

export function DatePicker({
  date,
  onDateChange,
  className,
  placeholder = 'Select date',
  disabled = false,
  onReset,
  selectedDay = null,
}: DatePickerProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className,
          )}
          disabled={disabled}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, 'PPP') : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <div className="flex flex-col">
          <Calendar
            mode="single"
            selected={date}
            onSelect={onDateChange}
            autoFocus
          />
          {onReset && (
            <div className="border-t p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={onReset}
                disabled={!date}
              >
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}

export interface DatePickerWithRangeProps {
  date?: DateRange
  onDateChange: (date?: DateRange) => void
  className?: string
  placeholder?: string
  disabled?: boolean
  onReset?: () => void
}

export function DatePickerWithRange({
  date,
  onDateChange,
  className,
  placeholder = 'Pick a date range',
  disabled: buttonDisabled = false,
  onReset,
}: DatePickerWithRangeProps) {
  const disabled: Matcher[] = [
    {
      before: startOfWeek(new Date()),
    },
    {
      dayOfWeek: [!date ? 0 : 1, 2, 3, 4, 5, 6],
    },
    ...(date?.from
      ? [{ before: date.from, after: addWeeks(date.from, 1) } as Matcher]
      : []),
  ]

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date?.from && !date?.to && 'text-muted-foreground',
            className,
          )}
          disabled={buttonDisabled}
        >
          {date?.from ? (
            date?.to && !isEqual(date.from, date.to) ? `${format(date.from, 'PPP')} - ${format(date.to, 'PPP')}` : (
              format(date.from, 'PPP')
            )
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <div className="flex flex-col">
          <Calendar
            mode="range"
            selected={date}
            onSelect={onDateChange}
            // numberOfMonths={2}
            autoFocus
            disabled={disabled}
          />
          {onReset && (
            <div className="border-t p-2">
              <Button
                variant="ghost"
                size="sm"
                className="w-full"
                onClick={onReset}
                disabled={!date}
              >
                <X className="mr-2 h-4 w-4" />
                Clear
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  )
}
