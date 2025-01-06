import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormDataType } from '@app/components/ReservationContent/ReservationForm'

export const useReservation = () => {
  const [step, setStep] = useState(1)
  const { control, handleSubmit, register, getValues } = useForm<FormDataType>({
    defaultValues: {
      qty: 1,
      name: '',
      phone: '',
    },
  })
  const formData = getValues()
  // const onSubmit: SubmitHandler<FormDataType> = (data) => console.log(data)
  const handlePayment = async () => {
    // 결제 로직
  }

  return {
    step,
    setStep,
    control,
    register,
    handleSubmit,
    handlePayment,
    formData,
  }
}
