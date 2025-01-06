import { ClassInfo } from '@app/components/ReservationContent/ClassInfo'
import { ReservationConfirmation } from '@app/components/ReservationContent/ReservationConfirmation'
import { ReservationForm } from '@app/components/ReservationContent/ReservationForm'

export const ReservationContent = ({
  queryData,
  step,
  setStep,
  formData,
  handlePayment,
  register,
  control,
}) => {
  return (
    <>
      <ClassInfo queryData={queryData.timeSlot} />
      {step === 1 && (
        <ReservationForm
          control={control}
          onNext={() => setStep(2)}
          register={register}
        />
      )}
      {step === 2 && (
        <ReservationConfirmation
          queryData={queryData.timeSlot}
          classInfo={queryData.timeSlot}
          formData={formData}
          onBack={() => setStep(1)}
          onPayment={handlePayment}
        />
      )}
    </>
  )
}
