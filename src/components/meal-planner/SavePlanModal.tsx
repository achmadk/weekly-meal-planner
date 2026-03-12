'use client'

import { useState } from 'react'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { Save, CalendarDays } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { DatePicker, DatePickerWithRange } from '@/components/ui/date-picker'

interface SavePlanModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name: string, dateInput: Date | DateRange) => Promise<void>
  isSaving?: boolean
  mode?: "WEEK" | "DAY_FULL" | "DAY_BREAKFAST" | "DAY_LUNCH" | "DAY_DINNER"
  /**
   * @description only apply when {@link mode} is `DAY_*`
   * @default null
   */
  selectedDay?: string | null
}

export function SavePlanModal({
  isOpen,
  onClose,
  onSave,
  isSaving = false,
  mode = "WEEK",
  selectedDay = null,
}: SavePlanModalProps) {
  const [planName, setPlanName] = useState('')
  const [dateInput, setDateInput] = useState<Date | DateRange | undefined>(undefined)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (mode === "WEEK" && !(dateInput instanceof Date) && (!dateInput?.from || !dateInput?.to)) {
      setError('Please select schedule days')
      return
    } else if (mode !== "WEEK" && !(dateInput instanceof Date)) {
      setError('Please select schedule day')
      return
    }

    setError('')
    onSave(planName, dateInput!)
  }

  const handleClose = () => {
    setPlanName('')
    setDateInput(undefined)
    setError('')
    onClose()
  }

  // const isValid = dateInput?.from && dateInput?.to

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Save className="w-5 h-5" />
              Save Meal Plan
            </DialogTitle>
            <DialogDescription>
              Give your meal plan a name and select the schedule days.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="plan-name">Plan Name (optional)</Label>
              <Input
                id="plan-name"
                placeholder="e.g., Week 1 - Healthy Start"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4" />
                Schedule Day(s) <span className="text-destructive">*</span>
              </Label>
              {
                mode === "WEEK" && !(dateInput instanceof Date) ? (
                  <>
                    <DatePickerWithRange
                date={dateInput}
                onDateChange={setDateInput}
                className={cn(error && 'border-destructive')}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              {dateInput?.from && dateInput?.to && (
                <p className="text-sm text-muted-foreground">
                  Selected: {format(dateInput.from, 'MMM d, yyyy')} -{' '}
                  {format(dateInput.to, 'MMM d, yyyy')}
                </p>
              )}
                  </>
                ) : (
                  <>
                    <DatePicker
                date={dateInput as Date}
                onDateChange={setDateInput}
                className={cn(error && 'border-destructive')}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              {dateInput && (
                <p className="text-sm text-muted-foreground">
                  Selected: {format(dateInput as Date, 'MMM d, yyyy')}
                </p>
              )}
                  </>
                )
              }
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving ? 'Saving...' : 'Save Plan'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
