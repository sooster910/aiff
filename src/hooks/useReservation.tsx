import { useState } from 'react'



export const useReservation = () => {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  })

  const handlePayment = async () => {
    // 결제 로직
  }

  return {
    step,
    setStep,
    formData,
    setFormData,
    handlePayment,
  }
}
