import BookingForm from "../Forms/BookingForm";
import { aiffAPI } from "../../utils/aiffAPI";
// import { useEffect, useState } from 'react'
import useSWR from "swr";
import { StoreDTO } from "../../types/store";
import { Spinner } from "@geist-ui/core";
import { BookingFormTest } from "../Forms/BookingFormTest";
import { DateTime } from "luxon";
import { graphql, useLazyLoadQuery } from "react-relay";
import { FastField, Field, Form, Formik, useField, useFormikContext } from "formik";
import { SelectDate } from "../SelectDate/index";
import { SelectStore } from "../SelectStore";
import { StoreDetailDrawer } from "../StoreDetailDrawer";
import { useState } from "react";
import { RegularClasses } from "../RegularClasses";
import type { RegularClassesQuery as RegularClassesQueryType} from "../../../__generated__/RegularClassesQuery.graphql";
import SuspenseWrapper from "@app/components/SuspenseWrapper";

interface SuspenseBookingProps {}
export type FormValues = {
  date: string;
  store: string;
  timeSlot: string;
  qty: number;
  customerFullName: string;
  phone: string;
  classPrice: number;
  totalAmount: number;
  startDateTime: string;
};
type ReservationDTO = {
  date?: Date;
  store?: string;
  timeSlot?: string;
  qty?: number;
  custormerFullName?: string;
  phone?: string;
  classPrice?: number;
  totalAmount?: number;
  orderId?: string;
  className?: string;
  time?: string;
};


// const SuspenseBookingQuery = graphql`
//   query SuspenseBookingQuery($where: AvailableTAvailableTimeSlotsByDateInputimeSlotsByDateInput!) {
//     availableTimeSlotsByDate(where: $where) {
//       ...RegularClassesFragment
//     }
//   }
// `;



const SuspenseBooking: React.FC<SuspenseBookingProps> = ({}) => {
  const [storeDrawerOpen, setStoreDrawerOpen] = useState<boolean>(false);
  // useSuspenseBookingTimeslotsQuery();

  // const [commitMutation] = useMutation(mutation);
  // const clickHandler = () => {
  //   const data = useLazyLoadQuery(
  //     graphql`
  //       query AppQuery($id: ID!) {
  //         user(id: $id) {
  //           name
  //         }
  //       }
  //     `,
  //     { id: "1" },
  //     { fetchPolicy: "store-or-network" }
  //   );
  // };

  // const { values, setFieldValue } = useFormikContext<FormValues>();
  const variables = {
    where: { date: "2024-01-01", store: "1" }, // 예시 변수
  };

//   const data = useLazyLoadQuery<RegularClassesQueryType>(
//     RegularClassesQuery,
//   variables
// );

  const defaultStore = "1";
  const handleOnSubmit = (values) => {
    console.log("values", values);
  };

  const initialValues = {
    date: DateTime.fromJSDate(new Date()).toFormat("yyyy-MM-dd"),
    store: defaultStore,
    timeSlot: "",
    qty: 0,
    customerFullName: "",
    phone: "",
    classPrice: 0,
    totalAmount: 0,
    startDateTime: new Date().toISOString(),
  };

  const validationSchema = {};
  return (
    <main>
      <h1>Suspense Booking Page</h1>
      <Formik<FormValues>
        initialValues={initialValues}
        // validationSchema={validationSchema}
        validateOnBlur={true}
        validateOnChange={true}
        onSubmit={handleOnSubmit}
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
          <Form style={{ width: "90%", margin: "0 auto" }}>
            <SelectDate />
            <SelectStore />


            {/*<RegularClasses />*/}

          </Form>
        )}
      </Formik>

      <StoreDetailDrawer
        storeInfoOpen={storeDrawerOpen}
        setStoreInfoOpen={setStoreDrawerOpen}
      />
    </main>
  );
};
export default SuspenseBooking;

const CustomNameInput = ({ label, name, ...props }) => {
  const [field, meta, helpers] = useField({ name });
  console.log("field", field);
  console.log("meta", meta);
  console.log("helpers", helpers);
  return (
    <div>
      <input {...props} />

      <div>
        {meta.touched && meta.error && (
          <div className="error">{meta.error}</div>
        )}
      </div>
    </div>
  );
};
