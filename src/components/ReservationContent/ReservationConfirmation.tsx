import { TimeSlotFragment$key } from '../../../__generated__/TimeSlotFragment.graphql'
import { useFragment } from 'react-relay'
import { TimeSlotFragment } from '@app/components/TimeSlot'
import { DateTime } from 'luxon'
import { config } from '@app/config'

type ReservationConfirmationProps = {
  queryData: TimeSlotFragment$key
  formData: {
    qty: number
    name: string
    phone: string
  }
  onBack: () => void
  onPayment: () => void
}
export const ReservationConfirmation = ({
  onBack,
  onPayment,
  queryData,
  formData,
}: ReservationConfirmationProps) => {
  const timeSlot = useFragment(TimeSlotFragment, queryData)

  return (
    <div className="space-y-6">
      <div className="flex itemses-center gap-2 mb-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h4 className="text-lg font-medium">예약 확인</h4>
      </div>

      <div className="bg-gray-50 rounded-lg p-4 space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-500">클래스</span>
          <span className="font-medium">{timeSlot.regularClass.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">시간</span>
          <span className="font-medium">
            {DateTime.fromISO(timeSlot.startDateTime)
              .setZone(config.IANA_DEFAULT_TIMEZONE)
              .toFormat('yyyy년 MM월 dd일 HH:mm a')}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">예약인원</span>
          <span className="font-medium">{formData.qty} 명</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">예약자</span>
          <span className="font-medium">{formData.name}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">연락처</span>
          <span className="font-medium">{formData.phone}</span>
        </div>
        <div className="border-t border-gray-200 my-2" />
        <div className="flex justify-between font-medium">
          <span>결제 금액</span>
          <span className="text-blue-600">
            {new Intl.NumberFormat('ko-KR', {
              style: 'currency',
              currency: 'KRW',
            }).format(formData.qty * timeSlot.regularClass.price)}
          </span>
        </div>
      </div>

      <button
        onClick={onPayment}
        className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      >
        결제하기
      </button>
    </div>
  )
}
