import { useReservation } from '@app/hooks/useReservation'
import {
  Accordion,
  AccordionItem,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'

export type ReservationFormType = {
  name: string
  phone: string
}
export type ReservationFormProps = {
  onNext: () => void
  register: any
  control: any
}

export interface FormDataType {
  name: string
  phone: string
  qty: number
}

export const ReservationForm = ({
  onNext,
  control,
  register,
}: ReservationFormProps) => {
  const onSubmit = (e) => {
    e.preventDefault()
    onNext()
  }

  return (
    <form>
      <div className="space-y-6">
        <h4 className="text-lg font-medium">예약 정보 입력</h4>
        <div className="space-y-4">
          <div>
            <Controller
              name="qty"
              control={control}
              render={({ field }) => (
                <Select
                  label="인원을 선택해 주세요"
                  className="max-w-xs"
                  {...field}
                >
                  {Array.from({ length: 10 }, (_, i) => ({
                    key: (i + 1).toString(),
                    label: (i + 1).toString(),
                  })).map((item) => (
                    <SelectItem key={item.key}>{item.label}</SelectItem>
                  ))}
                </Select>
              )}
            />
          </div>
          <div>
            <Input
              label={'이름을 작성해 주세요.'}
              type="text"
              required
              {...register('name')}
            />
          </div>

          <div>
            <Input
              label={'연락처를 작성해 주세요.'}
              type="tel"
              required
              {...register('phone')}
            />
          </div>
          <div>
            <p>
              수업 7일 전까지 알려주시면 100% 환불 가능하며 선재료 준비로 인해
              6일전~ 3일전까지는 50%가 환불됩니다. 그 이후에는 환불 불가하며
              당일 No Show인 경우에도 환불이 어렵습니다. 여러 사정으로 당일
              취소를 원하시는 분들도 계시겠지만 그런 경우 다른 분들에게 기회를
              드리지 못하는 부분이 발생되어 원활한 수업 진행을 위한 환불 규정
              이오니 양해를 부탁드립니다. 감사합니다.
            </p>
          </div>
          <div>
            <Checkbox defaultSelected size="lg">
              약관 동의
            </Checkbox>
            <Accordion>
              <AccordionItem key="1" aria-label="Accordion 1">
                <Textarea
                  isReadOnly
                  defaultValue="아이프에서는 「클래스 수강」과 관련하여 귀하의 개인정보를
                    아래와 같이 수집·이용하고자 합니다.
                    다음의 사항에 대해 충분히 읽어보신 후 동의 여부를 체크, 서명하여 주시기 바랍니다.
                    ▶ 개인정보 수집 및 이용 동의 [고유식별정보]
                    수집·이용하려는 개인정보의 항목: 성명, 연락처
                    개인정보의 수집·이용 목적: 수강예약 및 안내 사항 전달
                    개인정보 이용기간 및 보유기간:3개월 수탁 업체: 인포뱅크
                    비즈플러스 위탁 업무: 카카오톡 메시지 발송 업무
                    ※ 귀하께서는 개인정보 제공 및 활용에 거부할 권리가 있습니다.
                    ☞ 동의 거부시 불이익 안내 : 동의하시지 않을 경우 신청 자격은
                    제외됩니다. 양도 등의 문제를 피하기 위함입니다.  클래스
                    업무 이외의 다른 목적으로 사용하지 않습니다."
                />
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <button
          onClick={onSubmit}
          className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
        >
          다음 단계
        </button>
      </div>
    </form>
  )
}
