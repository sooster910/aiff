import { DateTime } from "luxon";
import * as React from "react";
import { graphql, useFragment } from "react-relay";
import { TimeSlotFragment$key } from "../../../__generated__/TimeSlotFragment.graphql";
import { FormValues } from "../SuspenseBooking";
import { useFormikContext } from "formik";

interface TimeSlotProps {
  timeslot: TimeSlotFragment$key;
}

export const TimeSlot: React.FC<TimeSlotProps> = ({
  timeslot,
}: TimeSlotProps) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const TimeSlotFragment = graphql`
    fragment TimeSlotFragment on TimeSlot {
      _id
      id
      name
      startDateTime
      endDateTime
      regularClassId
      price
      currentBookingCount
      maximumBookingCount
      regularClass {
        _id
        description
        duration
        name
        price
      }
    }
  `;

  const data = useFragment(TimeSlotFragment, timeslot);
  console.log("data", data);
  return (
    <>
      <div
        title={data?.regularClassId.toString()}
        id={data.regularClassId.toString()}
        key={data?.regularClassId}
        //TODO: onClick shoud move to each time slot
      >
        <div
          className="regularClass-container"
          style={{
            // boxShadow: "0px 0px 18px #0000001a",
            boxShadow: "0px 2px 50px rgba(0, 0, 0, 0.15)",
            borderRadius: "31px",
            marginBottom: "10px",
            padding: "1rem",
          }}
        >
          <div
            className="class-wrapper"
            style={{ display: "flex", alignItems: "center" }}
          >
            {/* <ImageComp
              src={singleClass?.imageURL || getImageWithASCII(singleClass.name)}
            /> */}
            <div
              className="timeslot"
              key={data.id}
              style={{
                fontSize: "16px",
                fontWeight: "600",
                marginRight: "6px",
                color: values.timeSlot === data.id ? "#fff" : "#0070f3",
                backgroundColor:
                  values.timeSlot === data.id ? "#0070f3" : "#fff",
                border: "1px solid #0070f3",
              }}
              onClick={async () => {
                //   handleRegularClassClicked(singleClass?.id);
                //   await setFieldValue("timeSlot", timeslot?.id);
                //   await setFieldValue(
                //     "maximumBookingCount",
                //     Number(timeslot?.maximumBookingCount)
                //   );
                //   await setFieldValue(
                //     "currentBookingCount",
                //     Number(timeslot?.currentBookingCount)
                //   );
                //   await setFieldValue("startDateTime", timeslot?.startDateTime);
                //   setFieldValue("classPrice", singleClass?.price);
                //   if (Number(values?.qty) > 0) {
                //     setFieldValue(
                //       "totalAmount",
                //       Number(values?.qty) * Number(values?.classPrice)
                //     );
                //   }
              }}
            >
              {`${DateTime.fromISO(data.startDateTime).toFormat("HH:mm")}`}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TimeSlot;
