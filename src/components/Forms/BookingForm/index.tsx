import CustomInput from "@app/components/CustomInput"
import {LocationDetailLayout} from "@app/layouts/LocationDetailLayout"
import {Nullable, RegularClassDTO, StorePrefix} from "@app/types"
import {StoreDTO} from "@app/types/store"
import {
  NEXT_PUBLIC_PAYMENT_SUCCESS_URL,
  NEXT_PUBLIC_PAYMENT_FAIL_URL,
  NEXT_PUBLIC_TOSS_CLIENT_KEY,
} from "@app/utils/constants"
import {
  Button,
  Card,
  Collapse,
  Divider,
  Drawer,
  Grid,
  Modal,
  Note,
  Spacer,
  Text,
  useModal,
  useToasts,
  Image,
} from "@geist-ui/core"
import {Calendar, Navigation, Clock, Users, InfoFill} from "@geist-ui/icons"
import {loadTossPayments} from "@tosspayments/payment-sdk"
import {Formik, Form, Field} from "formik"
import {DateTime} from "luxon"
import * as React from "react"
import {useState, useMemo, useCallback, useEffect} from "react"
import * as Yup from "yup"
import {TimeSlotForm} from "../TimeSlotForm"
import {ControlFlow} from "./ControlFlow"
import {TimeSlotDTO} from "@app/types/timeslot"
import ImageComp from "../../ImageComp"
import {config} from "../../../config"
import {XCircle} from "@geist-ui/icons"

interface BookingFormProps {
  data?: {
    stores?: StoreDTO[]
  }
}
type ReservationDTO = {
  date?: Date
  store?: string
  timeSlot?: string
  qty?: number
  custormerFullName?: string
  phone?: string
  classPrice?: number | RegularClassDTO
  totalAmount?: number
  orderId?: string
  className?: string
  time?: string
}

