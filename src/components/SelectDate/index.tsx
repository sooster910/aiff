import { FormValues } from '@app/components/Forms/BookingClassForm'
import { FormikProps } from 'formik'
import { DayPicker, OnSelectHandler } from 'react-day-picker'
import 'react-day-picker/style.css'

type SelectDateProps = {
  onChange: OnSelectHandler<Date>
  value: FormikProps<FormValues>['values']['date']
  isPending?: boolean
}

export const SelectDate = ({ onChange, value, isPending }: SelectDateProps) => {
  return (
    <div className="datetime-selector">
      <DayPicker
        captionLayout="dropdown"
        mode="single"
        numberOfMonths={1}
        showOutsideDays
        timeZone="Asia/Seoul"
        selected={value}
        onSelect={onChange}
        required
      />
    </div>
  )
}
