/* eslint-disable react/jsx-no-comment-textnodes */
import {StoreDTO, RegularClassDTO, Nullable, StorePrefix} from "@app/types"
import {TimeSlotDTO} from "@app/types/timeslot"
import {
  NEXT_PUBLIC_PAYMENT_FAIL_URL,
  NEXT_PUBLIC_PAYMENT_SUCCESS_URL,
  NEXT_PUBLIC_TOSS_CLIENT_KEY,
} from "@app/utils/constants"
import {
  useToasts,
  useModal,
  Badge,
  Button,
  Card,
  Collapse,
  Divider,
  Grid,
  Note,
  Spacer,
  useTheme,
  Text,
  Modal,
  Drawer,
} from "@geist-ui/core"
import {loadTossPayments} from "@tosspayments/payment-sdk"
import {DateTime} from "luxon"
import {config} from "../../../config"
import {useState, useEffect, useMemo, useCallback} from "react"
import * as Yup from "yup"
import CustomInput from "@app/components/CustomInput"
import ImageComp from "@app/components/ImageComp"
import {LocationDetailLayout} from "@app/layouts/LocationDetailLayout"
import {
  Calendar,
  Navigation,
  Clock,
  Users,
  InfoFill,
  XCircle,
} from "@geist-ui/icons"
import {Formik, Form, Field} from "formik"

import {ControlFlow} from "../BookingForm/ControlFlow"
import {TimeSlotForm} from "../TimeSlotForm"
import {format} from "util"
import {aiffAPI} from "@app/utils/aiffAPI"
import {ChevronRightCircle} from "@geist-ui/icons"

import useSWR from "swr"
import {useFetchTimeSlots} from "@app/hooks/useFetchTimeSlots"
import {AvailableRegularClassIds} from "../../../hooks/useFetchTimeSlots"
import {CustomDrawer} from "@app/components/Drawer"
import {DrawerPlacement} from "@geist-ui/core/esm/drawer/helper"
import {Spinner} from "@geist-ui/core"

