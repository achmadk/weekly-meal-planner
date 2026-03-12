'use client'

import { format } from 'date-fns'
import { Calendar as CalendarIcon, CalendarDays } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

export interface DatePickerProps {
  date?: Date
  onDateChange: (date?: Date) => void
  className?: string
  placeholder?: string
  disabled?: boolean
}

export function DatePicker({
  date,
  onDateChange,
  className,
  placeholder = 'Select date',
  disabled = false,
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
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          autoFocus
        />
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
}

export function DatePickerWithRange({
  date,
  onDateChange,
  className,
  placeholder = 'Pick a date range',
  disabled = false,
}: DatePickerWithRangeProps) {
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
          disabled={disabled}
        >
          <CalendarDays className="mr-2 h-4 w-4" />
          {date?.from ? (
            date.to ? (
              <>
                {format(date.from, 'PPP')} - {format(date.to, 'PPP')}
              </>
            ) : (
              format(date.from, 'PPP')
            )
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="end">
        <Calendar
          mode="range"
          selected={date}
          onSelect={onDateChange}
          numberOfMonths={2}
          autoFocus
        />
      </PopoverContent>
    </Popover>
  )
}
