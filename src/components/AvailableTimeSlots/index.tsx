import { LocationDetailLayout } from "@app/layouts/LocationDetailLayout";
import { Grid, Text } from "@geist-ui/core";
import * as React from "react";
import { Clock } from "@geist-ui/icons";
import { graphql, useLazyLoadQuery } from "react-relay";
import type { AvailableTimeSlotsQuery as AvailableTimeSlotsQueryType } from "../../../__generated__/AvailableTimeSlotsQuery.graphql";
import { useFormikContext } from "formik";
import { FormValues } from "../SuspenseBooking";
import { DateTime } from "luxon";
import TimeSlot from "../TimeSlot";

interface ClassListProps {}
const AvailableTimeSlotsQuery = graphql`
  query AvailableTimeSlotsQuery($where: AvailableTimeSlotsByDateInput!) {
    availableTimeSlotsByDate(where: $where) {
      ...TimeSlotFragment
    }
  }
`;
export const AvailableTimeSlots: React.FC<ClassListProps> = (props) => {
  const { values, setFieldValue } = useFormikContext<FormValues>();
  const variables = {
    where: { date: "2024-01-01", store: "1" }, // 예시 변수
  };

  const data = useLazyLoadQuery<AvailableTimeSlotsQueryType>(
    AvailableTimeSlotsQuery,
    variables
  );

  console.log("timeslots", data.availableTimeSlotsByDate);
  //TODO: 잘못가져왔음,  storeId 와 date 를 토대로 클래스 리스트를 가져와서 그 클래스 리스트 내에 있는 timeslot을 가져와야 함.

  return (
    <LocationDetailLayout>
      <Grid.Container gap={1} justify="flex-start" alignItems="center" mt={2}>
        <Grid>
          <Clock size={24} />
        </Grid>
        <Grid>
          <Text>{"클래스/시간 선택"}</Text>
        </Grid>
      </Grid.Container>

      <div
        className="timeslots-wrapper"
        style={{ display: "flex", flexWrap: "nowrap" }}
      >
        {(data?.availableTimeSlotsByDate || [])?.map((timeslot) => (
          <TimeSlot timeslot={timeslot} />
        ))}
      </div>
    </LocationDetailLayout>
  );
};