type PaymentRequestDTO = {
  amount: number
  orderId: string
  orderName: string
  customerName: string
  successUrl: string
  failUrl: string
}
function compare(obj: TimeSlotDTO[], date: string) {
  const qsYear = DateTime.fromSQL(date as string).get("year")
  const qsMonth = DateTime.fromSQL(date as string).get("month")
  const qsDay = DateTime.fromSQL(date as string).get("day")

  // console.log('year',year)

  return obj?.filter((timeslot: TimeSlotDTO) => {
    const year = DateTime.fromSQL(timeslot?.startDate).get("year")
    const month = DateTime.fromSQL(timeslot?.startDate).get("month")
    const day = DateTime.fromSQL(timeslot?.startDate).get("day")

    if (qsYear === year && qsMonth === month && qsDay === day) {
      return true
    }
    return false
  })
}
const BookingForm: React.FunctionComponent<BookingFormProps> = ({data}) => {
  // const theme = useTheme()
  const {setToast} = useToasts()
  const confirmBooking = useModal()
  const [modalEvent, setModalEvent] = useState<Nullable<ReservationDTO>>(null)
  const [selectedStore, setSelectedStore] = useState<string>("")
  const [selectedRegularClass, setSelectedRegularClass] = useState<string>("")
  const [paymentModal, setPaymentModal] = useState<boolean>(false)
  const [requestPaymentObj, setRequestPaymentobj] =
    useState<PaymentRequestDTO | null>(null)
  const [selectedDate, setSelectedDate] = useState<string>(
    DateTime.fromJSDate(new Date()).toFormat("yyyy-MM-dd")
  )
  const [visibleBaneer, setVisibleBanner] = useState<boolean>(false)
  useEffect(() => {}, [visibleBaneer])
  useEffect(() => {
    const tossPaymentsProcess = async () => {
      const tossPayments = await loadTossPayments(NEXT_PUBLIC_TOSS_CLIENT_KEY)
      if (tossPayments && requestPaymentObj) {
        tossPayments
          .requestPayment(config.PaymentMethod, requestPaymentObj)
          .catch((error) => {
            if (error.code === "USER_CANCEL") {
              // 취소 이벤트 처리
              console.log("error", error)
              setPaymentModal(false)
            }
          })
      }
    }
    if (paymentModal) {
      tossPaymentsProcess()
    }
  }, [paymentModal, requestPaymentObj])

  const filterTimeSlots = () => {
    const classes = data?.stores?.[Number(selectedStore) - 1]?.regularClasses
    const regularClass = classes?.filter(
      (v) => v?.id === selectedRegularClass
    )?.[0]
    const timeSlotsList = compare(
      (regularClass as RegularClassDTO).timeSlots,
      selectedDate
    )
    return timeSlotsList
  }
  const filteredTimeslots = useMemo(
    () => filterTimeSlots(),
    [selectedRegularClass, selectedDate, selectedStore]
  )
  const confirmHandler = () => {
    // TODO : api 오더 정보 업데이트 하기
    // payment page로 보내기
    confirmBooking.setVisible(false)
    setPaymentModal(true)
  }

  const handleLocationClicked = (
    id: string,
    setFieldValue: (
      field: string,
      value: any,
      shouldValidate?: boolean | undefined
    ) => void
  ) => {
    // TODO : request get timeslot query with date
    setSelectedStore(id)
    setFieldValue("store", id)
  }

  const handleRegularClassClickedilte = useCallback(
    (classId) => {
      setSelectedRegularClass(classId)
    },
    [selectedRegularClass]
  )

  const filteredLocation = useMemo(
    () => data?.stores?.find((store) => store?._id === selectedStore),
    [selectedStore]
  )
  console.log("filteredLocation")
  const isSelectedStore = !!selectedStore

  const initialValues = {
    date: new Date(),
    store: selectedStore,
    timeSlot: "",
    qty: 0,
    customerFullName: "",
    phone: "",
    // classPrice:
    //   filteredLocation?.regularClasses[Number(selectedRegularClass) - 1] ?? 0,
    totalAmount: 0,
  }
  const validationSchema = Yup.object().shape({
    date: Yup.date().required("날짜를 선택해 주세요."),
    store: Yup.string().required("지점을 다시 선택해 주세요."),
    timeSlot: Yup.string().required("시간을 다시 선택해 주세요."),
    qty: Yup.number()
      .min(1, "인원 수는 최소 1명 이상 이어야 해요.")
      .required("인원 수를 선택해 주세요."),
    customerFullName: Yup.string().required("예약자 이름을 적어주세요."),
    phone: Yup.string().required("예약자 핸드폰 번호를 적어주세요."),
  })
  return (
    <>
      <Text
        h3
        b
        style={{
          textAlign: "center",
          marginTop: "3rem",
        }}
      >
        클래스 예약 😀{" "}
      </Text>

      {/* <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, help) => {
          try {
            const storeInfo = data?.stores?.find(
              (store: StoreDTO) => store._id === values.store
            )

            const regularClassInfo = storeInfo?.regularClasses?.find(
              (regularClass: RegularClassDTO) =>
                regularClass._id === selectedRegularClass
            )

            const timeSlotObj = regularClassInfo?.timeSlots?.find(
              (timeslot: TimeSlotDTO) => timeslot._id === values.timeSlot
            )
            const leftSeating =
              Number(timeSlotObj.maximumBookingCount) -
              Number(timeSlotObj.currentBookingCount)
            // prevent overbooking
            if (leftSeating < Number(values.qty)) {
              help.resetForm()
              setSelectedStore('')
              setSelectedRegularClass('')
              return setToast({
                text: '남은 자리 보다 더 많이 예약했어요!',
                type: 'error',
              })
            }
            const { totalAmount, customerFullName, store } = values
            const storeName = data?.stores[Number(store) - 1]?.name
            const className = regularClassInfo?.name
            const orderId = `${StorePrefix[storeName]}${new Date()
              .getTime()
              .toString()}`
            // const timeSlotString = DateTime.fromISO(
            //   timeSlotObj?.startDateTime
            // ).toLocaleString(DateTime.DATETIME_SHORT)
            setModalEvent({
              orderId,
              store: storeName,
              time: timeSlotObj?.startDateTime,
              className,
              ...values,
            })

            confirmBooking.setVisible(true)
            setRequestPaymentobj({
              amount: totalAmount,
              orderId,
              orderName: `${storeName}-${className}-${
                timeSlotObj?._id
              }-${DateTime.fromISO(timeSlotObj?.startDateTime).toLocaleString(
                DateTime.DATETIME_SHORT
              )}-${values.phone}`,
              customerName: customerFullName,
              // successUrl: 'http://localhost:3434/payment/success',
              successUrl: `${NEXT_PUBLIC_PAYMENT_SUCCESS_URL}?phone=${values.phone}&qty=${values.qty}&customerName=${customerFullName}`,
              failUrl: NEXT_PUBLIC_PAYMENT_FAIL_URL,
            })

            help.setSubmitting(true)
            // confirm or cancel 버튼의 확인이 필요하다.
          } catch (error) {
            console.log('error', error)
          } finally {
            help.setSubmitting(false)
          }
        }}
      >
        {({
          setFieldValue,
          setFieldTouched,
          submitForm,
          values,
          isSubmitting,
          isValid,
          isValidating,
          setErrors,
          resetForm,
          errors,
          touched,
          dirty,
        }) => (
          <>
            <Form style={{ width: '90%', margin: '0 auto' }}>
              <Grid.Container gap={1} justify="flex-start" alignItems="center">
                <Grid>
                  <Calendar size={24} />
                </Grid>
                <Grid>
                  <Text>{'날짜 선택'}</Text>
                </Grid>
              </Grid.Container>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <input
                  type="date"
                  id="start"
                  name="date"
                  value={DateTime.fromJSDate(values?.date).toFormat(
                    'yyyy-MM-dd'
                  )}
                  min="2022-07-01"
                  max="2022-08-30"
                  size={20}
                  style={{ width: '100%', height: '40px' }}
                  onChange={e => {
                    if (e.currentTarget.validity.valid) {
                      const newValue = DateTime.fromISO(
                        e.currentTarget.value
                      ).toJSDate()
                      setSelectedDate(
                        DateTime.fromISO(e.currentTarget.value).toFormat(
                          'yyyy-MM-dd'
                        )
                      )
                      setFieldValue('date', newValue)
                    }
                  }}
                />
              </div>
              {/* <Grid style={{ textAlign: 'center' }}>
                <Badge
                  scale={2}
                  style={{ backgroundColor: theme.palette.successLight }}
                >
                  {values.date
                    ? format(values.date, 'PP')
                    : format(new Date(), 'PP')}
                </Badge>
              </Grid> */}
      {/* <Divider />

              <Grid.Container
                gap={1}
                justify="flex-start"
                alignItems="center"
                style={{ marginTop: '2rem' }}
              >
                <Grid>
                  <Navigation size={24} />
                </Grid>
                <Grid>
                  <Text>{'지점 선택'}</Text>
                </Grid>{' '}
                {errors?.store && (
                  <>
                    <Spacer />
                    <Note label="" type="error">
                      {errors.store}
                    </Note>
                  </>
                )}
              </Grid.Container>
              <Grid.Container gap={2} style={{ marginTop: '1rem' }}>
                {data?.stores?.map((store: any) => {
                  return (
                    <Grid key={store?._id}>
                      <Button
                        id={store?._id}
                        color="primary"
                        style={{ marginLeft: '2px' }}
                        name={'store'}
                        auto
                        onClick={e =>
                          handleLocationClicked(store?._id, setFieldValue)
                        }
                      >
                        {store.name}
                      </Button>
                    </Grid>
                  )
                })}
              </Grid.Container>

              <ControlFlow if={isSelectedStore}>
                <LocationDetailLayout>
                  <Grid.Container mt={2}>
                    <Card width={'100%'}>
                      <Card.Content>
                        <Text my={0}>{filteredLocation?.name}</Text>
                      </Card.Content>
                      <Divider h="1px" my={0} />
                      <Card.Content>
                        <ul>
                          {filteredLocation?.description
                            ?.split('\\n')
                            .map((v, i) => (
                              <li key={i.toString()}>{v}</li>
                            ))}
                        </ul>
                      </Card.Content>
                    </Card>

                    <Spacer />
                  </Grid.Container>
                  <Grid.Container
                    gap={1}
                    justify="flex-start"
                    alignItems="center"
                    mt={2}
                  >
                    <Grid>
                      <Clock size={24} />
                    </Grid>
                    <Grid>
                      <Text>{'클래스/시간 선택'}</Text>
                    </Grid>
                  </Grid.Container>

                  <Collapse.Group>
                    {filteredLocation?.regularClasses?.map(
                      (singleClass: RegularClassDTO) => (
                        <Collapse
                          title={singleClass?.name}
                          key={singleClass._id}
                          onClick={() => {
                            setFieldValue('classPrice', singleClass?.price)
                            handleRegularClassClicked(singleClass._id)
                          }}
                        >
                          <Card width="98%" shadow>
                            <div
                              style={{
                                display: `${
                                  Number(singleClass._id) < 4 ? 'flex' : 'block'
                                }`,
                              }}
                            >
                              {Number(singleClass._id) < 4 && (
                                <ImageComp
                                  src={`class_${singleClass._id}.jpg`}
                                />
                              )}

                              <Grid style={{ width: '80%' }}>
                                {singleClass?.description &&
                                  singleClass?.description
                                    ?.split('\\n')
                                    .map((v, i) => (
                                      <Text
                                        key={i.toString()}
                                        font={0.8}
                                        paddingLeft={0.4}
                                        p
                                        b
                                        margin={0}
                                        style={{ color: 'GrayText' }}
                                      >
                                        {v}
                                      </Text>
                                    ))}
                              </Grid>
                            </div>
                          </Card>

                          {!!selectedRegularClass && (
                            <TimeSlotForm
                              timeSlots={filteredTimeslots}
                              date={values?.date}
                              storeId={selectedStore}
                              classId={selectedRegularClass}
                              handleSelectTimeSlot={timeSlotId => {
                                setFieldValue('timeSlot', timeSlotId)
                                if (Number(values?.qty) > 0) {
                                  setFieldValue(
                                    'totalAmount',
                                    Number(values.qty) *
                                      Number(values.classPrice)
                                  )
                                }
                              }}
                            />
                          )}
                        </Collapse>
                      )
                    )}
                    {errors?.timeSlot && (
                      <>
                        <Spacer />
                        <Note label="" type="error">
                          {errors.timeSlot}
                        </Note>
                      </>
                    )}
                  </Collapse.Group>

                  <Grid.Container
                    gap={1}
                    justify="flex-start"
                    alignItems="center"
                    mt={2}
                  >
                    <Grid>
                      <Users size={24} />
                    </Grid>
                    <Grid>
                      <Text>{'인원 선택'}</Text>
                    </Grid>
                  </Grid.Container>

                  <Field
                    label={'인원/명'}
                    as={CustomInput}
                    name={'qty'}
                    htmlType={'number'}
                    min={1}
                    max={10}
                    errors={errors}
                    touched={touched}
                    placeholder="인원/명"
                    onChange={e => {
                      setFieldValue('qty', e.target.value)
                      setFieldValue(
                        'totalAmount',
                        Number(e.target.value) * Number(values.classPrice)
                      )
                    }}
                  />
                </LocationDetailLayout>
                {/*  customer info */}
      {/* <Grid.Container
                  gap={1}
                  justify="flex-start"
                  alignItems="center"
                  mt={2}
                >
                  <Grid>
                    <InfoFill size={24} />
                  </Grid>
                  <Grid>
                    <Text>{'예약자 정보'}</Text>
                  </Grid>
                </Grid.Container>
                <Grid.Container>
                  <Grid xs={24}>
                    <Field
                      name={'customerFullName'}
                      as={CustomInput}
                      label={'이름'}
                      placeholder="이름"
                      errors={errors}
                      touched={touched}
                      style={{ width: '100%' }}
                    />
                  </Grid>
                  <Grid xs={24} mt={1}>
                    <Field
                      name={'phone'}
                      as={CustomInput}
                      label={'핸드폰 번호'}
                      htmlType={'tel'}
                      errors={errors}
                      touched={touched}
                      placeholder="핸드폰 번호"
                    />
                  </Grid>
                  <Grid>
                    <Divider />
                    <p style={{ textAlign: 'center', color: 'GrayText' }}>
                      환불 규정
                    </p>
                    <Text p small mt={0} style={{ color: 'GrayText' }}>
                      수업 7일전까지 알려주시면 100%환불가능하며 선재료준비로
                      인해 6일전-3일전까지는 50%가 환불됩니다. 그 이후에는
                      환불불가하며 당일 No Show인 경우에도 환불이 어렵습니다.
                      여러사정으로 당일 취소를 원하시는 분들도 계시겠지만
                      그런경우 다른 분들에게 기회를 드리지 못하는 부분이
                      발생되어 원활한 수업진행을 위한 환불규정이오니 양해를
                      부탁드립니다. 감사합니다.
                    </Text>
                  </Grid>
                </Grid.Container>
                <Divider mt={4} />
                <Grid.Container mt={4}>
                  <Grid xs={24}>
                    <Card width={'100%'}>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text> 클래스 가격 : </Text>
                        <Text>
                          {' '}
                          {Number(values?.classPrice).toLocaleString()}
                        </Text>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>인원 : </Text>
                        <Text> {Number(values?.qty).toLocaleString()}명</Text>
                      </div>

                      <Divider />
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                        }}
                      >
                        <Text>Total Amount</Text>
                        <Text>{values?.totalAmount}</Text>
                      </div>
                    </Card>
                  </Grid>
                </Grid.Container>
                {Object.keys(errors).length !== 0 && (
                  <>
                    <Spacer />
                    <Note label="" type="error">
                      {` 예약하기를 진행할 수 없어요. 위의 폼을 다시 확인 해주세요. `}
                    </Note>
                  </>
                )}
                <Button
                  mt={4}
                  mb={4}
                  width={'100%'}
                  type="success-light"
                  onClick={async () => await submitForm()}
                  height={'48px'}
                  loading={isSubmitting}
                >
                  예약하기
                </Button>
                <Divider />
              </ControlFlow>
            </Form>
          </>
        )}
      </Formik >  */}

      <Modal {...confirmBooking.bindings}>
        <Modal.Title>예약 확인</Modal.Title>
        <Modal.Subtitle>예약 내용을 확인해 주세요. </Modal.Subtitle>
        <Modal.Content>
          <Text>예약 번호 : {modalEvent?.orderId}</Text>
          <Text> 지점명: {modalEvent?.store} </Text>
          <Text> 클래스명 : {modalEvent?.className} </Text>

          <Text>
            예약 날짜:
            {modalEvent?.date
              ? DateTime.fromJSDate(modalEvent?.date).toFormat("yyyy-MM-dd")
              : "날짜정보없음"}
          </Text>
          <Text>
            예약 시간:
            {modalEvent?.time
              ? DateTime.fromISO(modalEvent?.time).toFormat("HH:mm")
              : "예약 시간 정보없음"}
          </Text>
          <Text>수업 가격: {modalEvent?.classPrice as number} </Text>
          <Text> 인 원 : {modalEvent?.qty} </Text>
          <Text> 총 가격 : {modalEvent?.totalAmount} </Text>
        </Modal.Content>
        <Modal.Action onClick={() => confirmBooking.setVisible(false)}>
          취소
        </Modal.Action>
        <Modal.Action
          onClick={async () => {
            try {
              confirmHandler()
              // setToasts({
              //   type: 'success',
              //   text: '결제가 정상 처리 되었어요',
              // })
              // await revalidate()
            } catch (error) {
              // setToasts({
              //   type: 'error',
              //   text: '결제 창이 여는 중 오류가 발생했어요!',
              // })
            }
          }}
          // style={{ color: COLOR.ALERT('neg') }}
        >
          확인
        </Modal.Action>
      </Modal>
      <Drawer
        visible={!!visibleBaneer}
        onClose={() => setVisibleBanner(false)}
        placement={"bottom"}
        disableBackdropClick={true}
        style={{width: "500px", margin: "0 auto"}}
      >
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div></div>
          <XCircle
            size={36}
            style={{marginLeft: "auto"}}
            onClick={() => setVisibleBanner(false)}
          />
        </div>
        <Drawer.Title> 예약 전 읽어주세요! </Drawer.Title>

        <Drawer.Content>
          <div style={{margin: "0 auto", textAlign: "center"}}>
            {" "}
            <Image
              height={"100%"}
              src={"banner.svg"}
              style={{objectFit: "contain"}}
            />
          </div>
        </Drawer.Content>
      </Drawer>
    </>
  )
}

export default BookingForm
