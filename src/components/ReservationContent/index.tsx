import { ClassInfo } from '@app/components/ReservationContent/ClassInfo'
import { ReservationConfirmation } from '@app/components/ReservationContent/ReservationConfirmation'
import { ReservationForm } from '@app/components/ReservationContent/ReservationForm'

export const ReservationContent = ({
  queryData,
  step,
  setStep,
  formData,
  setFormData,
  handlePayment,
}) => {
  return (
    <>
      <ClassInfo queryData={queryData.timeSlot} />
      {step === 1 && (
        <ReservationForm
          formData={formData}
          onFormChange={setFormData}
          onNext={() => setStep(2)}
        />
      )}
      {step === 2 && (
        <ReservationConfirmation
          classInfo={queryData}
          formData={formData}
          onBack={() => setStep(1)}
          onPayment={handlePayment}
        />
      )}
    </>
  )
}