interface BookingFormProps {}
type StoreData = {
  stores?: StoreDTO[]
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

export type PaymentRequestDTO = {
  amount: number
  orderId: string
  orderName: string
  customerName: string
  successUrl: string
  failUrl: string
}

export const STORE_NAME = {
  "1": "서초점",
  "2": "대치점1",
  "3": "대치점2",
  "4": "도곡점",
  "5": "압구정점",
} as const

const storeList = Array.from(
  {length: 5},
  (v, i) => STORE_NAME[(i + 1).toString()]
)

function compare(obj, date) {
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
export const BookingFormTest: React.FunctionComponent<
  BookingFormProps
> = () => {
  const theme = useTheme()

  const {setToast} = useToasts()
  const confirmBooking = useModal()
  const [modalEvent, setModalEvent] = useState<Nullable<ReservationDTO>>(null)
  const [selectedStore, setSelectedStore] = useState<string>("1")
  const [selectedRegularClass, setSelectedRegularClass] = useState<string>("")
  const [paymentModal, setPaymentModal] = useState<boolean>(false)
  const [requestPaymentObj, setRequestPaymentobj] =
    useState<PaymentRequestDTO>(null)
  const [selectedDate, setSelectedDate] = useState<string>(
    DateTime.fromJSDate(new Date()).toFormat("yyyy-MM-dd")
  )
  const [visibleBaneer, setVisibleBanner] = useState<boolean>(false)
  const [showStoreDetail, setShowStoreDetail] = useState<boolean>(false)

  const {data, timeslotsData, error, isValidating} = useFetchTimeSlots(
    selectedDate,
    selectedStore
  )

  const [classInfoOpen, setClassInfoOpen] = useState(false)
  const [placement, setPlacement] = useState("")
  const [storeInfoOpen, setStoreInfoOpen] = useState(false)

  useEffect(() => {}, [visibleBaneer])
  useEffect(() => {
    const tossPaymentsProcess = async () => {
      const tossPayments = await loadTossPayments(NEXT_PUBLIC_TOSS_CLIENT_KEY)
      if (tossPayments && requestPaymentObj) {
        tossPayments
          .requestPayment(config?.PaymentMethod, requestPaymentObj)
          .catch((error) => {
            if (error.code === "USER_CANCEL") {
              // 취소 이벤트 처리
              console.log("error", error)
              setPaymentModal(false)
              return
            }
            if (error.code === "INVALID_ORDER_NAME") {
              // 유효하지 않은 'orderName' 처리하기
            } else if (error.code === "INVALID_ORDER_ID") {
              // 유효하지 않은 'orderId' 처리하기
            }
            console.log("결제창 error", error)
          })
      }
    }
    if (paymentModal) {
      tossPaymentsProcess()
    }
  }, [paymentModal, requestPaymentObj])
  const filterTimeSlots = () => {
    let classes
    if (data) {
      classes = data?.stores?.find(
        (v) => Number(v.id) === Number(selectedStore)
      )?.regularClasses
    }

    // console.log('classes', classes)
    // const regularClass = classes?.filter(v => v.id === selectedRegularClass)
    // console.log('regularClass', regularClass)
    // const timeSlotsList = compare(regularClass?.timeSlots, selectedDate)
    // return timeSlotsList
  }
  const [visibleSelectedMonth, setVisibleSelectedMonth] =
    useState<boolean>(false)
  useEffect(() => {
    if (data) {
      const isOpen = data?.stores
        ?.find((v) => Number(v.id) === Number(selectedStore))
        ?.visible_months?.includes(DateTime.fromISO(selectedDate).month)
      console.log("isOpen", isOpen)
      setVisibleSelectedMonth(isOpen)
    }
  }, [selectedStore, selectedDate])

  //선택한 스토어와 선택한 날짜가 visible month로 설정되어 있다면 isOpen
  const isOpen = () => {
    console.log("isOpen function is called", data)
    const res = data?.stores
      ?.find((v) => Number(v.id) === Number(selectedStore))
      ?.visible_months?.includes(DateTime.fromISO(selectedDate).month)
    return res
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

  const handleRegularClassClicked = (classId) => {
    setSelectedRegularClass(classId)
  }

  const isSelectedStore = !!selectedStore
  const filteredLocation = useMemo(() => {
    const store = data?.stores?.find(
      (store) => Number(store?.id) === Number(selectedStore ?? "1")
    )
    const filteredRegularClasses = store?.regularClasses.filter((rc) =>
      store.availableRegularClassIds?.includes(rc.id)
    )
    return {
      ...store,
      regularClasses: filteredRegularClasses,
    }
  }, [selectedStore])

  const openClassInfo = (text) => {
    setPlacement(text)
    setClassInfoOpen(true)
  }

  const handleDrawerOpen = (v) => {
    alert(v)
    setStoreInfoOpen(v)
  }
  const initialValues = {
    date: DateTime.fromISO(selectedDate).toJSDate(),
    store: selectedStore,
    timeSlot: "",
    qty: 0,
    customerFullName: "",
    phone: "",
    classPrice: 0,
    // filteredLocation?.regularClasses[Number(selectedRegularClass) - 1] ?? 0,
    totalAmount: 0,
    currentBookingCount: 0,
    maximumBookingCount: 6,
    startDateTime: new Date().toISOString(),
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

  const test = {}

  const getImageWithASCII = (className: string) => {
    const formattedClassName = className.replace(/\s/g, "").toLowerCase().trim()

    if (/젤리|gummy|bear/i.test(formattedClassName))
      return `/giantgummybear.jpg`

    if (/이스터컵케익|eastercupcake/i.test(formattedClassName))
      return `/eastercupcake.jpg`

    if (/이스터에그|easteregg/i.test(formattedClassName))
      return `/easteregg.jpg`

    if (/티라미수|tiramisu/i.test(formattedClassName)) return `/tiramisu.jpg`

    if (/사탕|lolli/i.test(formattedClassName)) return `/lollipop.jpg`
    if (/에그타르트|eggtart/i.test(formattedClassName)) return `/eggtart.jpg`
    if (/버터링쿠키/i.test(formattedClassName)) return `/butteringcookie.jpg`
    if (/viennese/i.test(formattedClassName)) return `/viennesewhirls.jpg`
    if (/정글컵케익|jungle/i.test(formattedClassName))
      return `/junglecupcake.jpg`
    if (/카네이션/i.test(formattedClassName)) return `/marshmallow.jpeg`
    if (/똥|poopy/i.test(formattedClassName)) return `/poopy.jpeg`
    if (/에르메식|herme/i.test(formattedClassName)) return `/herme.jpeg`
    if (/carnation/i.test(formattedClassName)) return `/carnation.jpeg`
    if (/사워도우빵|sourdough/i.test(formattedClassName))
      return `/blacksourdough.jpg`
    if (/캐릭터컵케익|charactercupcakes|시나모롤/i.test(formattedClassName))
      return `/charactercupcakes.jpg`
    if (/카툰케이크|cartoon/i.test(formattedClassName)) return `/cartoon.jpeg`
    if (/rainbow|레인보우|무지개/i.test(formattedClassName))
      return `/rainbow.jpeg`
    if (/몬스터|monster/i.test(formattedClassName)) return `/monster.jpeg`
    if (/barbie|바비/i.test(formattedClassName)) return `/barbiecupcakes.jpg`
    if (/fairy|garden|요정|가든 /i.test(formattedClassName))
      return `/fairy_garden.jpg`
    if (/pumpkin|펌킨파이/i.test(formattedClassName)) return `/pumpkin_pie.jpg`
    if (/ginger|진저/i.test(formattedClassName))
      return `/ginger_apple_cheesecake.jpg`
    if (/wholecake|컵케익으로/i.test(formattedClassName))
      return `/cupcake_wholecake.jpg`
  }
  if (!data && !error) {
    return <Spinner />
  }
  if (!data && error) {
    return (
      <div> 앗! 데이터 불러오기에 실패했어요. 잠시 후 다시 접속해 주세요.</div>
    )
  }

  if (data) {
    let store, rc
    store =
      data?.stores?.find((store) => store.id == selectedStore) ?? undefined
    rc = store?.regularClasses
      .filter((rc) => store.availableRegularClassIds?.includes(rc.id))
      .sort((a, b) => a.id - b.id)
    console.log("Rc", rc)

    let regularClassDescriptions = rc
      ?.find((r) => r.id === selectedRegularClass)
      ?.description?.split("\r\n")
      .map((v) => v.replace(/•/g, "").trim())
    console.log("regularClassDescriptions", regularClassDescriptions)
    return (
      <>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          validateOnBlur={false}
          validateOnChange={false}
          onSubmit={async (values, help) => {
            try {
              const regularClassInfo = rc?.find(
                (singleClass) =>
                  Number(singleClass.id) === Number(selectedRegularClass)
              )

              const leftSeating =
                Number(values.maximumBookingCount) -
                Number(values.currentBookingCount)

              // prevent overbooking
              if (leftSeating < Number(values.qty)) {
                help.resetForm()
                setSelectedStore("")
                setSelectedRegularClass("")
                return setToast({
                  text: "남은 자리 보다 더 많이 예약했어요!",
                  type: "error",
                })
              }
              const {totalAmount, customerFullName, store} = values
              const storeName = data?.stores[Number(store) - 1]?.name
              const className = regularClassInfo?.name
              const orderId = `${
                StorePrefix[storeName.replaceAll(" ", "")]
              }${new Date().getTime().toString()}`

              setModalEvent({
                orderId,
                store: storeName,
                time: values?.startDateTime,
                className,
                ...values,
              })
              await confirmBooking.setVisible(true)
              await setRequestPaymentobj({
                amount: totalAmount,
                orderId,
                orderName: `${storeName}-${className}-${
                  values?.timeSlot
                }-${DateTime.fromISO(values?.startDateTime).toLocaleString(
                  DateTime.DATETIME_SHORT
                )}-${values.phone}`,
                customerName: customerFullName,
                // successUrl: 'http://localhost:3434/payment/success',
                successUrl: `${NEXT_PUBLIC_PAYMENT_SUCCESS_URL}/?timeslot=${values.timeSlot.toString()}&phone=${values.phone.toString()}&qty=${values.qty.toString()}&customerName=${customerFullName.toString()}`,
                failUrl: `${NEXT_PUBLIC_PAYMENT_FAIL_URL}`,
              })
              help.setSubmitting(true)
              // confirm or cancel 버튼의 확인이 필요하다.
            } catch (error) {
              console.log("error", error)
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
              <Form style={{width: "90%", margin: "0 auto"}}>
                <div className="datetime-selector">
                  <Grid.Container
                    gap={1}
                    justify="flex-start"
                    alignItems="center"
                  >
                    <Grid>
                      <Calendar size={24} />
                    </Grid>
                    <Grid>
                      <Text>{"날짜 선택"}</Text>
                    </Grid>
                  </Grid.Container>
                  <div style={{display: "flex", justifyContent: "center"}}>
                    <input
                      type="date"
                      id="start"
                      name="date"
                      value={selectedDate}
                      min="2022-07-01"
                      max="2030-01-01"
                      size={20}
                      style={{width: "100%", height: "40px"}}
                      onChange={(e) => {
                        if (e.currentTarget.validity.valid) {
                          const newValue = DateTime.fromISO(
                            e.currentTarget.value
                          ).toJSDate()
                          setSelectedDate(
                            DateTime.fromISO(e.currentTarget.value).toFormat(
                              "yyyy-MM-dd"
                            )
                          )
                          setFieldValue("date", newValue)
                        }
                      }}
                    />
                  </div>
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
                <Divider height={""} />

                <Grid.Container
                  gap={1}
                  justify="space-between"
                  alignItems="center"
                  style={{marginTop: "10px"}}
                >
                  <div style={{display: "flex", alignItems: "center"}}>
                    <Navigation size={22} />
                    <Text style={{fontWeight: "600"}} ml={1}>
                      {/*select store name */}
                      {STORE_NAME[selectedStore]}{" "}
                    </Text>
                  </div>
                  <div
                    style={{display: "flex", alignItems: "center"}}
                    onClick={() => {
                      setStoreInfoOpen(() => true)
                    }}
                  >
                    <Text mr={0.2} style={{fontWeight: "600"}}>
                      {"지점 정보"}
                    </Text>
                    <ChevronRightCircle size={22} />
                  </div>

                  {errors?.store && (
                    <>
                      <Spacer />
                      <Note label="" type="error">
                        {errors.store}
                      </Note>
                    </>
                  )}
                  <CustomDrawer
                    placement={"bottom"}
                    drawerOpen={storeInfoOpen}
                    setDrawerOpen={(v) => setStoreInfoOpen(v)}
                  >
                    <Drawer.Title>{store?.name}</Drawer.Title>
                    <Drawer.Content>
                      {store?.description?.split("\r\n").map((v, i) => {
                        return (
                          <Text
                            key={i.toString()}
                            font={0.8}
                            paddingLeft={0.4}
                            p
                            b
                            margin={0}
                            style={{color: "GrayText"}}
                          >
                            {v}
                          </Text>
                        )
                      })}
                    </Drawer.Content>
                  </CustomDrawer>
                </Grid.Container>
                {/*--------------- 지점 선택 버튼 --------------------- */}
                <Grid.Container gap={2}>
                  <div
                    style={{
                      display: "flex",
                      borderRadius: "31px",
                      backgroundColor: "#ffffff",
                      flexWrap: "wrap",
                      width: "95%",
                      margin: "0 auto",
                    }}
                  >
                    {data?.stores
                      ?.sort((a, b) => Number(a.id) - Number(b.id))
                      .map((store) => {
                        return (
                          <Grid key={store?.id}>
                            <Button
                              id={store?.id}
                              color="primary"
                              style={{marginLeft: "2px"}}
                              name={"store"}
                              auto
                              onClick={(e) =>
                                handleLocationClicked(store?.id, setFieldValue)
                              }
                            >
                              {store.name}
                            </Button>
                          </Grid>
                        )
                      })}
                  </div>
                </Grid.Container>

                {/** ------------- Search Result Component  --------------- */}
                <ControlFlow if={!selectedStore && !visibleSelectedMonth}>
                  {" "}
                  지점을 선택해 주세요.
                </ControlFlow>
                <ControlFlow if={data && selectedStore && !isOpen()}>
                  <p> 준비 중인 달 이에요.</p>
                </ControlFlow>

                <ControlFlow if={isSelectedStore && showStoreDetail}>
                  {/* <LocationDetailLayout>
                    <Grid.Container mt={2}>
                      <Card width={"100%"}>
                        <Card.Content>
                          <Text my={0}>{filteredLocation?.name}</Text>
                        </Card.Content>
                        <Card.Content>
                          <img
                            src={`./schedule_${selectedStore}.svg`}
                            alt={`${selectedStore}`}
                          />
                        </Card.Content>
                        <Divider h="1px" my={0} />
                        <Card.Content>
                          <ul>
                            {filteredLocation?.description
                              ?.split("\\n")
                              .map((v, i) => (
                                <li key={i.toString()}>{v}</li>
                              ))}
                          </ul>
                        </Card.Content>
                      </Card>

                      <Spacer />
                    </Grid.Container>
                  </LocationDetailLayout> */}
                </ControlFlow>
                <ControlFlow if={!timeslotsData && isSelectedStore}>
                  클래스가 없어요.
                </ControlFlow>
                <ControlFlow if={isSelectedStore && isOpen()}>
                  <LocationDetailLayout>
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
                        <Text>{"클래스/시간 선택"}</Text>
                      </Grid>
                    </Grid.Container>

                    <div>
                      {rc?.map((singleClass: RegularClassDTO) => (
                        <div
                          title={singleClass?.name}
                          id={singleClass.id}
                          key={singleClass?.id}
                          style={{
                            boxShadow: "0px 2px 50px rgba(0, 0, 0, 0.15)",
                            borderRadius: "31px",
                            padding: "2rem 1rem",
                            marginBottom: "1rem",
                          }}
                          //TODO: onClick shoud move to each time slot
                          // onClick={() => {

                          //   setFieldValue("classPrice", singleClass?.price);
                          //   handleRegularClassClicked(singleClass?.id);
                          // }}
                        >
                          {/* <Card width="98%" shadow>
                            <div
                              style={{
                                width: "100%",
                              }}
                            >
                              <ImageComp
                                src={`/static/${singleClass.name
                                  .split(" ")
                                  .join("")
                                  .toLowerCase()
                                  .trim()}.jpg`}
                              />

                              <Grid style={{ width: "80%" }}>
                                {singleClass?.description &&
                                  singleClass?.description
                                    ?.split("\\n")
                                    .map((v, i) => (
                                      <Text
                                        key={i.toString()}
                                        font={0.8}
                                        paddingLeft={0.4}
                                        p
                                        b
                                        margin={0}
                                        style={{ color: "GrayText" }}
                                      >
                                        {v}
                                      </Text>
                                    ))}
                              </Grid>
                            </div>
                          </Card> */}

                          <div
                            className="regularClass-container"
                            style={{
                              display: "flex",
                              flexDirection: "column",
                            }}
                          >
                            <div
                              className="class-wrapper"
                              style={{
                                display: "flex",
                                flexDirection: "column",
                                margin: "0 auto",
                              }}
                            >
                              <div style={{display: "flex", gap: "10px"}}>
                                <div
                                  style={{
                                    flexShrink: 0,
                                    width: "95px",
                                    height: "95px",
                                  }}
                                >
                                  <ImageComp
                                    src={
                                      singleClass?.imageURL ||
                                      getImageWithASCII(singleClass.name)
                                    }
                                  />
                                </div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    justifyContent: "space-between",
                                  }}
                                >
                                  <Grid>
                                    {singleClass.name

                                      ?.split("(")
                                      ?.map((v, i) => (
                                        <Text
                                          key={v}
                                          style={{
                                            fontSize: "1.1rem",
                                            fontWeight: "600",
                                            fontFamily: "inherit",
                                            margin: "0.1rem",
                                          }}
                                        >
                                          {v.indexOf(")") !== -1
                                            ? `(${v}`
                                            : `${v}`}
                                        </Text>
                                      ))}
                                  </Grid>
                                  <Grid>
                                    <Button
                                      auto
                                      onClick={() => {
                                        openClassInfo("bottom")
                                        handleRegularClassClicked(
                                          singleClass?.id
                                        )
                                      }}
                                      scale={1 / 2}
                                      mr="10px"
                                    >
                                      클래스 정보 보기
                                    </Button>
                                  </Grid>
                                </div>
                              </div>
                              <div
                                className="timeslots-wrapper"
                                style={{display: "flex", flexWrap: "nowrap"}}
                              >
                                {timeslotsData
                                  ?.filter(
                                    (t) => t.regularClassId === singleClass.id
                                  )
                                  ?.map((timeslot) => {
                                    return (
                                      <div
                                        className="timeslot"
                                        key={timeslot.id}
                                        style={{
                                          fontSize: "16px",
                                          fontWeight: "600",
                                          marginRight: "6px",
                                          color:
                                            values.timeSlot === timeslot.id
                                              ? "#fff"
                                              : "#0070f3",
                                          backgroundColor:
                                            values.timeSlot === timeslot.id
                                              ? "#0070f3"
                                              : "#fff",
                                          border: "1px solid #0070f3",
                                        }}
                                        onClick={async () => {
                                          handleRegularClassClicked(
                                            singleClass?.id
                                          )
                                          await setFieldValue(
                                            "timeSlot",
                                            timeslot?.id
                                          )
                                          await setFieldValue(
                                            "maximumBookingCount",
                                            Number(
                                              timeslot?.maximumBookingCount
                                            )
                                          )
                                          await setFieldValue(
                                            "currentBookingCount",
                                            Number(
                                              timeslot?.currentBookingCount
                                            )
                                          )
                                          await setFieldValue(
                                            "startDateTime",
                                            timeslot?.startDateTime
                                          )
                                          setFieldValue(
                                            "classPrice",
                                            singleClass?.price
                                          )

                                          if (Number(values?.qty) > 0) {
                                            setFieldValue(
                                              "totalAmount",
                                              Number(values?.qty) *
                                                Number(values?.classPrice)
                                            )
                                          }
                                        }}
                                      >
                                        {/* <span className="time"> */}
                                        {`${DateTime.fromISO(
                                          timeslot.startDateTime
                                        ).toFormat("HH:mm")}`}
                                        {/* </span> */}
                                      </div>
                                    )
                                  })}
                              </div>
                            </div>

                            {/* <TimeSlotForm
                              date={values?.date}
                              storeId={selectedStore}
                              classId={selectedRegularClass}
                              handleSelectTimeSlot={async (timeslot) => {
                                console.log("timeslot", timeslot);
                                await setFieldValue("timeSlot", timeslot?.id);
                                await setFieldValue(
                                  "maximumBookingCount",
                                  Number(timeslot?.maximumBookingCount)
                                );
                                await setFieldValue(
                                  "currentBookingCount",
                                  Number(timeslot?.currentBookingCount)
                                );
                                await setFieldValue(
                                  "startDateTime",
                                  timeslot?.startDateTime
                                );

                                if (Number(values?.qty) > 0) {
                                  setFieldValue(
                                    "totalAmount",
                                    Number(values?.qty) *
                                      Number(values?.classPrice)
                                  );
                                }
                              }}
                            /> */}
                          </div>

                          {/* {!!selectedRegularClass && (
                            <TimeSlotForm
                              date={values?.date}
                              storeId={selectedStore}
                              classId={selectedRegularClass}
                              
                            />
                          )} */}
                        </div>
                      ))}
                      {errors?.timeSlot && (
                        <>
                          <Spacer />
                          <Note label="" type="error">
                            {errors.timeSlot}
                          </Note>
                        </>
                      )}
                    </div>

                    <CustomDrawer
                      placement={"bottom"}
                      drawerOpen={classInfoOpen}
                      setDrawerOpen={setClassInfoOpen}
                    >
                      <Drawer.Title
                        className="regularClass_title"
                        style={{
                          fontFamily: "inherit",
                          fontSize: "1.3rem",
                          justifyContent: "left",
                          textAlign: "left",
                        }}
                      >
                        {rc
                          ?.find((r) => r.id === selectedRegularClass)
                          ?.name?.split(/(\([^)]*\))/)
                          .filter((part) => part.trim() !== "")
                          .map((v, i) => (
                            <>
                              {v}
                              <br />
                            </>
                          ))}
                      </Drawer.Title>
                      <Drawer.Content>
                        <ul className="regularClass_desc">
                          {regularClassDescriptions?.map((v, i) => (
                            <li
                              key={i.toString()}
                              style={{
                                margin: 0,
                                fontSize: "0.8rem",
                              }}
                            >
                              <p
                                style={{
                                  margin: 0,
                                  color: "GrayText",
                                  fontFamily: "inherit",
                                }}
                              >
                                {v}
                              </p>
                            </li>
                          )) ?? (
                            <Text
                              font={0.8}
                              paddingLeft={0.4}
                              p
                              b
                              margin={0}
                              style={{color: "GrayText"}}
                            >
                              {"내용을 준비 중이에요."}
                            </Text>
                          )}
                        </ul>
                      </Drawer.Content>
                    </CustomDrawer>

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
                        <Text>{"인원 선택"}</Text>
                      </Grid>
                    </Grid.Container>

                    <Field
                      label={"인원/명"}
                      as={CustomInput}
                      name={"qty"}
                      htmlType={"number"}
                      min={1}
                      max={10}
                      errors={errors}
                      touched={touched}
                      placeholder="인원/명"
                      onChange={(e) => {
                        setFieldValue("qty", e.target.value)
                        setFieldValue(
                          "totalAmount",
                          Number(e.target.value) * Number(values.classPrice)
                        )
                      }}
                    />
                  </LocationDetailLayout>

                  <Grid.Container
                    gap={1}
                    justify="flex-start"
                    alignItems="center"
                    mt={2}
                  >
                    <Grid>
                      <InfoFill size={24} />
                    </Grid>
                    <Grid>
                      <Text>{"예약자 정보"}</Text>
                    </Grid>
                  </Grid.Container>
                  <Grid.Container>
                    <Grid xs={24}>
                      <Field
                        name={"customerFullName"}
                        as={CustomInput}
                        label={"이름"}
                        placeholder="이름"
                        errors={errors}
                        touched={touched}
                        style={{width: "100%"}}
                      />
                    </Grid>
                    <Grid xs={24} mt={1}>
                      <Field
                        name={"phone"}
                        as={CustomInput}
                        label={"핸드폰 번호"}
                        htmlType={"tel"}
                        errors={errors}
                        touched={touched}
                        placeholder="핸드폰 번호"
                      />
                    </Grid>
                    <Grid>
                      <Divider />
                      <p style={{textAlign: "center", color: "GrayText"}}>
                        환불 규정
                      </p>
                      <p style={{color: "GrayText", fontFamily: "inherit"}}>
                        수업 7일 전까지 알려주시면 100% 환불 가능하며 선재료
                        준비로 인해 6일전~ 3일전까지는 50%가 환불됩니다. 그
                        이후에는 환불 불가하며 당일 No Show인 경우에도 환불이
                        어렵습니다. 여러 사정으로 당일 취소를 원하시는 분들도
                        계시겠지만 그런 경우 다른 분들에게 기회를 드리지 못하는
                        부분이 발생되어 원활한 수업 진행을 위한 환불 규정 이오니
                        양해를 부탁드립니다. 감사합니다.
                      </p>
                    </Grid>
                  </Grid.Container>
                  <Divider mt={4} />
                  <Grid.Container mt={4}>
                    <Grid xs={24}>
                      <Card width={"100%"}>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text> 클래스 가격 : </Text>
                          <Text>
                            {Number(values?.classPrice).toLocaleString()}
                          </Text>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Text>인원 : </Text>
                          <Text> {Number(values?.qty).toLocaleString()}명</Text>
                        </div>

                        <Divider />
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
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
                    width={"100%"}
                    type="success-light"
                    onClick={async () => await submitForm()}
                    height={"48px"}
                    loading={isSubmitting}
                  >
                    예약하기
                  </Button>
                  <Divider />
                </ControlFlow>
              </Form>
            </>
          )}
        </Formik>

        <Modal {...confirmBooking.bindings}>
          <Modal.Title>예약 확인</Modal.Title>
          <Modal.Subtitle>예약 내용을 확인해 주세요. </Modal.Subtitle>
          <Modal.Content>
            <Text>예약 번호 : {modalEvent?.orderId}</Text>
            <Text> 지점명: {STORE_NAME[modalEvent?.store]} </Text>
            <Text> 클래스명 : {modalEvent?.className} </Text>

            <Text>
              예약 날짜:
              {DateTime.fromJSDate(modalEvent?.date).toFormat(
                "yyyy-MM-dd"
              )}{" "}
            </Text>
            <Text>
              예약 시간:
              {DateTime.fromISO(modalEvent?.time).toFormat("HH:mm")}
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
              <img
                src={"./popup.svg"}
                style={{width: "100%", objectFit: "contain"}}
              />
            </div>
          </Drawer.Content>
        </Drawer>
      </>
    )
  }
}
