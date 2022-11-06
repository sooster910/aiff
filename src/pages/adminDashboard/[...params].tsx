import { useRouter } from 'next/router'
import {
  Text,
  Spinner,
  Button,
  Divider,
  Grid,
  Select,
  Spacer,
  Textarea,
} from '@geist-ui/core'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
// import { NEXT_PUBLIC_FRONTEND_BASE_URL } from '../../utils copy/constants'
import { GetServerSideProps } from 'next/types'
import * as Yup from 'yup'
import { Field, Formik } from 'formik'
import { DateTime } from 'luxon'
import Router from 'next/router'
import CustomInput from '@app/components/CustomInput'

// const AdminTimeSlotForm = dynamic(
//   () => import('../../components/Forms/AdminTimeSlotForm'),
//   {
//     ssr: false,
//   }
// )

export const getServerSideProps: GetServerSideProps = async context => {
  const data = context.params
  console.log(data.params)
  try {
    let timeSlot
    const res2 = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/timeslot/${data.params[0]}`
    )
    console.log('res2', res2)
    timeSlot = { ...(await res2.json()) }
    console.log('timeslot', timeSlot)

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/regularClassbystoreId?storeId=${data.params[2]}`
    )
    const regularClassesByStoreId = await res.json()

    return {
      props: {
        regularClasses: regularClassesByStoreId,
        timeSlot,
      },
    }
  } catch (err) {
    console.log('err', err)
  }
}

export default function AdminDashboardForm(props) {
  console.log('props', props.regularClasses, props.timeslot)
  const { timeslot, regularClasses } = props
  const validationSchema = {
    // date: Yup.date().required('날짜를 선택해 주세요.'),
    // store: Yup.string().required('지점을 다시 선택해 주세요.'),
    // timeSlot: Yup.string().required('시간을 다시 선택해 주세요.'),
    // qty: Yup.number()
    //   .min(1, '인원 수는 최소 1명 이상 이어야 해요.')
    //   .required('인원 수를 선택해 주세요.'),
    // description: Yup.string().required('예약자 이름을 적어주세요.'),
    maximumBookingCount: Yup.number().required('최대인원을 적어주세요.'),
  }

  const initialValues = {
    date: DateTime.fromISO(timeslot?.startDateTime).toJSDate(),
    store: timeslot?.storeId,
    price: timeslot?.price as number,
    regularClassName: timeslot?.regularClassId ?? 0,
    maximumBookingCount: timeslot?.maximumBookingCount,
    currentBookingCount: timeslot?.currentBookingCount,
  }
  return (
    <div style={{ margin: ' 0 auto', width: '100%' }}>
      <h1> 타임슬롯 변경 </h1>
      <Text>
        지점, 클래스에 상응하는 타임슬롯을 생성 및 변경할 수 있습니다.
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(values, { setSubmitting }) => {
          //   setTimeout(() => {
          //     alert(JSON.stringify(values, null, 2))
          //
          //   }, 400)
          //   commitMutation({
          //     variables: {
          //       input: {
          //         timeSlotId,
          //         storeId: Number(storeId),
          //         regularClassId: Number(values.regularClassName),
          //         startDateTime: DateTime.fromJSDate(values.date).toISO(),
          //         price: values.price,
          //         maximumBookingCount: values.maximumBookingCount,
          //       },
          //     },
          //   })
          console.log('values', values)
          setSubmitting(false)
          Router.back()
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          submitForm,
          isSubmitting,
          /* and other goodies */
        }) => (
          <>
            <Divider />
            <Spacer h={3.5} />
            <form
              onSubmit={handleSubmit}
              style={{ width: '600px', margin: '0 auto' }}
            >
              <Spacer h={2.5} />
              <Grid.Container xl={24}>
                <Select
                  value={values.regularClassName}
                  placeholder="Choose one"
                  onChange={value => console.log('select chagne ', value)}
                >
                  {regularClasses.map(regularClass => (
                    <Select.Option
                      key={regularClass?.id.toString()}
                      value={regularClass?.id}
                    >
                      {regularClass?.name}
                    </Select.Option>
                  ))}
                </Select>
              </Grid.Container>

              <Spacer h={2.5} />

              {/* <Grid.Container>
                <Grid xs={24}>
                  <Textarea
                    value={values.description}
                    name={'description'}
                    placeholder="클래스 설명"
                    style={{
                      maxWidth: '340px',
                      width: '340px',
                      height: '300px',
                    }}
                    onChange={value => setFieldValue('description', value)}
                  />
                </Grid>
              </Grid.Container> */}
              <Spacer h={2.5} />

              <Grid.Container>
                <Field
                  label={'클래스 가격'}
                  as={CustomInput}
                  name={'price'}
                  htmlType={'number'}
                  min={10000}
                  max={200000}
                  errors={errors}
                  touched={touched}
                  placeholder="클래스 가격 "
                  onChange={e => {
                    setFieldValue('price', e.target.value)
                  }}
                  style={{ maxWidth: '340px', width: '340px' }}
                />
              </Grid.Container>
              <Spacer h={2.5} />
              <Grid.Container>
                <Field
                  label={'최대 인원'}
                  as={CustomInput}
                  name={'maximumBookingCount'}
                  value={values.maximumBookingCount}
                  htmlType={'number'}
                  min={1}
                  max={30}
                  errors={errors}
                  touched={touched}
                  placeholder="최대 인원"
                  onChange={e => {
                    setFieldValue('maximumBookingCount', e.target.value)
                  }}
                />
              </Grid.Container>
              <Button
                mt={4}
                mb={4}
                style={{ maxWidth: '340px', width: '340px' }}
                type="success-light"
                onClick={async () => await submitForm()}
                height={'48px'}
                loading={isSubmitting}
              >
                수정/생성하기
              </Button>
            </form>
          </>
        )}
      </Formik>
    </div>
  )
}
