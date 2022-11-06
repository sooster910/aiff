// import CustomInput from '@app/components/CustomInput'
// import { Divider, Spacer, Grid, Textarea, Button, Select } from '@geist-ui/core'
// import { Field, Formik } from 'formik'
// import { DateTime } from 'luxon'
// import { useLazyLoadQuery, useMutation } from 'react-relay'
// import { graphql } from 'babel-plugin-relay/macro'
// import * as Yup from 'yup'
// import Router from 'next/router'
// import useSWR from 'swr'
// import { fetcher } from '../../ScheduleTable/index'

// type AdminTimeSlotFormProps = {
//   storeId?: number
//   startDateTime?: string
//   timeSlotId?: string
// }

// const AdminTimeSlotForm: React.FunctionComponent<AdminTimeSlotFormProps> = ({
//   storeId = 1,
//   timeSlotId,
//   startDateTime,
// }) => {
//   //   const storeData = useLazyLoadQuery<WeeklyFormRegularClassesQuery>(
//   //     graphql`
//   //       query AdminTimeSlotFormRegularClassesQuery {
//   //         allRegularClasses {
//   //           _id
//   //           id
//   //           name
//   //           storeId
//   //         }
//   //       }
//   //     `,
//   //     {}
//   //   )

//   //   const timeSlotData = useLazyLoadQuery<AdminTimeSlotFormTimeSlotQuery>(
//   //     graphql`
//   //       query AdminTimeSlotFormTimeSlotQuery($where: TimeSlotWhereInput!) {
//   //         timeSlot(where: $where) {
//   //           _id
//   //           id
//   //           maximumBookingCount
//   //           currentBookingCount
//   //           startDateTime
//   //           storeId
//   //           regularClassId
//   //           isHoliday
//   //           isBusinessDay
//   //           status
//   //           price
//   //           isUnset
//   //           skip
//   //           regularClass {
//   //             _id
//   //             name
//   //             description
//   //           }
//   //         }
//   //       }
//   //     `,
//   //     {
//   //       where: { _id: timeSlotId, skip: !!(timeSlotId == 'new') },
//   //     }
//   //   )

//   console.log('storeData', storeData)
//   console.log('timeslotData', timeSlotData)
//   const validationSchema = {
//     // date: Yup.date().required('날짜를 선택해 주세요.'),
//     // store: Yup.string().required('지점을 다시 선택해 주세요.'),
//     // timeSlot: Yup.string().required('시간을 다시 선택해 주세요.'),
//     // qty: Yup.number()
//     //   .min(1, '인원 수는 최소 1명 이상 이어야 해요.')
//     //   .required('인원 수를 선택해 주세요.'),
//     // description: Yup.string().required('예약자 이름을 적어주세요.'),
//     maximumBookingCount: Yup.number().required('최대인원을 적어주세요.'),
//   }

//   // const initialValues = {
//   //   date: DateTime.fromISO(timeSlotData?.timeSlot?.startDateTime).toJSDate(),
//   //   store: storeId,
//   //   price: timeSlotData?.timeSlot?.price as number,
//   //   regularClassName: timeSlotData.timeSlot?.regularClass?._id,
//   //   description: timeSlotData?.timeSlot?.regularClass?.description,
//   //   maximumBookingCount: timeSlotData?.timeSlot?.maximumBookingCount,
//   // }
//   //   const [commitMutation, isMutationInFlight] = useMutation(
//   //     graphql`
//   //       mutation AdminTimeSlotFormMutation($input: AddTimeSlotInput!) {
//   //         admin {
//   //           addTimeSlot(data: $input) {
//   //             isUpdated
//   //           }
//   //         }
//   //       }
//   //     `
//   //   )
//   return (
//     <>
//       <Formik
//         initialValues={initialValues}
//         // validationSchema={validationSchema}
//         validateOnBlur={false}
//         validateOnChange={false}
//         onSubmit={(values, { setSubmitting }) => {
//           //   setTimeout(() => {
//           //     alert(JSON.stringify(values, null, 2))
//           //
//           //   }, 400)
//           //   commitMutation({
//           //     variables: {
//           //       input: {
//           //         timeSlotId,
//           //         storeId: Number(storeId),
//           //         regularClassId: Number(values.regularClassName),
//           //         startDateTime: DateTime.fromJSDate(values.date).toISO(),
//           //         price: values.price,
//           //         maximumBookingCount: values.maximumBookingCount,
//           //       },
//           //     },
//           //   })
//           console.log('values', values)
//           setSubmitting(false)
//           Router.back()
//         }}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           setFieldValue,
//           submitForm,
//           isSubmitting,
//           /* and other goodies */
//         }) => (
//           <>
//             <Divider />
//             <Spacer h={3.5} />
//             <form
//               onSubmit={handleSubmit}
//               style={{ width: '600px', margin: '0 auto' }}
//             >
//               <Spacer h={2.5} />
//               <Grid.Container xl={24}>
//                 <Select
//                   value={values.regularClassName}
//                   placeholder="Choose one"
//                   onChange={value => console.log('select chagne ', value)}
//                 >
//                   {storeData?.allRegularClasses
//                     .filter(v => Number(v.storeId) === storeId)
//                     .map(regularClass => (
//                       <Select.Option
//                         key={regularClass?.id}
//                         value={regularClass?._id}
//                       >
//                         {regularClass?.name}
//                       </Select.Option>
//                     ))}
//                 </Select>
//               </Grid.Container>

//               <Spacer h={2.5} />

//               <Grid.Container>
//                 <Grid xs={24}>
//                   <Textarea
//                     value={values.description}
//                     name={'description'}
//                     placeholder="클래스 설명"
//                     style={{
//                       maxWidth: '340px',
//                       width: '340px',
//                       height: '300px',
//                     }}
//                     onChange={value => setFieldValue('description', value)}
//                   />
//                 </Grid>
//               </Grid.Container>
//               <Spacer h={2.5} />

//               <Grid.Container>
//                 <Field
//                   label={'클래스 가격'}
//                   as={CustomInput}
//                   name={'price'}
//                   htmlType={'number'}
//                   min={10000}
//                   max={200000}
//                   errors={errors}
//                   touched={touched}
//                   placeholder="클래스 가격 "
//                   onChange={e => {
//                     setFieldValue('price', e.target.value)
//                   }}
//                   style={{ maxWidth: '340px', width: '340px' }}
//                 />
//               </Grid.Container>
//               <Spacer h={2.5} />
//               <Grid.Container>
//                 <Field
//                   label={'최대 인원'}
//                   as={CustomInput}
//                   name={'maximumBookingCount'}
//                   value={values.maximumBookingCount}
//                   htmlType={'number'}
//                   min={1}
//                   max={30}
//                   errors={errors}
//                   touched={touched}
//                   placeholder="최대 인원"
//                   onChange={e => {
//                     setFieldValue('maximumBookingCount', e.target.value)
//                   }}
//                 />
//               </Grid.Container>
//               <Button
//                 mt={4}
//                 mb={4}
//                 style={{ maxWidth: '340px', width: '340px' }}
//                 type="success-light"
//                 onClick={async () => await submitForm()}
//                 height={'48px'}
//                 loading={isSubmitting}
//               >
//                 수정/생성하기
//               </Button>
//             </form>
//           </>
//         )}
//       </Formik>
//     </>
//   )
// }

// export default AdminTimeSlotForm
export {}
