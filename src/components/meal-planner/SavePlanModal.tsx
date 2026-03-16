'use client'

import { MouseEvent, useRef, useState } from 'react'
import { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'
import { Save, ChevronLeft, ChevronRight, Calendar } from 'lucide-react'
import { Form, Formik, FormikProps, useFormikContext } from 'formik'
import * as yup from 'yup'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
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
  mode?: 'WEEK' | 'DAY_FULL' | 'DAY_BREAKFAST' | 'DAY_LUNCH' | 'DAY_DINNER'
  selectedDay?: string | null
  mealPlanTitle?: string
}

type FormData = {
  planName: string
  dateInput: Date | DateRange | undefined
  addToCalendar: boolean
}

function SavePlanFormContent({
  step,
  setStep,
  mode,
  isSaving,
  onClose,
}: {
  step: number
  setStep: (step: number) => void
  mode: SavePlanModalProps['mode']
  isSaving: boolean
  onClose: () => void
}) {
  const {
    getFieldProps,
    touched,
    setTouched,
    errors,
    values,
    setFieldValue,
    isValid,
  } = useFormikContext<FormData>()

  const isDateSelected =
    mode === 'WEEK'
      ? values.dateInput &&
        !(values.dateInput instanceof Date) &&
        values.dateInput?.from &&
        values.dateInput?.to
      : values.dateInput instanceof Date

  const handleNext = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setTouched({
      ...touched,
      planName: true,
      dateInput: true,
    })
    if (values.planName && values.dateInput) {
      setStep(2)
    }
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleCalendarAppClick = (app: (typeof calendarApps)[0]) => {
    // if (!values.dateInput) return
    // let startDate: Date
    // let endDate: Date
    // if (values.dateInput instanceof Date) {
    //   startDate = values.dateInput
    //   endDate = values.dateInput
    // } else {
    //   startDate = values.dateInput.from!
    //   endDate = values.dateInput.to!
    // }
    // const url = app.generateUrl(title, startDate, endDate)
    // if (app.id === 'apple') {
    //   const link = document.createElement('a')
    //   link.href = url
    //   link.download = `${title.replace(/\s+/g, '_')}.ics`
    //   link.click()
    //   URL.revokeObjectURL(url)
    // } else {
    //   window.open(url, '_blank')
    // }
  }

  console.log(errors.dateInput)

  return (
    <Form>
      <>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {step === 1 ? (
              <Save className="w-5 h-5" />
            ) : (
              <Calendar className="w-5 h-5" />
            )}
            {step === 1 ? 'Save Meal Plan' : 'Add to Calendar'}
          </DialogTitle>
          <DialogDescription>
            {step === 1 &&
              'Give your meal plan a name and select the schedule days.'}
          </DialogDescription>
        </DialogHeader>

        {step === 1 && (
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="plan-name">
                Plan Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="plan-name"
                placeholder="e.g., Week 1 - Healthy Start"
                {...getFieldProps('planName')}
              />
              <p className={cn("text-sm text-destructive", !(touched.planName && errors.planName) && "h-5")}>
                {touched.planName && errors.planName ? errors.planName : " "}
              </p>
            </div>

            <div className="grid gap-2">
              <Label className="flex items-center gap-2">
                Schedule day(s) <span className="text-destructive">*</span>
              </Label>
              {mode === 'WEEK' ? (
                <>
                  <DatePickerWithRange
                    date={values.dateInput as DateRange | undefined}
                    onDateChange={(date) => setFieldValue('dateInput', date)}
                    className={
                      errors.dateInput && touched.dateInput
                        ? 'border-destructive'
                        : ''
                    }
                    onReset={() => setFieldValue('dateInput', undefined)}
                  />
                  {/** @ts-expect-error */}
                  <p className={cn("text-sm text-destructive", (errors?.dateInput as DateRange)?.from && "h-5")}>
                    {/** @ts-expect-error */}
                    {errors?.dateInput?.from ?? " "}
                  </p>
                </>
              ) : (
                <>
                  <DatePicker
                    date={values.dateInput as Date | undefined}
                    onDateChange={(date) => setFieldValue('dateInput', date)}
                    className={
                      errors.dateInput && touched.dateInput
                        ? 'border-destructive'
                        : ''
                    }
                    onReset={() => setFieldValue('dateInput', undefined)}
                  />
                  <p className="text-sm text-destructive">
                    {touched.dateInput && errors.dateInput ? errors.dateInput as string : " "}
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-2" tab-index={0}>
              <Checkbox
                id="add-to-calendar"
                checked={values.addToCalendar}
                onCheckedChange={(checked) =>
                  setFieldValue('addToCalendar', checked)
                }
              />
              <Label
                htmlFor="add-to-calendar"
                className="text-sm font-normal cursor-pointer"
              >
                Use existing calendar app
              </Label>
            </div>

            <div className="grid gap-2">
              <div className="flex flex-wrap gap-2">
                {calendarApps.map((app) => (
                  <Button
                    key={app.id}
                    type="button"
                    variant="outline"
                    size="sm"
                    className={cn(
                      'gap-2',
                      app.color,
                      !values.addToCalendar &&
                        isDateSelected &&
                        'opacity-50 cursor-not-allowed',
                    )}
                    disabled={!values.addToCalendar || !isDateSelected}
                    onClick={() => handleCalendarAppClick(app)}
                  >
                    {app.name}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        <DialogFooter className="border-t pt-4 mt-4">
          {step === 1 ? (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button type="button" onClick={handleNext} disabled={!isValid}>
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={isSaving}
              >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving...' : 'Save Plan'}
              </Button>
            </>
          )}
        </DialogFooter>
      </>
    </Form>
  )
}

function getValidationSchema (dateInputType : "DATE" | "DATE_RANGE" = "DATE_RANGE") {
  const dateInput = dateInputType === "DATE_RANGE"
    ? yup.object({
      from: yup.date().required("Please fill the date"),
      to: yup.date().required("Please fill the date"),
    }).required()
    : yup.date().required()
  return yup.object({
    planName: yup.string().required('Please enter a plan name'),
    dateInput,
    addToCalendar: yup.boolean(),
  })
  .required()
}

// const validationSchema = yup.object({
//   planName: yup.string().required('Please enter a plan name'),
//   dateInput: yup
//     .mixed<Date | DateRange>()
//     .test({
//       name: 'has-date',
//       message: 'Please select schedule day(s)',
//       test: function (value) {
//         if (!value) return false
//         if (value instanceof Date) return true
//         return [value.from, value.to].every((date) => date instanceof Date)
//       },
//     })
//     .required('Please fill the date'),
//   addToCalendar: yup.boolean(),
// })

function generateGoogleCalendarUrl(
  title: string,
  startDate: Date,
  endDate: Date,
): string {
  const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d{3}/g, '')
  const dates = `${formatDate(startDate)}/${formatDate(addDays(endDate, 1))}`
  const details = encodeURIComponent(
    `Meal plan generated by Weekly Meal Planner`,
  )
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${dates}&details=${details}`
}

function generateMicrosoftCalendarUrl(
  title: string,
  startDate: Date,
  endDate: Date,
): string {
  const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d{3}/g, '')
  const params = new URLSearchParams({
    subject: title,
    startdt: formatDate(startDate),
    enddt: formatDate(addDays(endDate, 1)),
    body: 'Meal plan generated by Weekly Meal Planner',
    allday: 'true',
  })
  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

function generateAppleCalendarUrl(
  title: string,
  startDate: Date,
  endDate: Date,
): string {
  const formatDate = (d: Date) => {
    return d
      .toISOString()
      .replace(/-|:|\.\d{3}/g, '')
      .slice(0, -1)
  }
  const dtstart = formatDate(startDate)
  const dtend = formatDate(addDays(endDate, 1))
  const description = 'Meal plan generated by Weekly Meal Planner'

  const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
DTSTART;VALUE=DATE:${dtstart}
DTEND;VALUE=DATE:${dtend}
SUMMARY:${title}
DESCRIPTION:${description}
END:VEVENT
END:VCALENDAR`

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  return URL.createObjectURL(blob)
}

const calendarApps = [
  {
    id: 'google',
    name: 'Google Calendar',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M21.3333 10.6667H12.8V14.9333H17.0667V21.3333H21.3333V10.6667ZM3.2 12.8H7.46667V21.3333H3.2V12.8ZM3.2 3.2H7.46667V7.46667H3.2V3.2ZM12.8 3.2H17.0667V7.46667H12.8V3.2ZM21.3333 3.2V7.46667H17.0667V3.2H21.3333Z" />
      </svg>
    ),
    color: 'hover:bg-red-500/10 hover:text-red-500',
    generateUrl: generateGoogleCalendarUrl,
  },
  {
    id: 'microsoft',
    name: 'Microsoft Calendar',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M3 3h7v7H3V3zm0 11h7v7H3v-7zm11-11h7v7h-7V3zm0 11h7v7h-7v-7z" />
      </svg>
    ),
    color: 'hover:bg-blue-500/10 hover:text-blue-500',
    generateUrl: generateMicrosoftCalendarUrl,
  },
  {
    id: 'apple',
    name: 'Apple Calendar',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z" />
      </svg>
    ),
    color: 'hover:bg-gray-500/10 hover:text-gray-500',
    generateUrl: generateAppleCalendarUrl,
  },
  {
    id: 'outlook',
    name: 'Outlook',
    icon: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z" />
      </svg>
    ),
    color: 'hover:bg-blue-500/10 hover:text-blue-500',
    generateUrl: generateMicrosoftCalendarUrl,
  },
]

export function SavePlanModal({
  isOpen,
  onClose,
  onSave,
  isSaving = false,
  mode = 'WEEK',
  selectedDay = null,
  mealPlanTitle = 'My Meal Plan',
}: SavePlanModalProps) {
  const [step, setStep] = useState(1)
  const formikRef = useRef<FormikProps<FormData>>(null)

  const handleClose = () => {
    setStep(1)
    formikRef.current?.resetForm()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <Formik<FormData>
          innerRef={formikRef}
          enableReinitialize
          initialValues={{
            planName: '',
            dateInput: undefined as Date | DateRange | undefined,
            addToCalendar: false,
          }}
          validationSchema={getValidationSchema(mode === 'WEEK' ? 'DATE_RANGE' : 'DATE')}
          onSubmit={async (values) => {
            try {
              await onSave(values.planName, values.dateInput!)
            } finally {
              handleClose()
            }
          }}
        >
          <SavePlanFormContent
            step={step}
            setStep={setStep}
            mode={mode}
            isSaving={isSaving}
            onClose={handleClose}
          />
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
