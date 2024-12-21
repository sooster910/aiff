import { FormikProps } from 'formik'
import * as React from 'react'
import { FormValues } from '@app/components/SuspenseBooking'
import { DayPicker, OnSelectHandler } from 'react-day-picker'
import 'react-day-picker/style.css'

type SelectDateProps = {
  onChange: OnSelectHandler<Date>
  value: FormikProps<FormValues>['values']['date']

}

export const SelectDate = ({ onChange, value }: SelectDateProps) => {
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
      />

    </div>
  )
}
