import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SavePlanModal } from './SavePlanModal'
import { ReactNode } from 'react'

vi.mock('formik', async () => {
  return {
    Form: ({ children }: { children: ReactNode }) => (
      <form>{children}</form>
    ),
    Formik: ({ children }: { children: ReactNode }) => (
      <div>{children}</div>
    ),
    useFormikContext: () => ({
      getFieldProps: vi.fn(() => ({
        name: 'test',
        value: '',
        onChange: vi.fn(),
        onBlur: vi.fn(),
      })),
      touched: {},
      setTouched: vi.fn(),
      errors: {},
      values: {
        planName: '',
        dateInput: undefined,
        addToCalendar: false,
      },
      setFieldValue: vi.fn(),
      isValid: false,
    }),
  }
})

vi.mock('@/components/ui/date-picker', () => ({
  DatePicker: ({ onDateChange }: { onDateChange: (date: Date) => void }) => (
    <input
      type="date"
      data-testid="date-picker"
      onChange={(e) => onDateChange(new Date(e.target.value))}
    />
  ),
  DatePickerWithRange: ({
    onDateChange,
  }: {
    onDateChange: (date: any) => void
  }) => (
    <input
      type="date"
      data-testid="date-picker-range"
      onChange={(e) =>
        onDateChange({
          from: new Date(e.target.value),
          to: new Date(e.target.value),
        })
      }
    />
  ),
}))

vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ open, children }: { open: boolean; children: ReactNode }) =>
    open ? <div data-testid="dialog">{children}</div> : null,
  DialogContent: ({ children }: { children: ReactNode }) => (
    <div data-testid="dialog-content">{children}</div>
  ),
  DialogHeader: ({ children }: { children: ReactNode }) => (
    <div data-testid="dialog-header">{children}</div>
  ),
  DialogTitle: ({ children }: { children: ReactNode }) => (
    <h2 data-testid="dialog-title">{children}</h2>
  ),
  DialogDescription: ({ children }: { children: ReactNode }) => (
    <p data-testid="dialog-description">{children}</p>
  ),
  DialogFooter: ({ children }: { children: ReactNode }) => (
    <div data-testid="dialog-footer">{children}</div>
  ),
}))

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, disabled, type, onClick, ...props }: any) => (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      data-testid="button"
      {...props}
    >
      {children}
    </button>
  ),
}))

vi.mock('@/components/ui/input', () => ({
  Input: (props: any) => <input {...props} data-testid="input" />,
}))

vi.mock('@/components/ui/label', () => ({
  Label: ({ children, ...props }: any) => <label {...props}>{children}</label>,
}))

vi.mock('@/components/ui/checkbox', () => ({
  Checkbox: ({ checked, onCheckedChange, ...props }: any) => (
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
      {...props}
    />
  ),
}))

describe('SavePlanModal', () => {
  const defaultProps = {
    isOpen: true,
    onClose: vi.fn(),
    onSave: vi.fn().mockResolvedValue(undefined),
    isSaving: false,
    mode: 'WEEK' as const,
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly when open', () => {
    render(<SavePlanModal {...defaultProps} />)

    expect(screen.getByTestId('dialog')).toBeInTheDocument()
    expect(screen.getByText('Save Meal Plan')).toBeInTheDocument()
  })

  it('calls onClose when dialog is closed', () => {
    const onClose = vi.fn()
    render(<SavePlanModal {...defaultProps} onClose={onClose} />)

    expect(screen.getByTestId('dialog')).toBeInTheDocument()
  })

  it('renders step 1 form elements', () => {
    render(<SavePlanModal {...defaultProps} />)

    expect(screen.getByText('Plan Name')).toBeInTheDocument()
    expect(screen.getByText('Schedule day(s)')).toBeInTheDocument()
    expect(screen.getByText('Cancel')).toBeInTheDocument()
    expect(screen.getByText('Next')).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    render(<SavePlanModal {...defaultProps} isOpen={false} />)

    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument()
  })
})
