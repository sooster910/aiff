import { FormValues } from '@app/components/Forms/BookingClassForm'
import { FormikProps } from 'formik'
import {
  DayPicker,
  getDefaultClassNames,
  OnSelectHandler,
} from 'react-day-picker'
import 'react-day-picker/style.css'

type SelectDateProps = {
  onChange: OnSelectHandler<Date>
  value: FormikProps<FormValues>['values']['date']
  isPending?: boolean
}

export const SelectDate = ({ onChange, value, isPending }: SelectDateProps) => {
  const defaultClassNames = getDefaultClassNames()

  return (
    <div className="datetime-selector flex flex-col items-center ">
      <DayPicker
        classNames={{ selected: 'bg-primary-300', chevron: 'text-gray-400' }}
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
